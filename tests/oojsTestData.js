var TidBits = TidBits || {} // our namespace


if( 'undefined' !== typeof module )
{
	TidBits.OoJs = require( '../oojs.js' ).OoJs
}



;(function class_SSuper( namespace )
{
	'use strict';

	if( namespace[ "SSuper" ] ) return

	    namespace.SSuper = SSuper
	var Static           = namespace.OoJs.setupClass( namespace, "SSuper" )

	/// Declare static data members
	//
	Static.privateSSuperStaticDM      = "Static private DM"
	Static.privateSSuperStaticCounter = 5
	Static.publicSSuperStaticOptions  = { lineheight : 12 }
	Static.protectedStaticSSuperDM    = { a : 'Protected Static SSuper DM' }
	Static.publicSSuperPrimitiveDM    = false


	/// Declare static private methods
	//
	Static.Private( staticSSuperPrivateMethod )


	/// Protected static methods
	//
	Static.Protected
	(
		  staticSSuperProtectedMethod
		, setSSuperProtectedStaticCounter
		, "protectedStaticSSuperDM"
	)



	/// Public static methods
	//
	Static.Public
	(
		  staticSSuperPublicMethod
		, getSSuperStaticCounter
		, setSSuperStaticCounter
		, getPrivateStatic
		, "publicSSuperStaticOptions"
		, "publicSSuperPrimitiveDM"
	)



	/// Constructor
	//
	function SSuper( id )
	{
		/// Data members all private!
		//
		this.privateSSuperInstanceDM      = 'SSuper Private Instance DM'
		this.privateSSuperInstanceCounter = 3
		this.id                           = id
		this.publicSSuperInstanceDM       = { a: 'An instance super DM'        }
		this.protectedInstanceSSuperDM    = { a: 'Protected Instance SSuper DM' }


		/// Declare methods
		//
		this.Private
		(
			   instanceSSuperPrivateMethod

			,  this.Virtual
				(
					privateVirtualMethod
				)
		)


		this.Protected
		(
			  instanceSSuperProtectedMethod
			, setSSuperProtectedInstanceCounter
			, "protectedInstanceSSuperDM"
			, "id"
		)



		return   this.Public
					(
						  instanceSSuperPublicMethod
						, getSSuperInstanceCounter
						, setSSuperInstanceCounter
						, getPrivateInstance
						, publicCallVirtualMethod
						, publicSSuperMethodChangeAccess
						, getID

						,  this.Virtual
							(
								publicVirtualMethod
							)

						, "publicSSuperInstanceDM"
					)
	}


	function publicSSuperMethodChangeAccess()
	{
		return "SSuper version"
	}


	function getID()
	{
		return this.id
	}


	function staticSSuperPublicMethod()
	{
		return 'SSuper: static public method'
	}


	function privateVirtualMethod()
	{
		return 'SSuper version'
	}


	function publicVirtualMethod()
	{
		return 'SSuper version of publicVirtual'
	}


	function publicCallVirtualMethod()
	{
		return this.privateVirtualMethod()
	}



	function instanceSSuperPublicMethod()
	{
		return 'super: instance public method'
	}


	function staticSSuperPrivateMethod()
	{
		return 'SSuper: static Private method'
	}


	function instanceSSuperPrivateMethod()
	{
		return 'super: instance Private method'
	}


	function staticSSuperProtectedMethod()
	{
		return 'SSuper: static Protected method'
	}


	function instanceSSuperProtectedMethod()
	{
		return 'super: instance Protected method'
	}


	function getSSuperStaticCounter()
	{
		return Static.privateSSuperStaticCounter
	}


	function getSSuperInstanceCounter()
	{
		return this.privateSSuperInstanceCounter
	}


	function setSSuperStaticCounter()
	{
		Static.privateSSuperStaticCounter++
	}


	function setSSuperInstanceCounter()
	{
		this.privateSSuperInstanceCounter++
	}


	function setSSuperProtectedStaticCounter()
	{
		Static.privateSSuperStaticCounter++
	}


	function setSSuperProtectedInstanceCounter()
	{
		this.privateSSuperInstanceCounter++
	}


	function getPrivateInstance(){ return this   }
	function getPrivateStatic  (){ return Static }

})( TidBits ) // End of SSuper














/// Class Sub
//
;(function class_Sub( namespace )
{
	'use strict';

	if( namespace[ "Sub" ] ) return

	var SSuper = namespace.SSuper

	namespace.Sub = Sub
	var Static    = namespace.OoJs.setupClass( namespace, "Sub", "SSuper" )


	/// Declare static data members
	//
	Static.publicSubStaticDM    = 'A static subclass DM'
	Static.protectedStaticSubDM = { a: 'A static protected subclass DM' }

	/// Declare static methods
	//
	Static.Private
	(
		staticSubPrivateMethod
	)


	Static.Protected
	(
		"SSuper.publicSSuperPrimitiveDM"
	)


	Static.Public
	(
		  staticSubPublicMethod
		, callSSuperStatic
		, callSSuperProtectedStatic
		, accessSSuperStaticPrivateDM
		, callSSuperProtectedStaticCounter
		, getPrivateStatic
		, "publicSubStaticDM"
	)


	/// Constructor
	//
	function Sub( id )
	{
		this.Super( id )

		/// Data Members
		//
		this.privateSubInstanceDM = 'Sub Private Instance DM'
		this.publicSubInstanceDM  = { a: 'sub Public Instance DM' }


		/// Declare private methods
		//
		this.Private
		(
			   instanceSubPrivateMethod


			,  this.Virtual
				(
					privateVirtualMethod
				)

			,  "SSuper.publicSSuperMethodChangeAccess"
		)


		this.Protected()

		// Declare the public interface
		//
		var iFace =

		this.Public
		(
			  instanceSubPublicMethod
			, callSSuperInstance
			, callSSuperProtectedInstance
			, accessInstanceStaticPrivateDM
			, callSSuperProtectedInstanceCounter
			, getPrivateInstance
			, "publicSubInstanceDM"
		)


		return   iFace
	}


	function privateVirtualMethod()
	{
		return 'Sub version'
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


	function callSSuperStatic()
	{
		return SSuper.staticSSuperPublicMethod()
	}


	function callSSuperInstance()
	{
		return this.instanceSSuperPublicMethod()
	}


	function callSSuperProtectedStatic()
	{
		return Static.staticSSuperProtectedMethod()
	}


	function callSSuperProtectedInstance()
	{
		return this.instanceSSuperProtectedMethod()
	}


	function callSSuperProtectedStaticCounter()
	{
		Static.setSSuperProtectedStaticCounter()
	}


	function callSSuperProtectedInstanceCounter()
	{
		this.setSSuperProtectedInstanceCounter()
	}


	function accessSSuperStaticPrivateDM()
	{
		if
		(
			   typeof SSuper .privateSSuperStaticDM === 'undefined'
			&& typeof Sub   .privateSSuperStaticDM === 'undefined'
			&& typeof Static.privateSSuperStaticDM === 'undefined'
		)

			return 'undefined'

		else return 'this is WRONG!!!'
	}


	function accessInstanceStaticPrivateDM()
	{
		if
		(
			   typeof this.privateSSuperInstanceDM === 'undefined'
		)

			return 'undefined'

		else return 'this is WRONG!!!'
	}


	function getPrivateInstance(){ return this   }
	function getPrivateStatic  (){ return Static }

})( TidBits ) // End of Sub













/// Class Subber
//
;(function class_Subber( namespace )
{
	'use strict';

	if( namespace[ "Subber" ] ) return

	namespace.Subber = Subber
	var Static       = namespace.OoJs.setupClass( namespace, "Subber", "Sub" )


	/// Declare static data members
	//


	/// Declare static methods
	//
	Static.Private(  )


	Static.Protected
	(
	)


	Static.Public
	(
		  getPrivateStatic
		, "SSuper.publicSSuperPrimitiveDM"
	)


	/// Constructor
	//
	function Subber( id )
	{
		this.Super( id )

		/// Private Data Members
		//


		/// Declare private methods
		//
		this.Private
		(
			privateVirtualMethod
		)


		this.Protected()

		// Declare the public interface
		//
		var iFace =

		this.Public
		(
			   getPrivateInstance

			,  this.Virtual
				(
					publicVirtualMethod
				)
		)


		return   iFace
	}




	function publicVirtualMethod()
	{
		return 'Subber version of publicVirtual'
	}


	function privateVirtualMethod()
	{
		return 'Subber version'
	}

	function getPrivateInstance(){ return this   }
	function getPrivateStatic  (){ return Static }

})( TidBits ) // End of Subber


if( 'undefined' !== typeof module )
{
	module.exports.OoJs   = TidBits.OoJs
	module.exports.SSuper = TidBits.SSuper
	module.exports.Sub    = TidBits.Sub
	module.exports.Subber = TidBits.Subber
}
