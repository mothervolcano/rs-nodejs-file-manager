const args = process.argv.slice(2);

const actions = []

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

	if (actionsDirectory.has(command)) {
		actionsDirectory.get(command)()
	}
}


const greet = function (username) {
	// console.log(`Hello ${username}`);
	process.stdout.setEncoding('utf-8');
	process.stdout.write(`Hello ${username}\n`);
}

const listDirectory = function() {
	console.log("Listing directory...");
}

const actionsDirectory = new Map([
   ['username', greet],
   ['ls', listDirectory],
   [],
])

parseArgs(args);
runActions();

process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input) => {
	runCommand(input);
});

