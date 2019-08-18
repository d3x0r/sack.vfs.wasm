# SACK VFS Wasm Build

This is the native C code for (sack.vfs)[https://github.com/d3x0r/sack.vfs], compiled to wasm for use in browsers.

Inclusion has to be async....

```
 // index.js is the main load point specified by package.json.
 
 
// Can't do this at a top level... 
// unless you're a .mjs.
var sack = await require( "." );

// so use this instead.
require( . ).then( (sack)=>{
	// module is loaded here.
        // Hooray for async.
        // await?  It doesn't actually wait.
} );


```




Current (obsolete by the time you read this?)

```

Success? {
  Volume: [Function: Volume] {
    mapFile: [Function],
    mkdir: [Function],
    readAsString: [Function]
  },
  Sqlite: [Function: Sqlite] {
    eo: [Function],
    go: [Function],
    so: [Function],
    options: {},
    optionTreeNode: [Function],
    optionEditor: [Function]
  },
  ObjectStorage: [Function: ObjectStore],
  JSON: null,
  JSON6: {
    begin: [Function: begin],
    escape: [Function: escape],
    registerToJSON6: [Function: registerToJSON6],
    registerFromJSON6: [Function: registerFromJSON6],
    registerToFrom: [Function: registerToFrom],
    makeFunction: [Function: makeFunction],
    makeString: [Function: makeString],
    parse: [Function: parse]
  },
  JSOX: {
    begin: [Function: begin],
    escape: [Function: escape],
    registerToJSOX: [Function: registerToJSOX],
    registerFromJSOX: [Function: registerFromJSOX],
    registerToFrom: [Function: registerToFrom],
    makeFunction: [Function: makeFunction],
    makeString: [Function: makeString],
    parse: [Function: parse]
  },
  VESL: null,
  SaltyRNG: [Function: SaltyRNG] {
    id: [Function],
    sign: [Function: sign],
    setSigningThreads: [Function: setSigningThreads],
    verify: [Function: verify]
  },
  id: [Function],
  u8xor: [Function: vfs_u8xor]
}
calling a thing...

```

