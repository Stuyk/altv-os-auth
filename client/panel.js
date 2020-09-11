/// <reference types="@altv/types-client" />
import alt from 'alt-client';
import '/client/panel';

const url = `http://resource/client/html/auth/index.html`;
let view;

alt.log(`[OS] Authentication - Loaded`);
alt.onServer('auth:Open', showAuthPanel); // Call this event server-side to show Auth panel.
alt.onServer('auth:Exit', exitAuthPanel); // Call this event server-side to exit Auth panel.
alt.onServer('auth:Error', errorAuthPanel); // Called when an error is present server-side.
alt.on('auth:Open', showAuthPanel); // Call this event client-side to show Auth panel.
alt.on('auth:Exit', exitAuthPanel); // Call this event server-side to show Auth panel.

function showAuthPanel() {
    if (view && view.destroy) {
        view.destroy();
    }

    view = new alt.WebView(url);
    view.on('auth:Try', tryAuthPanel);
    view.on('auth:Ready', readyAuthPanel);

    showCursor(true);
    alt.toggleGameControls(false);

    view.focus();
}

function exitAuthPanel() {
    if (view && view.destroy) {
        view.destroy();
    }

    showCursor(false);
    alt.toggleGameControls(true);
}

function errorAuthPanel(msg) {
    if (!view) {
        return;
    }

    view.emit('auth:Error', msg);
}

function readyAuthPanel() {
    if (!view) {
        return;
    }

    view.emit('auth:Ready');
}

function tryAuthPanel(username, password, email = null) {
    alt.emitServer('auth:Try', username, password, email);
}

function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) {}
}
