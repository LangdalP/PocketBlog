var fs = require('fs');

/*
 * Filenames are mapped to shorter identifiers (keys).
 * The shorter identifiers are the ones used when readers
 * request a single article, e.g. 'domain.com/posts/my-article'.
 * 
 * The keys are mapped to the content of the article
 */
var index = {
    articleFilenames: {},
    articleKeys: {}
};

function filenameToIndexKey(fname) {
    var fnameParts = fname.split('_');
    var indexLongName = fnameParts[fnameParts.length -1];
    // Also trim the .md file extension
    indexName = indexLongName.substring(0, indexLongName.length - 3);
    return indexName;
}

function indexFile(path) {
    var pathParts = path.split("/");
    var fname = pathParts[pathParts.length - 1];
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        var indexName = filenameToIndexKey(fname);
        index.articleKeys[indexName] = data;
        index.articleFilenames[fname] = indexName;
    });
}

function removeIndexedFile(path) {
    var pathParts = path.split("/");
    var fname = pathParts[pathParts.length - 1];
    var indexName = filenameToIndexKey(indexName);
    delete index.articleKeys[indexName];
    delete index.articleFilenames[fname];
}

function tryFetchArticle(name, callback) {
    var data = index.articleKeys[name];
    if (data) {
        var lines = data.split(/\r?\n/);
        var headlineRaw = lines[0];
        var headline = headlineRaw.substring(2);
        callback({
            headline: headline,
            articleMarkdown: data
        });
    }
    else {
        callback(null);
    }
}

function tryFetchLatest(count, callback) {
    var keys = Object.keys(index.articleFilenames);
    if (count > keys.length) count = keys.length;
    var sortedKeys = keys.sort();
    var latestKeys = sortedKeys.slice(sortedKeys.length - count, sortedKeys.length);
    var articles = [];
    for (var i = 0; i < latestKeys.length; ++i) {
        var key = filenameToIndexKey(latestKeys[i]);
        var data = index.articleKeys[key];
        if (data) {
            var lines = data.split(/\r?\n/);
            var headlineRaw = lines[0];
            var headline = headlineRaw.substring(2);
            articles.push({
                headline: headline,
                articleMarkdown: data
            });
        }
        else {
            console.log("Error happened while fetching latest articles");
        }
    }
    callback(articles);
}

module.exports.tryFetchArticle = tryFetchArticle;
module.exports.indexFile = indexFile;
module.exports.removeIndexedFile = removeIndexedFile;
module.exports.tryFetchLatest = tryFetchLatest;

