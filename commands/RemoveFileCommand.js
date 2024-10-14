 import { Command } from "../Command.js";


 export class RemoveFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {

 		if (!p) {
 			console.error('! COMMAND ERROR: missing file name');
 		}

 		await this._service.removeFile(p[0]);
 	}
 }