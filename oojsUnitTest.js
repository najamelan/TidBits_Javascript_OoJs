var Util    = require( '../Util/Util.js' )
var TidBits = require( '../unit_testing/unitTesting.js' )
var OoJs    = require( './oojsTestData.js' )


global.Super    = OoJs.Super
global.Sub      = OoJs.Sub


// Testing
//========


// Class Test_OoJS
//
;( function( namespace )
{
	'use strict';

	var Class_Test_OoJS    = function(){}; // easy finding with the outliner of your editor

	var   __class__            = 'Test_OoJS'
	var     Class              = namespace[ __class__ ]
										= function(){ return constructor.apply( this, arguments ); }



	extend( Class, TidBits.TestCase )


	var constructor = function()
	{
		// public interface
		//
		var that  = this
		var iFace = new TidBits.TestCase()

		extend( this, iFace )


		// The tests
		//
		this.typeChecking = typeChecking


		// Virtual methods
		//
		this.runTestCase = runTestCase

		extend( iFace,
		{
			// public methods
			//
			getResults : function() { return that.getResults(); }

		})

		return iFace
	}

	// Runs all tests

	function runTestCase()
	{
		this.members.message += "\nRunning testcase for class OoJs...\n"


		// Unit testing methods
		typeChecking .apply( this )
		accessControl.apply( this )
		runTime      .apply( this )
		inheritance  .apply( this )

	}



	/*--------------------------------------------------------------
	*
	* The Tests
	*--------------------------------------------------------------*/



// test the constructor
//
function typeChecking()
{
	this.members.message += "\n\n Type checking\n\n"


	var sub    = new Sub   ()
	var ssuper = new Super ()
	var object = new Object()

	var tests =

	[
			{
					message : "   super          should     be an instance of Super\n"
				,  input   : ssuper instanceof Super
				,  expect  : true

				,  errormsg:     "super is not instanceof Super |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   super          should not be an instance of Sub\n"
				,  input   : ssuper instanceof Sub
				,  expect  : false

				,  errormsg:   "super is instanceof Sub |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   sub            should     be an instance of Sub\n"
				,  input   : sub instanceof Sub
				,  expect  : true

				,  errormsg:     "sub is not instanceof Sub |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   sub            should     be an instance of Super\n"
				,  input   : sub instanceof Super
				,  expect  : true
				,  errormsg: "sub is not instanceof Super" + ' |~| in: ' + __class__ + '.typeChecking\n'
			}


		,  {
					message : "   Super          should     be an instance of Object\n"
				,  input   : Super instanceof Object
				,  expect  : true

				,  errormsg:   "Super is instanceof Object |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   Sub            should     be an instance of Object\n"
				,  input   : Sub instanceof Object
				,  expect  : true

				,  errormsg:   "Sub is instanceof Object |~| in: " + __class__ + ".typeChecking\n"
		   }


		,  {
					message : "   super          should     be an instance of Object\n"
				,  input   : ssuper instanceof Object
				,  expect  : true

				,  errormsg:   "super is instanceof Object |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   sub            should     be an instance of Object\n"
				,  input   : sub instanceof Object
				,  expect  : true

				,  errormsg:   "sub is instanceof Object |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   Super          should not be an instance of Sub\n"
				,  input   : Super instanceof Sub
				,  expect  : false

				,  errormsg:   "Super is instanceof Sub |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   Object         should not be an instance of Super\n"
				,  input   : Object instanceof Super
				,  expect  : false

				,  errormsg:   "Object is instanceof Super |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   Object         should not be an instance of Sub\n"
				,  input   : Object instanceof Sub
				,  expect  : false

				,  errormsg:   "Object is instanceof Sub |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   new Object()   should not be an instance of Super\n"
				,  input   : object instanceof Super
				,  expect  : false

				,  errormsg:   "new Object() is instanceof Super |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   new Object()   should not be an instance of Sub\n"
				,  input   : object instanceof Sub
				,  expect  : false

				,  errormsg:   "new Object() is instanceof Sub |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   typeof Super should be function\n"
				,  input   : typeof Super === 'function'
				,  expect  : true

				,  errormsg:   "Super is not a function, but: " + typeof Super + " |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   typeof Sub should be function\n"
				,  input   : typeof Sub === 'function'
				,  expect  : true

				,  errormsg:   "Sub is not a function, but: " + typeof Sub + " |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   typeof Super.getPrivateStatic() should be function\n"
				,  input   : typeof Super.getPrivateStatic() === 'function'
				,  expect  : true

				,  errormsg:   "Super.getPrivateStatic() is not a function, but: " + typeof Super.getPrivateStatic() + " |~| in: " + __class__ + ".typeChecking\n"
			}


		,  {
					message : "   typeof Sub.getPrivateStatic() should be function\n"
				,  input   : typeof Sub.getPrivateStatic() === 'function'
				,  expect  : true

				,  errormsg:   "Sub.getPrivateStatic() is not a function, but: " + typeof Sub.getPrivateStatic() + " |~| in: " + __class__ + ".typeChecking\n"
			}
	]



	for( var i = 0; i < tests.length; i++ )
	{
		this.members.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}



/// Call public methods and try to access private stuff
//
function accessControl()
{
	this.members.message += "\n\n Access Control\n\n"

	var sub    = new Sub  ()
	var ssuper = new Super()

	var tests =
	[

			{
					message : "   call a public static method on Super\n"
				,  input   : Super.staticSuperPublicMethod() === "Super: static public method"
				,  expect  : true

				,  errormsg:     "Super.staticSuperPublicMethod() returned: " +  Super.staticSuperPublicMethod()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call a public static method on Sub\n"
				,  input   : Sub.staticSubPublicMethod() === "Sub: static public method"
				,  expect  : true

				,  errormsg:     "Sub.staticSubPublicMethod() returned: " +  Sub.staticSubPublicMethod()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call a public instance method on super\n"
				,  input   : ssuper.instanceSuperPublicMethod() === "super: instance public method"
				,  expect  : true

				,  errormsg:     "super.instanceSuperPublicMethod() returned: " +  ssuper.instanceSuperPublicMethod()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call a public instance method on Sub\n"
				,  input   : sub.instanceSubPublicMethod() === "sub: instance public method"
				,  expect  : true

				,  errormsg:     "sub.instanceSubPublicMethod() returned: " +  sub.instanceSubPublicMethod()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call a public static method on Super from Sub\n"
				,  input   : Sub.callSuperStatic() === "Super: static public method"
				,  expect  : true

				,  errormsg:     "Sub.callSuperStatic() returned: " +  Sub.callSuperStatic()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call a public instance method on Super from sub\n"
				,  input   : sub.callSuperInstance() === "super: instance public method"
				,  expect  : true

				,  errormsg:     "sub.callSuperInstance() returned: " +  sub.callSuperInstance()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call an inherited public static method on Sub\n"
				,  input   : Sub.staticSuperPublicMethod() === "Super: static public method"
				,  expect  : true

				,  errormsg:     "Sub.staticSuperPublicMethod() returned: " +  Sub.staticSuperPublicMethod()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call an inherited public instance method on sub\n"
				,  input   : sub.instanceSuperPublicMethod() === "super: instance public method"
				,  expect  : true

				,  errormsg:     "sub.instanceSuperPublicMethod() returned: " +  sub.instanceSuperPublicMethod()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call an inherited Protected static method on Sub\n"
				,  input   : Sub.callSuperProtectedStatic() === "Super: static Protected method"
				,  expect  : true

				,  errormsg:     "Sub.callSuperProtectedStatic() returned: " +  Sub.callSuperProtectedStatic()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   call an inherited Protected instance method on sub\n"
				,  input   : sub.callSuperProtectedInstance() === "super: instance Protected method"
				,  expect  : true

				,  errormsg:     "sub.callSuperProtectedInstance() returned: " +  sub.callSuperProtectedInstance()
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}









			/// Data Members
			//

		,  {
					message : "   access a public static DM on Super\n"
				,  input   : Super.publicSuperStaticOptions.lineheight === 12
				,  expect  : true

				,  errormsg:     "Super.publicSuperStaticOptions.lineheight returned: " +  Super.publicSuperStaticOptions.lineheight
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   access a public static inherited DM on Sub\n"
				,  input   : Sub.publicSuperStaticOptions.lineheight === 12
				,  expect  : true

				,  errormsg:     "Sub.publicSuperStaticOptions.lineheight returned: " +  Sub.publicSuperStaticOptions.lineheight
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   access a public static DM on Sub\n"
				,  input   : Sub.publicSubStaticDM.a === 'A static subclass DM'
				,  expect  : true

				,  errormsg:     "Sub.publicSubStaticDM returned: " +  Sub.publicSubStaticDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   access a public instance DM on ssuper\n"
				,  input   : ssuper.publicSuperInstanceDM.a === 'An instance super DM'
				,  expect  : true

				,  errormsg:     "ssuper.publicSuperInstanceDM returned: " +  ssuper.publicSuperInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   access a public inherited instance DM on sub\n"
				,  input   : sub.publicSuperInstanceDM.a === 'An instance super DM'
				,  expect  : true

				,  errormsg:     "sub.publicSuperInstanceDM returned: " +  sub.publicSuperInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   access a public instance DM on sub\n"
				,  input   : sub.publicSubInstanceDM.a === 'sub Public Instance DM'
				,  expect  : true

				,  errormsg:     "sub.publicSubInstanceDM returned: " +  sub.publicSubInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   access a protected inherited static DM on Sub\n"
				,  input   : Sub.getPrivateStatic().protectedStaticSuperDM.a === 'Protected Static Super DM'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().protectedStaticSuperDM returned: " +  Sub.getPrivateStatic().protectedStaticSuperDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   access a protected inherited instance DM on sub\n"
				,  input   : sub.getPrivateInstance().protectedInstanceSuperDM.a === 'Protected Instance Super DM'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().protectedInstanceSuperDM returned: " +  sub.getPrivateInstance().protectedInstanceSuperDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}










			/// Try to get unauthorised access
			//

		,  {
					message : "   try  to access private members from outside (8 tests)\n"
				,  input   : typeof Super.staticSuperPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Super.staticSuperPrivateMethod method is not undefined: " +  typeof Super.staticSubPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : ""
				,  input   : typeof Super.__base__ === 'undefined'
				,  expect  : true

				,  errormsg:     "Super.__base__ is not undefined: " +  typeof Super.__base__
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : ""
				,  input   : typeof ssuper.instanceSuperPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "ssuper.instanceSuperPrivateMethod method is not undefined: "
									+ typeof ssuper.instanceSuperPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : ""
				,  input   : typeof ssuper.privateSuperInstanceDM === 'undefined'
				,  expect  : true

				,  errormsg:     "ssuper.privateSuperInstanceDM is not undefined: " +  typeof ssuper.privateSuperInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : ""
				,  input   : typeof Sub.staticSubPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.staticSubPrivateMethod method is not undefined: " +  typeof Sub.staticSubPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : ""
				,  input   : typeof Sub.__base__ === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.__base__ is not undefined: " +  typeof Sub.__base__
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : ""
				,  input   : typeof sub.instanceSubPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.instanceSubPrivateMethod method is not undefined: " +  typeof sub.instanceSubPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : ""
				,  input   : typeof sub.privateSubInstanceDM === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.privateSubInstanceDM is not undefined: " +  typeof sub.privateSubInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected Super method from outside\n"
				,  input   : typeof Super.staticSuperProtectedMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Super.staticSuperProtectedMethod method is not undefined: " +  typeof Super.staticSuperProtectedMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected super method from outside\n"
				,  input   : typeof ssuper.instanceSuperProtectedMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "ssuper.instanceSuperProtectedMethod is not undefined: " +  typeof ssuper.instanceSuperProtectedMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected Super method via Sub\n"
				,  input   : typeof Sub.staticSuperProtectedMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.staticSuperProtectedMethod method is not undefined: " +  typeof Sub.staticSuperProtectedMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected super method via sub\n"
				,  input   : typeof sub.instanceSuperProtectedMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.instanceSuperProtectedMethod is not undefined: " +  typeof sub.instanceSuperProtectedMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}




		,  {
					message : "   try  accessing a Private Super method via Sub\n"
				,  input   : typeof Sub.getPrivateStatic().staticSuperPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().staticSuperPrivateMethod method is not undefined: " +  typeof Sub.getPrivateStatic().staticSuperPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private super method via sub\n"
				,  input   : typeof sub.getPrivateInstance().instanceSuperPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().instanceSuperPrivateMethod is not undefined: " +  typeof sub.getPrivateInstance().instanceSuperPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private Super Data Member via Sub\n"
				,  input   : Sub.accessSuperStaticPrivateDM() === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.accessSuperStaticPrivateDM() Data Member is not undefined: " +  Sub.accessSuperStaticPrivateDM()
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private super Data Member via sub\n"
				,  input   : sub.accessInstanceStaticPrivateDM() === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.accessInstanceStaticPrivateDM() is not undefined: " +  sub.accessInstanceStaticPrivateDM()
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  calling a static public method on instance\n"
				,  input   : typeof sub.getPrivateInstance().staticSubPublicMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSubPublicMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSubPublicMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  calling a static private method on instance\n"
				,  input   : typeof sub.getPrivateInstance().staticSubPublicMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSubPublicMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSubPublicMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  calling a static public method on instance\n"
				,  input   : typeof sub.getPrivateInstance().staticSuperPublicMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSuperPublicMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSuperPublicMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  calling a static private method on instance\n"
				,  input   : typeof sub.getPrivateInstance().staticSuperProtectedMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSuperProtectedMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSuperProtectedMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  calling a static private method on instance\n"
				,  input   : typeof sub.getPrivateInstance().staticSuperPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSuperPrivateMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSuperPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private instance method on Static\n"
				,  input   : typeof Sub.getPrivateStatic().instanceSubPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSubPrivateMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSubPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private instance method on Static\n"
				,  input   : typeof Sub.getPrivateStatic().instanceSubPublicMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSubPublicMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSubPublicMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private Super instance method on Static\n"
				,  input   : typeof Sub.getPrivateStatic().instanceSuperPrivateMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSuperPrivateMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSuperPrivateMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected instance method on Static\n"
				,  input   : typeof Sub.getPrivateStatic().instanceSuperProtectedMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSuperProtectedMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSuperProtectedMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Public instance method on Static\n"
				,  input   : typeof Sub.getPrivateStatic().instanceSuperPublicMethod === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSuperPublicMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSuperPublicMethod
									+ ' |~| in: ' + __class__ + '.accessControl'
			}




			/// Data members
			//

		,  {
					message : "   try  accessing a Protected static dm on Super\n"
				,  input   : typeof Super.protectedStaticSuperDM === 'undefined'
				,  expect  : true

				,  errormsg:     "Super.protectedStaticSuperDM method is not undefined: " +  typeof Super.protectedStaticSuperDM
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected Instance dm on ssuper\n"
				,  input   : typeof ssuper.protectedInstanceSuperDM === 'undefined'
				,  expect  : true

				,  errormsg:     "ssuper.protectedInstanceSuperDM method is not undefined: " +  typeof ssuper.protectedInstanceSuperDM
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected Instance dm inherited on sub\n"
				,  input   : typeof sub.protectedInstanceSuperDM === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.protectedInstanceSuperDM method is not undefined: " +  typeof sub.protectedInstanceSuperDM
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected static dm on Sub\n"
				,  input   : typeof Sub.protectedStaticSubDM === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.protectedStaticSubDM method is not undefined: " +  typeof Sub.protectedStaticSubDM
									+ ' |~| in: ' + __class__ + '.accessControl'
			}







		,  {
					message : "   public static DM on Super should not be writable\n"
				,  input   : Object.getOwnPropertyDescriptor( Super, "publicSuperStaticOptions" ).writable === false
				,  expect  : true

				,  errormsg:     "Super.publicSuperStaticOptions is writable: " +  Super.publicSuperStaticOptions
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public static DM on Super should not be writable on Static either\n"
				,  input   : Object.getOwnPropertyDescriptor( Super.getPrivateStatic(), "publicSuperStaticOptions" ).writable === false
				,  expect  : true

				,  errormsg:     "Super.publicSuperStaticOptions is writable: " +  Super.publicSuperStaticOptions
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public static inherited DM on Sub should not be writable\n"
				,  input   : Object.getOwnPropertyDescriptor( Sub, "publicSuperStaticOptions" ).writable === false
				,  expect  : true

				,  errormsg:     "Sub.publicSuperStaticOptions is writable: " +  Sub.publicSuperStaticOptions
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public static DM on Super should not be writable on Static via Sub either\n"
				,  input   : Object.getOwnPropertyDescriptor( Sub.getPrivateStatic(), "publicSuperStaticOptions" ).writable === false
				,  expect  : true

				,  errormsg:     "Sub.publicSuperStaticOptions is writable: " +  Sub.publicSuperStaticOptions
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public static DM on Sub should not be writable\n"
				,  input   : Object.getOwnPropertyDescriptor( Sub, "publicSubStaticDM" ).writable === false
				,  expect  : true

				,  errormsg:     "Sub.publicSubStaticDM is writable: " +  Sub.publicSubStaticDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public instance DM on ssuper should not be writable\n"
				,  input   : Object.getOwnPropertyDescriptor( ssuper, "publicSuperInstanceDM" ).writable === false
				,  expect  : true

				,  errormsg:     "ssuper.publicSuperInstanceDM is writable: " +  ssuper.publicSuperInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public instance DM on ssuper should not be writable via this either\n"
				,  input   : Object.getOwnPropertyDescriptor( ssuper.getPrivateInstance(), "publicSuperInstanceDM" ).writable === false
				,  expect  : true

				,  errormsg:     "ssuper.getPrivateInstance().publicSuperInstanceDM is writable: " +  ssuper.getPrivateInstance().publicSuperInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public inherited instance DM on sub should not be writable\n"
				,  input   : Object.getOwnPropertyDescriptor( sub, "publicSuperInstanceDM" ).writable === false
				,  expect  : true

				,  errormsg:     "sub.publicSuperInstanceDM is writable: " +  sub.publicSuperInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public instance DM on sub should not be writable\n"
				,  input   : Object.getOwnPropertyDescriptor( sub, "publicSubInstanceDM" ).writable === false
				,  expect  : true

				,  errormsg:     "sub.publicSubInstanceDM is writable: " +  sub.publicSubInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public instance DM on sub should not be writable via this either\n"
				,  input   : Object.getOwnPropertyDescriptor( sub.getPrivateInstance(), "publicSubInstanceDM" ).writable === false
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().publicSubInstanceDM is writable: " +  sub.getPrivateInstance().publicSubInstanceDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}


		,  {
					message : "   public boolean data member should not be writable\n"
				,  input   : Object.getOwnPropertyDescriptor( Super, "publicSuperPrimitiveDM" ).writable === false
				,  expect  : true

				,  errormsg:     "Super.publicSuperPrimitiveDM is writable: " +  Super.publicSuperPrimitiveDM
									+ ' |~| in: ' + __class__ + '.accessControl\n'
			}
]


	for( var i = 0; i < tests.length; i++ )
	{
		this.members.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}


/// Call public methods and try to access private stuff
//
function runTime()
{
	this.members.message += "\n\n Run time scenarios\n\n"

	var sub    = new Sub  ()
	var sub2   = new Sub  ()
	var ssuper = new Super()

	var tests =

	[
			{
					message : "   getter on   Static Super Data Member\n"
				,  input   : Super.getSuperStaticCounter() === 5
				,  expect  : true

				,  errormsg:     "Super.getSuperStaticCounter() returned (should have been 5): " +  Super.getSuperStaticCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   getter on Instance Super Data Member\n"
				,  input   : ssuper.getSuperInstanceCounter() === 3
				,  expect  : true

				,  errormsg:     "super.getSuperInstanceCounter() returned (should have been 3): " +  ssuper.getSuperInstanceCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   setter on   Static Super Data Member\n"

				,  input   :   (  function()
										{
											Super.setSuperStaticCounter()
											return Super.getSuperStaticCounter()
										}
									)  ()

				,  expect  : 6

				,  errormsg:     "Super.getSuperStaticCounter() returned (should have been 6): " +  Super.getSuperStaticCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   setter on Instance super Data Member\n"

					,  input   :   (  function()
											{
												ssuper.setSuperInstanceCounter()
												return ssuper.getSuperInstanceCounter()
											}
										)  ()

					,  expect  : 4

				,  errormsg:     "super.getSuperInstanceCounter() returned (should have been 4): " +  ssuper.getSuperInstanceCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   getter on   Static Super Data Member via Sub\n"
				,  input   : Sub.getSuperStaticCounter() === 6
				,  expect  : true

				,  errormsg:     "Sub.getSuperStaticCounter() returned (should have been 6): " +  Sub.getSuperStaticCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   getter on Instance Super Data Member via sub\n"
				,  input   : sub.getSuperInstanceCounter() === 3
				,  expect  : true

				,  errormsg:     "sub.getSuperInstanceCounter() returned (should have been 3): " +  sub.getSuperInstanceCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   setter on   Static Super Data Member via Sub\n"

				,  input   :   (  function()
										{
											Sub.setSuperStaticCounter()
											return Super.getSuperStaticCounter()
										}
									)  ()

				,  expect  : 7

				,  errormsg:     "Super.getSuperStaticCounter() returned (should have been 7): " +  Sub.getSuperStaticCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   setter on Instance super Data Member via sub\n"

					,  input   :   (  function()
											{
												sub.setSuperInstanceCounter()
												return sub.getSuperInstanceCounter()
											}
										)  ()

					,  expect  : 4

				,  errormsg:     "sub.getSuperInstanceCounter() returned (should have been 4): " +  sub.getSuperInstanceCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   setter on   Static Super Data Member via inherited protected method in Sub\n"

				,  input   :   (  function()
										{
											Sub.callSuperProtectedStaticCounter()
											return Super.getSuperStaticCounter()
										}
									)  ()

				,  expect  : 8

				,  errormsg:     "Super.getSuperProtectedStaticCounter() returned (should have been 8): " +  Sub.getSuperStaticCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   setter on Instance super Data Member via inherited protected method in sub\n"

					,  input   :   (  function()
											{
												sub2.callSuperProtectedInstanceCounter()
												return sub2.getSuperInstanceCounter()
											}
										)  ()

					,  expect  : 4

				,  errormsg:     "sub2.getSuperInstanceCounter() returned (should have been 4): " +  sub2.getSuperInstanceCounter()
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   accessing Static public DM should be consistent with the private version\n"

					,  input   :   (  function()
											{
												Super.publicSuperStaticOptions.width = 120
												return Super.getPrivateStatic().publicSuperStaticOptions.width
											}
										)  ()

					,  expect  : 120

				,  errormsg:     "Super.getPrivateStatic().publicSuperStaticOptions.width returned (should have been 120): " +  Super.getPrivateStatic().publicSuperStaticOptions.width
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}


		,  {
					message : "   accessing Static public DM should be consistent with the private version (reverse test)\n"

					,  input   :   (  function()
											{
												Super.getPrivateStatic().publicSuperStaticOptions.width += 120
												return Super.publicSuperStaticOptions.width
											}
										)  ()

					,  expect  : 240

				,  errormsg:     "Super.publicSuperStaticOptions.width returned (should have been 240): " +  Super.publicSuperStaticOptions.width
									+ ' |~| in: ' + __class__ + '.runTime\n'
			}
	]



	for( var i = 0; i < tests.length; i++ )
	{
		this.members.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}




function inheritance()
{
	this.members.message += "\n\n Inheritance\n\n"


	var sub    = new Sub   ()
	var ssuper = new Super ()
	var object = new Object()

	var tests =

	[
		   {
					message : "   call an overridden Static method on Sub\n"
				,  input   : Sub.getPrivateStatic()._meta.Class === Sub
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic()._meta.Class returned: " +  Sub.getPrivateStatic()._meta.Class
									+ ' |~| in: ' + __class__ + '.inheritance\n'
			}


		,  {
					message : "   call an overridden Static method on Super\n"
				,  input   : Super.getPrivateStatic()._meta.Class === Super
				,  expect  : true

				,  errormsg:     "Super.getPrivateStatic()._meta.Class returned: " +  Super.getPrivateStatic()._meta.Class
									+ ' |~| in: ' + __class__ + '.inheritance\n'
			}


		,  {
					message : "   call an overridden Instance method on super\n"
				,  input   : ssuper.getPrivateInstance().constructor === Super
				,  expect  : true

				,  errormsg:     "ssuper.getPrivateInstance().constructor returned: " +  ssuper.getPrivateInstance().constructor
									+ ' |~| in: ' + __class__ + '.inheritance\n'
			}


		,  {
					message : "   call an overridden Instance method on sub\n"
				,  input   : sub.getPrivateInstance().constructor === Sub
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().constructor returned: " +  sub.getPrivateInstance().constructor
									+ ' |~| in: ' + __class__ + '.inheritance\n'
			}


		,  {
					message : "   make an inherited super data member protected\n"
				,  input   : typeof Sub.publicSuperPrimitiveDM === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.publicSuperPrimitiveDM is not undefined: " +  typeof Sub.publicSuperPrimitiveDM
									+ ' |~| in: ' + __class__ + '.accessControl'
			}


	]



	for( var i = 0; i < tests.length; i++ )
	{
		this.members.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}




	function extend( root, props )
	{
		for( var key in props )
		{
			if( props.hasOwnProperty( key ) )

				root[ key ] = props[ key ]
		}

		return root
	}

})( global ); // Test_OoJS


	var test = new Test_OoJS()
	console.log( test.getResults() )

	process.exit( test.getTestsFailedCount() );
