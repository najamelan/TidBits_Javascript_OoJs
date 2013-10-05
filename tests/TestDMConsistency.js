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
	var instance = new TidBits.TestData.GetterSetterB()

	this.readDM( 5, 15, instance )


	// change Directly
	//
	TidBits.TestData.GetterSetterA.ApublicStaticDM++

	this.readDM( 6, 15, instance )


	// change inherited
	//
	TidBits.TestData.GetterSetterB.ApublicStaticDM++
	instance.ApublicInstanceDM++

	this.readDM( 7, 16, instance )


	// change using parent property
	//
	TidBits.TestData.GetterSetterB.GetterSetterA.ApublicStaticDM++
	instance.GetterSetterA.ApublicInstanceDM++

	this.readDM( 8, 17, instance )


	// change using setter
	//
	TidBits.TestData.GetterSetterA.AStaticSet( 9 )

	this.readDM( 9, 17, instance )


	// change using inherited setter
	//
	TidBits.TestData.GetterSetterB.AStaticSet( 10 )
	instance.AInstanceSet( 18 )

	this.readDM( 10, 18, instance )


	// change using inherited setter on parent property
	//
	TidBits.TestData.GetterSetterB.GetterSetterA.AStaticSet( 11 )
	instance.GetterSetterA.AInstanceSet( 19 )

	this.readDM( 11, 19, instance )


	// change using derived setter
	//
	TidBits.TestData.GetterSetterB.BStaticSet( 12 )
	instance.BInstanceSet( 20 )

	this.readDM( 12, 20, instance )

}



function readDM( staticValue, instanceValue, instance )
{
	[

			{
				   input   : TidBits.TestData.GetterSetterA.ApublicStaticDM
				,  expect  : staticValue
				,  message : "GetterSetterA.ApublicStaticDM should equal: " + staticValue + "\n"
				,  errorMsg: "was: " + TidBits.TestData.GetterSetterA.ApublicStaticDM
			}


		,  {
			     input   : TidBits.TestData.GetterSetterA.AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterA.AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + TidBits.TestData.GetterSetterA.AStaticGet()
			}


		,  {
			     input   : TidBits.TestData.GetterSetterB.GetterSetterA.AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.GetterSetterA.AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + TidBits.TestData.GetterSetterB.GetterSetterA.AStaticGet()
			}


		,  {
			     input   : TidBits.TestData.GetterSetterB.GetterSetterA.ApublicStaticDM
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.GetterSetterA.ApublicStaticDM should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + TidBits.TestData.GetterSetterB.GetterSetterA.ApublicStaticDM
			}


		,  {
			     input   : TidBits.TestData.GetterSetterB.ApublicStaticDM
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.ApublicStaticDM should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + TidBits.TestData.GetterSetterB.ApublicStaticDM
			}


		,  {
			     input   : TidBits.TestData.GetterSetterB.AStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.AStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + TidBits.TestData.GetterSetterB.AStaticGet()
			}


		,  {
			     input   : TidBits.TestData.GetterSetterB.BStaticGet()
			  ,  expect  : staticValue
			  ,  message : "GetterSetterB.BStaticGet() should equal: " + staticValue + "\n"
			  ,  errorMsg: "was: " + TidBits.TestData.GetterSetterB.BStaticGet()
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
