babel=node_modules/.bin/babel
stylus=node_modules/.bin/stylus

all: clean js css


clean:
	rm -rf out
	mkdir out

js:
	$(babel) src -d out

css:
	$(stylus) src/app.styl -o out

dist:
	mkdir dist
	cp -r out dist/out
	cp -r bower_components dist/bower_components
	cp manifest.json dist/manifest.json
	cp LICENSE dist/LICENSE
	cp README.md dist/README.md
	zip -r dist.zip dist
