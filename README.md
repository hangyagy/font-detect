# font-detect
Detect website fonts with phantomjs

## Install dependencies

```
$ npm install
```

## Run

```
# Get all fonts
$ node_modules/.bin/phantomjs index.js http://127.0.0.1/

# Get a font's occurrencies for debugging
$ node_modules/.bin/phantomjs index.js http://127.0.0.1/ "Open Sans"
```
