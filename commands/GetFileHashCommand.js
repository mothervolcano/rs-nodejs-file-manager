import { Command } from "../Command.js";


export class GetFileHashCommand extends Command {
	_service;

	constructor(service) {
		super();
		this._service = service;
	}

	async execute(p) {

		if (!p) {
			console.log('! COMMAND ERROR: at least one parameter required');
			return;
		}

		await this._service.getHashFor(p[0]);
	}
}