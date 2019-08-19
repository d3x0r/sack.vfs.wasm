
if( "undefined" !== typeof process ) {
var path = (process.argv.length > 2)?process.argv[2]:".";
var mask = (process.argv.length > 3)?process.argv[3]:"*";
} else
{
var path = ".";
var mask = "*";
}

require( ".." ).then( (vfs) =>{

var native = vfs.Volume();

var dir;
if( mask )
	dir = native.dir( path, mask );
else
	dir = native.dir( path );
console.log( "Directory:", dir );

});