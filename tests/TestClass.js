var  TidBits  = TidBits || {} // our namespace

if( 'undefined' !== typeof module )
{
	TidBits = require( './OoTestBase.js' )
}


/*
 * Takes a parameter in the constructor with general aspects of a class to test
 *
 *
 */

;(function Class_TestClass( namespace, undefined )
{
'use strict';

if( namespace[ "TestClass" ] ) return

    namespace.TestClass = TestClass
var Static              = TidBits.OoJs.setupClass( namespace, "TestClass", { inherit: "OoTestBase", as: "public" } )

Static.Protected()

// Constructor
//
function TestClass( className, caller )
{
	this.className = className
	this.layout    = TidBits.TestData.classLayout[ className ]
	this.location  = caller
	this.classObj  = TidBits.TestData[ className ]


	this.Private
	(
		  runTestCase
		, testingProperties
		, testMethodReturnValues
		, typeChecking
		, testDmValues
	)


	var iFace = this.Public() // only what we inherit

	this.layout.ancestors = this.layout.ancestors || []

	return iFace
}


// Methods
//
function runTestCase()
{
	this.message += "\n\n   Testing basic properties of class: " + this.className + "\n--------------------------------------------"

	this.typeChecking          ()
	this.testingProperties     ()
	this.testMethodReturnValues()
	this.testDmValues          ()
}


function testingProperties()
{
	this.message += "\n\n    Static: Verifying that public data members are on the interface and are the same on the private\n\n"


	var   location       = "TestClass.testingProperties for: " + this.location
	    , staticPubProps = Static.filterProperties( this.layout, { scope: "static", access: "public"             })
	    , staticAllProps = Static.filterProperties( this.layout, { scope: "static"                               })
	    , staticPubDM    = Static.filterProperties( this.layout, { scope: "static", access: "public", type: "DM" })


	// Static
	//
	this.testProperties
	(
		  this.classObj
		, staticPubProps
		, this.layout.ancestors
		, "Verify property on public  " + this.className + ": "
		, location
		, true
	)

	this.testProperties
	(
		  this.classObj.getPrivate()
		, staticAllProps
		, this.layout.ancestors
		, "Verify property on private " + this.className + ": "
		, location
		, true
	)


	this.compareDataMembers
	(
		  this.classObj
		, this.classObj.getPrivate()
		, staticPubDM
		, this.layout.ancestors
		, location
	)


	// Instance
	//
	this.message += "\n\n    Instance: Verifying that public data members are on the interface and are the same on the private\n\n"


	var   instance         = new this.classObj
	    , instancePubProps = Static.filterProperties( this.layout, { scope: "instance", access: "public"             })
	    , instanceAllProps = Static.filterProperties( this.layout, { scope: "instance"                               })
	    , instancePubDM    = Static.filterProperties( this.layout, { scope: "instance", access: "public", type: "DM" })

	this.testProperties
	(
		  instance
		, instancePubProps
		, this.layout.ancestors
		, "Verify property on public  " + this.className + " instance: "
		, location
		, true
	)

	this.testProperties
	(
		  this.classObj.getPrivateInst( instance )
		, instanceAllProps
		, this.layout.ancestors
		, "Verify property on private " + this.className + " instance: "
		, location
		, true
	)


	this.compareDataMembers
	(
		  instance
		, this.classObj.getPrivateInst( instance )
		, instancePubDM
		, this.layout.ancestors
		, location
	)
}



function testMethodReturnValues()
{
	this.message += "\n\n    Verifying the return value of methods\n\n"

	var   location             = "TestClass.testMethodReturnValues for: " + this.location
	    , instance             = new this.classObj
	    , privInstance         = this.classObj.getPrivateInst( instance )
	    , tests                = []
	    , staticReturnValues   = Static.filterProperties( this.layout, { scope: "static"  , type: "method" } )
	    , instanceReturnValues = Static.filterProperties( this.layout, { scope: "instance", type: "method" } )
	    , item



	for( var i = staticReturnValues.length - 1; i >= 0; --i )
	{
		item = staticReturnValues[i]
		if( !item.value ) continue

		tests.push
		({
			  object  : item.access === "public" ? this.classObj : this.classObj.getPrivate()
			, method  : item.name
			, expect  : item.value
			, errorMsg: location + " - Method returned: "
		})
	}


	for( i = instanceReturnValues.length - 1; i >= 0; --i )
	{
		item = instanceReturnValues[i]

		if( !item.value ) continue

		tests.push
		({
			  object  : item.access === "public" ? instance : privInstance
			, method  : item.name
			, expect  : item.value
			, errorMsg: location + " - Method returned: "
		})

	}


	this.testMethodReturn( tests )
}



function testDmValues()
{
	this.message += "\n\n    Verifying the values of data members\n"

	var   location         = "TestClass.testDmValues for: " + this.location
	    , instance         = new this.classObj
	    , privInstance     = this.classObj.getPrivateInst( instance )
	    , staticDmValues   = Static.filterProperties( this.layout, { scope: "static"  , type: "DM" } )
	    , instanceDmValues = Static.filterProperties( this.layout, { scope: "instance", type: "DM" } )
	    , tests            = []
	    , item


	for( var i = staticDmValues.length - 1; i >= 0; --i )
	{
		item = staticDmValues[i]

		if( !item.value ) continue


		tests.push
		({
			  object  : item.access === "public" ? this.classObj : this.classObj.getPrivate()
			, name    : item.name
			, expect  : item.value
			, errorMsg: location + " testing: " + item.name + " - Value found: "
		})
	}


	for( i = instanceDmValues.length - 1; i >= 0; --i )
	{
		item = instanceDmValues[i]

		if( !item.value ) continue


		tests.push
		({
			  object  : item.access === "public" ? instance : privInstance
			, name    : item.name
			, expect  : item.value
			, errorMsg: location + " testing: " + item.name + " - Value found: "
		})

	}


	for( i = 0; i < tests.length; i++ )
	{
		var test = tests[ i ]

		this.message += "\n   Testing the value of data member: " + test.name

		this.assertTrue
		(
			  test.object[ test.name ] === test.expect
			, test.errorMsg + test.object[ test.name ] + ", expected: " + test.expect
		)
	}
}



function typeChecking()
{
	this.message += "\n\n    Type checking\n\n"

	var location = " in TestClass.typeChecking for: " + this.location + "\n"

	var instance = new this.classObj
	var object   = new Object

	var tests =

	[
			{
					message : this.className + "    should     be an instance of Object\n"
				,  input   : this.classObj instanceof Object
				,  expect  : true

				,  errormsg: this.className + "  is instanceof Object" + location
			}


		,  {
					message : this.className + "    should not be an instance of TestCase\n"
				,  input   : this.classObj instanceof TidBits.TestCase
				,  expect  : false

				,  errormsg: this.className + "  is instanceof TestCase" + location
			}


		,  {
					message : "instance       should     be an instance of " + this.className + "\n"
				,  input   : instance instanceof this.classObj
				,  expect  : true

				,  errormsg: "instance is not instanceof " + this.className + " " + location
			}


		,  {
					message : "instance       should not be an instance of TestCase\n"
				,  input   : instance instanceof TidBits.TestCase
				,  expect  : false

				,  errormsg: "instance is instanceof TestCase" + location
			}


		,  {
					message : "instance       should     be an instance of Object\n"
				,  input   : instance instanceof Object
				,  expect  : true

				,  errormsg: "instance is instanceof Object" + location
			}


		,  {
					message : "Object         should not be an instance of " + this.className + " \n"
				,  input   : Object instanceof this.classObj
				,  expect  : false

				,  errormsg: "Object is instanceof " + this.className + " " + location
			}


		,  {
					message : "new Object()   should not be an instance of " + this.className + " \n"
				,  input   : object instanceof this.classObj
				,  expect  : false

				,  errormsg: "new Object() is instanceof " + this.className + " " + location
			}


		,  {
					message : "typeof " + this.className + "  should be function\n"
				,  input   : typeof this.classObj === 'function'
				,  expect  : true

				,  errormsg: this.className + "  is not a function, but: " + typeof this.classObj + location
			}


		,  {
					message : "typeof " + this.className + ".getPrivate() should be function\n"
				,  input   : typeof this.classObj.getPrivate() === 'function'
				,  expect  : true

				,  errormsg: this.className + ".getPrivate() is not a function, but: " + typeof this.classObj.getPrivate() + location
			}


		,  {
					message : "OoJs.typeOf instance should be " + this.className + " \n"
				,  input   : TidBits.OoJs.typeOf( instance ) === this.className
				,  expect  : true

				,  errormsg: "instance is not a " + this.className + " , but: " + TidBits.OoJs.typeOf( instance ) + location
			}
	]


	for( var i = this.layout.ancestors.length - 1; i >= 0; --i )
	{
		tests.push
		(
				{
						message : "instance       should     be an instance of " + this.layout.ancestors[i] + " \n"
					,  input   : instance instanceof TidBits.TestData[ this.layout.ancestors[i] ]
					,  expect  : true

					,  errormsg: "instance is not instanceof " + this.layout.ancestors[i] + " - " + location
				}

			,  {
						message : this.layout.ancestors[i] + "    should not be an instance of " + this.className + "\n"
					,  input   : TidBits.TestData[ this.layout.ancestors[i] ] instanceof this.classObj
					,  expect  : false

					,  errormsg: this.layout.ancestors[i] + "  is instanceof " + this.className + " - " + location
				}
		)
	}



	for( var i = 0; i < tests.length; i++ )
	{
		this.message += "   " + tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}



})( TidBits ); // TestClass


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
