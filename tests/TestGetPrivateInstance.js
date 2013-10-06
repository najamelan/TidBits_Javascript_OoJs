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
		, parentProperties
		, virtuals
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
				   message : "Trying static\n"
				,  input   : GetPrivate.getPrivateInst( GetPrivate ).ooID === GetPrivate.ooID
				,  expect  : true
				,  errorMsg: location + ": GetPrivate.getPrivateInst( GetPrivate ).ooID:" + GetPrivate.getPrivateInst( GetPrivate ).ooID + " and GetPrivate.ooID: " + GetPrivate.ooID
			}


		,  {
					message : "Trying an instance\n"
				,  input   : GetPrivate.getPrivateInst( iFace ).ooID === iFace.ooID
				,  expect  : true
				,  errorMsg: location + ": GetPrivate.getPrivateInst( iFace ).ooID:" + GetPrivate.getPrivateInst( iFace ).ooID + " and iFace.ooID: " + iFace.ooID
			}


		,  {
					message : "Trying an subclass instance\n"
				,  input   : TidBits.OoJs.typeOf( GetPrivate.getPrivateInst( iFaceB ) ) === "GetPrivateInstance"
				,  expect  : true
				,  errorMsg: location + ": typeOf( GetPrivate.getPrivateInst( iFaceB ) ):" + TidBits.OoJs.typeOf( GetPrivate.getPrivateInst( iFaceB ) )
			}



			// Friend Classes
			//
			,  {
						message : "Trying as friend class\n"
					,  input   : Static.getPrivateInstance( iFace ) === GetPrivate.getPrivateInst( iFace )
					,  expect  : true
					,  errorMsg: location + ": Static.getPrivateInstance( iFace ) did not equal GetPrivate.getPrivateInst( iFace )"
				}


			,  {
						message : "Trying as friend class of Ancestor\n"
					,  input   : Static.getPrivateInstance( iFaceB ) === GetPrivate.getPrivateInst( iFaceB )
					,  expect  : true
					,  errorMsg: location + ": Static.getPrivateInstance( iFaceB ) did not equal GetPrivate.getPrivateInst( iFaceB )"
				}
	]

	tests.forEach( this.run )

	// console.log( GetPrivate.getPrivateInst( iFace ).ooID );
	// console.log( Static.getPrivateInstance( iFace ).ooID  );
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
				   message : "Trying static\n"
				,  input   : GetPrivate.getPrivateInst( Single ) === null
				,  expect  : true
				,  errorMsg: location + ": GetPrivate.getPrivateInst( GetPrivate ):" + GetPrivate.getPrivateInst( GetPrivate ) + " and GetPrivate: " + GetPrivate
			}


		,  {
					message : "Trying an instance\n"
				,  input   : GetPrivate.getPrivateInst( single ) === null
				,  expect  : true
				,  errorMsg: location + ": GetPrivate.getPrivateInst( single ):" + GetPrivate.getPrivateInst( single ) + " and single: " + single
			}


		,  {
					message : "Trying an baseclass instance\n"
				,  input   : GetPrivateB.getPrivateInst( getPrivate ) === null
				,  expect  : true
				,  errorMsg: location + ": GetPrivateB.getPrivateInst( getPrivate ):" + GetPrivateB.getPrivateInst( getPrivate ) + " and getPrivate: " + getPrivate
			}
	]

	tests.forEach( this.run )
}



function parentProperties()
{
	this.message += "\n   Testing the parent accessors on a Friend object\n"

	var   layouts      = TidBits.TestData.classLayout
	    , location     = "TestInheritPublic.parentProperties"

	    , propInstanceA = Static.filterProperties( layouts.InheritPublicA, { scope: "instance"  } )
	    , propStaticA   = Static.filterProperties( layouts.InheritPublicA, { scope: "static"    } )


	    , propInstanceB =          Static.filterProperties( layouts.InheritPublicB, { scope: "instance", access: "public"    } )
		                   .concat( Static.filterProperties( layouts.InheritPublicB, { scope: "instance", access: "protected" } ) )

	    , propStaticB   =          Static.filterProperties( layouts.InheritPublicB, { scope: "static", access: "public"    } )
		                   .concat( Static.filterProperties( layouts.InheritPublicB, { scope: "static", access: "protected" } ) )


	    , CPrivInst   = Static.getPrivateInstance( new TidBits.TestData.InheritPublicC )
		 , CPrivStatic = Static.getPrivateInstance(     TidBits.TestData.InheritPublicC )



	// InheritPublicA on InheritPublicC
	//
	this.testProperties
	(
		  CPrivInst.InheritPublicA
		, propInstanceA
		, []
		, "Verify parent property InheritPublicA on InheritPublicC instance obtained as friend: "
		, location
		, true
	)

	this.testProperties
	(
		  CPrivStatic.InheritPublicA
		, propStaticA
		, []
		, "Verify parent property InheritPublicA on InheritPublicC Static obtained as friend: "
		, location
		, true
	)



	// InheritPublicB on InheritPublicC
	//
	this.testProperties
	(
		  CPrivInst.InheritPublicB
		, propInstanceB
		, []
		, "Verify parent property InheritPublicB on InheritPublicC instance: "
		, location
		, true
	)

	this.testProperties
	(
		  CPrivStatic.InheritPublicB
		, propStaticB
		, []
		, "Verify parent property InheritPublicB on InheritPublicC Static: "
		, location
		, true
	)

}



// we have to verify that calling a virtual method on a parent accessor really gets the non-overridden version
//
function virtuals()
{
	var virtualC = Static.getPrivateInstance( new namespace.TestData.VirtualC )

	var tests =
	[
		   {
		         input   : virtualC.privateVirtualMethod() === "C version"
		      ,  expect  : true
		      ,  message : "Verify that virtualC.privateVirtualMethod() === 'C version' \n"
		      ,  errorMsg: "method returned: " + virtualC.privateVirtualMethod()
		   }

	   ,  {
	            input   : virtualC.VirtualA.privateVirtualMethod() === "A version"
	         ,  expect  : true
	         ,  message : "Verify that virtualC.VirtualA.privateVirtualMethod() === 'A version' \n"
	         ,  errorMsg: "method returned: " + virtualC.VirtualA.privateVirtualMethod()
	      }

	   ,  {
	            input   : virtualC.VirtualB.privateVirtualMethod === undefined
	         ,  expect  : true
	         ,  message : "Since we aren't a friend of B, should have VirtualB.privateVirtualMethod\n"
	         ,  errorMsg: "virtualC.VirtualB.privateVirtualMethod is not undefined"
	      }
	]



	tests.forEach( this.run )


}




function runTestCase()
{
	this.message += "\n\nStatic.getPrivateInstance TestCase\n-----------------------------------"

	this.authorizedAccess()
	this.unAuthorizedAccess()
	this.parentProperties()
	this.virtuals()
}


})( TidBits ); // TestGetPrivateInstance


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
