// Allow browser and nodejs
//
var OoJsNamespace = 'undefined' === typeof global ? window : global


/// Class OoJs
//
;(function( namespace )
{
	'use strict';

	namespace[ "OoJs" ] = OoJs
	var classes         = {}

	function Properties(){ this.own = { _public: {}, _protected: {}, _virtual: {}, _virtualize: null } }
	Properties.prototype.inherit = null

	function Meta( sub, base, Static, IFace )
	{
		this.Class = namespace[ sub  ]; this.Static = Static; this.baseName  = base
		this.Base  = namespace[ base ]; this.IFace  = IFace ; this.className = sub
		this.props = new Properties   ; this.instances = [] ; this._iFace    = namespace[ sub ]
	}

	Meta.prototype = { _accessModifier : _accessModifier }

	var Static = setupClass( "OoJs" )

	Static.Public( setupClass )
	// Static._meta.Class.extend     = extend

	function OoJs(){ return null } // Can't instanciate

	function setupClass( sub, base )
	{
		var subCl = namespace[ sub ]

		function IFace (){}
		function Static(){}

		subCl .toString = function toString(){ return "function " + sub + "()"               }
		Static.toString = function toString(){ return "function Static(){ /*" + sub + "*/ }" }

		if( 'undefined' !== typeof base )

			subCl.prototype              = Object.create( namespace[ base ].prototype )

		subCl.prototype.constructor  = subCl
		subCl.prototype.Public       = Public
		subCl.prototype.Protected    = Protected
		subCl.prototype.Super        = Super
		subCl.prototype._static      = Static


		IFace .prototype             = Object.create( subCl.prototype )
		IFace .prototype.constructor = subCl

		Static.prototype             = Object.create( subCl.prototype )
		Static.prototype.constructor = subCl


		Object.defineProperty
		(
			  Static
			, "_meta"
			, { writable: false, enumerable: false, value: new Meta( sub, base, Static, IFace ) }
		)


		if( 'undefined' !== typeof classes[ base ] )

			Static._meta._inherit = function _inherit( that ){ __inherit.call( that, classes[ base ] ) }


		// Static._Face
		Static.Public    = Public
		Static.Protected = Protected

		// Keep the meta data of our classes, so when something wants to inherit, we have the relevant information
		//
		classes[ sub ] = Static._meta

		return Static
	}

	function Public   (){ return _accessModifier.call( this, arguments, "public"    ) }
	function Protected(){        _accessModifier.call( this, arguments, "protected" ) }


	// This allows users to call parameters to their superclass constructor
	//
	function Super()
	{
		if( 'undefined' !== typeof this._super )

			throw new Error( "You have to call Super before calling Public or Protected." )


		_Super.apply( this, arguments )
	}


	// function _Super
	// Creates a public interface which has protected members
	//
	// The difference between an inherited public interface and one created directly by a client
	// is that the inherited _super property should also allow subclass code to access protected
	// members. Since Super() can only be called from a private object, we know this instantiation
	// should also have protected members on it
	//
	function _Super()
	{
		if( 'undefined' === typeof this._super )

			this._super = new this._static._meta.Base( arguments )

		// make sure we have a _meta
		//
		_initMeta( this )


		// get the private object belonging to _super
		//
		var that = classes[ this._meta.baseName ].instances[ this._super._uuid ]


		// if( 'undefined' !== typeof that && 'undefined' !== that.props )

			this._meta.props.inherit = that._meta.props.own

		// else

		// 	this._meta.props.inherit = new Properties().own

		extend( this._super, that._meta.props.own._protected )
	}



	function _initMeta( that )
	{
		// For instances, give them a meta object
		//
		if( ! that._meta )
		{
			that._meta =

			new Meta
			(
				  that._static._meta.Class
				, that._static._meta.baseName
				, that._static._meta.Static
				, that._static._meta.IFace
			)
		}

		// no longer needed, exists only to make this possible
		//
		delete that._static
	}



	/// function __inherit
	//
	// Gives subclasses the public and protected properties. Is first called by _accessModifier
	// The this object for this function is the Static or this object that comes to inherit.
	// The classMeta are from the baseclass being inherited from.
	//
	//
	// @param this      is the object that comes to inherit (subclass)
	// @param classMeta context of the class in which we run (base class)
	//
	function __inherit( classMeta )
	{
		switch( typeof this )
		{
			case 'function' : // do static stuff here

				this._meta.props.inherit = classMeta.props.own
				break


			case 'object'   : // do instance stuff here

				// will create a super object if the user hasn't called Super before and
				// will set this._meta.props.inherit to the own props of the super
				//
				_Super.apply( this )
		}

	}


	/// function _accessModifier
	//
	// Backend to Public() and Protected(). Calls attach in with the right parameters so we get our object set up.
	//
	// @param this      needs to have it's this set to the object we're patching
	// @param args      the list of arguments past to Protect or Public
	// @param access    the access level, string "public" or "protected"
	//
	// @return the public interface for the object. This is what the constructor should return
	//
	function _accessModifier( newProps, access )
	{
		// make sure this instance has a _meta
		//
		_initMeta( this )


		// just shortcuts
		//
		var props     = this._meta.props
		var classMeta = this._meta.Static._meta

		// if the baseclass isn't supporting OoJs, no inherit function will be defined.
		// just give this object the necessary properties that normally get set by _inherit
		//
		if( 'undefined' === typeof classMeta._inherit )

			this._meta.props.inherit = new Properties().own


		// else, if we haven't already inherited, do it now
		//
		else if( !props.inherit )

			classMeta._inherit( this )


		// if public, create a new IFace to return and store an id to the private object, in case a subclass
		// comes to inherit, we need to attach their methods to the right instance
		//
		if( access === "public" )
		{
			if( 'object' === typeof this )
			{
				this._meta._iFace       = new classMeta.IFace
				this._meta._iFace._uuid = Math.random()

				classMeta.instances[ this._meta._iFace._uuid ] = this
			}

			// If it is static, no need to create an IFace, since the constructor serves as public interface
			//
			attach.call( this, newProps, props.inherit._public, props.inherit._protected, [ props.own._public, this._meta._iFace ] )

			return this._meta._iFace
		}


		// Protected, just store in this._meta.props.own._protected for subclasses later
		//
		else
		{
			attach.call( this, newProps, props.inherit._protected, props.inherit._public, [ props.own._protected ] )
		}
	}


	/// function attach
	//
	// Merges inherited with new properties to set them all on this and on the public interface for the object.
	// Also stores the values in case a subclass object later comes to inherit from us, we just pass them our interface.
	//
	// @param this          should be set to the private object we're patching (this or Static)
	// @param newProperties the new properties delivered via params of either Protected() or Public()
	// @param mainProps     the inherited properties corresponding to the access level for the newProperties
	// @param altProps      the alternate inherited properties (public if main where protected)
	// @param iFaces        an array of interfaces. (Class for static, iFace for instance in case of public),
	//                      as well as this._meta.props.own._public or ._protected respective.
	//
	function attach( newProperties, mainProps, altProps, iFaces )
	{
		for( var i = newProperties.length - 1; i >= 0; --i )
		{
			var name = newProperties[i]
			var own  = true
			var prop

			// if it is a function in the scope of Public/Protected:
			//
			switch( typeof name )
			{
				case 'function':

					name = /\W*function\W+([\w\$]+)\(/.exec( name.toString() )[ 1 ]

					prop = newProperties[i]
					own  = true

					break


				case 'string':

					// we assume that the property exist and store it. We will later test for undefined
					//
					prop = this[ name ]
					own  = true

					break


				default:

					throw new TypeError( "The second parameter and onewards of Public/Protected should be either valid function references or strings. You passed: " + name )

			}


			// loop over the inherited ones
			// if the property existed on this, delete all other references
			// if it didn't exist, maybe it was an inherited one for which the access level is being
			// overridden. Try to find the reference and store it.
			//
			var inherited = [ mainProps, altProps ]

			for( var j = 1; j >= 0; --j )
			{
				// We haven't found it on this, and there is an inherited version available: take the reference
				//
				if( 'undefined' === typeof prop  &&  'undefined' !== typeof inherited[ j ][ name ] )
				{
					prop = inherited[ j ][ name ]
					own  = false
				}

				// remove the reference, to prevent the same one being imported on both public and protected
				//
				delete inherited[ j ][ name ]
			}


			// if we haven't found it anywhere, throw an error
			//
			if( 'undefined' === typeof prop )

				throw new Error( "Couldn't find an implementation for property: " + name + " that you wanted to make public/protected. In class: " + this._meta.className )


			// all good, set it
			//
			setProp( this, name, prop, iFaces, own )
		}

		// Put the non overridden inherited functions on this and the interfaces
		//
		for( var key in mainProps )
		{
			setProp( this, key, mainProps[ key ], iFaces, false )
		}
	}


	// Helper function to create anonymous functions outside loops with closures
	//
	function iHateClosures( fun, that ){ return function(){ return fun.apply( that, arguments ) } }


	/// function setProp
	//
	// sets the property on the right object with proper attributes
	//
	// @param that     the this value for the object being patched
	// @param propName the name of the property
	// @param property the reference to the object or function
	// @param iFaces   the public interface or _meta._props_own
	// @param own      whether it is an own property of this (so we don't wrap functions that are already wrapped)
	//
	function setProp( that, propName, property, iFaces, own )
	{
		// take the right action considering whether the property is a data member or a function
		//
		switch( typeof property )
		{
			case 'function':

				// put it on this
				//
				that[ propName ] = property

				// If the method ends on another object, it needs to have the reference 'this' to this private
				// object in order to access other methods and data members, so wrap it unless it's already wrapped
				//
				for( var k = iFaces.length - 1; k >= 0; --k )
				{
					if( own )

						iFaces[ k ][ propName ] = iHateClosures( property, that )

					else

						iFaces[ k ][ propName ] = property

				}

				break

			case 'string' :
			case 'number' :
			case 'boolean':
			case 'object' :

				iFaces.push( that )

				for( var l = iFaces.length - 1; l >= 0; --l )
				{
					// Set a datamember with writable to false. This will prevent people from overwriting
					// the reference and having the public interface pointing to a different object than
					// the private property. Note that assigning to it will fail silently. You can still
					// change it's properties.
					//
					Object.defineProperty
					(
						   iFaces[ l ]
						,  propName

						,  {

								  enumerable  : true
								, configurable: true
								, set         :
								  (function( that, name )
								   {
										return function( value ){ /*_setter.call( this, propName, value );*/ that[ name ] = value }
								   }
								  )( this, propName )
							}
					)

					iFaces[ l ][ propName ] = property
				}

				break
		}
	}



	/// function withValue
	//
	// create a property descriptor for non-writable properties with the given values
	//
	// function withValue( value )
	// {
	// 	var d = withValue.d ||
	// 	(
	// 		withValue.d =
	// 		{
	// 			  enumerable  : true
	// 			, configurable: true
	// 			, set         : _setter
	// 		}
	// 	)

	// 	d.value = value

	// 	return d
	// }


	function _setter( name, value )
	{
		// this[ name ] = value
		console.log( name, value )
	}



	// extend: Copy references to properties on other objects
	// options is a string which holds one of: "overwrite", "no overwrite", "overwrite only"

	function extend( root, props, options )
	{
		options = options || "no overwrite"

		Object.getOwnPropertyNames( props ).forEach( extendLifting )


		function extendLifting( key )
		{
			if
			(
					"overwrite"       === options
				|| "no overwrite"    === options   &&  !root.hasOwnProperty( key )
				|| "overwrite only"  === options   &&   root.hasOwnProperty( key )
			)

				root[ key ] = props[ key ];
		}

		return root;
	}
})( OoJsNamespace ) // End of OoJs

if( 'undefined' !== typeof module )
{
	module.exports.OoJs = OoJs
}

