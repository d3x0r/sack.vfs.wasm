
const sack = require( "../.." );
const vol = sack.Volume();
var n;
console.log( Object.keys( sack.id ) );
console.log( Object.getPrototypeOf( sack.id ) );
for( n = 0; n < 1000; n++ ) {
	vol.write( ''+sack.id(), "DATA" );
}
