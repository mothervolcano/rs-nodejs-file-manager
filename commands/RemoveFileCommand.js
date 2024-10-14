 import { Command } from "../Command.js";


 export class RemoveFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {

 		if (!p) {
 			process.stdout.write(`\n! Invalid input: please specify file to delete\n\n`);
 		}

 		await this._service.removeFile(p[0]);
 	}
 }