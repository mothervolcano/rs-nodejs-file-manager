

export class CommandManager {
	_directory;

	constructor(directory) {
		this._directory = directory;
	}

	async executeCommand(command, params) {
		if (this._directory.has(command)) {

			const paramsToSend = params ? params : null;

			await this._directory.get(command).execute(paramsToSend);
		} else {
			process.stdout.write(`\n ! Invalid input: command not recognized.\n`);
			return;
		}
	}
}