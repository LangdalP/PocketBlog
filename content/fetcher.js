var fs = require('fs'); // For file operations
var marked = require('marked'); // For markdown-parsing

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

// TODO: Use path module for greater portability
function indexFile(path) {
    var pathParts = path.split("/");
    var fname = pathParts[pathParts.length - 1];
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        var indexName = filenameToIndexKey(fname);
        var lines = data.split(/\r?\n/);
        var headlineRaw = lines[0];
        /*
        Note: Here it is assumed that each file starts with '# Headline'
        TODO: Make more robust, e.g. handle cases where the headline is
        not on the first line, or where the space after the hash is omitted
        */
        var headline = headlineRaw.substring(2);
        var markup = marked(data);
        index.articleKeys[indexName] = {headline: headline, markup: markup};
        index.articleFilenames[fname] = indexName;
    });
}

function removeIndexedFile(path) {
    var pathParts = path.split("/");
    var fname = pathParts[pathParts.length - 1];
    var indexName = filenameToIndexKey(fname);
    delete index.articleKeys[indexName];
    delete index.articleFilenames[fname];
}

function tryFetchArticle(name, callback) {
    var data = index.articleKeys[name];
    callback(data);
}

function tryFetchLatest(count, callback) {
    var keys = Object.keys(index.articleFilenames);
    if (count > keys.length) count = keys.length;
    var sortedKeys = keys.sort();
    var latestKeys = sortedKeys.slice(sortedKeys.length - count, sortedKeys.length);
    var articles = [];
    for (var i = latestKeys.length - 1; i >= 0; i--) {
        var key = filenameToIndexKey(latestKeys[i]);
        var data = index.articleKeys[key];
        if (data) {
            articles.push(data);
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

