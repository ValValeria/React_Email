const { src, dest } = require('gulp');
const babel = require('gulp-babel');

exports.default = function() {
  return src(['server/**/*.js','!node_modules/**'])
    .pipe(babel())
    .pipe(dest('output/'));
}