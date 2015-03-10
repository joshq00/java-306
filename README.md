# Java 306 homework
* ~~Week 1~~


## Initial setup

**Required modules**
 * [browserify]
 * [uglify-js]
 * [watchify][] (dev)

```bash
./app init
```
or
```bash
# install browserify and watchify
npm install -g browserify uglify-js watchify;
# install dependencies from package.json
npm install;
```


## Build
* Create `build/index.js`
* Create minified `build/index.min.js` using [uglify-js]

```bash
./app build
```

## Develop
We use [watchify] to automagically build our code as files change.

After modifying a file, switch to the browser and refresh; the updates will be available immediately

```bash
./app watch
```

[browserify]: http://browserify.org/
[watchify]: https://github.com/substack/watchify
[uglify-js]: https://github.com/mishoo/UglifyJS2
