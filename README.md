# font-detect
Detect website fonts with phantomjs

## Install dependencies

```
$ npm install
```

## Run

```
# Get all fonts
$ node index.js http://127.0.0.1/

# Get a font's occurrencies for debugging
$ node index.js http://127.0.0.1/ "Open Sans"

$ node index.js http://127.0.0.1/ "Open Sans" 300italic

```
