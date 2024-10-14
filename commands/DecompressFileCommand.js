 import { Command } from "../Command.js";


 export class DecompressFileCommand extends Command {
 	_services;
 	
 	constructor(services) {
 		super();
 		this._services = services;
 	}

 	async execute(p) {
 		if (!p || p.lenght < 2) {
 			process.stdout.write(`\n! Invalid input: please specify file to decompress\n\n`);
 			return;
 		}

 		await this._services.decompressFile(p[0], p[1]);
 	}
 }