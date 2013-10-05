var  TidBits  = TidBits || {} // our namespace
   , TestData = {}


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestVirtuals( namespace, undefined )
{
'use strict';

if( namespace[ "TestVirtuals" ] ) return

    namespace.TestVirtuals = TestVirtuals
var Static = TidBits.OoJs.setupClass( namespace, "TestVirtuals", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestVirtuals()
{
	this.Private
	(
		  runTestCase
		, basicTests
	)

	return this.Public() // only what we inherit
}


// Methods
//
function basicTests()
{
	var message, testCase

	this.message += "\n   Testing basic properties for VirtualX\n"



	testCase = new TidBits.TestClass( "VirtualA", "TestVirtuals.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message



	testCase = new TidBits.TestClass( "VirtualB", "TestVirtuals.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message
}



function runTestCase()
{
	this.message += "\n\nVirtual methods TestCase\n-----------------------------------"

	this.basicTests()
}


})( TidBits ); // TestVirtuals


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
