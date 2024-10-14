 import { Command } from "../Command.js";


 export class CompressFileCommand extends Command {
 	_services;
 	
 	constructor(services) {
 		super();
 		this._services = services;
 	}

 	async execute(p) {
 		if (!p || p.lenght < 2) {
 			process.stdout.write(`\n! Invalid input: source and destination file is required\n\n`);
 			return;
 		}

 		await this._services.compressFile(p[0], p[1]);
 	}
 }