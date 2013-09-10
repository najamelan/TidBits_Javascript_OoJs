var TidBits = TidBits || {} // our namespace

if( 'undefined' !== typeof module )
{
	var testCase     = require( '../../UnitTesting/TestCase.js' )
	var oojsTestData = require( './oojsTestData.js' )

	TidBits.TestCase = testCase.TestCase
	TidBits.OoJs     = oojsTestData.OoJs
	TidBits.SSuper   = oojsTestData.SSuper
	TidBits.Sub      = oojsTestData.Sub
	TidBits.Subber   = oojsTestData.Subber
}


// Testing
//========

;(function Class_Test_OoJS( namespace, undefined )
{
'use strict';

if( namespace[ "Test_OoJS" ] ) return

    namespace.Test_OoJS = Test_OoJS
var Static              = namespace.OoJs.setupClass( namespace, "Test_OoJS", "TestCase" )

// shortCuts
//
var SSuper   = TidBits.SSuper
var Sub      = TidBits.Sub
var Subber   = TidBits.Subber

Static._class = "Test_OoJs"


// Constructor
//
function Test_OoJS()
{
	// Virtual methods
	//
	this.Private( this.Virtual( runTestCase ) )


	this.Protected
	(
		  typeChecking
		, accessControl
		, runTime
		, inheritance
	)


	return this.Public() // only what we inherit
}

// Runs all tests

function runTestCase()
{
	this.message += "\nRunning testcase for class OoJs...\n"


	// Unit testing methods
	this.typeChecking ()
	this.accessControl()
	this.runTime      ()
	this.inheritance  ()

}



	/*--------------------------------------------------------------
	*
	* The Tests
	*--------------------------------------------------------------*/



// test the constructor
//
function typeChecking()
{
	this.message += "\n\n Type checking\n\n"


	var sub    = new Sub
	var ssuper = new SSuper
	var object = new Object

	var tests =

	[
			{
					message : "   super          should     be an instance of SSuper\n"
				,  input   : ssuper instanceof SSuper
				,  expect  : true

				,  errormsg:     "super is not instanceof SSuper |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   super          should not be an instance of Sub\n"
				,  input   : ssuper instanceof Sub
				,  expect  : false

				,  errormsg:   "super is instanceof Sub |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   sub            should     be an instance of Sub\n"
				,  input   : sub instanceof Sub
				,  expect  : true

				,  errormsg:     "sub is not instanceof Sub |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   sub            should     be an instance of SSuper\n"
				,  input   : sub instanceof SSuper
				,  expect  : true
				,  errormsg: "sub is not instanceof SSuper" + ' |~| in: ' + Static._class + '.typeChecking\n'
			}


		,  {
					message : "   SSuper         should     be an instance of Object\n"
				,  input   : SSuper instanceof Object
				,  expect  : true

				,  errormsg:   "SSuper is instanceof Object |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   Sub            should     be an instance of Object\n"
				,  input   : Sub instanceof Object
				,  expect  : true

				,  errormsg:   "Sub is instanceof Object |~| in: " + Static._class + ".typeChecking\n"
		   }


		,  {
					message : "   super          should     be an instance of Object\n"
				,  input   : ssuper instanceof Object
				,  expect  : true

				,  errormsg:   "super is instanceof Object |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   sub            should     be an instance of Object\n"
				,  input   : sub instanceof Object
				,  expect  : true

				,  errormsg:   "sub is instanceof Object |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   SSuper         should not be an instance of Sub\n"
				,  input   : SSuper instanceof Sub
				,  expect  : false

				,  errormsg:   "SSuper is instanceof Sub |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   Object         should not be an instance of SSuper\n"
				,  input   : Object instanceof SSuper
				,  expect  : false

				,  errormsg:   "Object is instanceof SSuper |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   Object         should not be an instance of Sub\n"
				,  input   : Object instanceof Sub
				,  expect  : false

				,  errormsg:   "Object is instanceof Sub |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   new Object()   should not be an instance of SSuper\n"
				,  input   : object instanceof SSuper
				,  expect  : false

				,  errormsg:   "new Object() is instanceof SSuper |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   new Object()   should not be an instance of Sub\n"
				,  input   : object instanceof Sub
				,  expect  : false

				,  errormsg:   "new Object() is instanceof Sub |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   typeof SSuper should be function\n"
				,  input   : typeof SSuper === 'function'
				,  expect  : true

				,  errormsg:   "SSuper is not a function, but: " + typeof SSuper + " |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   typeof Sub should be function\n"
				,  input   : typeof Sub === 'function'
				,  expect  : true

				,  errormsg:   "Sub is not a function, but: " + typeof Sub + " |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   typeof SSuper.getPrivateStatic() should be function\n"
				,  input   : typeof SSuper.getPrivateStatic() === 'function'
				,  expect  : true

				,  errormsg:   "SSuper.getPrivateStatic() is not a function, but: " + typeof SSuper.getPrivateStatic() + " |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   typeof Sub.getPrivateStatic() should be function\n"
				,  input   : typeof Sub.getPrivateStatic() === 'function'
				,  expect  : true

				,  errormsg:   "Sub.getPrivateStatic() is not a function, but: " + typeof Sub.getPrivateStatic() + " |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   OoJs.typeOf ssuper should be SSuper\n"
				,  input   : TidBits.OoJs.typeOf( ssuper ) === 'SSuper'
				,  expect  : true

				,  errormsg:   "ssuper is not a SSuper, but: " + TidBits.OoJs.typeOf( ssuper ) + " |~| in: " + Static._class + ".typeChecking\n"
			}


		,  {
					message : "   OoJs.typeOf sub should be Sub\n"
				,  input   : TidBits.OoJs.typeOf( sub ) === 'Sub'
				,  expect  : true

				,  errormsg:   "sub is not a Sub, but: " + TidBits.OoJs.typeOf( sub ) + " |~| in: " + Static._class + ".typeChecking\n"
			}
	]



	for( var i = 0; i < tests.length; i++ )
	{
		this.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}



/// Call public methods and try to access private stuff
//
function accessControl()
{
	this.message += "\n\n Access Control\n\n"

	var sub    = new Sub  ()
	var ssuper = new SSuper()

	var tests =
	[

			{
					message : "   call a public static method on SSuper\n"
				,  input   : SSuper.staticSSuperPublicMethod() === "SSuper: static public method"
				,  expect  : true

				,  errormsg:     "SSuper.staticSSuperPublicMethod() returned: " +  SSuper.staticSSuperPublicMethod()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call a public static method on Sub\n"
				,  input   : Sub.staticSubPublicMethod() === "Sub: static public method"
				,  expect  : true

				,  errormsg:     "Sub.staticSubPublicMethod() returned: " +  Sub.staticSubPublicMethod()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call a public instance method on super\n"
				,  input   : ssuper.instanceSSuperPublicMethod() === "super: instance public method"
				,  expect  : true

				,  errormsg:     "super.instanceSSuperPublicMethod() returned: " +  ssuper.instanceSSuperPublicMethod()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call a public instance method on Sub\n"
				,  input   : sub.instanceSubPublicMethod() === "sub: instance public method"
				,  expect  : true

				,  errormsg:     "sub.instanceSubPublicMethod() returned: " +  sub.instanceSubPublicMethod()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call a public static method on SSuper from Sub\n"
				,  input   : Sub.callSSuperStatic() === "SSuper: static public method"
				,  expect  : true

				,  errormsg:     "Sub.callSSuperStatic() returned: " +  Sub.callSSuperStatic()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call a public instance method on SSuper from sub\n"
				,  input   : sub.callSSuperInstance() === "super: instance public method"
				,  expect  : true

				,  errormsg:     "sub.callSSuperInstance() returned: " +  sub.callSSuperInstance()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call an inherited public static method on Sub\n"
				,  input   : Sub.staticSSuperPublicMethod() === "SSuper: static public method"
				,  expect  : true

				,  errormsg:     "Sub.staticSSuperPublicMethod() returned: " +  Sub.staticSSuperPublicMethod()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call an inherited public instance method on sub\n"
				,  input   : sub.instanceSSuperPublicMethod() === "super: instance public method"
				,  expect  : true

				,  errormsg:     "sub.instanceSSuperPublicMethod() returned: " +  sub.instanceSSuperPublicMethod()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call an inherited Protected static method on Sub\n"
				,  input   : Sub.callSSuperProtectedStatic() === "SSuper: static Protected method"
				,  expect  : true

				,  errormsg:     "Sub.callSSuperProtectedStatic() returned: " +  Sub.callSSuperProtectedStatic()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   call an inherited Protected instance method on sub\n"
				,  input   : sub.callSSuperProtectedInstance() === "super: instance Protected method"
				,  expect  : true

				,  errormsg:     "sub.callSSuperProtectedInstance() returned: " +  sub.callSSuperProtectedInstance()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}









			/// Data Members
			//

		,  {
					message : "   access a public static DM on SSuper\n"
				,  input   : SSuper.publicSSuperStaticOptions.lineheight === 12
				,  expect  : true

				,  errormsg:     "SSuper.publicSSuperStaticOptions.lineheight returned: " +  SSuper.publicSSuperStaticOptions.lineheight
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a public static inherited DM on Sub\n"
				,  input   : Sub.publicSSuperStaticOptions.lineheight === 12
				,  expect  : true

				,  errormsg:     "Sub.publicSSuperStaticOptions.lineheight returned: " +  Sub.publicSSuperStaticOptions.lineheight
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a public static DM on Sub\n"
				,  input   : Sub.publicSubStaticDM === 'A static subclass DM'
				,  expect  : true

				,  errormsg:     "Sub.publicSubStaticDM returned: " +  Sub.publicSubStaticDM
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a public instance DM on ssuper\n"
				,  input   : ssuper.publicSSuperInstanceDM.a === 'An instance super DM'
				,  expect  : true

				,  errormsg:     "ssuper.publicSSuperInstanceDM returned: " +  ssuper.publicSSuperInstanceDM
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a public inherited instance DM on sub\n"
				,  input   : sub.publicSSuperInstanceDM.a === 'An instance super DM'
				,  expect  : true

				,  errormsg:     "sub.publicSSuperInstanceDM returned: " +  sub.publicSSuperInstanceDM
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a public instance DM on sub\n"
				,  input   : sub.publicSubInstanceDM.a === 'sub Public Instance DM'
				,  expect  : true

				,  errormsg:     "sub.publicSubInstanceDM returned: " +  sub.publicSubInstanceDM
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a protected inherited static DM on Sub\n"
				,  input   : Sub.getPrivateStatic().protectedStaticSSuperDM.a === 'Protected Static SSuper DM'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().protectedStaticSSuperDM returned: " +  Sub.getPrivateStatic().protectedStaticSSuperDM
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a protected inherited instance DM on sub\n"
				,  input   : sub.getPrivateInstance().protectedInstanceSSuperDM.a === 'Protected Instance SSuper DM'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().protectedInstanceSSuperDM returned: " +  sub.getPrivateInstance().protectedInstanceSSuperDM
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a protected inherited member on .SSuper on sub\n"
				,  input   : sub.getPrivateInstance().SSuper.protectedInstanceSSuperDM.a === 'Protected Instance SSuper DM'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().SSuper.protectedInstanceSSuperDM.a returned: " +  sub.getPrivateInstance().SSuper.protectedInstanceSSuperDM.a
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}


		,  {
					message : "   access a public inherited member on .SSuper on sub\n"
				,  input   : sub.getPrivateInstance().SSuper.instanceSSuperPublicMethod() === 'super: instance public method'
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().SSuper.instanceSSuperPublicMethod() returned: " +  sub.getPrivateInstance().SSuper.instanceSSuperPublicMethod()
									+ ' |~| in: ' + Static._class + '.accessControl\n'
			}










			/// Try to get unauthorised access
			//

		,  {
					message : "   try  to access private members from outside (8 tests)\n"
				,  input   : SSuper.staticSSuperPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "SSuper.staticSSuperPrivateMethod method is not undefined: " +  typeof SSuper.staticSubPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : ""
				,  input   : SSuper.__base__ === undefined
				,  expect  : true

				,  errormsg:     "SSuper.__base__ is not undefined: " +  typeof SSuper.__base__
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : ""
				,  input   : ssuper.instanceSSuperPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "ssuper.instanceSSuperPrivateMethod method is not undefined: "
									+ typeof ssuper.instanceSSuperPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : ""
				,  input   : ssuper.privateSSuperInstanceDM === undefined
				,  expect  : true

				,  errormsg:     "ssuper.privateSSuperInstanceDM is not undefined: " +  typeof ssuper.privateSSuperInstanceDM
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : ""
				,  input   : Sub.staticSubPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.staticSubPrivateMethod method is not undefined: " +  typeof Sub.staticSubPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : ""
				,  input   : Sub.__base__ === undefined
				,  expect  : true

				,  errormsg:     "Sub.__base__ is not undefined: " +  typeof Sub.__base__
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : ""
				,  input   : sub.instanceSubPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.instanceSubPrivateMethod method is not undefined: " +  typeof sub.instanceSubPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : ""
				,  input   : sub.privateSubInstanceDM === undefined
				,  expect  : true

				,  errormsg:     "sub.privateSubInstanceDM is not undefined: " +  typeof sub.privateSubInstanceDM
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected SSuper method from outside\n"
				,  input   : SSuper.staticSSuperProtectedMethod === undefined
				,  expect  : true

				,  errormsg:     "SSuper.staticSSuperProtectedMethod method is not undefined: " +  typeof SSuper.staticSSuperProtectedMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected super method from outside\n"
				,  input   : ssuper.instanceSSuperProtectedMethod === undefined
				,  expect  : true

				,  errormsg:     "ssuper.instanceSSuperProtectedMethod is not undefined: " +  typeof ssuper.instanceSSuperProtectedMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected SSuper method via Sub\n"
				,  input   : Sub.staticSSuperProtectedMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.staticSSuperProtectedMethod method is not undefined: " +  typeof Sub.staticSSuperProtectedMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a protected super method via sub\n"
				,  input   : sub.instanceSSuperProtectedMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.instanceSSuperProtectedMethod is not undefined: " +  typeof sub.instanceSSuperProtectedMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}




		,  {
					message : "   try  accessing a Private SSuper method via Sub\n"
				,  input   : Sub.getPrivateStatic().staticSSuperPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().staticSSuperPrivateMethod method is not undefined: " +  typeof Sub.getPrivateStatic().staticSSuperPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private super method via sub\n"
				,  input   : sub.getPrivateInstance().instanceSSuperPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().instanceSSuperPrivateMethod is not undefined: " +  typeof sub.getPrivateInstance().instanceSSuperPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private SSuper Data Member via Sub\n"
				,  input   : Sub.accessSSuperStaticPrivateDM() === 'undefined'
				,  expect  : true

				,  errormsg:     "Sub.accessSSuperStaticPrivateDM() Data Member is not undefined: " +  Sub.accessSSuperStaticPrivateDM()
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private super Data Member via sub\n"
				,  input   : sub.accessInstanceStaticPrivateDM() === 'undefined'
				,  expect  : true

				,  errormsg:     "sub.accessInstanceStaticPrivateDM() is not undefined: " +  sub.accessInstanceStaticPrivateDM()
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  calling a static public method on instance\n"
				,  input   : sub.getPrivateInstance().staticSubPublicMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSubPublicMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSubPublicMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  calling a static private method on instance\n"
				,  input   : sub.getPrivateInstance().staticSubPublicMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSubPublicMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSubPublicMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  calling a static public method on instance\n"
				,  input   : sub.getPrivateInstance().staticSSuperPublicMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSSuperPublicMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSSuperPublicMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  calling a static private method on instance\n"
				,  input   : sub.getPrivateInstance().staticSSuperProtectedMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSSuperProtectedMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSSuperProtectedMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  calling a static private method on instance\n"
				,  input   : sub.getPrivateInstance().staticSSuperPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().staticSSuperPrivateMethod is not undefined: " +  typeof sub.getPrivateInstance().staticSSuperPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private instance method on Static\n"
				,  input   : Sub.getPrivateStatic().instanceSubPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSubPrivateMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSubPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private instance method on Static\n"
				,  input   : Sub.getPrivateStatic().instanceSubPublicMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSubPublicMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSubPublicMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private SSuper instance method on Static\n"
				,  input   : Sub.getPrivateStatic().instanceSSuperPrivateMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSSuperPrivateMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSSuperPrivateMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected instance method on Static\n"
				,  input   : Sub.getPrivateStatic().instanceSSuperProtectedMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSSuperProtectedMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSSuperProtectedMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Public instance method on Static\n"
				,  input   : Sub.getPrivateStatic().instanceSSuperPublicMethod === undefined
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().instanceSSuperPublicMethod method is not undefined: " +  typeof Sub.getPrivateStatic().instanceSSuperPublicMethod
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Private super Data Member via sub.SSuper\n"
				,  input   : sub.getPrivateInstance().SSuper.privateSSuperInstanceDM === undefined
				,  expect  : true

				,  errormsg:     "typeof sub.getPrivateInstance().SSuper.privateSSuperInstanceDM is not undefined: " +  typeof sub.getPrivateInstance().SSuper.privateSSuperInstanceDM
									+ ' |~| in: ' + Static._class + '.accessControl'
			}




			/// Data members
			//

		,  {
					message : "   try  accessing a Protected static dm on SSuper\n"
				,  input   : SSuper.protectedStaticSSuperDM === undefined
				,  expect  : true

				,  errormsg:     "SSuper.protectedStaticSSuperDM method is not undefined: " +  typeof SSuper.protectedStaticSSuperDM
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected Instance dm on ssuper\n"
				,  input   : ssuper.protectedInstanceSSuperDM === undefined
				,  expect  : true

				,  errormsg:     "ssuper.protectedInstanceSSuperDM method is not undefined: " +  typeof ssuper.protectedInstanceSSuperDM
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected Instance dm inherited on sub\n"
				,  input   : sub.protectedInstanceSSuperDM === undefined
				,  expect  : true

				,  errormsg:     "sub.protectedInstanceSSuperDM method is not undefined: " +  typeof sub.protectedInstanceSSuperDM
									+ ' |~| in: ' + Static._class + '.accessControl'
			}


		,  {
					message : "   try  accessing a Protected static dm on Sub\n"
				,  input   : Sub.protectedStaticSubDM === undefined
				,  expect  : true

				,  errormsg:     "Sub.protectedStaticSubDM method is not undefined: " +  typeof Sub.protectedStaticSubDM
									+ ' |~| in: ' + Static._class + '.accessControl'
			}
]


	for( var i = 0; i < tests.length; i++ )
	{
		this.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}


/// Call public methods and try to access private stuff
//
function runTime()
{
	this.message += "\n\n Run time scenarios\n\n"

	var subber = new Subber()
	var sub    = new Sub   ()
	var sub2   = new Sub   ()
	var ssuper = new SSuper ()

	var tests =

	[
			{
					message : "   getter on   Static SSuper Data Member\n"
				,  input   : SSuper.getSSuperStaticCounter() === 5
				,  expect  : true

				,  errormsg:     "SSuper.getSSuperStaticCounter() returned (should have been 5): " +  SSuper.getSSuperStaticCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   getter on Instance SSuper Data Member\n"
				,  input   : ssuper.getSSuperInstanceCounter() === 3
				,  expect  : true

				,  errormsg:     "super.getSSuperInstanceCounter() returned (should have been 3): " +  ssuper.getSSuperInstanceCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   setter on   Static SSuper Data Member\n"

				,  input   :   (  function()
										{
											SSuper.setSSuperStaticCounter()
											return SSuper.getSSuperStaticCounter()
										}
									)  ()

				,  expect  : 6

				,  errormsg:     "SSuper.getSSuperStaticCounter() returned (should have been 6): " +  SSuper.getSSuperStaticCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   setter on Instance super  Data Member\n"

					,  input   :   (  function()
											{
												ssuper.setSSuperInstanceCounter()
												return ssuper.getSSuperInstanceCounter()
											}
										)  ()

					,  expect  : 4

				,  errormsg:     "super.getSSuperInstanceCounter() returned (should have been 4): " +  ssuper.getSSuperInstanceCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   getter on   Static SSuper Data Member via Sub\n"
				,  input   : Sub.getSSuperStaticCounter() === 6
				,  expect  : true

				,  errormsg:     "Sub.getSSuperStaticCounter() returned (should have been 6): " +  Sub.getSSuperStaticCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   getter on Instance SSuper Data Member via sub\n"
				,  input   : sub.getSSuperInstanceCounter() === 3
				,  expect  : true

				,  errormsg:     "sub.getSSuperInstanceCounter() returned (should have been 3): " +  sub.getSSuperInstanceCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   setter on   Static SSuper Data Member via Sub\n"

				,  input   :   (  function()
										{
											Sub.setSSuperStaticCounter()
											return SSuper.getSSuperStaticCounter()
										}
									)  ()

				,  expect  : 7

				,  errormsg:     "SSuper.getSSuperStaticCounter() returned (should have been 7): " +  Sub.getSSuperStaticCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   setter on Instance super  Data Member via sub\n"

					,  input   :   (  function()
											{
												sub.setSSuperInstanceCounter()
												return sub.getSSuperInstanceCounter()
											}
										)  ()

					,  expect  : 4

				,  errormsg:     "sub.getSSuperInstanceCounter() returned (should have been 4): " +  sub.getSSuperInstanceCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   setter on Instance super  Data Member via subber\n"

					,  input   :   (  function()
											{
												subber.setSSuperInstanceCounter()
												return subber.getSSuperInstanceCounter()
											}
										)  ()

					,  expect  : 4

				,  errormsg:     "subber.getSSuperInstanceCounter() returned (should have been 4): " +  subber.getSSuperInstanceCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   setter on   Static SSuper Data Member via inherited protected method in Sub\n"

				,  input   :   (  function()
										{
											Sub.callSSuperProtectedStaticCounter()
											return SSuper.getSSuperStaticCounter()
										}
									)  ()

				,  expect  : 8

				,  errormsg:     "SSuper.getSSuperProtectedStaticCounter() returned (should have been 8): " +  Sub.getSSuperStaticCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   setter on Instance super  Data Member via inherited protected method in sub\n"

				,  input   :   (  function()
										{
											sub2.callSSuperProtectedInstanceCounter()
											return sub2.getSSuperInstanceCounter()
										}
									)  ()

				,  expect  : 4

				,  errormsg:     "sub2.getSSuperInstanceCounter() returned (should have been 4): " +  sub2.getSSuperInstanceCounter()
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   accessing Static public DM should be consistent with the private version\n"

				,  input   :   (  function()
										{
											SSuper.publicSSuperStaticOptions.width = 120
											return SSuper.getPrivateStatic().publicSSuperStaticOptions.width
										}
									)  ()

				,  expect  : 120

				,  errormsg:     "SSuper.getPrivateStatic().publicSSuperStaticOptions.width returned (should have been 120): " +  SSuper.getPrivateStatic().publicSSuperStaticOptions.width
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   accessing Static public DM should be consistent with the private version (reverse test)\n"

				,  input   :   (  function()
										{
											SSuper.getPrivateStatic().publicSSuperStaticOptions.width += 120
											return SSuper.publicSSuperStaticOptions.width
										}
									)  ()

				,  expect  : 240

				,  errormsg:     "SSuper.publicSSuperStaticOptions.width returned (should have been 240): " +  SSuper.publicSSuperStaticOptions.width
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   accessing the private instance via Static if you have an interface\n"
				,  input   : Sub.getPrivateStatic().getPrivateInstance( sub ).ooID === sub.ooID
				,  expect  : true
				,  errormsg:     "Sub.getPrivateStatic().getPrivateInstance( sub ).ooID did not equal sub.ooID: " +  Sub.getPrivateStatic().getPrivateInstance( sub ).ooID
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   accessing the private instance via parent class Static if you have an interface\n"
				,  input   : SSuper.getPrivateStatic().getPrivateInstance( sub ).ooID === sub.getPrivateInstance().SSuper.ooID
				,  expect  : true
				,  errormsg:     "SSuper.getPrivateStatic().getPrivateInstance( sub ).ooID did not equal sub.SSuper.ooID: " +  SSuper.getPrivateStatic().getPrivateInstance( sub ).ooID
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}


		,  {
					message : "   should not be able to access the private instance via Static if you are in a different class\n"
				,  input   : Sub.getPrivateStatic().getPrivateInstance( ssuper ) === null
				,  expect  : true
				,  errormsg:     "Sub.getPrivateStatic().getPrivateInstance( ssuper ) did not equal null: " +  Sub.getPrivateStatic().getPrivateInstance( ssuper )
									+ ' |~| in: ' + Static._class + '.runTime\n'
			}
	]



	for( var i = 0; i < tests.length; i++ )
	{
		this.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}




function inheritance()
{
	this.message += "\n\n Inheritance\n\n"


	var sub    = new Sub   ( "sub-instance" )
	var subber = new Subber
	var ssuper = new SSuper

	var tests =
	[
		   {
					message : "   call an overridden Static method on Sub\n"
				,  input   : Sub.getPrivateStatic().publicSubStaticDM === 'A static subclass DM'
				,  expect  : true

				,  errormsg:     "Sub.getPrivateStatic().publicSubStaticDM returned: " +  Sub.getPrivateStatic().publicSubStaticDM
									+ ' |~| in: ' + Static._class + '.inheritance\n'
			}


		,  {
					message : "   call an overridden Static method on SSuper\n"
				,  input   : SSuper.getPrivateStatic().privateSSuperStaticDM === "Static private DM"
				,  expect  : true

				,  errormsg:     "SSuper.getPrivateStatic().privateSSuperStaticDM returned: " +  SSuper.getPrivateStatic().privateSSuperStaticDM
									+ ' |~| in: ' + Static._class + '.inheritance\n'
			}


		,  {
					message : "   call an overridden Instance method on super\n"
				,  input   : ssuper.getPrivateInstance().constructor === SSuper
				,  expect  : true

				,  errormsg:     "ssuper.getPrivateInstance().constructor returned: " +  ssuper.getPrivateInstance().constructor
									+ ' |~| in: ' + Static._class + '.inheritance\n'
			}


		,  {
					message : "   call an overridden Instance method on sub\n"
				,  input   : sub.getPrivateInstance().constructor === Sub
				,  expect  : true

				,  errormsg:     "sub.getPrivateInstance().constructor returned: " +  sub.getPrivateInstance().constructor
									+ ' |~| in: ' + Static._class + '.inheritance\n'
			}


		,  {
					message : "   test a parameter passed by SSuper()\n"
				,  input   : sub.getID() === "sub-instance"
				,  expect  : true

				,  errormsg:     "sub.getID() didn't return 'sub-instance' but: " +  sub.getID()
									+ ' |~| in: ' + Static._class + '.inheritance\n'
			}



			// Changing access levels
			//
		,  {
					message : "   make an inherited super data member protected\n"
				,  input   : Sub.publicSSuperPrimitiveDM === undefined
				,  expect  : true

				,  errormsg:     "Sub.publicSSuperPrimitiveDM is not undefined: " +  typeof Sub.publicSSuperPrimitiveDM
									+ ' |~| in: ' + Static._class + '.inheritance'
			}


		,  {
					message : "   make an inherited super data member public\n"
				,  input   : Subber.publicSSuperPrimitiveDM !== undefined
				,  expect  : true

				,  errormsg:     "Subber.publicSSuperPrimitiveDM is undefined: " +  Subber.publicSSuperPrimitiveDM
									+ ' |~| in: ' + Static._class + '.inheritance'
			}


			// virtual functions
			//

		,  {
					message : "   call a virtual method on SSuper\n"
				,  input   : ssuper.publicCallVirtualMethod() === 'SSuper version'
				,  expect  : true

				,  errormsg:     "ssuper.publicCallVirtualMethod() did not return 'SSuper version', but: "
				              +  ssuper.publicCallVirtualMethod()
								  + ' |~| in: ' + Static._class + '.inheritance'
			}


		,  {
					message : "   call a virtual method on Sub\n"
				,  input   : sub.publicCallVirtualMethod() === 'Sub version'
				,  expect  : true

				,  errormsg:     "sub.publicCallVirtualMethod() did not return 'Sub version', but: "
				              +  sub.publicCallVirtualMethod()
								  + ' |~| in: ' + Static._class + '.inheritance'
			}


		,  {
					message : "   call a virtual method on Subber\n"
				,  input   : subber.publicCallVirtualMethod() === 'Subber version'
				,  expect  : true

				,  errormsg:     "subber.publicCallVirtualMethod() did not return 'Subber version', but: "
				              +  subber.publicCallVirtualMethod()
								  + ' |~| in: ' + Static._class + '.inheritance'
			}


		,  {
					message : "   call a public virtual method on SSuper\n"
				,  input   : ssuper.publicVirtualMethod() === 'SSuper version of publicVirtual'
				,  expect  : true

				,  errormsg:     "ssuper.publicVirtualMethod() did not return 'SSuper version of publicVirtual', but: "
				              +  ssuper.publicVirtualMethod()
								  + ' |~| in: ' + Static._class + '.inheritance'
			}


		,  {
					message : "   call a public virtual method on Sub\n"
				,  input   : sub.publicVirtualMethod() === 'SSuper version of publicVirtual'
				,  expect  : true

				,  errormsg:     "sub.publicVirtualMethod() did not return 'SSuper version of publicVirtual', but: "
				              +  sub.publicVirtualMethod()
								  + ' |~| in: ' + Static._class + '.inheritance'
			}


		,  {
					message : "   call a public virtual method on Subber\n"
				,  input   : subber.publicVirtualMethod() === 'Subber version of publicVirtual'
				,  expect  : true

				,  errormsg:     "subber.publicVirtualMethod() did not return 'Subber version of publicVirtual', but: "
				              +  subber.publicVirtualMethod()
								  + ' |~| in: ' + Static._class + '.inheritance'
			}


		,  {
					message : "   call parent version of a virtual method\n"
				,  input   : subber.getPrivateInstance().Sub.publicVirtualMethod() === 'SSuper version of publicVirtual'
				,  expect  : true

				,  errormsg:     "subber.getPrivateInstance().Sub.publicVirtualMethod() did not return 'SSuper version of publicVirtual', but: "
				              +  subber.getPrivateInstance().Sub.publicVirtualMethod()
								  + ' |~| in: ' + Static._class + '.inheritance'
			}

	]



	for( var i = 0; i < tests.length; i++ )
	{
		this.message += tests[ i ].message

		this.assertTrue( tests[ i ].input === tests[ i ].expect,  tests[ i ].errormsg )
	}
}


})( TidBits ); // Test_OoJS


if( 'undefined' !== typeof module )
{
	var test = new TidBits.Test_OoJS()
	console.log( test.getResults() )

	if( test.getTestsFailedCount() )

		process.exit( test.getTestsFailedCount() );
}
