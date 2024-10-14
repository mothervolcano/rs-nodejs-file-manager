import path from 'node:path';
import fs from 'fs/promises';

export class NwdOperations {
	_store;

	constructor(store) {
		this._store = store;
	}

	async listDirectory(dir) {
		try {
			const dirents = await fs.readdir(this._store.currentDirectory, { withFileTypes: true });
			dirents.forEach( (dirent, i) => {
				if (dirent.isDirectory()) {
					process.stdout.write(`[${i.toString()}] ${dirent.name} (directory)\n`);
				} else if (dirent.isFile()) {
					process.stdout.write(`[${i.toString()}] ${dirent.name} (file)\n`);
				}
			});
		} catch (error) {
			process.stdout.write(`! Operation Failed.`);
		}
	}

	async changeDirectory(dir) {
		const pathToDir = path.join(this._store.currentDirectory, dir);

		try {
			await fs.opendir(pathToDir);
			this._store.currentDirectory = pathToDir;
		} catch (error) {
			if (error.code === 'ENOENT') {
				process.stdout.write(`\n! Operation Failed: directory not found.\n`);
			} else {
				process.stdout.write(`\n! Operation Failed.\n`);
			}
		}
	}

	async goToParentDirectory() {
		if (this._store.currentDirectory === this._store.homeDirectory ) {
			process.stdout.write(`\nThis is the root directory.\n`);
			return;
		}
		
		const pathToDir = path.dirname(this._store.currentDirectory);
		this._store.currentDirectory = pathToDir;
	}
}