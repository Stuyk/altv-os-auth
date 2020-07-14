/// <reference types="@altv/types-client" />
import alt from 'alt-client';
import '/client/panel';

const url = `http://resource/client/html/auth/index.html`;
let view;

alt.log(`[OS] Authentication - Loaded`);
alt.onServer('auth:Open', showAuthPanel); // Call this event server-side to show Auth panel.
alt.onServer('auth:Exit', exitAuthPanel); // Call this event server-side to exit Auth panel.
alt.on('auth:Open', showAuthPanel); // Call this event client-side to show Auth panel.
alt.on('auth:Exit', exitAuthPanel); // Call this event server-side to show Auth panel.

/**
 * Displays the auth WebView.
 */
function showAuthPanel() {
    if (view && view.destroy) {
        view.destroy();
    }

    view = new alt.WebView(url);
    view.on('auth:Try', tryAuthPanel);
    view.on('auth:Ready', readyAuthPanel);
    showCursor(true);
}

/**
 * Closes the auth WebView
 */
function exitAuthPanel() {
    if (view && view.destroy) {
        view.destroy();
    }

    showCursor(false);
}

/**
 * Emits to the WebView after it initializes.
 */
function readyAuthPanel() {
    if (!view) {
        return;
    }

    view.emit('auth:Ready');
}

/**
 * Send WebView data up to the server from the panel.
 * @param  {} username
 * @param  {} password
 * @param  {} email=null
 */
function tryAuthPanel(username, password, email = null) {
    alt.emitServer('auth:Try', username, password, email);
}

/**
 * Set the cursor state safely across multiple instances.
 * @param  {} state
 */
function showCursor(state) {
    try {
        alt.showCursor(false);
    } catch (err) {}
}
