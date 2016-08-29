var gulp = require('gulp');
var fs = require('fs-extra')

var imageContentDestinationPath = 'images/content';
var articleDestinationPath = 'content/articles';

gulp.task('clean-images', function() {
	// Delete images
	fs.removeSync(imageContentDestinationPath );
});

gulp.task('clean-articles', function() {
	// Delete articles
	fs.removeSync(articleDestinationPath );
});

gulp.task('clean', ['clean-images', 'clean-articles'], function() {
	// Do nothing
});

gulp.task('images', ['clean'], function() {
	// Must be customized.
	// Example: Copy from a folder, or download from ftp.
});

gulp.task('articles', ['clean'], function() {
	// Must be customized.
	// Example: Copy from a folder, or download from ftp.
});

gulp.task('default', function() {
	console.log('Cleaning and fetching content');
});
