var fonts = require('./fonts');

if ( process.argv.length < 3 ) {
	throw new Error('Missing parameter url!');
}

var url        = process.argv[2];
var testedFont = process.argv[3] || null;
var weight     = process.argv[4] || null;

fonts
	.getFonts(url, testedFont)
	.then(function(result) {
		if (weight) {
			for ( var i in result.occurrences ) {
				var occurrence = result.occurrences[i];
				var regexp = new RegExp('^' + weight);


				if ( occurrence.weight.toString().match(regexp) ) {
					console.log(JSON.stringify(occurrence, null, 4));
				}

			}
		} else {
			console.log(JSON.stringify(result, null, 4));
		}
	})
	.catch(function(err) {
		throw err;
	});

