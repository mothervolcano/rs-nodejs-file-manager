

export class CommandManager {
	_directory;

	constructor(directory) {
		this._directory = directory;
	}

	executeCommand(command, params) {
		if (this._directory.has(command)) {
			this._directory.get(command).execute(params);
		}
	}
}