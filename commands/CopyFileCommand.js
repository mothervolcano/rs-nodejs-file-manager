 import { Command } from "../Command.js";



 export class CopyFileCommand extends Command {
 	_service;
 	
 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {
 		if (!p) {
 			console.error('COMMAND ERROR: at least one parameter required');
 			return;
 		}

 		await this._service.copyFile(p[0], p[1]);
 	}
 }