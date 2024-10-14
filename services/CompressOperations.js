import path from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

export class CompressOperations {
	_store;

	constructor(store) {
		this._store = store;
	}

	async compressFile(source, destination) {

		const pathToFile = path.join(this._store.currentDirectory, source);
		const pathToDestination = path.join(this._store.currentDirectory, destination);

		try {
			const frstream = createReadStream(pathToFile);
			const cTransform = createBrotliCompress();
			const fwstream = createWriteStream(pathToDestination);

			frstream
				.pipe(cTransform)
				.pipe(fwstream)


		} catch (error) {
			process.stdout.write(`\n! Operation Failed\n\n`);
		}
	}

	async decompressFile(source, destination) {

		const pathToFile = path.join(this._store.currentDirectory, source);
		const pathToDestination = path.join(this._store.currentDirectory, destination);

		//TODO: check if its a valid brotli compressed file

		try {
			const frstream = createReadStream(pathToFile);
			const dcTransform = createBrotliDecompress();
			const fwstream = createWriteStream(pathToDestination);

			frstream
				.pipe(dcTransform)
				.pipe(fwstream)

			process.stdout.write(`Successfully decompressed ${source}.\n`);

		} catch (error) {
			process.stdout.write(`\n! Operation Failed\n\n`);
		}
	}
}