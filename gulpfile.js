var gulp = require('gulp');
var fs = require('fs-extra')

var imageContentSrcPath = require('./config.json')['imageSource']
var articleSrcPath = require('./config.json')['articleSource']
var imageContentDstPath = 'images/content';
var articleDstPath = 'content/articles';

gulp.task('images', function () {
	// Can be customized
	fs.ensureLink(imageContentSrcPath, imageContentDstPath, function (err) {
		if (err) return console.error(err)
	})
});

gulp.task('articles', function () {
	// Can be customized
	fs.ensureLink(articleSrcPath, articleDstPath, function (err) {
		if (err) return console.error(err)
	})
});

gulp.task('default', ['images', 'articles'], function () {
	console.log('Installing content links');
});
