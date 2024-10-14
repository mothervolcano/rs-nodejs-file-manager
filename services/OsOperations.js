import os from 'os';


function printMessage(text) {
	process.stdout.write(`${text}\n`);
}

export class OsOperations {
	_store;

	constructor(store) {
		this._store = store;
	}

	getEOL() {
		const ans = os.EOL;
		printMessage(`EOL is: ${ans}`)
	}

	getCPUs() {
		const ans = os.cpus();
		printMessage(`EOL is: ${ans}`)
	}

	getHomeDir() {
		const ans = os.homedir();
		this._store.homeDirectory = ans;
		printMessage(`Home Directory: ${ans}`)
	}

	getSystemUsername() {
		const ans = os.hostname();
		printMessage(`System username: ${ans}`)
	}

	getArchitecture() {
		const ans = os.arch();
		printMessage(`The CPU architecture: ${ans}`)
	}

}


