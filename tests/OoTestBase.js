var TidBits = TidBits || {} // our namespace

if( 'undefined' !== typeof module )
{
	TidBits = require( './OoTestData.js' )
}

/* Custom TestCase implementation
 * ==============================
 *
 * Provides a number of utilities to facilitate testing
 *
 * */


;(function Class_OoTestBase( namespace, undefined )
{
'use strict';

if( namespace[ "OoTestBase" ] ) return

    namespace.OoTestBase = OoTestBase
var Static               = TidBits.OoJs.setupClass( namespace, "OoTestBase", { inherit: "TestCase", as: "public" } )


Static.Protected( filterProperties, propertyNames )


// Constructor
//
function OoTestBase()
{
	this.run = run.bind( this )
	this.testMethodReturn = testMethodReturn.bind( this )


	this.Protected
	(
		  testProperties
		, compareDataMembers
		, "testMethodReturn"

		, "run"
	)

	var iFace = this.Public() // only what we inherit

	this.setDisplay( false )

	return iFace
}


// Methods
//


function filterProperties( layout, args )
{
	var result = []

	for( var i = layout.properties.length - 1; i >= 0; --i )
	{
		if
		(
			   args.type   && args.type   !== layout.properties[i].type
			|| args.scope  && args.scope  !== layout.properties[i].scope
			|| args.access && args.access !== layout.properties[i].access
		)

			continue


		result.push( layout.properties[i] )
	}

	return result
}


function propertyNames( props )
{
	var result = []

	for( var i = props.length - 1; i >= 0; --i )

		result.push( props[i].name )

	return result
}




function run( test )
{
	this.message += "   " + test.message

	this.assertTrue( test.input === test.expect,  test.errorMsg )
}



function compareDataMembers( obj1, obj2, props, exclude, errorMsg )
{
	exclude = exclude || []


	for( var i = props.length - 1; i >= 0; --i )
	{
		// since the method accessor is a function that returns a function, we can test this only for data members
		//
		if( exclude.indexOf( props[ i ].name ) === -1 )

			[{
				   input   : obj1[ props[i].name ]
				,  expect  : obj2[ props[i].name ]

				,  message :   "Verify that public and private properties are the same for: "
					          + TidBits.OoJs.typeOf( obj1 ) + "." + props[i].name + "\n"

				,  errorMsg: errorMsg
			}]
			.forEach( this.run )
	}
}



// Check that properties exist on an object and nothing else
//
function testProperties( obj, props, exclude, message, errorMsg, requireAll )
{
	for( var i = props.length - 1; i >= 0; --i )
	{
		[{
			   input   : obj[ props[i].name ] !== undefined
			,  expect  : true
			,  message : message + props[i].name + "\n"
			,  errorMsg: errorMsg
		}]

		.forEach( this.run )
	}


	if( !requireAll )

		return


	var extra = [], keys = Object.keys( obj ), propNames = Static.propertyNames( props )

	for( i = keys.length - 1; i >= 0; --i )
	{
		if( propNames.indexOf( keys[ i ] ) === -1  &&  exclude.indexOf( keys[ i ] ) === -1 )

			extra.push( keys[ i ] )
	}

	[{
		   input   : extra.length
		,  expect  : 0
		,  message : "Making sure no other properties exist on the object\n"
		,  errorMsg: "The following properties where found: " + extra
	}]
	.forEach( this.run )
}


function testMethodReturn( tests )
{
	for( var i = tests.length - 1; i >= 0; --i )
	{
		[{
			   input   : tests[i].object[ tests[i].method ]()
			,  expect  : tests[i].expect
			,  message : "Verifying return value of method: " + TidBits.OoJs.typeOf( tests[i].object ) + "." + tests[i].method + "\n"
			,  errorMsg: tests[i].errorMsg + tests[i].object[ tests[i].method ]()
		}]
		.forEach( this.run )
	}
}


})( TidBits ); // OoTestBase


if( 'undefined' !== typeof module )

	module.exports = TidBits
;
