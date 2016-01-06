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
