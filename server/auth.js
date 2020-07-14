/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import { MSGS } from './messages';
import { fetchDatabaseInstance } from 'simplymongo';

alt.onClient('auth:Try', handleAuthAttempt);

/**
 * Route the method the player is using to login.
 * Register or Login.
 * @param  {alt.Player} player
 * @param  {String} username
 * @param  {String} password
 * @param  {String | null} email
 */
async function handleAuthAttempt(player, username, password, email) {
    if (!username || !password) {
        alt.emitClient(player, 'auth:Error', MSGS.UNDEFINED);
    }

    if (email) {
        handleRegistration(player, email, username, password);
        return;
    }

    handleLogin(player, username, password);
}

/**
 * Handle the registration of a player.
 * @param {alt.Player} player
 * @param  {String} email
 * @param  {String} username
 * @param  {String} password
 */
async function handleRegistration(player, email, username, password) {
    //
}

/**
 * Handle the login of a player.
 * @param  {alt.Player} player
 * @param  {String} username
 * @param  {String} password
 */
async function handleLogin(player, username, password) {
    //
}
