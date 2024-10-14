import path from 'path';
import fs from 'fs';
import { access, writeFile, rename, rm } from 'fs/promises';


const checkFileExistence = async function(pathToFile) {
	try {
		await access(pathToFile);
		return true;
	} catch (error) {
		return false;
	}
}


export class FileOperations {
	_store;

	constructor(store) {
		this._store = store;
	}

	async readFile(input) {
		const isPath = false; // TODO
		const pathToFile = isPath ? input : path.join(this._store.currentDirectory, input);  

		return new Promise((resolve, reject) => {
			try {
				const fstream = fs.createReadStream(pathToFile, { encoding: 'utf-8'});

				fstream.on('data', (chunk) => {
					process.stdout.write(`${chunk}\n`);
					resolve();
				});

				fstream.on('error', (error) => {
					process.stdout.write(`\n! Operation Failed: error occurred while reading the file.\n`);
					resolve();
				});

			} catch (error) {
				if (error.code === 'ENOENT') {
					process.stdout.write(`\n! Operation Failed: file not found.\n`);
				} else {
					process.stdout.write(`\n! Operation Failed.\n`);
				}
				resolve();
			}
		});
	}

	async createFile(file) {
		const pathToFile = path.join(this._store.currentDirectory, file);

		const fileExists = await checkFileExistence(pathToFile);

		if (fileExists) {
			process.stdout.write(`\n! Operation Failed. File already exists.\n`);
			return;
		}
 
		try {
			await writeFile(pathToFile, '');
			process.stdout.write(`${file} successfully created.\n`);
		} catch (error) {
			process.stdout.write(`\n! Operation Failed.\n`);
		}	
	}

	async renameFile(name, newName) {
		const pathToFile = path.join(this._store.currentDirectory, name);
		const pathToNewFile = path.join(this._store.currentDirectory, newName);

		const fileWithNameExists = await checkFileExistence(pathToFile);
		const fileWithNewNameExists = await checkFileExistence(pathToNewFile);

		if (!fileWithNameExists) {
			process.stdout.write(`\n! Operation Failed. File not found.\n`);
			return;
		}

		if (fileWithNewNameExists) {
			process.stdout.write(`\n! Operation Failed. File with this name already exists.\n`);
			return;
		}

		try {
			await rename(pathToFile, pathToNewFile);
			process.stdout.write(`${file} successfully renamed.\n`);
		} catch (error) {
			process.stdout.write(`\n! Operation Failed.\n`);
		}
	}

	async copyFile(file, dir='') {
		const pathToFile = path.join(this._store.currentDirectory, file);
		const pathToFileCopy = path.join(this._store.currentDirectory, dir, file);

		const fileWithNameExists = await checkFileExistence(pathToFile);

		if (!fileWithNameExists) {
			process.stdout.write(`\n! Operation Failed. File not found.\n`);
			return;
		}

		const handleReadError = async (error) => {
			frstream.destroy();
			fwstream.destroy();
			process.stdout.write(`\n! Operation Failed. Error reading file\n`);
		}

		const handleWriteError = async (error) => {
			frstream.destroy();
			fwstream.destroy();
			process.stdout.write(`\n! Operation Failed. Error writing file.\n`);
		}

		return new Promise((resolve, reject) => {
			try {
				const frstream = fs.createReadStream(pathToFile);
				const fwstream = fs.createWriteStream(pathToFileCopy);

				frstream
					.on('error', handleReadError)
					.pipe(fwstream)
					.on('error', handleWriteError)

				resolve();

			} catch (error) {
				process.stdout.write(`\n! Operation Failed. File not found.\n`);
				resolve();
			}
		});

	}

	async moveFile(file, dir) {
		try {
			await this.copyFile(file, dir);
			await this.removeFile(file);
		} catch (error) {
			process.stdout.write(`\n! Operation Failed.\n`);
		}
	}

	async removeFile(file) {
		const pathToFile = path.join(this._store.currentDirectory, file);

		try {
			await rm(pathToFile);
		} catch (error) {
			if (error.code === 'ENOENT') {
				process.stdout.write(`\n! Operation Failed: file not found\n`);
			} else {
				process.stdout.write(`\n! Operation Failed.\n`);
			}
		}
	}
}

