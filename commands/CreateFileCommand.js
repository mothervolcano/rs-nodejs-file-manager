 import { Command } from "../Command.js";


 export class CreateFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {

 		if (!p) {
			process.stdout.write(`\n! Invalid input: please specify the name of the file to create\n\n`);
			return
		}

 		await this._service.createFile(p[0]);
 	}
 }