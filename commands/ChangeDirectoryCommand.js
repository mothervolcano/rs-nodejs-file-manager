import { Command } from "../Command.js";


export class ChangeDirectoryCommand extends Command {
	_service;

	constructor(service) {
		super();
		this._service = service;
	}

	async execute(p) {
		if (!p) {
			process.stdout.write(`\n! Invalid input: please specify directory name or path\n\n`);
			return;
		}

		await this._service.changeDirectory(p[0]);
	}
}