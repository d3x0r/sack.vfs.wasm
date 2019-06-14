"use strict";

if( typeof window !== "undefined" ) 
	window.Require = Require;
if( typeof global !== "undefined" )
	global.Require = Require;


var sack;
try{
    sack = require( "./sack.vfs.wasm.js" );
    console.log( "Got:", sack )
} catch(err1) {
    console.log( err1 );
}


function Require( path, cb ) {
	
	var module = require( path );
	if( module === sack ) {
		module.onRuntimeInitialized = ()=>{
			module._initFS();
			const sack = module.SACK;
		
			if( window )
				window.SACK = sack;
			//JSOXwasm._initJSOX();
			cb( module );
			//console.log( "Did I get a module?", sack );
			//var v = sack.Volume();
			//var v = sack.Volume( "mount", "./file.dat" );
			//var f = v.File( "./Test.dat" );
			//f.close();
		}
	}else{
		cb( module );
	}
}

function Loader(cb) {
	Require( "./sack.vfs.wasm.js", cb );
}

module.exports=exports=Loader;

