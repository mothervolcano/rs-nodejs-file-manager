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

		try {
			const fstream = fs.createReadStream(pathToFile, { encoding: 'utf-8'});

			fstream.on('data', (chunk) => {
				process.stdout.write(`${chunk}\n`);
			});

			fstream.on('error', (error) => {
				console.error("!ERROR: failed to read file", error);
			});
		} catch (error) {
			console.log("!UNEXPECTED ERRRO");
		}
	}

	async createFile(file) {
		const pathToFile = path.join(this._store.currentDirectory, file);

		const fileExists = await checkFileExistence(pathToFile);

		if (fileExists) {
			console.error('ERROR: File already exists!');
			return;
		}
 
		try {
			await writeFile(pathToFile, '');
			process.stdout.write(`${file} successfully created.\n`);
		} catch (error) {
			console.log('!ERROR: failed to create new file.', error);
		}	
	}

	async renameFile(name, newName) {
		const pathToFile = path.join(this._store.currentDirectory, name);
		const pathToNewFile = path.join(this._store.currentDirectory, newName);

		const fileWithNameExists = await checkFileExistence(pathToFile);
		const fileWithNewNameExists = await checkFileExistence(pathToNewFile);

		if (!fileWithNameExists) {
			console.error('ERROR: No such file.');
			return;
		}

		if (fileWithNewNameExists) {
			console.error('ERROR: File with this name alreayd exists.');
			return;
		}

		try {
			await rename(pathToFile, pathToNewFile);
			process.stdout.write(`${file} successfully renamed.\n`);
		} catch (error) {
			console.error('! ERROR renaming file: ', error);
		}
	}

	async copyFile(file, dir='') {
		const pathToFile = path.join(this._store.currentDirectory, file);
		const pathToFileCopy = path.join(this._store.currentDirectory, dir, file);

		const fileWithNameExists = await checkFileExistence(pathToFile);

		if (!fileWithNameExists) {
			console.error('ERROR: No such file.');
			return;
		}

		const handleReadError = async (error) => {
			console.error('! READ ERROR: ', error);
			frstream.destroy();
			fwstream.destroy();
		}

		const handleWriteError = async (error) => {
			console.error('! WRITE ERROR: ', error);
			frstream.destroy();
			fwstream.destroy();
		}

		try {
			const frstream = fs.createReadStream(pathToFile);
			const fwstream = fs.createWriteStream(pathToFileCopy);

			frstream
				.on('error', handleReadError)
				.pipe(fwstream)
				.on('error', handleWriteError)

		} catch (error) {
			console.error('!UNCAUGHT ERROR: ', error);
		}
	}

	async moveFile(file, dir) {
		try {
			await this.copyFile(file, dir);
			await this.removeFile(file);
		} catch (error) {
			console.error('! UNCAUGHT ERROR: ', error);
		}
	}

	async removeFile(file) {
		const pathToFile = path.join(this._store.currentDirectory, file);

		try {
			await rm(pathToFile);
		} catch (error) {
			if (error.code === 'ENOENT') {
				console.error('! ERROR: no such file exists');
			} else {
				console.error('! UNCAUGHT ERROR');
			}
		}
	}
}

