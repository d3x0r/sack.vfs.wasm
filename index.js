"use strict";

if( typeof window !== "undefined" ) 
	window.Require = Require;
if( typeof global !== "undefined" )
	global.Require = Require;


var sackVfsModule;
try{
    sackVfsModule = require( "./sack.vfs.wasm.dbg.js" );
    //console.log( "Got:", sackVfsModule )
} catch(err1) {
    try {
        console.log( err1 );
        sackVfsModule = require( "./sack.vfs.wasm.js" );
        //console.log( "Got:", sackVfsModule );
    } catch(err2) {
        console.log( err2 );
    }
}


function Require( path, cb ) {
	
	var module;
        if( typeof path === "string" )
	        module = require( path );
        else
	        module = path;
	if( module === sackVfsModule ) {
		module.onRuntimeInitialized = ()=>{
			module._initFS();
			const sack = module.SACK;
			if( typeof window !== "undefined" )
				window.SACK = sack;
			setImmediate( ()=>cb( sack ) );
		}
	}else{
		console.log( "Other Require (???)", path, cb );
		setImmediate( ()=>cb( module ) );
	}
}

function Loader(cb) {
	Require( sackVfsModule, cb );
}

module.exports=exports=Loader;

