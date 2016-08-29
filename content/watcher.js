var chokidar = require('chokidar'); // For watching files and directories

var articlesPath = 'content/articles';

// Start listening, and report changes to the articles object passed in
function start(articles) {
    // Watch articles folder
    var watcher = chokidar.watch(articlesPath, {
        persistent: true
    });

    // Use watcher to add new articles to index, and remove deleted articles
    watcher
        .on('add', path => {
            console.log(`File ${path} has been added`);
            articles.indexFile(path);
        })
        .on('change', path => {
            console.log(`File ${path} has been changed`);
            articles.indexFile(path);
        })
        .on('unlink', path => {
            console.log(`File ${path} has been removed`);
            articles.removeIndexedFile(path);
        });
}

module.exports.start = start;
