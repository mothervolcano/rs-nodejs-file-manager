import { Command } from "../Command.js";


export class ReadFileCommand extends Command {
	_service;
	
	constructor(service) {
		super();
		this._service = service;
	}

	async execute(p) {
		await this._service.readFile(p[0]);
	}
}

