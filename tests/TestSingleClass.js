var  TidBits  = TidBits || {} // our namespace
   , TestData = {}


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestSingleClass( namespace, undefined )
{
'use strict';

if( namespace[ "TestSingleClass" ] ) return

    namespace.TestSingleClass = TestSingleClass
var Static                    = TidBits.OoJs.setupClass( namespace, "TestSingleClass", { inherit: "OoTestBase", as: "public" } )



// Constructor
//
function TestSingleClass()
{
	this.Private
	(
		  runTestCase
	)

	return this.Public() // only what we inherit
}


function runTestCase()
{
	this.message += "\n\nSingle Class TestCase\n---------------------"

	var   testCase = new TidBits.TestClass( "Single", "TestSingleClass" )
	    , message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() )

		this.message += message
}


})( TidBits ); // TestSingleClass


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
