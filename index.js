// import path from 'node:path';
import os from 'node:os';
// import fs from 'fs/promises';

import { CommandManager } from './CommandManager.js';
import { NWDOperations } from './services/nwdOperations.js';
import { ListDirectoryCommand } from './commands/ListDirectoryCommand.js';
import { ChangeDirectoryCommand } from './commands/ChangeDirectoryCommand.js';

const __DIRNAME = import.meta.dirname;
const args = process.argv.slice(2);

const actions = []

const greet = function (username) {
	// console.log(`Hello ${username}`);
	process.stdout.setEncoding('utf-8');
	process.stdout.write('***************************************\n');
	process.stdout.write('\n')
	process.stdout.write(` Welcome to the File Manager, ${username}!\n`);
	process.stdout.write('\n\n\n')
	process.stdout.write('***************************************\n');
	process.stdout.write('\n')
	process.stdout.write('Current directory: \n')
	process.stdout.write(`${pathStore.currentDirectory}\n`)
	process.stdout.write('\n\n')
	process.stdout.write('Enter a command:\n')
	process.stdout.write('> ')

}

/** 
 * The store objects organizes the state of the app into logical groups
 * */
const pathStore = {
	lastDirectory: null,
	currentDirectory: os.homedir()
}

/** 
 * The services modules group operations that have something in common
 * and share the same store object
 * **/
const nwdOperations = new NWDOperations(pathStore);


/** 
 * This maps the string inputs to their commands allowing for flexibility in changing the
 * syntax of the application in a single place without having to update any code elsewhere.
 * */
const commandList = new Map([
   ['username', greet],
   ['ls', new ListDirectoryCommand(nwdOperations)],
   ['cd', new ChangeDirectoryCommand(nwdOperations)],
]);


/** 
 * Command Manager is responsible for selecting the correct command to run,
 * pass the parameters and execute the command. Eventually, in a more advanced
 * app would be responsible for queuing and keeping track of the requested commands
 * to enable, for example, undo functionality.
 * */
const commandManager = new CommandManager(commandList);

const parseArg = function (arg) {
	if (arg.startsWith("--") && arg.includes('=')) {
		const nameAndValue = arg.split('=');
		const action = 
		{ 
			name: nameAndValue[0].slice(2),
			value: nameAndValue[1]
		}
		return action;
	}
}

const parseArgs = function(args) {
	args.forEach( arg => {
		actions.push(parseArg(arg));
	});
}

const runActions = function() {
	actions.forEach( action => {
		if (commandList.has(action.name)) {
			commandList.get(action.name)(action.value);
		}
	});
}


parseArgs(args);
runActions();

process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input) => {
	if (input === '\n') {
		process.stdout.write('please type a valid command\n')
		process.stdout.write('> ')
	} else {
		const _input = input.trim().split(' ');
		const command = _input[0];
		const params = _input[1] || null;
		commandManager.executeCommand(command, params);
	}
});

