import { Command } from "../Command.js";


export class OsCommand extends Command {
	_service;

	constructor(service) {
		super();
		this._service = service;
	}

	async execute(p) {
		if (!p) {
			console.error('COMMAND ERROR: parameter required');
			return;
		}

		let cmd;
		if (p[0].startsWith('--')) {
			cmd = p[0].slice(2);
		} else {
			console.error('COMMAND ERROR: invalid parameter');
			return;
		}

		switch (cmd) {
			case 'EOL':
				await this._service.getEOL();
				break;
			case 'cpus':
				await this._service.getCPUs();
				break;
			case 'homedir':
				await this._service.getHomeDir();
				break;
			case 'username':
				await this._service.getSystemUsername();
				break;
			case 'architecture':
				await this._service.getArchitecture();
				break;
		}	
	}
}

