var fs = require('fs');

function tryFetchArticle(name, callback) {
	var fname = 'articles/' + name + '.md';
	fs.stat(fname, function(err, stat) {
		if(err == null) {
			fs.readFile(fname, 'utf8', function(err, data) {
				if (err) throw err;
				callback(data);
			});
		} else if(err.code == 'ENOENT') {
			console.log('File ' + fname + ' does not exist!');
			callback(null);
		} else {
			console.log('Some error happened while fetching article: ', err.code);
			callback(null);
		}
	});
}

module.exports.tryFetchArticle = tryFetchArticle;

