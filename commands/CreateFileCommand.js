 import { Command } from "../Command.js";


 export class CreateFileCommand extends Command {
 	_service;

 	constructor(service) {
 		super();
 		this._service = service;
 	}

 	async execute(p) {
 		await this._service.createFile(p[0]);
 	}
 }