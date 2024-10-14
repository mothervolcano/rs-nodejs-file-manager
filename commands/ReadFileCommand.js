import { Command } from "../Command.js";


export class ReadFileCommand extends Command {
	_service;
	
	constructor(service) {
		super();
		this._service = service;
	}

	async execute(p) {
		if (!p) {
			process.stdout.write(`\n! Invalid input: please specify a file to read\n\n`);
			return
		}

		await this._service.readFile(p[0]);
	}
}

