 import { Command } from "../Command.js";


 export class MoveFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {

 		if (!p || p.length < 2) {
 			process.stdout.write(`\n! Invalid input: please specify directory name or path\n\n`);
 		}

 		await this._service.moveFile(p[0], p[1])
 	}
 }