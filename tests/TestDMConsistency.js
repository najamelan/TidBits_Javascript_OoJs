var  TidBits  = TidBits || {} // our namespace
   , TestData = {}


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestDMConsistency( namespace, undefined )
{
'use strict';

if( namespace[ "TestDMConsistency" ] ) return

    namespace.TestDMConsistency = TestDMConsistency
var Static = TidBits.OoJs.setupClass( namespace, "TestDMConsistency", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestDMConsistency()
{
	this.Private
	(
		  runTestCase
		, basicTests
		, changeDM
		, readDM
	)

	return this.Public() // only what we inherit
}


// Methods
//
function basicTests()
{
	var message, testCase

	this.message += "\n   Testing basic properties for GetterSetterX\n"



	testCase = new TidBits.TestClass( "GetterSetterA", "TestDMConsistency.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message



	testCase = new TidBits.TestClass( "GetterSetterB", "TestDMConsistency.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message
}



function changeDM()
{
	var   GetterSetterA = namespace.TestData.GetterSetterA
	    , GetterSetterB = namespace.TestData.GetterSetterB
	    , instance      = new GetterSetterB()

	this.readDM( 5, 15, instance )


	// change Directly
	//
	GetterSetterA.ApublicStaticDM++

	this.readDM( 6, 15, instance )


	// change inherited
	//
	GetterSetterB.ApublicStaticDM++
	instance.ApublicInstanceDM++

	this.readDM( 7, 16, instance )


	// change using parent property
	//
	GetterSetterB.GetterSetterA.ApublicStaticDM++
	instance     .GetterSetterA.ApublicInstanceDM++

	this.readDM( 8, 17, instance )


	// change using setter
	//
	GetterSetterA.AStaticSet( 9 )

	this.readDM( 9, 17, instance )


	// change using inherited setter
	//
	GetterSetterB.AStaticSet  ( 10 )
	instance     .AInstanceSet( 18 )

	this.readDM( 10, 18, instance )


	// change using inherited setter on parent property
	//
	GetterSetterB.GetterSetterA.AStaticSet  ( 11 )
	instance.GetterSetterA     .AInstanceSet( 19 )

	this.readDM( 11, 19, instance )


	// change using derived setter
	//
	GetterSetterB.BStaticSet  ( 12 )
	instance     .BInstanceSet( 20 )

	this.readDM( 12, 20, instance )


	// Friend: change inherited
	//
	Static.getPrivateInstance( GetterSetterB ).ApublicStaticDM++
	Static.getPrivateInstance( instance      ).ApublicInstanceDM++

	this.readDM( 13, 21, instance )


	// Friend: change by parent property
	//
	Static.getPrivateInstance( GetterSetterB ).GetterSetterA.ApublicStaticDM++
	Static.getPrivateInstance( instance      ).GetterSetterA.ApublicInstanceDM++

	this.readDM( 14, 22, instance )


	// Friend: change by inherited setter
	//
	Static.getPrivateInstance( GetterSetterB ).AStaticSet  ( 15 )
	Static.getPrivateInstance( instance      ).AInstanceSet( 23 )

	this.readDM( 15, 23, instance )


	// Friend: change by setter on parent property
	//
	Static.getPrivateInstance( GetterSetterB ).GetterSetterA.AStaticSet  ( 16 )
	Static.getPrivateInstance( instance      ).GetterSetterA.AInstanceSet( 24 )

	this.readDM( 16, 24, instance )

}



function readDM( staticValue, instanceValue, instance )
{
	var   GetterSetterA = namespace.TestData.GetterSetterA
	    , GetterSetterB = namespace.TestData.GetterSetterB

	;[

			{
				   input   : GetterSetterA.ApublicStaticDM
				,  expect  : staticValue
				,  message : "GetterSetterA.ApublicStaticDM should equal: " + staticValue + "\n"
				,  errorMsg: "was: " + GetterSetterA.ApublicStaticDM
			}


		,  {
			     input   : GetterSetterA.AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterA.AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + GetterSetterA.AStaticGet()
			}


		,  {
			     input   : GetterSetterB.GetterSetterA.AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.GetterSetterA.AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + GetterSetterB.GetterSetterA.AStaticGet()
			}


		,  {
			     input   : GetterSetterB.GetterSetterA.ApublicStaticDM
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.GetterSetterA.ApublicStaticDM should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + GetterSetterB.GetterSetterA.ApublicStaticDM
			}


		,  {
			     input   : GetterSetterB.ApublicStaticDM
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.ApublicStaticDM should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + GetterSetterB.ApublicStaticDM
			}


		,  {
			     input   : GetterSetterB.AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + GetterSetterB.AStaticGet()
			}


		,  {
			     input   : GetterSetterB.BStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.BStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + GetterSetterB.BStaticGet()
			}


		,  {
			     input   : Static.getPrivateInstance( GetterSetterB ).ApublicStaticDM
			  ,  expect  : staticValue
			  ,  message : "Static.getPrivateInstance( GetterSetterB ).ApublicStaticDM should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( GetterSetterB ).ApublicStaticDM
			}


		,  {
			     input   : Static.getPrivateInstance( GetterSetterB ).GetterSetterA.ApublicStaticDM
			  ,  expect  : staticValue
			  ,  message : "Static.getPrivateInstance( GetterSetterB ).GetterSetterA.ApublicStaticDM should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( GetterSetterB ).GetterSetterA.ApublicStaticDM
			}


		,  {
			     input   : Static.getPrivateInstance( GetterSetterB ).AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "Static.getPrivateInstance( GetterSetterB ).AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( GetterSetterB ).AStaticGet()
			}


		,  {
			     input   : Static.getPrivateInstance( GetterSetterB ).GetterSetterA.AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "Static.getPrivateInstance( GetterSetterB ).GetterSetterA.AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( GetterSetterB ).GetterSetterA.AStaticGet()
			}

	]
	.forEach( this.run )



	if( !instance )

		return;



	[
		,  {
			     input   : instance.GetterSetterA.AInstanceGet()
			  ,  expect  : instanceValue
			  ,  message : "instance.GetterSetterA.AInstanceGet() should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + instance.GetterSetterA.AInstanceGet()
			}


		,  {
			     input   : instance.GetterSetterA.ApublicInstanceDM
			  ,  expect  : instanceValue
			  ,  message : "instance.GetterSetterA.ApublicInstanceDM should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + instance.GetterSetterA.ApublicInstanceDM
			}


		,  {
			     input   : instance.ApublicInstanceDM
			  ,  expect  : instanceValue
			  ,  message : "instance.ApublicInstanceDM should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + instance.ApublicInstanceDM
			}


		,  {
			     input   : instance.AInstanceGet()
			  ,  expect  : instanceValue
			  ,  message : "instance.AInstanceGet() should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + instance.AInstanceGet()
			}


		,  {
			     input   : instance.BInstanceGet()
			  ,  expect  : instanceValue
			  ,  message : "instance.BInstanceGet() should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + instance.BInstanceGet()
			}


		,  {
			     input   : Static.getPrivateInstance( instance ).ApublicInstanceDM
			  ,  expect  : instanceValue
			  ,  message : "Static.getPrivateInstance( instance ).ApublicInstanceDM should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( instance ).ApublicInstanceDM
			}


		,  {
			     input   : Static.getPrivateInstance( instance ).GetterSetterA.ApublicInstanceDM
			  ,  expect  : instanceValue
			  ,  message : "Static.getPrivateInstance( instance ).GetterSetterA.ApublicInstanceDM should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( instance ).GetterSetterA.ApublicInstanceDM
			}


		,  {
			     input   : Static.getPrivateInstance( instance ).AInstanceGet()
			  ,  expect  : instanceValue
			  ,  message : "Static.getPrivateInstance( instance ).AInstanceGet() should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( instance ).AInstanceGet()
			}


		,  {
			     input   : Static.getPrivateInstance( instance ).GetterSetterA.AInstanceGet()
			  ,  expect  : instanceValue
			  ,  message : "Static.getPrivateInstance( instance ).GetterSetterA.AInstanceGet() should equal: " + instanceValue + "\n"
			  ,  errorMsg: "was: " + Static.getPrivateInstance( instance ).GetterSetterA.AInstanceGet()
			}

	]
	.forEach( this.run )
}




function runTestCase()
{
	this.message += "\n\nData Member Consistancy TestCase\n-----------------------------------"

	this.basicTests()
	this.changeDM()
}


})( TidBits ); // TestDMConsistency


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
