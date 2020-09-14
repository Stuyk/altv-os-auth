/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import chalk from 'chalk';
import * as sm from 'simplymongo';
import * as fs from 'fs';
import path from 'path';

let config;

try {
    const currentPath = process.cwd();
    const data = fs.readFileSync(path.join(currentPath, 'config.json'));
    config = JSON.parse(data);
} catch (err) {
    alt.log(`[alvv-os-auth] Missing 'config.json' in main directory. Read the readme.`);
    alt.log(`[altv-os-auth] Run 'altv-pkg i stuyk/altv-os-auth' to generate a config.`);
    process.exit(1);
}

sm.onReady(handleDatabaseReady);

async function handleDatabaseReady() {
    import('./auth');
    console.log(chalk.greenBright('[OS] Authentication - Started'));
}

new sm.Database(config.url, config.database, config.collections, config.username, config.password);
