import path from 'node:path';
import fs from 'fs/promises';

export class NwdOperations {
	_store;

	constructor(store) {
		this._store = store;
	}

	async listDirectory(dir) {
		try {
			const files = await fs.readdir(this._store.currentDirectory, { encoding: 'utf-8'});
			files.forEach( (file, i) => {
				process.stdout.write(`${i.toString()} - ${file}\n`);
			});
		} catch (error) {
		}
	}

	async changeDirectory(dir) {

		const pathToDir = path.join(this._store.currentDirectory, dir);

		try {
			await fs.opendir(pathToDir);
			this._store.currentDirectory = pathToDir;
		} catch (error) {
			if (error.code === 'ENOENT') {
				// handle error
			}
		}
	}

	async goToParentDirectory() {

		if (this._store.currentDirectory === this._store.homeDirectory ) {
			console.log(`You're at the root directory.`);
			return;
		}
		
		const pathToDir = path.dirname(this._store.currentDirectory);
		this._store.currentDirectory = pathToDir;
	}
}