'use strict';

var closureDepth = require( './rules/closuredepth.js' );

module.exports = {
    rules: {
        "closuredepth": closureDepth
    },
	rulesConfig: {
        "closuredepth": 1
    }
};

