require( ".." )( (sack)=>{
console.log( "calling a thing..." );
var vol = sack.Volume( "mount", "data1.vfs", "test", "test" );
var vol = sack.Volume( "mount", "data2.vfs", 0, "test", "test" );
var vol = sack.Volume( "mount", "data3.vfs", 1, "test", "test" );
});
