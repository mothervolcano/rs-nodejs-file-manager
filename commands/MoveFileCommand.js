 import { Command } from "../Command.js";


 export class MoveFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {

 		if (!p || p.length < 2) {
 			console.error("! COMMAND ERROR: two parameters are required");
 		}

 		await this._service.moveFile(p[0], p[1])
 	}
 }