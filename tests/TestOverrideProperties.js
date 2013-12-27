var  TidBits  = TidBits || {} // our namespace
   , TestData = {}


if( 'undefined' !== typeof module )
{
	TidBits = require( './TestClass.js' )
}


/*
 * Tests everything we can without inheritance
 */

;(function Class_TestOverrideProperties( namespace, undefined )
{
'use strict';

if( namespace[ "TestOverrideProperties" ] ) return

    namespace.TestOverrideProperties = TestOverrideProperties
var Static = TidBits.OoJs.setupClass( namespace, "TestOverrideProperties", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestOverrideProperties()
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



	this.message += "\n   Testing basic properties for OverridePropertiesA\n"

	testCase = new TidBits.TestClass( "OverridePropertiesA", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message




	testCase = new TidBits.TestClass( "OverridePropertiesB", "TestPublicInherit.basicTests" )
	message  = testCase.getResults()

	this.setTestsCount      ( this.getTestsCount      () + testCase.getTestsCount      () )
	this.setTestsPassedCount( this.getTestsPassedCount() + testCase.getTestsPassedCount() )
	this.setTestsFailedCount( this.getTestsFailedCount() + testCase.getTestsFailedCount() )

	if( testCase.getTestsFailedCount() || testCase.getDisplay() )

		this.message += message

}



function parentProperties()
{
	this.message += "\n\n    Testing parent accessors for OverridePropertiesX\n\n"

	var   layouts             = namespace.TestData.classLayout
	    , OverridePropertiesB = namespace.TestData.OverridePropertiesB
	    , location            = "TestOverrideProperties.parentProperties"

	    , pubInstanceMethods = Static.filterProperties( layouts.OverridePropertiesA, { scope: "instance", type: "method", access: "public"    } )
	    , proInstanceMethods = Static.filterProperties( layouts.OverridePropertiesA, { scope: "instance", type: "method", access: "protected" } )
	    , pubInstanceDMs     = Static.filterProperties( layouts.OverridePropertiesA, { scope: "instance", type: "DM"    , access: "public"    } )
	    , proInstanceDMs     = Static.filterProperties( layouts.OverridePropertiesA, { scope: "instance", type: "DM"    , access: "protected" } )
	    , instanceMethods    = pubInstanceMethods.concat( proInstanceMethods )
	    , instanceDMs        = pubInstanceDMs    .concat( proInstanceDMs     )

	    , pubStaticMethods   = Static.filterProperties( layouts.OverridePropertiesA, { scope: "static"  , type: "method", access: "public"    } )
	    , proStaticMethods   = Static.filterProperties( layouts.OverridePropertiesA, { scope: "static"  , type: "method", access: "protected" } )
	    , pubStaticDMs       = Static.filterProperties( layouts.OverridePropertiesA, { scope: "static"  , type: "DM"    , access: "public"    } )
	    , proStaticDMs       = Static.filterProperties( layouts.OverridePropertiesA, { scope: "static"  , type: "DM"    , access: "protected" } )
	    , staticMethods      = pubStaticMethods.concat( proStaticMethods )
	    , staticDMs          = pubStaticDMs    .concat( proStaticDMs     )

		 , Binstance    = new OverridePropertiesB
		 , BPrivInst    = OverridePropertiesB.getPrivateInst( Binstance )

		 , combined =
		   [
			     { obj: OverridePropertiesB.OverridePropertiesA             , dms: pubStaticDMs, methods: pubStaticMethods, log: "OverridePropertiesB" }
			   , { obj: OverridePropertiesB.getPrivate().OverridePropertiesA, dms: staticDMs   , methods: staticMethods   , log: "OverridePropertiesB.Static" }

			   , { obj: Binstance.OverridePropertiesA, dms: pubInstanceDMs, methods: pubInstanceMethods, log: "instance"         }
			   , { obj: BPrivInst.OverridePropertiesA, dms: instanceDMs   , methods: instanceMethods   , log: "private instance" }
		   ]

	for( var i = combined.length - 1; i >= 0; --i )
	{
		var obj = combined[ i ].obj


		for( var j = combined[ i ].dms.length - 1; j >= 0; --j )
		{
			var dm = combined[ i ].dms[ j ]

			;[{
				   input   : /^A/.test( obj[ dm.name ] )
				,  expect  : true
				,  message : "Verifying that .OverridePropertiesA." + dm.name + " points to A version\n"
				,  errorMsg: location + " - " + combined[ i ].log + "." + dm.name + " was: " + obj[ dm.name ]
			}]

			.forEach( this.run )
		}


		for( j = combined[ i ].methods.length - 1; j >= 0; --j )
		{
			var method = combined[ i ].methods[ j ]

			if( method.name === "getPrivate" || method.name === "getPrivateInst" )

				continue

			;[{
				   input   : /^A/.test( obj[ method.name ]() )
				,  expect  : true
				,  message : "Verifying that .OverridePropertiesA." + method.name + " points to A version\n"
				,  errorMsg: location + " - " + combined[ i ].log + "." + method.name + " was: " + obj[ method.name ]
			}]

			.forEach( this.run )
		}
	}
}




function runTestCase()
{
	this.message += "\n\nOverride Properties TestCase\n-----------------------------------"

	this.basicTests()
	this.parentProperties()
}


})( TidBits ); // TestOverrideProperties


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
