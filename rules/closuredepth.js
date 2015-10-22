'use strict';


module.exports = function(context) {
	var depth = 0;
	var limit = context.options[0] && context.options[0].limit;
	if ( !isFinite( limit ) ) {
		limit = 2;
	}
	return {
		"FunctionDeclaration": function(node) {
			depth++;
        },
		"FunctionDeclaration:exit": function(node) {
			if ( depth > limit ) {
				context.report(node, 'closure depth exceeded limit of ' + limit);
			}
			depth--;
		}
    };
};

module.exports.schema = [
	{
		"type": "object",
		"properties": {
			"limit": {
				"type": "number"
			}
		},
		"additionalProperties": false
	}
];
