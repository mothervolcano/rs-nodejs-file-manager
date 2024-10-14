import os from 'node:os';

import { CommandManager } from './CommandManager.js';
import { NwdOperations } from './services/NwdOperations.js';
import { OsOperations } from './services/OsOperations.js';
import { CryptoOperations } from './services/CryptoOperations.js';
import { FileOperations } from './services/FileOperations.js';
import { ListDirectoryCommand } from './commands/ListDirectoryCommand.js';
import { ChangeDirectoryCommand } from './commands/ChangeDirectoryCommand.js';
import { ReadFileCommand } from './commands/ReadFileCommand.js';
import { CreateFileCommand } from './commands/CreateFileCommand.js';
import { RenameFileCommand } from './commands/RenameFileCommand.js';
import { CopyFileCommand } from './commands/CopyFileCommand.js';
import { MoveFileCommand } from './commands/MoveFileCommand.js';
import { RemoveFileCommand } from './commands/RemoveFileCommand.js';
import { OsCommand } from './commands/OsCommand.js';
import { GetFileHashCommand } from './commands/GetFileHashCommand.js';
import { GoToParentDirectoryCommand } from './commands/GoToParentDirectoryCommand.js';
import { CompressOperations } from './services/CompressOperations.js';
import { CompressFileCommand } from './commands/CompressFileCommand.js';
import { DecompressFileCommand } from './commands/DecompressFileCommand.js';


/** 
 * The store objects organizes the state of the app into logical groups
 * */
const settingsStore = {
	username: null,
}

const pathStore = {
	homeDirectory: os.homedir(),
	lastDirectory: null,
	currentDirectory: os.homedir(),
}

const osStore = {
	homeDirectory: null,
}


const greet = function (username) {
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

	settingsStore.username = username;
}


/** 
 * The services modules group operations that have something in common
 * and share the same store object
 * **/
const nwdOperations = new NwdOperations(pathStore);
const fileOperations = new FileOperations(pathStore);
const osOperations = new OsOperations(osStore);
const cryptoOperations = new CryptoOperations(pathStore);
const compressOperations = new CompressOperations(pathStore);

/** 
 * This maps the string inputs to their commands allowing for flexibility in changing the
 * syntax of the application in a single place without having to update any code elsewhere.
 * */
const commandList = new Map([
   ['username', greet],
   ['ls', new ListDirectoryCommand(nwdOperations)],
   ['cd', new ChangeDirectoryCommand(nwdOperations)],
   ['up', new GoToParentDirectoryCommand(nwdOperations)],
   ['cat', new ReadFileCommand(fileOperations)],
   ['add', new CreateFileCommand(fileOperations)],
   ['rn', new RenameFileCommand(fileOperations)],
   ['cp', new CopyFileCommand(fileOperations)],
   ['mv', new MoveFileCommand(fileOperations)],
   ['rm', new RemoveFileCommand(fileOperations)],
   ['os', new OsCommand(osOperations)],
   ['hash', new GetFileHashCommand(cryptoOperations)],
   ['compress', new CompressFileCommand(compressOperations)],
   ['decompress', new DecompressFileCommand(compressOperations)],
]);


/** 
 * Command Manager is responsible for selecting the correct command to run,
 * pass the parameters and execute the command. Eventually, in a more advanced
 * app would be responsible for queuing and keeping track of the requested commands
 * to enable, for example, undo functionality.
 * */
const commandManager = new CommandManager(commandList);


// ----------------------------------------------------------
// HANDLE INIT PARAMETERS

const args = process.argv.slice(2);
const initActions = []

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
		initActions.push(parseArg(arg));
	});
}

const runActions = function() {
	initActions.forEach( action => {
		if (commandList.has(action.name)) {
			commandList.get(action.name)(action.value);
		}
	});
}


parseArgs(args);
runActions();


// ----------------------------------------------------------
// HANDLE USER INPUT

process.stdin.setEncoding('utf-8');
process.stdin.on('data', async (input) => {
	if (input === '\n') {
		// do nothing
		process.stdout.write('> ');
	} else {
		const _input = input.trim().split(' ');
		const command = _input[0];
		const params = _input[1] ? _input.slice(1) : null;

		await commandManager.executeCommand(command, params);

		process.stdout.write(`\nYou\'re currently in ${pathStore.currentDirectory}\n`);
		process.stdout.write('\nType a valid command\n');
		process.stdout.write('> ');
	}
});

process.on('SIGINT', async () => {
  process.exit(0);
});

process.on('exit', () => {
  process.stdout.write(`\nThank you for using File Manager, ${settingsStore.username}, goodbye!\n`);
});



