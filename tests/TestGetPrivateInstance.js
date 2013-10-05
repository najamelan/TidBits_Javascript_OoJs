var  TidBits  = TidBits || {} // our namespace


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestGetPrivateInstance( namespace, undefined )
{
'use strict';

if( namespace[ "TestGetPrivateInstance" ] ) return

    namespace.TestGetPrivateInstance = TestGetPrivateInstance
var Static = TidBits.OoJs.setupClass( namespace, "TestGetPrivateInstance", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestGetPrivateInstance()
{
	this.Private
	(
		  runTestCase
		, authorizedAccess
		, unAuthorizedAccess
	)

	return this.Public() // only what we inherit
}


// Methods
//
function authorizedAccess()
{
	var   GetPrivate  = namespace.TestData.GetPrivateInstance
		 , GetPrivateB = namespace.TestData.GetPrivateInstanceB
	    , iFace       = new GetPrivate
	    , iFaceB      = new GetPrivateB
	    , location    = "TestGetPrivateInstance.authorizedAccess"


	this.message += "\n   Testing if we can get unauthorised access\n"

	var tests =
	[
			{
				   message : "Trying static"
				,  input   : GetPrivate.getPrivateInst( GetPrivate ).ooID === GetPrivate.ooID
				,  expect  : true
				,  errormsg: location + ": GetPrivate.getPrivateInst( GetPrivate ).ooID:" + GetPrivate.getPrivateInst( GetPrivate ).ooID + " and GetPrivate.ooID: " + GetPrivate.ooID
			}


		,  {
					message : "Trying an instance"
				,  input   : GetPrivate.getPrivateInst( iFace ).ooID === iFace.ooID
				,  expect  : true
				,  errormsg: location + ": GetPrivate.getPrivateInst( iFace ).ooID:" + GetPrivate.getPrivateInst( iFace ).ooID + " and iFace.ooID: " + iFace.ooID
			}


		,  {
					message : "Trying an subclass instance"
				,  input   : TidBits.OoJs.typeOf( GetPrivate.getPrivateInst( iFaceB ) ) === "GetPrivateInstance"
				,  expect  : true
				,  errormsg: location + ": typeOf( GetPrivate.getPrivateInst( iFaceB ) ):" + TidBits.OoJs.typeOf( GetPrivate.getPrivateInst( iFaceB ) )
			}
	]

	tests.forEach( this.run )
}



function unAuthorizedAccess()
{
	var   GetPrivate  = namespace.TestData.GetPrivateInstance
		 , GetPrivateB = namespace.TestData.GetPrivateInstanceB
	    , Single      = namespace.TestData.Single
	    , single      = new Single
		 , getPrivate  = new GetPrivate
		 , location    = "TestGetPrivateInstance.authorizedAccess"


	this.message += "\n   Testing if we get the correct private instance\n"

	var tests =
	[
			{
				   message : "Trying static"
				,  input   : GetPrivate.getPrivateInst( Single ) === null
				,  expect  : true
				,  errormsg: location + ": GetPrivate.getPrivateInst( GetPrivate ):" + GetPrivate.getPrivateInst( GetPrivate ) + " and GetPrivate: " + GetPrivate
			}


		,  {
					message : "Trying an instance"
				,  input   : GetPrivate.getPrivateInst( single ) === null
				,  expect  : true
				,  errormsg: location + ": GetPrivate.getPrivateInst( single ):" + GetPrivate.getPrivateInst( single ) + " and single: " + single
			}


		,  {
					message : "Trying an baseclass instance"
				,  input   : GetPrivateB.getPrivateInst( getPrivate ) === null
				,  expect  : true
				,  errormsg: location + ": GetPrivateB.getPrivateInst( getPrivate ):" + GetPrivateB.getPrivateInst( getPrivate ) + " and getPrivate: " + getPrivate
			}
	]

	tests.forEach( this.run )
}




function runTestCase()
{
	this.message += "\n\nStatic.getPrivateInstance TestCase\n-----------------------------------"

	this.authorizedAccess()
	this.unAuthorizedAccess()
}


})( TidBits ); // TestGetPrivateInstance


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
