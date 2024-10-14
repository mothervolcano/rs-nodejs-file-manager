 import { Command } from "../Command.js";


 export class RenameFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {
 		console.log("args: ", p)

 		if (!p || p.length < 2) {
 			console.error('!ERROR: two parameters required');
 		}

 		const currFilename = p[0];
 		const newFilename = p[1];

 		await this._service.renameFile(currFilename, newFilename);
 	}
 }