var gulp = require('gulp');
var fs = require('fs-extra')

var imageContentSrcPath = require('./config.json')['imageSource']
var articleSrcPath = require('./config.json')['articleSource']
var imageContentDstPath = 'images/content';
var articleDstPath = 'content/articles';

gulp.task('clean-images', function () {
	// Delete images
	fs.remove(imageContentDstPath, function (err) {
		if (err) return console.error(err);
	});
});

gulp.task('clean-articles', function () {
	// Delete articles
	fs.remove(articleDstPath, function (err) {
		if (err) return console.error(err);
	});
});

gulp.task('clean', ['clean-images', 'clean-articles'], function () {
	// clean-images and clean-articles are called as dependencies
});

gulp.task('images', ['clean-images'], function () {
	// Can be customized
	fs.copy(imageContentSrcPath, imageContentDstPath, function (err) {
		if (err) return console.error(err);
	});
});

gulp.task('articles', ['clean-articles'], function () {
	// Can be customized
	fs.copy(articleSrcPath, articleDstPath, function (err) {
		if (err) return console.error(err);
	});
});

gulp.task('default', ['images', 'articles'], function () {
	console.log('Cleaning and fetching content');
});
