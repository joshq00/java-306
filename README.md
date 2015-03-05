# Java 306 homework
* ~~Week 1~~

### Required modules
* [browserify] - `npm install -g browserify`
* [watchify][] (dev) - `npm install -g watchify`

#### Dev
`$ watchify --transform babelify --debug --entry src/index.jsx --outfile build/index.js`

#### Build
`$ browserify -t babelify -e src/index.jsx -o build/index.js`

#### Minify
After `build/index.js` is created, it can be minified using [uglify-js]

`$ uglifyjs build/index.js -o build/index.min.js -m -c`

[browserify]: http://browserify.org/
[watchify]: https://github.com/substack/watchify
[uglify-js]: https://github.com/mishoo/UglifyJS2
