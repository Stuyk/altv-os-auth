import * as fs from 'fs';
import path from 'path';

// Files
const responsePath = path.join(process.cwd(), 'resources/altv-os-auth/responses.json');
const configPath = path.join(process.cwd(), 'config.json');

if (!fs.existsSync(responsePath)) {
    throw new Error(`[altv-os-auth] Failed to read responses.json. Try re-installing with 'altv-pkg'`);
}

const responsesData = fs.readFileSync(responsePath);
let responses;

try {
    responses = JSON.parse(responsesData);
} catch (err) {
    throw err;
}

if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, '{}');
}

const configData = fs.readFileSync(configPath);
let config;

try {
    config = JSON.parse(configData);
} catch (err) {
    throw err;
}

config.db_url = responses[0]; // url
config.db_database = responses[1]; // database name

if (config.db_collections && config.db_collections.length >= 1) {
    if (!config.db_collections.includes('accounts')) {
        config.db_collections.push('accounts');
    }
} else {
    config.db_collections = ['accounts']; // Collection
}

if (responses[2] && responses[3]) {
    config.db_username = responses[2];
    config.db_password = responses[3];
}

fs.writeFileSync(configPath, JSON.stringify(config));
