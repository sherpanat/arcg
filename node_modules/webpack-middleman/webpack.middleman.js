/*
 * Based on webpack-dev-server/client
 * webpack-middleman
 * Reload page when middleman triggers reload on watching source files
 *
 * --
 */

var url = require('url');
var ws = (window.WebSocket || window.MozWebSocket);
var stripAnsi = require('strip-ansi');
var urlParts;

if (typeof __resourceQuery === "string" && __resourceQuery) {
    // If this bundle is inlined, use the resource query to get the correct url.
    urlParts = url.parse(__resourceQuery.substr(1));
} else {
    // Else, get the url from the <script> this file was called with.
    var scriptElements = document.getElementsByTagName("script");
    var scriptHost = scriptElements[scriptElements.length-1].getAttribute("src");
    scriptHost = scriptHost && scriptHost.replace(/\/[^\/]+$/, "");
    urlParts = url.parse((scriptHost ? scriptHost : "/"), false, true);
}

var sock = null;
var initial = true;

var onSocketMsg = {
    invalid: function() {
        console.log("[WDS] Middleman App updated. Recompiling...");
    },
    "still-ok": function() {
        console.log("[WDS] Middleman Nothing changed.")
    },
    ok: function() {
        if(initial) {
            console.log("[WDS] Middleman connected.")
            return initial = false;
        }

        reloadApp();
    },
};

var newConnection = function() {
    sock = new ws(url.format({
        protocol: (window.location.protocol === "https:") ? window.location.protocol : urlParts.protocol,
        auth: urlParts.auth,
        hostname: (urlParts.hostname === '0.0.0.0') ? window.location.hostname : urlParts.hostname,
        port: (urlParts.port === '0') ? window.location.port : urlParts.port,
        pathname: urlParts.path == null || urlParts.path === '/' ? "/" : urlParts.path
    }));

    sock.onclose = function() {
        console.error("[WDS] Middleman Disconnected!");

        // Try to reconnect.
        sock = null;
        setTimeout(function () {
            newConnection();
        }, 2000);
    };

    sock.onmessage = function(e) {
        // This assumes that all data sent via the websocket is JSON.
        var msg = JSON.parse(e.data);
        onSocketMsg[msg.type](msg.data);
    };
};

newConnection();

function reloadApp() {
    console.log("[WDS] Middleman updated. Reloading...");
    window.location.reload();
}
