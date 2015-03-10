#!/bin/bash
cmd=${1:help};
args="-t babelify -e src/index.jsx -o build/index.js --extension=.jsx --extension=.js"

function clean () {
	rm -f build/*.js*;
}

case "$cmd" in
	init )
		if [ -z "$(command -v npm)" ]; then
			echo 'You do not have npm installed.';
			echo 'Please visit https://nodejs.org/';
			exit 1;
		fi

		[ -x "$(command -v uglifyjs)" ] || npm install -g uglify-js;
		[ -x "$(command -v browserify)" ] || npm install -g browserify;
		[ -x "$(command -v watchify)" ] || npm install -g watchify;
		npm install;
		;;
	watch )
		clean;
		# watch, debug, fast (large file)
		watchify ${args} -d -v --fast;
		# watchify --transform babelify --debug --entry src/index.jsx --outfile build/index.js --fast --extension=.jsx --extension=.js
		;;
	build )
		clean;
		# regular compile (medium file - comments)
		browserify -d ${args};
		uglifyjs build/index.js -m -c > build/index.min.js;
		;;

	help|*)
		echo "usage: `basename $0` {watch|build|init|help}";
		exit;
		;;
esac
