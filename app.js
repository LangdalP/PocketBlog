var express = require('express');
var marked = require('marked'); // For markdown-parsing
var exphbs  = require('express-handlebars'); // View engine

var articles = require('./articles/fetcher.js'); // Helper for fetching article if it exists
var admins = require('./admins.json'); // List of admin users

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {pageTitle: 'Good page title'});
});

app.get('/posts/:article', function (req, res) {
    var articleName = req.params.article;
	articles.tryFetchArticle(articleName, function(articleData) {
        if (articleData) {
            // TODO: Something with templating and styling
            res.send(marked(articleData));
        } else {
            res.status(404).send("Couldn't find article");
        }
	});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

