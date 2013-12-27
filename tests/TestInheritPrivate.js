var  TidBits  = TidBits || {} // our namespace
   , TestData = {}


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestInheritPrivate( namespace, undefined )
{
'use strict';

if( namespace[ "TestInheritPrivate" ] ) return

    namespace.TestInheritPrivate = TestInheritPrivate
var Static = TidBits.OoJs.setupClass( namespace, "TestInheritPrivate", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestInheritPrivate()
{
	this.Private
	(
		  runTestCase
		, basicTests
		, parentProperties
	)

	return this.Public() // only what we inherit
}


// Methods
//
function basicTests()
{
	var message, testCase


	testCase = new TidBits.TestClass( "InheritPrivateA", "TestPrivateInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() )

		this.message += message


	testCase = new TidBits.TestClass( "InheritPrivateB", "TestPrivateInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() )

		this.message += message


	testCase = new TidBits.TestClass( "InheritPrivateC", "TestPrivateInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() )

		this.message += message

}



function parentProperties()
{
	this.message += "\n\n    Testing parent accessors for InheritProtectedX\n\n"

	var   layouts      = TidBits.TestData.classLayout
	    , location     = "TestInheritPrivate.parentProperties"

	    , pubInstanceA = Static.filterProperties( layouts.InheritPrivateA, { scope: "instance", access: "public"    } )
	    , proInstanceA = Static.filterProperties( layouts.InheritPrivateA, { scope: "instance", access: "protected" } )
	    , pubStaticA   = Static.filterProperties( layouts.InheritPrivateA, { scope: "static"  , access: "public"    } )
	    , proStaticA   = Static.filterProperties( layouts.InheritPrivateA, { scope: "static"  , access: "protected" } )

	    , pubInstanceB = Static.filterProperties( layouts.InheritPrivateB, { scope: "instance", access: "public"    } )
	    , proInstanceB = Static.filterProperties( layouts.InheritPrivateB, { scope: "instance", access: "protected" } )
	    , pubStaticB   = Static.filterProperties( layouts.InheritPrivateB, { scope: "static"  , access: "public"    } )
	    , proStaticB   = Static.filterProperties( layouts.InheritPrivateB, { scope: "static"  , access: "protected" } )

		 , Binstance    = new TidBits.TestData.InheritPrivateB
		 , BPrivInst    = TidBits.TestData.InheritPrivateB.getPrivateInst( Binstance )

		 , Cinstance    = new TidBits.TestData.InheritPrivateC
		 , CPrivInst    = TidBits.TestData.InheritPrivateC.getPrivateInst( Cinstance )


	// Test InheritPrivateB
	//
	this.testProperties
	(
		  BPrivInst.InheritPrivateA
		, pubInstanceA.concat( proInstanceA )
		, []
		, "Verify parent property InheritPrivateA on InheritPrivateB instance: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritPrivateB.getPrivate().InheritPrivateA
		, pubStaticA.concat( proStaticA )
		, []
		, "Verify parent property InheritPrivateA on InheritPrivateB Static: "
		, location
		, true
	)

	// Test InheritPrivateC
	//
	this.testProperties
	(
		  CPrivInst.InheritPrivateB
		, pubInstanceB.concat( proInstanceB )
		, []
		, "Verify parent property InheritPrivateB on InheritPrivateC instance: "
		, location
		, true
	)


	this.testProperties
	(
		  TidBits.TestData.InheritPrivateC.getPrivate().InheritPrivateB
		, pubStaticB.concat( proStaticB )
		, []
		, "Verify parent property InheritPrivateB on InheritPrivateC Static: "
		, location
		, true
	)


	// Verify there is nothing on public and that InheritPrivateA is not on InheritPrivateC
	//
	;[
			{
				   input   : Binstance.InheritPrivateA
				,  expect  : undefined
				,  message : "Verify that InheritPrivateA does not exist on iFace of InheritPrivateB\n"
				,  errorMsg: location + " was: " + Binstance.InheritPrivateA
			}

		,  {
				   input   : Cinstance.InheritPrivateA
				,  expect  : undefined
				,  message : "Verify that InheritPrivateA does not exist on iFace of InheritPrivateC\n"
				,  errorMsg: location + " was: " + Cinstance.InheritPrivateA
			}

		,  {
				   input   : Cinstance.InheritPrivateB
				,  expect  : undefined
				,  message : "Verify that InheritPrivateB does not exist on iFace of InheritPrivateC\n"
				,  errorMsg: location + " was: " + Cinstance.InheritPrivateB
			}

		,  {
				   input   : TidBits.TestData.InheritPrivateB.InheritPrivateA
				,  expect  : undefined
				,  message : "Verify that InheritPrivateA does not exist on InheritPrivateB\n"
				,  errorMsg: location + " was: " + TidBits.TestData.InheritPrivateB.InheritPrivateA
			}

		,  {
				   input   : TidBits.TestData.InheritPrivateC.InheritPrivateA
				,  expect  : undefined
				,  message : "Verify that InheritPrivateA does not exist on InheritPrivateC\n"
				,  errorMsg: location + " was: " + TidBits.TestData.InheritPrivateC.InheritPrivateA
			}

		,  {
				   input   : TidBits.TestData.InheritPrivateC.InheritPrivateB
				,  expect  : undefined
				,  message : "Verify that InheritPrivateB does not exist on InheritPrivateC\n"
				,  errorMsg: location + " was: " + TidBits.TestData.InheritPrivateC.InheritPrivateB
			}

		,  {
				   input   : CPrivInst.InheritPrivateA
				,  expect  : undefined
				,  message : "Verify that InheritPrivateA does not exist on instance of InheritPrivateC\n"
				,  errorMsg: location + " was: " + CPrivInst.InheritPrivateA
			}

		,  {
				   input   : TidBits.TestData.InheritPrivateC.getPrivate().InheritPrivateA
				,  expect  : undefined
				,  message : "Verify that InheritPrivateA does not exist on InheritPrivateC Static\n"
				,  errorMsg: location + " was: " + TidBits.TestData.InheritPrivateC.getPrivate().InheritPrivateA
			}
	]
	.forEach( this.run )
}




function runTestCase()
{
	this.message += "\n\nInherit Private TestCase\n-----------------------------------"

	this.basicTests()
	this.parentProperties()
}


})( TidBits ); // TestInheritPrivate


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
