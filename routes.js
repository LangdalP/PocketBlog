var marked = require('marked'); // For markdown-parsing

var articles = require('./content/fetcher.js'); // Helper for fetching article if it exists

function registerRoutes(app, auth) {
    
    app.get('/', function (req, res) {
        articles.tryFetchLatest(2, function (posts) {
            if (posts) {
                res.render('manyArticles', {
                    pageTitle: 'Code Climbing',
                    articles: posts
                });
            }
            else {
                res.status(500).Send("Error");
            }
        });
    });

    app.get('/posts/:article', function (req, res) {
        var articleName = req.params.article;
        articles.tryFetchArticle(articleName, function(articleData) {
            if (articleData) {
                res.render('article', {
                    pageTitle: articleData.headline,
                    markup: articleData.markup
                });
            }
            else {
                res.status(404).render('404', {
                    pageTitle: '404 Not Found'
                });
            }
        });
    });

    app.get('/posts/:article/edit', auth, function (req, res) {
        var articleName = req.params.article;
        articles.tryFetchArticle(articleName, function(articleData) {
            if (articleData) {
                res.render('article', {
                    pageTitle: articleData.headline,
                    articleMarkup: articleData.markup
                });
            }
            else {
                res.status(404).render('404', {
                    pageTitle: '404 Not Found'
                });
            }
        });
    });
}

module.exports.registerRoutes = registerRoutes;
