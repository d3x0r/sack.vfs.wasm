
var JSOX = require( "../../.." ).JSOX

var stringify = JSOX.stringify;
var parse = JSOX.parse;


var o;
var r, r2, r3;

r = stringify( o = { op:"Storage" } );
console.log( "simple Test:", r );

r = stringify( o = { op:"Storage", data:[] } );
console.log( "simple Test:", r );


if( BigInt ) {
	r = stringify( o = { a: "simple object", b:3, c:new Date(), d:123n, e:null, f:undefined, g:NaN, h:Infinity, i:-Infinity, j:-0.302, k:new Uint8Array(8) }, null, 3 );
	console.log( "pretty:", o, "=\n", r );
	r = stringify( o = { a: "simple object", b:3, c:new Date(), d:123n, e:null, f:undefined, g:NaN, h:Infinity, i:-Infinity, j:-0.302, k:new Uint8Array(8) } );
	r2 = stringify( parse( r ) );
	if( r != r2 )
	console.log( "3:", r, r2 );

	r = stringify( [ "simple array", 3, new Date(), 123n, null, undefined, ,NaN, Infinity ] );
	r2 = stringify( parse( r ) );
	if( r != r2 )
	
	console.log( "4:", r, r2 );

}

console.log( "validity test..." );

r = stringify( o = { "true": "simple object", "false":3, "test extra":new Date(), "This+fails":0, "123":123, 124:123 } );
	//console.log( "will parse:", r );
	r2 = stringify( parse( r ) );
	if( r != r2 )
		console.log( "identTest:", r );


r = stringify( o = { a: "simple object", b:3, c:new Date() } );
	r2 = stringify( parse( r ) );
	if( r != r2 )
		console.log( "1:", r );

r = stringify( o = [ "simple array", 3, new Date() ] );
	r2 = stringify( parse( r ) );
	if( r != r2 )
		console.log( "2:", r );


console.log( "Success is no output above this." );