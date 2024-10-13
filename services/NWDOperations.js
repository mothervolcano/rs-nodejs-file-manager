import path from 'node:path';
import fs from 'fs/promises';

export class NWDOperations {
	_store;

	constructor(store) {
		this._store = store;
	}

	async listDirectory(dir) {
		try {
			const files = await fs.readdir(this._store.currentDirectory);
			files.forEach( (file, i) => {
				process.stdout.write(`[${i}] ${file}\n`)
				// console.log(`[${i}] ${file}`);
			});
		} catch (error) {
		}
	}

	async changeDirectory(dir) {
		if (!dir) {
			// handle input error 
		}

		try {
			const pathToDir = path.join(this._store.currentDirectory, dir);
			await fs.opendir(pathToDir);
			this._store.currentDirectory = pathToDir;
		} catch (error) {
			if (error.code === 'ENOENT') {
				// handle error
			}
		}
	}
}