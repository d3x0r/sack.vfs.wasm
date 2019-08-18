"use strict";
Error.stackTraceLimit = Infinity;
const isNode = ( typeof process !== "undefined" )

if( typeof window !== "undefined" ) 
	window.Require = Require;

if( isNode ) {
	global.Require = Require;
}


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

if( "undefined" === typeof setImmdediate )
	var setImmediate = (cb)=>setTimeout(cb,0);


function Require( path, cb ) {
	
	var module;
        if( typeof path === "string" )
	        module = require( path );
        else
	        module = path;
	if( module === sackVfsModule ) {
		module.onRuntimeInitialized = ()=>{
			module.FS.chdir( "/home/web_user" );
			if( isNode ) {
				module.FS.mount( module.NODEFS, {
						root:".",
					
					}
					, "/home/web_user" );
			}
			else {
				module.FS.mount( module.IDBFS, { }
					, "/home/web_user" );
				module.FS.syncfs( true /*load*/, (err)=>{
					console.log( "Reaload complete:", err );
				} )
			}
			try {
				module._initFS();
			} catch(err) {
				console.log( "Init has failed", err );
			}
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


if( typeof module !== "undefined" )  {
	module.exports=exports=Loader;
	
}

