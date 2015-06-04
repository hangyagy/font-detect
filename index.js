var fonts = require('./fonts');

if ( process.argv.length < 3 ) {
	throw new Error('Missing parameter url!');
}

var url        = process.argv[2];
var testedFont = process.argv[3] || null;

fonts
	.getFonts(url, testedFont)
	.then(function(result) {
		console.log(JSON.stringify(result, null, 4));
	})
	.catch(function(err) {
		throw err;
	});

