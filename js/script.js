document.getElementById('no-js').remove();
document.documentElement.className = 'js';

/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */

/**
 * Usage: d = new Detector();
 *        d.detect('font name');
 */
var Detector = function() {
  // a font will be compared against all the three default fonts.
  // and if it doesn't match all 3 then that font is not available.
  var baseFonts = ['monospace', 'sans-serif', 'serif'];

  //we use m or w because these two characters take up the maximum width.
  // And we use a LLi so that the same matching fonts can get separated
  var testString = "mmmmmmmmmmlli";

  //we test using 72px font size, we may use any size. I guess larger the better.
  var testSize = '72px';

  var h = document.body;

  // create a SPAN in the document to get the width of the text we use to test
  var s = document.createElement("span");
  s.style.fontSize = testSize;
  s.innerHTML = testString;
  var defaultWidth = {};
  var defaultHeight = {};
  for (var index in baseFonts) {
    //get the default width for the three base fonts
    s.style.fontFamily = baseFonts[index];
    h.appendChild(s);
    defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
    defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
    h.removeChild(s);
  }

  function detect(font) {
    var detected = false;
    for (var index in baseFonts) {
      s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
      h.appendChild(s);
      var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
      h.removeChild(s);
      detected = detected || matched;
    }
    return detected;
  }

  this.detect = detect;
};

/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.
  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:
  var m = new MersenneTwister(123);
  and that will always produce the same random sequence.
  Sean McCullough (banksean@gmail.com)
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

   1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

   3. The names of its contributors may not be used to endorse or promote
    products derived from this software without specific prior written
    permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function(seed) {
  if (seed === undefined) {
  seed = new Date().getTime();
  }
  /* Period parameters */
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;   /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

  this.init_genrand(seed);
};

/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function(s) {
  this.mt[0] = s >>> 0;
  for (this.mti=1; this.mti<this.N; this.mti++) {
    s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
   this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
    /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
    /* In the previous versions, MSBs of the seed affect   */
    /* only MSBs of the array mt[].                        */
    /* 2002/01/09 modified by Makoto Matsumoto             */
    this.mt[this.mti] >>>= 0;
    /* for >32 bit machines */
  }
};

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
  var i, j, k;
  this.init_genrand(19650218);
  i=1; j=0;
  k = (this.N>key_length ? this.N : key_length);
  for (; k; k--) {
  var s1 = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
  this.mt[i] = (this.mt[i] ^ (((((s1 & 0xffff0000) >>> 16) * 1664525) << 16) + ((s1 & 0x0000ffff) * 1664525))) + init_key[j] + j; /* non linear */
  this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
  i++; j++;
  if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
  if (j>=key_length) j=0;
  }
  for (k=this.N-1; k; k--) {
  var s2 = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
  this.mt[i] = (this.mt[i] ^ (((((s2 & 0xffff0000) >>> 16) * 1566083941) << 16) + (s2 & 0x0000ffff) * 1566083941)) - i; /* non linear */
  this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
  i++;
  if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
  }

  this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
};

/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function() {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) { /* generate N words at one time */
  var kk;

  if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
    this.init_genrand(5489); /* a default initial seed is used */

  for (kk=0;kk<this.N-this.M;kk++) {
    y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
    this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
  }
  for (;kk<this.N-1;kk++) {
    y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
    this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
  }
  y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
  this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

  this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);

  return y >>> 0;
};

/* generates a random number on [0,0x7fffffff]-interval */
MersenneTwister.prototype.genrand_int31 = function() {
  return (this.genrand_int32()>>>1);
};

/* generates a random number on [0,1]-real-interval */
MersenneTwister.prototype.genrand_real1 = function() {
  return this.genrand_int32()*(1.0/4294967295.0);
  /* divided by 2^32-1 */
};

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
  return this.genrand_int32()*(1.0/4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on (0,1)-real-interval */
MersenneTwister.prototype.genrand_real3 = function() {
  return (this.genrand_int32() + 0.5)*(1.0/4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on [0,1) with 53-bit resolution*/
MersenneTwister.prototype.genrand_res53 = function() {
  var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6;
  return(a*67108864.0+b)*(1.0/9007199254740992.0);
} ;

/* These real versions are due to Isaku Wada, 2002/01/09 added */

var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
  callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

// Return an array of the selected opion values
// select is an HTML select element
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
  opt = options[i];

  if (opt.selected) {
    result.push(opt.value || opt.text);
  }
  }
  return result;
}

function randomPercentage(threshold){
  var n = Math.floor(m.random() * 100);
  return (n < threshold);
}

function pickArrayMember(array) {
  return array[Math.floor(m.random() * array.length)];
}

function setOutputProperty(property, value, defaultValue) {
  if (!value) {
    value = defaultValue;
  }

  document.getElementById('textOutput').style[property] = value;
}

function applyFonts() {
  var elements = document.getElementById('textOutput').querySelectorAll('.letter');

  forEach(elements, function (index, value) {
    value.style.fontFamily = '"' + pickArrayMember(settings.fonts) + '"';
  });
}

function applyColors() {
  var elements = document.getElementById('textOutput').querySelectorAll('.letter');

  forEach(elements, function (index, value) {
    var color = randomPercentage(20) ? pickArrayMember(whites) : pickArrayMember(colors);

    value.style.backgroundColor = color.background;
    value.style.color = color.color;

    if (color.background === '#fff') {
      value.style.border = '1px #ccc solid';
    }
  });
}

function applySizes() {
  var elements = document.getElementById('textOutput').querySelectorAll('.letter');

  forEach(elements, function (index, value) {
    var size = (((m.random() * 75 - 37.5) / 100) * settings.size) + settings.size;
    value.style.fontSize = size + 'px';
  });
}

function applyTilts() {
  var elements = document.getElementById('textOutput').querySelectorAll('.letter');

  forEach(elements, function (index, value) {
    value.style.transform = 'rotate(' + (m.random() * 15 - 7.5) + 'deg)';
  });
}

function applySpaces() {
  var elements = document.getElementById('textOutput').querySelectorAll('.space');

  forEach(elements, function (index, value) {
    value.innerHTML = pickArrayMember(spaces);
  });
}

function applyCases() {
  var elements = document.getElementById('textOutput').querySelectorAll('.letter');

  forEach(elements, function (index, value) {
    if (randomPercentage(20)) {
      value.style.textTransform = 'uppercase';
    } else {
      value.style.textTransform = 'lowercase';
    }
  });
}

function applyStyles() {
  var elements = document.getElementById('textOutput').querySelectorAll('.letter');

  forEach(elements, function (index, value) {
    if (randomPercentage(30)) {
      value.style.fontStyle = 'italic';
    } else {
      value.style.fontStyle = 'normal';
    }
  });
}

function applyWeights() {
  var elements = document.getElementById('textOutput').querySelectorAll('.letter');

  forEach(elements, function (index, value) {
    value.style.fontWeight = (Math.floor(m.random() * 9)) * 100;
  });
}

function formatText() {
  var formattedText = '<div class="word">';
  var letterGroup = false;

  for (var i = 0; i < settings.text.length; i++) {
    var code = settings.text.charCodeAt(i);
    var char = settings.text.charAt(i);


    if (code === 13 && settings.text.charCodeAt(i + 1) === 10) {
      continue;
    } else if (code === 13 || code === 10) {
      if (letterGroup) {
        letterGroup = false;
        formattedText += '</div>';
      }

      formattedText += '</div><br><div class="word">';
    } else if (char === ' ') {
      if (letterGroup) {
        letterGroup = false;
        formattedText += '</div>';
      }

      formattedText += '<div class="space">&nbsp;</div></div><div class="word">';
    } else {
      if (!letterGroup) {
        formattedText += '<div class="letter">';
      }

      formattedText += char;

      if (settings.grouped && randomPercentage(30)) {
        letterGroup = true;
      } else {
        letterGroup = false;
        formattedText += '</div>';
      }
    }
  }

  formattedText += '</div>';

  document.getElementById('textOutput').innerHTML = formattedText;

  if (settings.spaced) {
    applySpaces();
  }

  if (settings.cased) {
    applyCases();
  }

  if (settings.tilted) {
    applyTilts();
  }

  if (settings.colored) {
    applyColors();
  }

  if (settings.fonts) {
    applyFonts();
  }

  if (settings.sized) {
    applySizes();
  }

  if (settings.styled) {
    applyStyles();
  }

  if (settings.weighted) {
    applyWeights();
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var hash = function(s) {
  var a = 1, c = 0, h, o;
  if (s) {
    a = 0;
    for (h = s.length - 1; h >= 0; h--) {
      o = s.charCodeAt(h);
      a = (a<<6&268435455) + o + (o<<14);
      c = a & 266338304;
      a = c!==0?a^c>>21:a;
    }
  }
  return String(a);
};

function saveImage() {
  domtoimage.toBlob(document.getElementById('textOutput'))
    .then(function (blob) {
    var fr = new FileReader();

    fr.addEventListener('loadend', function(e) {
      window.saveAs(blob, 'rw_' + hash(e.target.result) + '.png');
    });

    fr.readAsText(blob);
  });
}

function selectAllFonts(fontsInput) {
  var change = new Event('change');

  for (var i = 0; i < fontsInput.options.length; i++) {
    fontsInput.options[i].selected = true;
  }

  fontsInput.dispatchEvent(change);
}

function invertFonts(fontsInput) {
  var change = new Event('change');

  for (var i = 0; i < fontsInput.options.length; i++) {
    fontsInput.options[i].selected = !fontsInput.options[i].selected;
  }

  fontsInput.dispatchEvent(change);
}

function selectAllOptions(checkboxes) {
  var change = new Event('change');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
    checkboxes[i].dispatchEvent(change);
  }
}

function invertOptions(checkboxes) {
  var change = new Event('change');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = !checkboxes[i].checked;
    checkboxes[i].dispatchEvent(change);
  }
}

var qd = {};
if (location.search) location.search.substr(1).split("&").forEach(function(item) {var s = item.split("="), k = s[0], v = s[1] && decodeURIComponent(s[1]); (qd[k] = qd[k] || []).push(v);});

var d = new Detector();

var whites = [
  {color: '#0074d9', background: '#fff'},
  {color: '#001f3f', background: '#fff'},
  {color: '#3d9970', background: '#fff'},
  {color: '#ff4136', background: '#fff'},
  {color: '#85144b', background: '#fff'},
  {color: '#b10dc9', background: '#fff'},
  {color: '#f012be', background: '#fff'},
  {color: '#111', background: '#fff'}
];

var colors = [
  {color: '#7fdbff', background: '#111'},
  {color: '#0074d9', background: '#111'},
  {color: '#01ff70', background: '#111'},
  {color: '#39cccc', background: '#111'},
  {color: '#3d9970', background: '#111'},
  {color: '#2ecc40', background: '#111'},
  {color: '#ff4136', background: '#111'},
  {color: '#ff851b', background: '#111'},
  {color: '#b10dc9', background: '#111'},
  {color: '#ffdc06', background: '#111'},
  {color: '#f012be', background: '#111'},
  {color: '#aaa', background: '#111'},
  {color: '#fff', background: '#111'},
  {color: '#ddd', background: '#111'},
  {color: '#0074d9', background: '#ddd'},
  {color: '#001f3f', background: '#ddd'},
  {color: '#85144b', background: '#ddd'},
  {color: '#fff', background: '#ddd'},
  {color: '#111', background: '#ddd'},
  {color: '#001f3f', background: '#aaa'},
  {color: '#85144b', background: '#aaa'},
  {color: '#111', background: '#aaa'},
  {color: '#001f3f', background: '#f012be'},
  {color: '#fff', background: '#f012be'},
  {color: '#111', background: '#f012be'},
  {color: '#b10dc9', background: '#ffdc00'},
  {color: '#85144b', background: '#ffdc00'},
  {color: '#001f3f', background: '#ffdc00'},
  {color: '#0074d9', background: '#ffdc00'},
  {color: '#111', background: '#ffdc00'},
  {color: '#01ff70', background: '#b10dc9'},
  {color: '#ddd', background: '#b10dc9'},
  {color: '#111', background: '#b10dc9'},
  {color: '#fff', background: '#b10dc9'},
  {color: '#ffdc00', background: '#b10dc9'},
  {color: '#85144b', background: '#ff851b'},
  {color: '#001f3f', background: '#ff851b'},
  {color: '#111', background: '#ff851b'},
  {color: '#01ff70', background: '#85144b'},
  {color: '#7fdbff', background: '#85144b'},
  {color: '#2ecc40', background: '#85144b'},
  {color: '#ff851b', background: '#85144b'},
  {color: '#ffdc00', background: '#85144b'},
  {color: '#aaa', background: '#85144b'},
  {color: '#fff', background: '#85144b'},
  {color: '#ddd', background: '#85144b'},
  {color: '#001f3f', background: '#ff4136'},
  {color: '#fff', background: '#ff4136'},
  {color: '#111', background: '#ff4136'},
  {color: '#001f3f', background: '#7fdbff'},
  {color: '#85144b', background: '#7fdbff'},
  {color: '#f012be', background: '#7fdbff'},
  {color: '#111', background: '#7fdbff'},
  {color: '#01ff70', background: '#0074d9'},
  {color: '#001f3f', background: '#0074d9'},
  {color: '#ffdc00', background: '#0074d9'},
  {color: '#fff', background: '#0074d9'},
  {color: '#111', background: '#0074d9'},
  {color: '#ddd', background: '#0074d9'},
  {color: '#0074d9', background: '#001f3f'},
  {color: '#7fdbff', background: '#001f3f'},
  {color: '#3d9970', background: '#001f3f'},
  {color: '#2ecc40', background: '#001f3f'},
  {color: '#01ff70', background: '#001f3f'},
  {color: '#ff4136', background: '#001f3f'},
  {color: '#ff851b', background: '#001f3f'},
  {color: '#ffdc00', background: '#001f3f'},
  {color: '#f012be', background: '#001f3f'},
  {color: '#aaa', background: '#001f3f'},
  {color: '#ddd', background: '#001f3f'},
  {color: '#fff', background: '#001f3f'},
  {color: '#001f3f', background: '#39cccc'},
  {color: '#85144b', background: '#39cccc'},
  {color: '#111', background: '#39cccc'},
  {color: '#0074d9', background: '#01ff70'},
  {color: '#001f3f', background: '#01ff70'},
  {color: '#85144b', background: '#01ff70'},
  {color: '#f012be', background: '#01ff70'},
  {color: '#111', background: '#01ff70'},
  {color: '#001f3f', background: '#3d9970'},
  {color: '#fff', background: '#3d9970'},
  {color: '#111', background: '#3d9970'},
  {color: '#001f3f', background: '#2ecc40'},
  {color: '#111', background: '#2ecc40'},
  {color: '#85144b', background: '#2ecc40'}
];

var testFonts = [
  'Arial',
  'Arial Black',
  'Arial Narrow',
  'Arial Rounded MT Bold',
  'Bauhaus 93',
  'Bookman Old Style',
  'Bradly Hand ITC',
  'Bradley Hand ITC',
  'Century',
  'Century Gothic',
  'Comic Sans MS',
  'Courier New',
  'Dejavu Sans',
  'Frutiger',
  'Frutiger Linotype',
  'Georgia',
  'Gentium',
  'Helvetica Neue',
  'Impact',
  'Jokerman',
  'King',
  'Lucida Console',
  'Lalit',
  'Magneto',
  'Modena',
  'Monotype Corsiva',
  'Roboto',
  'Papyrus',
  'Segoe UI',
  'Stencil',
  'Tahoma',
  'TeX',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
  'Verona'
];

var spaces = [
  '&nbsp;',
  '&ensp;',
  '&emsp;',
  '&#8196;',
  '&#8197;',
  '&#8198;',
  '&#8200;'
];

var settings = {
  'cased': (qd.cased && qd.cased[0] !== undefined) ? true : false,
  'tilted': (qd.tilted && qd.tilted[0] !== undefined) ? true : false,
  'spaced': (qd.spaced && qd.spaced[0] !== undefined) ? true : false,
  'fonts': (qd.fonts && qd.fonts[0] !== undefined) ? qd.fonts : false,
  'colored': (qd.colored && qd.colored[0] !== undefined) ? true : false,
  'sized': (qd.sized && qd.sized[0] !== undefined) ? qd.sized[0] : false,
  'grouped': (qd.grouped && qd.grouped[0] !== undefined) ? qd.grouped[0] : false,
  'styled': (qd.styled && qd.styled[0] !== undefined) ? qd.styled[0] : false,
  'weighted': (qd.weighted && qd.weighted[0] !== undefined) ? qd.weighted[0] : false,
  'seed': (qd.seed && qd.seed[0] !== undefined) ? qd.seed[0] : undefined,
  'text': (qd.text && qd.text[0] !== undefined) ? qd.text[0] : undefined,
  'size': (qd.size && qd.size[0] !== undefined) ? qd.size[0] : 50,
  'width': (qd.width && qd.width[0] !== undefined) ? qd.width[0] : 'auto',
  'align': (qd.align && qd.align[0] !== undefined) ? qd.align[0] : 'left'
};

var m = new MersenneTwister(settings.seed);

if (settings.text) {
  settings.text = settings.text.replace(/\+/g, ' ');
} else {
  settings.text = "We have your magazines,\nsend money or we'll cut out more letters";
}

document.getElementById('textInput').innerHTML = settings.text;

if (settings.fonts) {
  settings.fonts = settings.fonts.map(Number);
}

var fontsInput = document.getElementById('fontsInput');
var checkboxes = document.getElementById('settingsOptions').querySelectorAll('input[type=checkbox]');

var fontsHTML = '';

for (var i = 0; i < testFonts.length; i++) {
  if (d.detect(testFonts[i])) {
    fontsHTML += '<option value="' + i + '" style="font-family: \'' + testFonts[i] + '\';"' +
    (settings.fonts && settings.fonts.indexOf(i) !== -1 ? ' selected' : '') + '>' + testFonts[i] + '</option>';
  }
}

fontsInput.insertAdjacentHTML('afterbegin', fontsHTML);

document.getElementById('textOutput').style.textAlign = settings.align;

if (isNumber(settings.width)) {
  document.getElementById('textOutput').style.width = settings.width + 'px';
} else if (settings.width === 'auto') {
  document.getElementById('textOutput').style.width = settings.width;
}

if (settings.size && isNumber(settings.size)) {
  document.getElementById('textOutput').style.fontSize = settings.size + 'px';
}

formatText();

document.getElementById('coloredInput').checked = settings.colored;
document.getElementById('tiltedInput').checked = settings.tilted;
document.getElementById('casedInput').checked = settings.cased;
document.getElementById('spacedInput').checked = settings.spaced;
document.getElementById('sizedInput').checked = settings.sized;
document.getElementById('groupedInput').checked = settings.sized;
document.getElementById('styledInput').checked = settings.styled;
document.getElementById('weightedInput').value = settings.weighted;
document.getElementById('alignInput').value = settings.align;
document.getElementById('widthInput').value = settings.width;
document.getElementById('sizeInput').value = settings.size;

document.getElementById('widthInput').addEventListener('change', function() {
  var value = (this.value) ? this.value : 'auto';

  if (parseInt(value, 10)) {
    value = parseInt(value, 10);
    document.getElementById('textOutput').style.width = value + 'px';
    settings.width = value;
  } else if (value === 'auto') {
    document.getElementById('textOutput').style.width = value;
    settings.width = 'auto';
  }
});

document.getElementById('sizeInput').addEventListener('change', function() {
  var value = (this.value) ? this.value : 50;

  if (parseInt(value, 10)) {
    value = parseInt(value, 10);
    document.getElementById('textOutput').style.fontSize = value + 'px';
    settings.size = value;
    applySizes();
  }
});

document.getElementById('textInput').addEventListener('change', function() {
  settings.text = this.value;
  formatText();
});

document.getElementById('coloredInput').addEventListener('change', function() {
  if (this.checked) {
    settings.colored = true;
    applyColors();
  } else {
    settings.colored = false;
    var elements = document.getElementById('textOutput').querySelectorAll('.letter');

    forEach(elements, function(index, value) {
      value.style.backgroundColor = null;
      value.style.color = null;
      value.style.border = null;
    });
  }
});

document.getElementById('sizedInput').addEventListener('change', function() {
  if (this.checked) {
    settings.sized = true;
    applySizes();
  } else {
    settings.sized = false;

    var elements = document.getElementById('textOutput').querySelectorAll('.letter');

    forEach(elements, function(index, value) {
      value.style.fontSize = null;
    });
  }
});

document.getElementById('groupedInput').addEventListener('change', function() {
  if (this.checked) {
    settings.grouped = true;
  } else {
    settings.grouped = false;
  }

  formatText();
});

document.getElementById('tiltedInput').addEventListener('change', function() {
  if (this.checked) {
    settings.tilted = true;
    applyTilts();
  } else {
    settings.tilted = false;
    var elements = document.getElementById('textOutput').querySelectorAll('.letter');

    forEach(elements, function(index, value) {
      value.style.transform = null;
    });
  }
});

document.getElementById('casedInput').addEventListener('change', function() {
  if (this.checked) {
    settings.cased = true;
    applyCases();
  } else {
    settings.cased = false;
    var elements = document.getElementById('textOutput').querySelectorAll('.letter');

    forEach(elements, function(index, value) {
      value.style.textTransform = null;
    });
  }
});

document.getElementById('spacedInput').addEventListener('change', function() {
  if (this.checked) {
    settings.spaced = true;
    applySpaces();
  } else {
    settings.spaced = false;
    var elements = document.getElementById('textOutput').querySelectorAll('.space');

    forEach(elements, function(index, value) {
      value.innerHTML = '&nbsp;';
    });
  }
});

document.getElementById('styledInput').addEventListener('change', function() {
  if (this.checked) {
    settings.styled = true;
    applyStyles();
  } else {
    settings.styled = false;
    var elements = document.getElementById('textOutput').querySelectorAll('.letter');

    forEach(elements, function(index, value) {
      value.style.fontStyle = null;
    });
  }
});

document.getElementById('weightedInput').addEventListener('change', function() {
  if (this.checked) {
    settings.weighted = true;
    applyWeights();
  } else {
    settings.weighted = false;
    var elements = document.getElementById('textOutput').querySelectorAll('.letter');

    forEach(elements, function(index, value) {
      value.style.fontWeight = null;
    });
  }
});

document.getElementById('alignInput').addEventListener('change', function() {
  document.getElementById('textOutput').style.textAlign = this.value;
});

document.getElementById('fontsInput').addEventListener('change', function() {
  fontIndexes = getSelectValues(this);

  if (fontIndexes[0]) {
    settings.fonts = fontIndexes.map(function(index) {
      return testFonts[Number(index)];
    });

    applyFonts();
  } else {
    var elements = document.getElementById('textOutput').querySelectorAll('.letter');

    forEach(elements, function(index, value) {
      value.style.fontFamily = null;
    });
  }
});

document.getElementById('saveImage').addEventListener('click', function() {
  saveImage();
});

document.getElementById('selectAllFonts').addEventListener('click', function() {
  selectAllFonts(fontsInput);
});

document.getElementById('invertFonts').addEventListener('click', function() {
  invertFonts(fontsInput);
});

document.getElementById('selectAllOptions').addEventListener('click', function() {
  selectAllOptions(checkboxes);
});

document.getElementById('invertOptions').addEventListener('click', function() {
  invertOptions(checkboxes);
});

document.getElementById('reloadText').addEventListener('click', function() {
  formatText();
});
