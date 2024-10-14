import { Command } from "../Command.js";


export class ChangeDirectoryCommand extends Command {
	_service;

	constructor(service) {
		super();
		this._service = service;
	}

	async execute(p) {
		await this._service.changeDirectory(p[0]);
	}
}