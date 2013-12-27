var  TidBits  = TidBits || {} // our namespace
   , TestData = {}


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestInheritPublic( namespace, undefined )
{
'use strict';

if( namespace[ "TestInheritPublic" ] ) return

    namespace.TestInheritPublic = TestInheritPublic
var Static = TidBits.OoJs.setupClass( namespace, "TestInheritPublic", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestInheritPublic()
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

	this.message += "\n   Testing basic properties for InheritPublicA\n"

	testCase = new TidBits.TestClass( "InheritPublicA", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message

	testCase = new TidBits.TestClass( "InheritPublicB", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message

	testCase = new TidBits.TestClass( "InheritPublicC", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message




}



function parentProperties()
{
	this.message += "\n\n    Testing parent accessors for InheritPublicX\n\n"

	var   layouts      = TidBits.TestData.classLayout
	    , location     = "TestInheritPublic.parentProperties"

	    , pubInstanceA = Static.filterProperties( layouts.InheritPublicA, { scope: "instance", access: "public"    } )
	    , proInstanceA = Static.filterProperties( layouts.InheritPublicA, { scope: "instance", access: "protected" } )
	    , pubStaticA   = Static.filterProperties( layouts.InheritPublicA, { scope: "static"  , access: "public"    } )
	    , proStaticA   = Static.filterProperties( layouts.InheritPublicA, { scope: "static"  , access: "protected" } )

	    , pubInstanceB = Static.filterProperties( layouts.InheritPublicB, { scope: "instance", access: "public"    } )
	    , proInstanceB = Static.filterProperties( layouts.InheritPublicB, { scope: "instance", access: "protected" } )
	    , pubStaticB   = Static.filterProperties( layouts.InheritPublicB, { scope: "static"  , access: "public"    } )
	    , proStaticB   = Static.filterProperties( layouts.InheritPublicB, { scope: "static"  , access: "protected" } )

		 , Binstance    = new TidBits.TestData.InheritPublicB
		 , BPrivInst    = TidBits.TestData.InheritPublicB.getPrivateInst( Binstance )

		 , Cinstance    = new TidBits.TestData.InheritPublicC
		 , CPrivInst    = TidBits.TestData.InheritPublicC.getPrivateInst( Cinstance )


	// Test InheritPublicB
	//
	this.testProperties
	(
		  Binstance.InheritPublicA
		, pubInstanceA
		, []
		, "Verify parent property InheritPublicA on InheritPublicB instance iFace: "
		, location
		, true
	)

	this.testProperties
	(
		  BPrivInst.InheritPublicA
		, pubInstanceA.concat( proInstanceA )
		, []
		, "Verify parent property InheritPublicA on InheritPublicB instance: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritPublicB.InheritPublicA
		, pubStaticA
		, []
		, "Verify parent property InheritPublicA on InheritPublicB: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritPublicB.getPrivate().InheritPublicA
		, pubStaticA.concat( proStaticA )
		, []
		, "Verify parent property InheritPublicA on InheritPublicB Static: "
		, location
		, true
	)

	// Test InheritPublicC
	//
	this.testProperties
	(
		  Cinstance.InheritPublicA
		, pubInstanceA
		, []
		, "Verify parent property InheritPublicA on InheritPublicC instance iFace: "
		, location
		, true
	)

	this.testProperties
	(
		  CPrivInst.InheritPublicA
		, pubInstanceA.concat( proInstanceA )
		, []
		, "Verify parent property InheritPublicA on InheritPublicC instance: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritPublicC.InheritPublicA
		, pubStaticA
		, []
		, "Verify parent property InheritPublicA on InheritPublicC: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritPublicC.getPrivate().InheritPublicA
		, pubStaticA.concat( proStaticA )
		, []
		, "Verify parent property InheritPublicA on InheritPublicC Static: "
		, location
		, true
	)


	// InheritPublicB on InheritPublicC
	//
	this.testProperties
	(
		  Cinstance.InheritPublicB
		, pubInstanceB
		, []
		, "Verify parent property InheritPublicB on InheritPublicC instance iFace: "
		, location
		, true
	)

	this.testProperties
	(
		  CPrivInst.InheritPublicB
		, pubInstanceB.concat( proInstanceB )
		, []
		, "Verify parent property InheritPublicB on InheritPublicC instance: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritPublicC.InheritPublicB
		, pubStaticB
		, []
		, "Verify parent property InheritPublicB on InheritPublicC: "
		, location
		, true
	)

	this.testProperties
	(
		  TidBits.TestData.InheritPublicC.getPrivate().InheritPublicB
		, pubStaticB.concat( proStaticB )
		, []
		, "Verify parent property InheritPublicB on InheritPublicC Static: "
		, location
		, true
	)
}




function runTestCase()
{
	this.message += "\n\nInherit Public TestCase\n-----------------------------------"

	this.basicTests()
	this.parentProperties()
}


})( TidBits ); // TestInheritPublic


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
