var TidBits = TidBits || {} // our namespace

if( 'undefined' !== typeof module )
{
	TidBits                        = require( '../../UnitTesting/TestGroup.js' )

	TidBits.TestSingleClass        = require( './TestSingleClass.js'        ).TestSingleClass
	TidBits.TestInheritPrivate     = require( './TestInheritPrivate.js'     ).TestInheritPrivate
	TidBits.TestInheritProtected   = require( './TestInheritProtected.js'   ).TestInheritProtected
	TidBits.TestInheritPublic      = require( './TestInheritPublic.js'      ).TestInheritPublic
	TidBits.TestDMConsistency      = require( './TestDMConsistency.js'      ).TestDMConsistency
	TidBits.TestVirtuals           = require( './TestVirtuals.js'           ).TestVirtuals
	TidBits.TestOverrideProperties = require( './TestOverrideProperties.js' ).TestOverrideProperties
	TidBits.TestOverrideAccess     = require( './TestOverrideAccess.js'     ).TestOverrideAccess
	TidBits.TestGetPrivateInstance = require( './TestGetPrivateInstance.js' ).TestGetPrivateInstance
}



;(function Class_Test_OoJS( namespace, undefined )
{
'use strict';

if( namespace[ "Test_OoJS" ] ) return

    namespace.Test_OoJS = Test_OoJS
var Static              = TidBits.OoJs.setupClass( namespace, "Test_OoJS", { inherit: "TestGroup", as: "public" } )


Static.Public()


// Constructor
//
function Test_OoJS()
{
	this.Private( init )


	var iFace = this.Public()

	this.init()

	return iFace
}


function init()
{
	// TODO: Super, typeOf, extend

	this.message += "Running testSuite for OoJs\n"

	this.register( new TidBits.TestSingleClass       () )
	this.register( new TidBits.TestInheritPrivate    () )
	this.register( new TidBits.TestInheritProtected  () )
	this.register( new TidBits.TestInheritPublic     () )
	this.register( new TidBits.TestDMConsistency     () )
	this.register( new TidBits.TestVirtuals          () )
	this.register( new TidBits.TestOverrideProperties() )
	this.register( new TidBits.TestOverrideAccess    () )
	this.register( new TidBits.TestGetPrivateInstance() )
}


})( TidBits ); // Test_OoJS






if( 'undefined' !== typeof module )
{
	var group = new TidBits.Test_OoJS

	console.log( group.getResults() )

	if( group.getTestsFailedCount() )

		process.exit( group.getTestsFailedCount() );
}


