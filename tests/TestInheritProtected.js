var  TidBits  = TidBits || {} // our namespace
   , TestData = {}


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestInheritProtected( namespace, undefined )
{
'use strict';

if( namespace[ "TestInheritProtected" ] ) return

    namespace.TestInheritProtected = TestInheritProtected
var Static = TidBits.OoJs.setupClass( namespace, "TestInheritProtected", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestInheritProtected()
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


	testCase = new TidBits.TestClass( "InheritProtectedA", "TestProtectedInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() )

		this.message += message


	testCase = new TidBits.TestClass( "InheritProtectedB", "TestProtectedInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() )

		this.message += message


	testCase = new TidBits.TestClass( "InheritProtectedC", "TestProtectedInherit.basicTests" )
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
	    , location     = "TestInheritProtected.parentProperties"

	    , pubInstanceA = Static.filterProperties( layouts.InheritProtectedA, { scope: "instance", access: "public"    } )
	    , proInstanceA = Static.filterProperties( layouts.InheritProtectedA, { scope: "instance", access: "protected" } )
	    , pubStaticA   = Static.filterProperties( layouts.InheritProtectedA, { scope: "static"  , access: "public"    } )
	    , proStaticA   = Static.filterProperties( layouts.InheritProtectedA, { scope: "static"  , access: "protected" } )

	    , pubInstanceB = Static.filterProperties( layouts.InheritProtectedB, { scope: "instance", access: "public"    } )
	    , proInstanceB = Static.filterProperties( layouts.InheritProtectedB, { scope: "instance", access: "protected" } )
	    , pubStaticB   = Static.filterProperties( layouts.InheritProtectedB, { scope: "static"  , access: "public"    } )
	    , proStaticB   = Static.filterProperties( layouts.InheritProtectedB, { scope: "static"  , access: "protected" } )

		 , Binstance    = new TidBits.TestData.InheritProtectedB
		 , BPrivInst    = TidBits.TestData.InheritProtectedB.getPrivateInst( Binstance )

		 , Cinstance    = new TidBits.TestData.InheritProtectedC
		 , CPrivInst    = TidBits.TestData.InheritProtectedC.getPrivateInst( Cinstance )


	// Test InheritProtectedB
	//
	this.testProperties
	(
		  BPrivInst.InheritProtectedA
		, pubInstanceA.concat( proInstanceA )
		, []
		, "Verify parent property InheritProtectedA on InheritProtectedB instance: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritProtectedB.getPrivate().InheritProtectedA
		, pubStaticA.concat( proStaticA )
		, []
		, "Verify parent property InheritProtectedA on InheritProtectedB Static: "
		, location
		, true
	)

	// Test InheritProtectedC
	//
	this.testProperties
	(
		  CPrivInst.InheritProtectedA
		, pubInstanceA.concat( proInstanceA )
		, []
		, "Verify parent property InheritProtectedA on InheritProtectedC instance: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritProtectedC.getPrivate().InheritProtectedA
		, pubStaticA.concat( proStaticA )
		, []
		, "Verify parent property InheritProtectedA on InheritProtectedC Static: "
		, location
		, true
	)


	// InheritProtectedB on InheritProtectedC
	//
	this.testProperties
	(
		  CPrivInst.InheritProtectedB
		, pubInstanceB.concat( proInstanceB )
		, []
		, "Verify parent property InheritProtectedB on InheritProtectedC instance: "
		, location
		, true
	)


	this.testProperties
	(
		  TidBits.TestData.InheritProtectedC.getPrivate().InheritProtectedB
		, pubStaticB.concat( proStaticB )
		, []
		, "Verify parent property InheritProtectedB on InheritProtectedC Static: "
		, location
		, true
	)


	// Verify there is nothing on public
	//
	;[

			{
				   input   : Binstance.InheritProtectedA
				,  expect  : undefined
				,  message : "Verify that InheritProtectedA does not exist on iFace of InheritProtectedB\n"
				,  errorMsg: location + " was: " + Binstance.InheritProtectedA
			}

		,  {
				   input   : Cinstance.InheritProtectedA
				,  expect  : undefined
				,  message : "Verify that InheritProtectedA does not exist on iFace of InheritProtectedC\n"
				,  errorMsg: location + " was: " + Cinstance.InheritProtectedA
			}

		,  {
				   input   : Cinstance.InheritProtectedB
				,  expect  : undefined
				,  message : "Verify that InheritProtectedB does not exist on iFace of InheritProtectedC\n"
				,  errorMsg: location + " was: " + Cinstance.InheritProtectedB
			}

		,  {
				   input   : TidBits.TestData.InheritProtectedB.InheritProtectedA
				,  expect  : undefined
				,  message : "Verify that InheritProtectedA does not exist on InheritProtectedB\n"
				,  errorMsg: location + " was: " + TidBits.TestData.InheritProtectedB.InheritProtectedA
			}

		,  {
				   input   : TidBits.TestData.InheritProtectedC.InheritProtectedA
				,  expect  : undefined
				,  message : "Verify that InheritProtectedA does not exist on InheritProtectedC\n"
				,  errorMsg: location + " was: " + TidBits.TestData.InheritProtectedC.InheritProtectedA
			}

		,  {
				   input   : TidBits.TestData.InheritProtectedC.InheritProtectedB
				,  expect  : undefined
				,  message : "Verify that InheritProtectedB does not exist on InheritProtectedC\n"
				,  errorMsg: location + " was: " + TidBits.TestData.InheritProtectedC.InheritProtectedB
			}
	]
	.forEach( this.run )
}




function runTestCase()
{
	this.message += "\n\nInherit Protected TestCase\n-----------------------------------"

	this.basicTests()
	this.parentProperties()
}


})( TidBits ); // TestInheritProtected


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
