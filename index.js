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
} catch(err1) {
	    try {
		console.log( "Debug failed; load reloease (normal usually?)", err1 );
		sackVfsModule = require( "./sack.vfs.wasm.js" );
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
		//console.log( "!!!!!!!!! DO NOT RUN AGAIN" );
		module.onRuntimeInitialized = ()=>{
			if( isNode ) {
				//console.log( "mounting NODEFS?" );
				module.FS.mount( module.NODEFS, {
						root:".",
					
					}
					, "/home/web_user" );
			}
			else {
				module.FS.mount( module.IDBFS, { }
					, "/home/web_user" );
				module.FS.syncfs( true /*load*/, (err)=>{
					if( err ) {
						
						console.log( "Reaload complete:", err );
					}
					else
						doInit();
				} )
			}
			
			// this really needs some sort of indicator that activity happened.
			// disk activity light?
			function doSync() {
				module.FS.syncfs( false /*load*/, (err)=>{
					if( err ) {
						console.log( "Sync Error:", err );
					}
					else {
						//console.log( "Sync complete; no error" );
						setTimeout( doSync, 5000 );
					}
				} )
				
			}
			
			
			function doInit() {
				try {
					module._initFS();
				} catch(err) {
					console.log( "Init has failed", err );
					return;
				}
				module.FS.chdir( "/home/web_user" );
				setTimeout( doSync, 5000 );
			
				const sack = module.SACK;
				if( typeof window !== "undefined" )
					window.SACK = sack;
				cb( sack );
			}
		}
	}else{
		console.log( "Other Require (???)", path, cb );
		cb( module );
	}
}

function Loader(cb) {
	Require( sackVfsModule, cb );
}


if( typeof module !== "undefined" )  {
	module.exports=exports=new Promise( Loader );
}

