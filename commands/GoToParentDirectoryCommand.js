import { Command } from "../Command.js";



export class GoToParentDirectoryCommand extends Command {
	_service;

	constructor(service) {
		super();
		this._service = service;
	}

	execute() {
		this._service.goToParentDirectory();
	}
}