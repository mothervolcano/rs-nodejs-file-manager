import path from 'path';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';


export class CryptoOperations {
	_store;
	
	constructor(store) {
		this._store = store;
	}


	async getHashFor(file) {
		
		const pathToFile = path.join(this._store.currentDirectory, file);

		return new Promise((resolve, reject) => {
			try {
				const hash = createHash('sha256');
				const fstream = createReadStream(pathToFile);

				const handleReadError = () => {
					process.stdout.write(`\n! Operation Failed\n\n`);
					hash.destroy();	
					fstream.destroy();
					resolve();
				}

				const handleHashError = () => {
					process.stdout.write(`\n! Operation Failed\n\n`);
					hash.destroy();	
					fstream.destroy();
					resolve();
				}

				fstream
					.on('error', handleReadError)
					.pipe(hash)
					.setEncoding('hex')
					.on('error', handleHashError)

				hash.on('readable', async () =>{
					const fileHash = await hash.read();
					if (fileHash) {
						process.stdout.write(`Hash for ${file}: ${fileHash}\n`);
						resolve();
					}
				});

			} catch (error) {
				process.stdout.write(`\n! Operation Failed\n\n`);
				resolve();
			}
		});
	}
}