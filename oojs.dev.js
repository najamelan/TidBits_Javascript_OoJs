/**@preserve TidBits OoJs - version: 13.08.14-alpha
 * README: https://github.com/najamelan/TidBits_Javascript_OoJs
 */

var TidBits = TidBits || {} // our namespace


;(function class_OoJs( namespace )
{
'use strict';

if( namespace[ "OoJs" ] ) return

namespace[ "OoJs" ] = OoJs

// Static.ooID = classMeta
//
var classes  = {}

// this.ooID = { classID, State = { membername : value } }
//
var instances= {}

// map class names to id, makes life a bit easier as it allows to store the base classes as strings
// which means some class can inherit from a non OoJS class
//
var classIDs = {}


function ClassMeta( namespace, Static, name, id, iface )
{
	this.Static         = Static
	this.IFace          = iface
	this.Class          = namespace[ name ]
	this.name           = name
	this.id             = id
	this.bases          = []
	this.staticLayout   = null
	this.instanceLayout = null
	this.layoutInstance = null
	this.inherited      = { staticLayout: false, instanceLayout: false }
	this.virtuals       = {}
	this.namespace      = namespace
}


function IntancesRecord( _this, classID, iFace )
{
	this._this   = _this
	this.classID = classID
	this.iFace   = iFace
	this.state   = {}
	this.supers  = []
	this.flags   = 0
}


/** @enum {number}
 **/
var FLAGS =
{
	  PRIVATE            : 0x001
	, PROTECTED          : 0x002
	, PUBLIC             : 0x004
	, VIRTUAL            : 0x008
	, INHERITED_INSTANCE : 0x010
	, INHERITED_STATIC   : 0x020
	, STORED             : 0x040
}

OoJs.setupClass = setupClass
OoJs.typeOf     = typeOf

/** @expose */
function OoJs(){ return null } // Can't instanciate


function setupClass( callerNamespace, sub, base )
{
	var subCl = callerNamespace[ sub ]

	function Static(){}

	Object.defineProperty( Static, "Public"            , { value: Public             } )
	Object.defineProperty( Static, "Protected"         , { value: Protected          } )
	Object.defineProperty( Static, "Private"           , { value: Private            } )
	Object.defineProperty( Static, "getPrivateInstance", { value: getPrivateInstance } )

	Object.defineProperty( Static, "ooID", { value: uid()       } )
	Object.defineProperty( subCl , "ooID", { value: Static.ooID } )

	// makes your life easier when debugging things
	//
	Object.defineProperty
	(
		  Static
		, "toString"
		, { value: function toString(){ return "function Static(){ /*" + sub + "*/ }" } }
	)

	Object.defineProperty
	(
		  subCl
		, "toString"
		, { value: function toString(){ return "function " + sub + "()" } }
	)


	// Keep the meta data of our classes, so when something wants to inherit, we have the relevant information
	//
	classes  [ Static.ooID ] = new ClassMeta     ( callerNamespace, Static, sub, Static.ooID, IFace )
	instances[ Static.ooID ] = new IntancesRecord( Static, Static.ooID, subCl      )
	classIDs [     sub     ] = Static.ooID

	if( 'undefined' !== typeof base )
	{
		subCl.prototype              = Object.create( callerNamespace[ base ].prototype )
		classes[ Static.ooID ].bases = Array( base )


		// if supports OoJs
		//
		if( classIDs[ base ] )

			instances[ Static.ooID ].supers.push( classIDs[ base ] )
	}

	Object.defineProperty( subCl.prototype, "constructor", { configurable: true, value: subCl      } )
	Object.defineProperty( subCl.prototype, "Public"     , { configurable: true, value: Public     } )
	Object.defineProperty( subCl.prototype, "Protected"  , { configurable: true, value: Protected  } )
	Object.defineProperty( subCl.prototype, "Private"    , { configurable: true, value: Private    } )
	Object.defineProperty( subCl.prototype, "Super"      , { configurable: true, value: Super      } )
	Object.defineProperty( subCl.prototype, "Virtual"    , { configurable: true, value: Virtual    } )


	// is the interface which will be returned by the constructor of the class
	//
	function IFace (){}

	IFace .prototype = Object.create( subCl.prototype )


	return Static
}


function Public   (){ return accessModifier.call( this, arguments, FLAGS.PUBLIC    ) }
function Protected(){        accessModifier.call( this, arguments, FLAGS.PROTECTED ) }
function Private  (){        accessModifier.call( this, arguments, FLAGS.PRIVATE   ) }


// Allow access to the private instance within a class if you have the interface
//
function getPrivateInstance( iFace )
{
	var parent

	// prevent cheating
	//
	if( this !== classes[ instances[ this.ooID ].classID ].Static )

		return null


	if( ( parent = findParent( iFace.ooID, this.ooID ) ) )

		return instances[ parent ]._this


	else

		return null
}


// get a semantic typeof
//
function typeOf( object ){ return classes[ instances[ object.ooID ].classID ].name }


// First deals with registering the methods as virtual, then returns an array for Public, Private or Protected
//
function Virtual  ()
{
	accessModifier.call( this, arguments, FLAGS.VIRTUAL )

	var args = Array.prototype.slice.apply( arguments )

	args[ args.length ] = FLAGS.VIRTUAL
	return args
}


// function Super
// Creates a public interface which has protected members
//
function Super()
{
	if( instances[ this.ooID ]   &&   0 !== instances[ this.ooID ].supers.length )

		throw new Error( "This object already has a parent. You have to call Super before calling Public or Protected." )


	_Super.apply( this, arguments )
}


/// function _Super
//  makes sure 'this' is initialized and it has the needed parents
//
// The difference between an inherited public interface and one created directly by a client
// is that the inherited supers property should also allow subclass code to access protected
// members. Since Super() can only be called from a private object, we know this instantiation
// should also have protected members on it
//
function _Super()
{
	var constructor = this.prototype ? this.prototype.constructor : this.constructor

	// if it is not an instance, no business here
	//
	if( classes[ instances[ constructor.ooID ].classID ].Static === this )

		return


	// if this is the first contact
	//
	if( 'undefined' === typeof this.ooID )
	{
		initialize.call( this )
	}


	// if it has an OoJs base and Super hasn't been called yet
	//
	var classID   = instances[ this.ooID ].classID
	var classMeta = classes[ classID ]
	var iFace

	for( var i = classMeta.bases.length - 1; i >= 0; --i )
	{
		var base = classMeta.bases[ i ]

		if
		(
			   classIDs[ base ]            // base is OoJs
			&& 0 === instances[ this.ooID ].supers.length  // there is no parent
		)
		{

			this[ base ] = {}

			fNewConstr.prototype = classMeta.namespace[ base ].prototype

			iFace = new fNewConstr( classMeta.namespace[ base ], arguments )

			instances[ this.ooID ].supers.push( iFace.ooID )


			// allow this to call methods on super via supers
			//
			addProtected.call( instances[ iFace.ooID ]._this )

			this[ base ] = iFace
		}
	}
}


// add the protected members to the public iFace for usage with _super within the class
// allows calling protected superclass methods on this.base.xxx
//
function addProtected()
{
	var info =
	{
		  instRec: instances[ this.ooID ]
		, layout : classes[ instances[ this.ooID ].classID ].instanceLayout
		, iFace  : instances[ this.ooID ].iFace
	}

	createAccessors.call( this, info, true )
}


// dummy constructor to pass an array of parameters to another constructor
//
function fNewConstr( constructor, aArgs )
{
	return constructor.apply( this, aArgs );
}


/// function accessModifier
//
// - call _Super to assure the object is initialized and has its base classes
// - store the data members of this class in instances
// - inherit the layout from base classes
// - store the layout of the current class
// - change the pointers to virtual functions in the base classes if we override them
// - create accessor properties on this and iFace
// - if it was a call to this.Public, return the interface
//
function accessModifier( newMembers, accessLvl )
{

	_Super.apply( this )


	// Store some often used properties
	//
	var layoutType  = classes[ instances[ this.ooID ].classID ].Static === this  ?  "staticLayout"  :  "instanceLayout"

	var info =
	{
		  instRec       : instances[ this.ooID ]
		, classID       : instances[ this.ooID ].classID
		, supers        : instances[ this.ooID ].supers
		, iFace         : instances[ this.ooID ].iFace
		, classMeta     : classes[ instances[ this.ooID ].classID ]
		, virtuals      : classes[ instances[ this.ooID ].classID ].virtuals
		, layout        : classes[ instances[ this.ooID ].classID ][ layoutType ]
		, layoutTypeFlag: classes[ instances[ this.ooID ].classID ].Static === this  ?  FLAGS.INHERITED_STATIC  :  FLAGS.INHERITED_INSTANCE
		, layoutType    : layoutType
		, accessLvl     : accessLvl
	}


	// deal with private data members once per instance
	//
	storePrivate.call( this, info )



	// resolve all inherited stuff and write them to the layout once per layout type per class
	//
	inherit.call( this, info )




	var member

	// store the layout of the class
	// we keep track of the id of the first object of this class, so we will no longer execute this
	// after the constructor of that object is finished
	//
	if( null === info.classMeta.layoutInstance  ||  this.ooID === info.classMeta.layoutInstance )
	{
		if( layoutType === "instanceLayout" )

			info.classMeta.layoutInstance = this.ooID


		for( var i = newMembers.length - 1; i >= 0; --i )
		{
			member = newMembers[ i ]

			// coming from Virtual
			//
			if( Array.isArray( member )  &&  member[ member.length-1 ] === FLAGS.VIRTUAL )

				// length - 2, cause the last one is FLAGS.VIRTUAL
				//
				for( var j = member.length - 2; j >= 0; --j )

					accessHelper.call( this, info, member[j] )

			else
			{
				accessHelper.call( this, info, member )
			}
		}
	}



	// check if any of the new members being passed in overrides virtual methods in the base classes
	//
	if( "instanceLayout" === layoutType )
	{
		for( var k = newMembers.length - 1; k >= 0; --k )
		{
			member = newMembers[ k ]

			if( 'function' !== typeof member )

				continue


			var name = /\W*function\W+([\w\$]+)\(/.exec( member.toString() )[ 1 ]


			if( 'undefined' !== typeof info.virtuals[ name ] )

				for( var m = info.virtuals[ name ].length - 1; m >= 0; --m )

					if( info.virtuals[ name ][ m ].ownerClass !== info.classID )

						fixVirtual.call( this, info, name, info.virtuals[ name ][ m ].ownerClass )
		}
	}


	// set the actual accessor properties
	// no need to do this with virtual, because virtual is always wrapped in Private, Protected or Public
	//
	if( FLAGS.VIRTUAL !== accessLvl )

		createAccessors.call( this, info )


	// if this is Public() and we are an instance, return the instance
	//
	if( accessLvl === FLAGS.PUBLIC  &&  layoutType === 'instanceLayout' )

		return instances[ this.ooID ].iFace
}



// take the members on the object and store them in the layout, and store the data in instances
// then delete the original property
//
function storePrivate( info )
{
	if( info.instRec.flags & FLAGS.STORED )

		return


	instances[ this.ooID ].flags |= FLAGS.STORED


	var firstClassRun =  null === info.layout


	if( firstClassRun )

		info.layout = info.classMeta[ info.layoutType ] = new Object


	for( var key in this )
	{
		if( ! this.hasOwnProperty( key ) )

			continue


		if( firstClassRun )

			registerMember( info.layout, key, null, FLAGS.PRIVATE, info.classID, true )



		info.instRec.state[ key ] = this[ key ]

		delete this[ key ]
	}

}



// classID is the id of the class defining this member
//

function accessHelper( info, member )
{
	var ref   = 'function' === typeof member ? member : null
	var name  = 'string'   === typeof member ? member : /\W*function\W+([\w\$]+)\(/.exec( member.toString() )[ 1 ]


	// if it has been put on the interface before because it was inherited public, but the access level has changed
	// remove it from the interface
	//
	if
	(
		   'undefined' !== typeof info.layout[ name ]
		&& 'undefined' !== typeof info.instRec.iFace[ name ]

		&& ! ( info.accessLvl & FLAGS.PUBLIC )
		&& info.layout[ name ].flags & FLAGS.PUBLIC
	)
	{
		delete info.instRec.iFace[ name ]
	}



	// if we have a reference to it but it doesn't exist, it's a method of the current class, register it
	// if it does exist, but it's not from this class, it's inherited, overwrite it
	//
	if
	(
		   'undefined' !== typeof info.layout[ name ]  &&  ref  &&  info.layout[ name ].ownerClass !== info.classID

		|| 'undefined' === typeof info.layout[ name ]  &&  ref
	)
	{
		registerMember( info.layout, name, ref, info.accessLvl, info.classID, false /*don't throw if it already exists*/ )
	}


	// if it is inherited or a data member or been set by virtual, set the flags to the right access level
	//
	else if(	'undefined' !== typeof info.layout[ name ] )
	{
		info.layout[ name ].flags = info.accessLvl | ( info.layout[ name ].flags & FLAGS.VIRTUAL )


	}

	// we don't know what it is
	//
	else

		throw new Error( "Couldn't find definition of member: " + name + " in class: " + info.classMeta.name )



	// deal with virtuality
	//
	if( info.accessLvl & FLAGS.VIRTUAL )
	{
		info.virtuals[ name ] = info.virtuals[ name ] || []

		info.virtuals[ name ].push( info.layout[ name ] )
	}
}



// run through all base classes to get the inherited members
//
function inherit( info )
{
	if( info.classMeta.inherited[ info.layoutType ] )

		return


	info.classMeta.inherited[ info.layoutType ] = true


	for( var i = info.supers.length - 1; i >= 0; --i )
	{
		var layoutObj = classes[ instances[ info.supers[ i ] ].classID ][ info.layoutType ]
		var virtuals  = classes[ instances[ info.supers[ i ] ].classID ].virtuals


		// loop through all the parent properties
		//
		for( var key in layoutObj )
		{
			// if it is private, don't inherit
			//
			if
			(
				   ! layoutObj.hasOwnProperty( key )
				|| layoutObj[ key ].flags & FLAGS.PRIVATE
			)

				continue


			// if we don't have this one yet, inherit it
			//
			else if( 'undefined' === typeof info.layout[ key ] )
			{
				info.layout[ key ] = layoutObj[ key ]
				info.layout[ key ].flags = layoutObj[ key ].flags  &  ~FLAGS.VIRTUAL
			}


			// if we have it already, several baseclasses provide it since we don't yet deal with multiple inheritance, throw
			//
			else if( info.layout[ key ].ownerClass !== info.classID )

				throw new Error( "two baseclasses both provide member: " + key )
		}


		// copy the entries in the virtual table unless the parent has overridden it with a non-virtual method
		//
		for( var method in virtuals )
		{
			if
			(
				   virtuals.hasOwnProperty( method )

				&& (
						   'undefined' === typeof layoutObj[ method ]
						|| layoutObj[ method ].flags & FLAGS.VIRTUAL
					)
			)
			{
				// currently doesn't support multiple inheritance
				//
				info.virtuals[ method ] = []

				for( var parent in virtuals[ method ] )

					info.virtuals[ method ][ info.virtuals[ method ].length ] = virtuals[ method ][ parent ]
			}
		}

	}
}



// change this.methodName on the base that declared it virtual to our new method
// this way inherited methods from that baseclass that call this method on their 'this' will
// call the overridden one by this class
//
function fixVirtual( info, name, ownerClass )
{
	var parent = findParent( this.ooID, ownerClass )

	delete instances[ parent ]._this[ name ]

	// don't set a setter, so methods can't be overridden
	//
	Object.defineProperty
	(
		  instances[ parent ]._this
		, name

		,  {
				  enumerable  : true
				, configurable: true

				, get: ( function( ref, _this ){ return function(){ return ref.bind( _this ) } } )( info.layout[ name ].reference, this )
			}
	)
}




// function createAccessors
// @param protectedOnIFace allows creating an iface with protected members allowing calling base class methods
//
function createAccessors( info, protectedOnIFace )
{
	var defineProperty = Object.defineProperty

	for( var key in info.layout )
	{

		if( ! info.layout.hasOwnProperty( key ) )

			continue


		var member     = info.layout[ key ]
		var mReference = member.reference

		var toBePatched


		if( true === protectedOnIFace )

			toBePatched = member.flags & FLAGS.PROTECTED  ?  [       info.iFace ]  :  []


		else

			toBePatched = member.flags & FLAGS.PUBLIC     ?  [ this, info.iFace ]  :  [ this ]


		for( var i = toBePatched.length - 1; i >= 0; --i )
		{
			var ownerID    = findParent( this.ooID, member.ownerClass )

			// if it is a data member
			//
			if( !mReference )
			{
				defineProperty
				(
					  toBePatched[ i ]
					, key

					,  {
							  enumerable  : true
							, configurable: true

							, get: ( function( key, ownerID ){ return function()        { return instances[ ownerID ].state[ key ]  } } )( key, ownerID )


							, set: ( function( key, ownerID ){ return function( value ) { instances[ ownerID ].state[ key ] = value } } )( key, ownerID )
						}
				)
			}


			else // it is a method
			{
				// find it's reference, and if it's inherited, set it to point to parent this
				//
				var that   = instances[ ownerID ]._this


				// don't set a setter, so methods can't be overridden
				//
				defineProperty
				(
					  toBePatched[i]
					, key

					,  {
							  enumerable  : true
							, configurable: true

							, get: ( function( ref, _this ){ return function(){ return ref.bind( _this ) } } )( mReference, that )
						}
				)
			}
		}
	}
}



function findParent( id, classID )
{
	// if the object is of the right class return it
	//
	if( instances[ id ].classID === classID )

		return id


	var parent = null
	var ssuper

	for( var i = instances[ id ].supers.length - 1; ( ssuper = instances[ id ].supers[ i ] ) ; --i )
	{
		if( ssuper.classID === classID )
		{
			parent = ssuper
			break
		}

		else if( null !== ( parent = findParent( ssuper, classID ) ) )

			break
	}

	return parent
}



function registerMember( layout, name, reference, flags, ownerClass, throw_ )
{
	if( 'undefined' === typeof layout[ name ] || !throw_ )

		layout[ name ] = { flags: flags, reference: reference, ownerClass: ownerClass }

	else

		throw new Error( "Property '" + name + "' is already defined" )

}


function initialize()
{
	Object.defineProperty( this, "ooID", { value: uid() } )

	var iFace = new classes[ this.constructor.ooID ].IFace

	Object.defineProperty( iFace, "ooID", { value: this.ooID } )

	instances[ this.ooID ] = new IntancesRecord( this, this.constructor.ooID, iFace )
}


function uid()
{
	// we will keep an incremental counter, but set the starting value random to some integer
	//
	uid.counter = uid.counter || 0

	return ++uid.counter
}


})( TidBits )


if( 'undefined' !== typeof module )

	module.exports.OoJs = TidBits.OoJs

;
