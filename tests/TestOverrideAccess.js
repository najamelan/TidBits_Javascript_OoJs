var  TidBits  = TidBits || {} // our namespace


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestOverrideAccess( namespace, undefined )
{
'use strict';

if( namespace[ "TestOverrideAccess" ] ) return

    namespace.TestOverrideAccess = TestOverrideAccess
var Static = TidBits.OoJs.setupClass( namespace, "TestOverrideAccess", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestOverrideAccess()
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

	this.message += "\n   Testing basic properties for OverrideAccessA\n"



	testCase = new TidBits.TestClass( "OverrideAccessA", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message



	testCase = new TidBits.TestClass( "OverrideAccessB", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message



	testCase = new TidBits.TestClass( "OverrideAccessC", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message
}



function parentProperties()
{
	this.message += "\n\n    Testing parent accessors for OverrideAccessX\n\n"

	var   layouts         = TidBits.TestData.classLayout
	    , location        = "TestOverrideAccess.parentProperties"

	    , OverrideAccessB = namespace.TestData.OverrideAccessB
	    , OverrideAccessC = namespace.TestData.OverrideAccessC

	    , staticAonBPub  = [ "getPrivate" , "getPrivateInst", "ApublicStaticDM" ]
	    , staticAonCPub  = [ "AprotectedStaticDM" ]
	    , staticBonCPub  = []
	    , staticAonBPriv = staticAonBPub.concat( [ "AprotectedStaticMethod", "ApublicStaticMethod", "AprotectedStaticDM" ] )
	    , staticAonCPriv = staticAonCPub.concat( [ "ApublicStaticDM", "AprotectedStaticMethod", "ApublicStaticMethod", "getPrivate" , "getPrivateInst" ] )
	    , staticBonCPriv = staticBonCPub.concat( [ "ApublicStaticMethod", "AprotectedStaticMethod", "AprotectedStaticDM", "ApublicStaticDM", "BprotectedStaticMethod", "BpublicStaticMethod", "BprotectedStaticDM", "BpublicStaticDM", "getPrivate" , "getPrivateInst" ] )

	    , instanceAonBPub  = [ "AprotectedInstanceMethod", "ApublicInstanceMethod" ]
	    , instanceAonCPub  = []
	    , instanceBonCPub  = [ "BprotectedInstanceDM" ]
	    , instanceAonBPriv = instanceAonBPub.concat( [ "ApublicInstanceMethod", "AprotectedInstanceMethod", "AprotectedInstanceDM", "ApublicInstanceDM" ] )
	    , instanceAonCPriv = instanceAonCPub.concat( [ "ApublicInstanceMethod", "AprotectedInstanceMethod", "AprotectedInstanceDM" ] )
	    , instanceBonCPriv = instanceBonCPub.concat( [ "BprotectedInstanceMethod", "BpublicInstanceMethod", "BprotectedInstanceDM", "BpublicInstanceDM", "ApublicInstanceMethod", "AprotectedInstanceMethod", "AprotectedInstanceDM" ] )

	    , Binstance    = new OverrideAccessB
		 , BPrivInst    = OverrideAccessB.getPrivateInst( Binstance )

		 , Cinstance    = new OverrideAccessC
		 , CPrivInst    = OverrideAccessC.getPrivateInst( Cinstance )


	// Test OverrideAccessB
	//
	this.message += "\n  Testing OverrideAccessB.OverrideAccessA\n\n"
	this.testProperties
	(
		  OverrideAccessB.OverrideAccessA
		, arrayToObj( staticAonBPub )
		, []
		, "Verify parent property OverrideAccessA on OverrideAccessB: "
		, location
		, true
	)

	this.message += "\n  Testing OverrideAccessB.Static.OverrideAccessA\n\n"
	this.testProperties
	(
		  OverrideAccessB.getPrivate().OverrideAccessA
		, arrayToObj( staticAonBPriv )
		, []
		, "Verify parent property OverrideAccessA on OverrideAccessB Static: "
		, location
		, true
	)


	this.message += "\n  Testing Binstance.OverrideAccessA\n\n"
	this.testProperties
	(
		  Binstance.OverrideAccessA
		, arrayToObj( instanceAonBPub )
		, []
		, "Verify parent property OverrideAccessA on OverrideAccessB instance iFace: "
		, location
		, true
	)


	this.message += "\n  Testing BPrivInst.OverrideAccessA\n\n"
	this.testProperties
	(
		  BPrivInst.OverrideAccessA
		, arrayToObj( instanceAonBPriv )
		, []
		, "Verify parent property OverrideAccessA on OverrideAccessB instance: "
		, location
		, true
	)

	// Test OverrideAccessC
	//

	// no public stuff of A on C for the moment
	//
	// this.message += "\n  Testing Cinstance.OverrideAccessA\n\n"
	// this.testProperties
	// (
	// 	  Cinstance.OverrideAccessA
	// 	, arrayToObj( instanceAonCPub )
	// 	, []
	// 	, "Verify parent property OverrideAccessA on OverrideAccessC instance iFace: "
	// 	, location
	// 	, true
	// )


	this.message += "\n  Testing CPrivInst.OverrideAccessA\n\n"
	this.testProperties
	(
		  CPrivInst.OverrideAccessA
		, arrayToObj( instanceAonCPriv )
		, []
		, "Verify parent property OverrideAccessA on OverrideAccessC instance: "
		, location
		, true
	)


	this.message += "\n  Testing OverrideAccessC.OverrideAccessA\n\n"
	this.testProperties
	(
		  OverrideAccessC.OverrideAccessA
		, arrayToObj( staticAonCPub )
		, []
		, "Verify parent property OverrideAccessA on OverrideAccessC: "
		, location
		, true
	)


	this.message += "\n  Testing OverrideAccessC.Static.OverrideAccessA\n\n"

	this.testProperties
	(
		  OverrideAccessC.getPrivate().OverrideAccessA
		, arrayToObj( staticAonCPriv )
		, []
		, "Verify parent property OverrideAccessA on OverrideAccessC Static: "
		, location
		, true
	)


	// OverrideAccessB on OverrideAccessC
	//
	this.message += "\n  Testing Cinstance.OverrideAccessB\n\n"
	this.testProperties
	(
		  Cinstance.OverrideAccessB
		, arrayToObj( instanceBonCPub )
		, []
		, "Verify parent property OverrideAccessB on OverrideAccessC instance iFace: "
		, location
		, true
	)


	this.message += "\n  Testing CPrivInst.OverrideAccessB\n\n"
	this.testProperties
	(
		  CPrivInst.OverrideAccessB
		, arrayToObj( instanceBonCPriv )
		, []
		, "Verify parent property OverrideAccessB on OverrideAccessC instance: "
		, location
		, true
	)

	// for the moment there are no properties from B that are public
	//
	// this.testProperties
	// (
	// 	  OverrideAccessC.OverrideAccessB
	// 	, staticBonCPub
	// 	, []
	// 	, "Verify parent property OverrideAccessB on OverrideAccessC: "
	// 	, location
	// 	, true
	// )


	this.message += "\n  Testing OverrideAccessC.Static.OverrideAccessB\n\n"
	this.testProperties
	(
		  OverrideAccessC.getPrivate().OverrideAccessB
		, arrayToObj( staticBonCPriv )
		, []
		, "Verify parent property OverrideAccessB on OverrideAccessC Static: "
		, location
		, true
	)
}


function arrayToObj( arr )
{
	var result = []

	for( var i = arr.length - 1; i >= 0; --i )
	{
		result.push( { name: arr[i] } )
	}

	return result
}



function runTestCase()
{
	this.message += "\n\nOverride Access TestCase\n-----------------------------------"

	this.basicTests()
	this.parentProperties()
}


})( TidBits ); // TestOverrideAccess


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
