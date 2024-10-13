import { Command } from "../Command.js";


export class ChangeDirectoryCommand extends Command {
	_service;

	constructor(service) {
		super();
		this._service = service;
	}

	execute(dir) {
		this._service.changeDirectory(dir);
	}
}