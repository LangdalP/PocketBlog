var gulp = require('gulp');
var fs = require('fs-extra')
var path = require('path');

var imageContentSrcPath = require('./config.json')['imageSource']
var articleSrcPath = require('./config.json')['articleSource']

var workingDir = process.cwd();
var imageContentDstPath = path.join(workingDir, 'images/content');
var articleDstPath = path.join(workingDir, 'content/articles');

gulp.task('images', function () {
	// Can be customized
	fs.ensureSymlink(imageContentSrcPath, imageContentDstPath, function (err) {
		if (err) return console.error(err)
	})
});

gulp.task('articles', function () {
	// Can be customized
	fs.ensureSymlink(articleSrcPath, articleDstPath, function (err) {
		if (err) return console.error(err)
	})
});

gulp.task('default', ['images', 'articles'], function () {
	console.log('Installing content links');
});
