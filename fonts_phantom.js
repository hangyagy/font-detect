var page   = require('webpage').create();
var system = require('system');

if ( system.args.length < 2 ) {
  console.log('Usage: ' + system.args[0] + ' url [font]');
  phantom.exit();
}

var url        = system.args[1];
var testedFont = system.args[2] || null;


/*page.onConsoleMessage = function (msg) {
  console.log(msg);
  };*/
page.onError = function(msg, trace) {

};

page.open(url, function (status) {
  if ( status !== 'success' ) {
    console.log('Unable to access network');
  } else {
    var fonts = page.evaluate(function() {
      var fonts = {};

      var weightToNumber = function(weight) {
        var weights = {
          normal: 400,
          bold: 600
        };

        var weightAsNumber = parseInt(weight);

        if ( !isNaN(weightAsNumber) && weightAsNumber == weight ) {
          return weightAsNumber;
        } else if ( typeof weight === 'string' && weights[weight]) {
          return weights[weight];
        }

        return weight;
      };

      var addElementFonts = function(element) {
        var fontFamily = window.getComputedStyle(element).fontFamily;
        var fontWeight = weightToNumber(window.getComputedStyle(element).fontWeight);
		var fontStyle  = window.getComputedStyle(element).fontStyle;

		if ( fontStyle && fontStyle === 'italic' ) {
			fontWeight += 'italic';
		}

        if ( fontFamily ) {
          var elementFonts = fontFamily.split(',').map(function(s) {
            return s.trim();
          });

          for ( var j in elementFonts ) {
            var fontName = elementFonts[j];

            if ( typeof fonts[elementFonts[j]] === 'undefined' ) {
              fonts[elementFonts[j]] = {
                occurrences: [],
                weights: [],
				styles: []
              };
            }

            fonts[elementFonts[j]].occurrences.push({
              class: element.className,
              id: element.id,
              tag: element.tagName,
              data: element.outerHTML
            });

            if ( fonts[elementFonts[j]].weights.indexOf(fontWeight) === -1 ) {
              fonts[elementFonts[j]].weights.push(fontWeight);
            }
          }
        }
      };

      var elements = document.body.getElementsByTagName("*");

      for ( var i=0; i<elements.length; i++ ) {
        var element = elements[i];

        addElementFonts(element);
      }

      return fonts;
    });

    var fontNames = [];

    for ( var name in fonts ) {
      fontNames.push({
        name: name,
        weights: fonts[name].weights
      });
    }

    if ( !testedFont ) {
      console.log(JSON.stringify(fontNames));
    } else {
      console.log(JSON.stringify(fonts[testedFont]));
    }
  }

  phantom.exit();
});
