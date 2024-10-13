import path from 'node:path';
import os from 'node:os';
import fs from 'fs/promises';

const __DIRNAME = import.meta.dirname;
const args = process.argv.slice(2);

const actions = []

let currDir = os.homedir();

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
		if (actionsDirectory.has(action.name)) {
			actionsDirectory.get(action.name)(action.value);
		}
	});
}

const runCommand = function(input) {
	const _input = input.trim().split(' ');
	const command = _input[0];
	const params = _input[1] || null;

	if (actionsDirectory.has(command)) {
		actionsDirectory.get(command)(params)
	}
}


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
	process.stdout.write(`${currDir}\n`)
	process.stdout.write('\n\n')
	process.stdout.write('Enter a command:\n')
	process.stdout.write('> ')

}

const listDirectory = async function() {
	try {
		const files = await fs.readdir(currDir);
		files.forEach( (file, i) => {
			process.stdout.write(`[${i}] ${file}\n`)
			// console.log(`[${i}] ${file}`);
		});

	} catch (error) {

	}
}

const changeDirectory = async function(dir) {
	if (!dir) {
		// handle input error 
	}

	try {
		const pathToDir = `${currDir}/${dir}`
		await fs.opendir(pathToDir);
		currDir = pathToDir;
	} catch (error) {
		if (error.code === 'ENOENT') {
			// handle error
		}
	}
}

const actionsDirectory = new Map([
   ['username', greet],
   ['ls', listDirectory],
   ['cd', changeDirectory],
])

parseArgs(args);
runActions();

process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input) => {
	if (input === '\n') {
		process.stdout.write('please type a valid command\n')
		process.stdout.write('> ')
	} else {
		runCommand(input);
	}
});

