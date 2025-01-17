import { Command } from "../Command.js";


export class ListDirectoryCommand extends Command {
	_service;

	constructor(service) {
		super();
		this._service = service;
	}

	async execute(p) {
		await this._service.listDirectory(p);
	}
}