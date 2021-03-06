.PHONY: build watch
BIN = node_modules/.bin

install:
	npm i

build:
	$(BIN)/browserify src.js -o build.js -t [ babelify --presets [ es2015 ] ]

serve:
	$(BIN)/http-server .

watch:
	$(BIN)/watchify src.js -o build.js -t [ babelify --presets [ es2015 ] ]
