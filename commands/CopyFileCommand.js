 import { Command } from "../Command.js";



 export class CopyFileCommand extends Command {
 	_service;
 	
 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {
 		if (!p) {
 			process.stdout.write(`\n! Invalid input: specify file to copy at least\n\n`);
 			return;
 		}

 		await this._service.copyFile(p[0], p[1]);
 	}
 }