// Add Your Discord Application Client ID 
// E.g. 4629051983726491053
const clientId = '';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

DiscordRPC.register(clientId);

let startTime = Date.now();

// Add Your Desired Project
// Provide the file extension as well i.e. .flp
// E.g. 'Clair De Lune by Claude Debussy.flp'
let filename = '';

function getElapsedTime() {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

async function setActivity() {
    if (!RPC) return;
    try {
        RPC.setActivity({
            details: `Editing ${filename}`,
            state: getElapsedTime(),
            largeImageKey: 'fl_studio',
            largeImageText: `Discord Icon.`,
            smallImageKey: 'fl_studio',
            smallImageText: 'Small Icon.',
            instance: false,
            buttons: [
                {
                    label: 'Request Sneak Peek',
                    // Add Suitable URL
                    // It is a required value.
                    // E.g. 'https://www.image-line.com/'
                    url: '',
                }
            ]
        });
    } catch (error) {
        console.error('Failed to set activity:', error);
    }
};

RPC.on('ready', async () => {
    setActivity();

    setInterval(() => {
        setActivity();
    }, 1000);
});

RPC.login({ clientId }).catch(err => console.error(err));
