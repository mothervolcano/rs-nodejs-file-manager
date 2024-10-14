 import { Command } from "../Command.js";


 export class RenameFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {
 		if (!p || p.length < 2) {
 			process.stdout.write(`\n! Invalid input: please specify file to rename and new name\n\n`);
 		}

 		const currFilename = p[0];
 		const newFilename = p[1];

 		await this._service.renameFile(currFilename, newFilename);
 	}
 }