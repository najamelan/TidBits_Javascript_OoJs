var OoJsNamespace = 'undefined' === typeof global ? window : global

var OoJs = require( './oojs.dev.js' )


/// Class Super
//
;(function( namespace )
{
	'use strict';

	    namespace.Super = Super
	var Static          = namespace.OoJs.setupClass( "Super" )

	/// Declare static data members
	//
	Static.privateSuperStaticDM      = "Static private DM"
	Static.privateSuperStaticCounter = 5
	Static.publicSuperStaticOptions  = { lineheight : 12 }
	Static.protectedStaticSuperDM    = { a : 'Protected Static Super DM' }
	Static.publicSuperPrimitiveDM    = false


	/// Declare static private methods
	//
	Static.staticSuperPrivateMethod = staticSuperPrivateMethod


	/// Protected static methods
	//
	Static.Protected
	(
		  staticSuperProtectedMethod
		, setSuperProtectedStaticCounter
		, "protectedStaticSuperDM"
	)



	/// Public static methods
	//
	Static.Public
	(
		  staticSuperPublicMethod
		, getSuperStaticCounter
		, setSuperStaticCounter
		, getPrivateStatic
		, "publicSuperStaticOptions"
		, "publicSuperPrimitiveDM"
	)



	/// Constructor
	//
	function Super( id )
	{
		/// Data members all private!
		//
		this.privateSuperInstanceDM      = 'Super Private Instance DM'
		this.privateSuperInstanceCounter = 3
		this.id                          = id
		this.publicSuperInstanceDM       = { a: 'An instance super DM'        }
		this.protectedInstanceSuperDM    = { a: 'Protected Instance Super DM' }


		/// Declare methods
		//
		this.instanceSuperPrivateMethod = instanceSuperPrivateMethod


		this.Protected
		(
			  instanceSuperProtectedMethod
			, setSuperProtectedInstanceCounter
			, "protectedInstanceSuperDM"
		)



		return   this.Public
					(
						  instanceSuperPublicMethod
						, getSuperInstanceCounter
						, setSuperInstanceCounter
						, getPrivateInstance
						, "publicSuperInstanceDM"
					)
	}


	function staticSuperPublicMethod()
	{
		return 'Super: static public method'
	}


	function instanceSuperPublicMethod()
	{
		return 'super: instance public method'
	}


	function staticSuperPrivateMethod()
	{
		return 'Super: static Private method'
	}


	function instanceSuperPrivateMethod()
	{
		return 'super: instance Private method'
	}


	function staticSuperProtectedMethod()
	{
		return 'Super: static Protected method'
	}


	function instanceSuperProtectedMethod()
	{
		return 'super: instance Protected method'
	}


	function getSuperStaticCounter()
	{
		return Static.privateSuperStaticCounter
	}


	function getSuperInstanceCounter()
	{
		return this.privateSuperInstanceCounter
	}


	function setSuperStaticCounter()
	{
		Static.privateSuperStaticCounter++
	}


	function setSuperInstanceCounter()
	{
		this.privateSuperInstanceCounter++
	}


	function setSuperProtectedStaticCounter()
	{
		Static.privateSuperStaticCounter++
	}


	function setSuperProtectedInstanceCounter()
	{
		this.privateSuperInstanceCounter++
	}


	function getPrivateInstance(){ return this   }
	function getPrivateStatic  (){ return Static }

})( OoJsNamespace ) // End of Super














/// Class Sub
//
;(function( namespace )
{
	'use strict';

	namespace.Sub = Sub
	var Static = namespace.OoJs.setupClass( "Sub", "Super" )


	/// Declare static data members
	//
	Static.publicSubStaticDM    = { a: 'A static subclass DM' }
	Static.protectedStaticSubDM = { a: 'A static protected subclass DM' }

	/// Declare static methods
	//
	/// Private
	//
	Static.staticSubPrivateMethod = staticSubPrivateMethod


	Static.Protected
	(
		"publicSuperPrimitiveDM"
	)

	Static.Public
	(
		  staticSubPublicMethod
		, callSuperStatic
		, callSuperProtectedStatic
		, accessSuperStaticPrivateDM
		, callSuperProtectedStaticCounter
		, getPrivateStatic
		, "publicSubStaticDM"
	)


	/// Constructor
	//
	function Sub( id )
	{
		this.Super( id )
		/// Private Data Members
		//
		this.privateSubInstanceDM = 'Sub Private Instance DM'
		this.publicSubInstanceDM  = { a: 'sub Public Instance DM' }
		this.id = id


		/// Declare private methods
		//
		this.instanceSubPrivateMethod = instanceSubPrivateMethod


		this.Protected()

		// Declare the public interface
		//
		var iFace =

		this.Public
		(
			  instanceSubPublicMethod
			, callSuperInstance
			, callSuperProtectedInstance
			, accessInstanceStaticPrivateDM
			, callSuperProtectedInstanceCounter
			, getPrivateInstance
			, "publicSubInstanceDM"
		)



		return   iFace
	}


	function staticSubPublicMethod()
	{
		return 'Sub: static public method'
	}


	function instanceSubPublicMethod()
	{
		return 'sub: instance public method'
	}


	function staticSubPrivateMethod()
	{
		return 'Sub: static Private method'
	}


	function instanceSubPrivateMethod()
	{
		return 'Sub: instance Private method'
	}


	function callSuperStatic()
	{
		return Super.staticSuperPublicMethod()
	}


	function callSuperInstance()
	{
		return this.instanceSuperPublicMethod()
	}


	function callSuperProtectedStatic()
	{
		return Static.staticSuperProtectedMethod()
	}


	function callSuperProtectedInstance()
	{
		return this.instanceSuperProtectedMethod()
	}


	function callSuperProtectedStaticCounter()
	{
		Static.setSuperProtectedStaticCounter()
	}


	function callSuperProtectedInstanceCounter()
	{
		this.setSuperProtectedInstanceCounter()
	}


	function accessSuperStaticPrivateDM()
	{
		if
		(
			   typeof Super .privateSuperStaticDM === 'undefined'
			&& typeof Sub   .privateSuperStaticDM === 'undefined'
			&& typeof Static.privateSuperStaticDM === 'undefined'
		)

			return 'undefined'

		else return 'this is WRONG!!!'
	}


	function accessInstanceStaticPrivateDM()
	{
		if
		(
			   typeof this             .privateSuperInstanceDM === 'undefined'
			&& typeof this._meta._iFace.privateSuperInstanceDM === 'undefined'
			&& typeof this._super      .privateSuperInstanceDM === 'undefined'
		)

			return 'undefined'

		else return 'this is WRONG!!!'
	}


	function getPrivateInstance(){ return this   }
	function getPrivateStatic  (){ return Static }

})( OoJsNamespace ) // End of Sub




// Object.constructor.toString = function() { return "Object"; }

Object.prototype.getInheritanceChain = function getInheritanceChain() {
	var parent = this.constructor;
	var inheritanceChain = []

	while ( parent != 'Object' ) {
		inheritanceChain.push( parent.functionName() );
		parent = parent.constructor;
	}
	inheritanceChain.push( parent ); //this is the Object superclass

	return inheritanceChain.join(", ");
}


if( 'undefined' !== typeof module )
{
	module.exports.Super    = Super
	module.exports.Sub      = Sub
}

// sub.publicSuperInstanceDM = 65498
// console.log( Object.getOwnPropertyDescriptor( sub, "publicSuperInstanceDM" ) );
