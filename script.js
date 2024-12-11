const commands = {
    'help': () => `
Available Commands:
- about : Learn about BEAR-OS
- contact : Get contact information
- projects : View current projects
- time : View current time
- calc : Perform a basic calculation
- roll : Roll a die/dice with any amount of sides
- flip : Flip a coin
- cipher : Cipher an input text
- base64 : encode/decode to/from base64
- clear : Clear the terminal screen
- exit : Return to login screen
    `,
    'about': () => `
BEAR-OS v0.6 (Vapor)
BlackBear's Emergency, Assistance and Rescue Operating System
Created with caffeine and hallucinations
Developed by BlackBear28
    `,
    'contact': () => `
Contact Information:
Email: blackbear284@proton.me
Discord: @b28.
    `,
    'projects': () => `
Current BEAR-OS Projects:
1. Bear-OS
2. Bear-AI
3. CK-JLK3
4. LDS2
    `,
    'ck-jlk3': () => `
This is not a real thing, don't get too exited
    `,
    'bear-os': () => `
Basic Emergency, Assistance and Rescue Operating System
BlackBear28's personalised operating system
Created with caffeine and hallucinations
Developed by BlackBear28
    `,
    'lds2': () => `
Loannis Dating Simulator 2
Probably the weirdest dating simulator to ever exist
    `,
    'bear-ai': () => `
BEAR-AI
Not yet in development, an AI for BlackBear28's personal use
    `,
    'calc': (input) => {
const expression = input.replace(/pi/g, Math.PI).replace(/e/g, Math.E);
return eval(expression);
},
    'time': () => {
const now = new Date();
const timeString = now.toLocaleTimeString();
const dateString = now.toLocaleDateString();
return `Current Time: ${timeString}\nCurrent Date: ${dateString}`;
},
    'roll': (input) => {
const sides = parseInt(input) || 6; // Default to 6-sided die
if (sides <= 1) return "Number of sides must be greater than 1.";
return `You rolled a ${Math.floor(Math.random() * sides) + 1} (1-${sides})`;
},
    'flip': () => {
return Math.random() < 0.5 ? "Heads" : "Tails";
},
    'cipher': (input) => {
const [shift, ...textArr] = input.split(' ');
const text = textArr.join(' ');
const shiftValue = parseInt(shift, 10);
if (isNaN(shiftValue) || !text) return "Usage: cipher shift text";
return text.replace(/[a-zA-Z]/g, char => {
const offset = char.toLowerCase() === char ? 97 : 65;
return String.fromCharCode(((char.charCodeAt(0) - offset + shiftValue) % 26) + offset);
});
},
    'base64': (input) => {
const [action, ...textArr] = input.split(' ');
const text = textArr.join(' ');
if (!action || !text) return "Usage: base64 encode/decode text";
return action === 'encode'
? `Encoded: ${btoa(text)}`
: action === 'decode'
? `Decoded: ${atob(text)}`
: "Invalid option. Use 'encode' or 'decode'.";
},
    'exit': () => {
        document.getElementById('terminal').style.display = 'none';
        document.getElementById('login-container').style.display = 'flex';
        return 'Logging out... Goodbye!';
    }
};

function login() {
    const password = document.getElementById('password').value;
    if (password === 'beartech2024') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('loading-screen').style.display = 'flex';

        // More dynamic loading simulation
        const loadingDetails = document.querySelectorAll('.loading-details');
        loadingDetails[0].textContent = 'Growling up the engines...';
        
        setTimeout(() => {
            loadingDetails[1].textContent = 'Clawing through the files...';
        }, 500);

        setTimeout(() => {
            loadingDetails[0].textContent = 'Gathering honey...';
            loadingDetails[1].textContent = 'Roaring to life...';
        }, 1000);

        // Final transition
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('terminal').style.display = 'block';
            document.getElementById('command-line').focus();
        }, 2000);
    } else {
        alert('Incorrect Login');
    }
}

document.getElementById('command-line').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    const commandLine = this.value.trim();
    const [command, ...args] = commandLine.split(' '); // Split command and arguments
    const output = document.getElementById('output');
    const commandFunc = commands[command.toLowerCase()];

    if (commandFunc) {
        try {
            output.innerHTML += `> ${commandLine}\n${commandFunc(args.join(' '))}\n\n`;
        } catch (err) {
            output.innerHTML += `> ${commandLine}\nError: ${err.message}\n\n`;
        }
    } else if (command === 'clear') {
        output.innerHTML = ''; // Clear the terminal output
    } else {
        output.innerHTML += `> ${commandLine}\nCommand not found. Type 'help' for available commands.\n\n`;
    }

    this.value = '';
    output.scrollTop = output.scrollHeight; // Scroll to the bottom
}
});
