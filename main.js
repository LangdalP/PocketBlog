var express = require('express');
var exphbs  = require('express-handlebars'); // View engine
var basicAuth = require('basic-auth'); // Authentication
var marked = require('marked'); // For markdown-parsing
var highlightjs = require('highlight.js');

var watcher = require('./articles/watcher.js'); // Helper for listening on changes to articles
var articles = require('./articles/fetcher.js'); // Helper for fetching article if it exists
var admins = require('./admins.json'); // List of admin users
var routes = require('./routes.js');

var app = express();

// Start listening for added/changed/deleted articles
watcher.start(articles);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Authentication middleware
var auth = function (req, res, next) {
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.status(401).send("Authentication needed");
        return;
    }
    if (user.name === 'admin' && user.pass === 'password') {
        next();
    }

    else {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.status(401).send("Authentication needed");
        return;
    }
}

// Synchronous highlighting with highlight.js
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && highlightjs.getLanguage(lang)) {
            return highlightjs.highlight(lang, code).value;
        } else {
            return highlightjs.highlightAuto(code).value;
        }
  }
});

// Static content
app.use('/images', express.static('images'));
app.use('/styles', express.static('styles'));

routes.registerRoutes(app, auth);

app.listen(3000, function () {
    console.log('Running PocketBlog on port 3000!');
});

module.exports = app;