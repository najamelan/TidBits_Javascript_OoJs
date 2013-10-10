/**@preserve TidBits OoJs - version: 13.08.20-alpha
 * README: https://github.com/najamelan/TidBits_Javascript_OoJs
 */

var TidBits = TidBits || {} // our namespace


;(function class_OoJs( namespace, undefined )
{
'use strict';

if( namespace[ "OoJs" ] ) return

namespace[ "OoJs" ] = OoJs

// Static.ooID : classMeta
//
var classes  = {}

// this.ooID : InstanceRecord
//
var instances= {}

// map class names to id, makes life a bit easier as it allows to store the base classes as strings
// which means some class can inherit from a non OoJS class
//
var classIDs = {}


/** @enum {number}
 **/
var FLAGS =
{
	  PRIVATE              : 1 <<  0
	, PROTECTED            : 1 <<  1
	, PUBLIC               : 1 <<  2
	, VIRTUAL              : 1 <<  3
	, INHERITED_INSTANCE   : 1 <<  4
	, INHERITED_STATIC     : 1 <<  5
	, BASE_ACCESSORS       : 1 <<  6
	, STORED               : 1 <<  7
	, SUPERS               : 1 <<  8
	, ACTIVE               : 1 <<  9
}


function ClassLayout( classID, type )
{
	// all data members are to be considered private!
	//
	this.classID = classID
	this.type    = type

	this.table = {}
}


ClassLayout.prototype.get = function get( name, owner )
{
	name = mangle( name )


	if( this.table[ name ] === undefined )

		return undefined


	if( owner === undefined )

		for( var i = this.table[ name ].length - 1; i >= 0; --i )

			if( this.table[ name ][ i ].flags & FLAGS.ACTIVE )

				return this.table[ name ][ i ]


	if( typeof owner === "string" )

		owner = classIDs[ owner ]



	for( i = this.table[ name ].length - 1; i >= 0; --i )

		if( this.table[ name ][ i ].ownerID === owner )

			return this.table[ name ][ i ]


	return undefined
}



ClassLayout.prototype.getAll = function get( name )
{
	return this.table[ mangle( name ) ]
}


ClassLayout.prototype.setActive = function setActive( name, owner )
{
	console.assert( this.table[ name ] !== undefined )


	if( typeof owner === "string" )

		owner = classIDs[ owner ]


	for( var i = this.table[ name ].length - 1; i >= 0; --i )
	{
		if( this.table[ name ][ i ].ownerID === owner )

			this.table[ name ][ i ].flags |= FLAGS.ACTIVE

		else

			this.table[ name ][ i ].flags &= ~FLAGS.ACTIVE

	}
}



ClassLayout.prototype.set = function set( record )
{
	var name = mangle( record.name )

	console.assert( record.ownerID )
	console.assert( record.name    )


	if( this.table[ name ] === undefined )

		this.table[ name ] = [ record ]



	else if( this.get( unmangle( name ), record.ownerID ) )

		extend( this.get( unmangle( name ), record.ownerID ), record )


	else

		this.table[ name ].push( record )


	if( record.flags & FLAGS.ACTIVE )

		this.setActive( name, record.ownerID )
}



/* Call a function on each layout record (order is undefined)
 * the callback will receive the record as "this"
 * extra parameters will be passed to the callback
 *
 */
ClassLayout.prototype.each = function each()
{
	var callback = Array.prototype.splice.call( arguments, 0, 1 ).pop()

	var ret = []


	for( var name in this.table )
	{

		if( !this.table.hasOwnProperty( name ) )

			continue


		for( var i = this.table[ name ].length - 1; i >= 0; --i )
		{
			ret.push( callback.apply( this.table[ name ][ i ], arguments ) )
		}
	}

	return ret
}



// otherwise we get in trouble when people want to create properties called push or toString etc...
//
function   mangle( name ){ return "OoJs__" + name     }
function unmangle( name ){ return name.substring( 6 ) }







function ClassMeta( namespace, Static, name, id, iface )
{
	this.Static            = Static
	this.IFace             = iface
	this.Class             = namespace[ name ]
	this.name              = name
	this.id                = id
	this.bases             = []
	this.allBases          = []
	this.accessibleBases   = []
	this.inaccessibleBases = []
	this.friends           = []
	this.staticLayout      = new ClassLayout( Static.ooID, "staticLayout"   )
	this.instanceLayout    = new ClassLayout( Static.ooID, "instanceLayout" )
	this.layoutInstance    = null
	this.flags             = 0
	this.virtuals          = {}
	this.namespace         = namespace
}


function InstanceRecord( _this, classID, iFace )
{
	this._this   = _this
	this.classID = classID
	this.iFace   = iFace
	this.state   = {}
	this.supers  = []
	this.flags   = 0
}

OoJs.setupClass = setupClass
OoJs.typeOf     = typeOf
OoJs.extend     = extend

/** @expose */
function OoJs(){ return null } // Can't instanciate


function setupClass( callerNamespace, sub, bases )
{
	var subCl = callerNamespace[ sub ]

	function Static(){}


	Object.defineProperty( Static, "Public"            , { value: Public             } )
	Object.defineProperty( Static, "Protected"         , { value: Protected          } )
	Object.defineProperty( Static, "Private"           , { value: Private            } )
	Object.defineProperty( Static, "Friends"           , { value: Friends            } )
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
	instances[ Static.ooID ] = new InstanceRecord( Static, Static.ooID, subCl                       )
	classIDs [     sub     ] = Static.ooID

	/// Structure of that bases in classMeta
	//
	//  an array representing one item per direct base class
	//  every item is the array of bases from that base class or an array with the base object (inherit, as...)
	//
	// baseobj = { name: "MyClass", bases: [] }

	if( bases !== undefined )
	{

		// TODO: do some validation
		//
		if( !Array.isArray( bases ) )

			bases = Array( bases )



		for( var i = bases.length - 1; i >= 0; --i )
		{
			var defaults = { as: "private", namespace: callerNamespace }


			if( typeof bases[ i ] === "string" )

				bases[ i ] = { inherit: bases[ i ] }


			bases[ i ] = extend( defaults, bases[ i ] )


			if( [ "public", "private", "protected" ].indexOf( bases[ i ].as ) < 0 )

				throw new Error
				(
					  "Invalid class access level in class: " + sub
					+ ". Trying to inherit " + bases[ i ].inherit + " as " + bases[ i ].as
					+ ". Only 'public', 'private' or 'protected' are supported"
				)
		}


		classes[ Static.ooID ].bases = bases



		// if they are OoJs, store them in supers
		//
		var id

		for( i = bases.length - 1;  i >= 0;  --i )

			if( ( id = classIDs[ bases[ i ].inherit ] ) )

				instances[ Static.ooID ].supers.push( id )



		subCl.prototype = Object.create( bases[ 0 ].namespace[ bases[ 0 ].inherit ].prototype )

		getAllBases( Static.ooID )
	}

	// TODO: test what prototype is if there is no base and on IFace do we end up with Public, ...?

	Object.defineProperty( subCl.prototype, "constructor", { configurable: true, value: subCl     } )
	Object.defineProperty( subCl.prototype, "Public"     , { configurable: true, value: Public    } )
	Object.defineProperty( subCl.prototype, "Protected"  , { configurable: true, value: Protected } )
	Object.defineProperty( subCl.prototype, "Private"    , { configurable: true, value: Private   } )
	Object.defineProperty( subCl.prototype, "Super"      , { configurable: true, value: Super     } )
	Object.defineProperty( subCl.prototype, "Virtual"    , { configurable: true, value: Virtual   } )


	// is the interface which will be returned by the constructor of the class
	//
	function IFace (){}

	IFace.prototype = Object.create( subCl.prototype )


	return Static
}


function getAllBases( classID )
{
	var   classMeta         = classes[ classID ]
	    , accessibleBases   = classMeta.accessibleBases
	    , inaccessibleBases = classMeta.inaccessibleBases
	    , allBases          = classMeta.allBases
	    , dummy             = []


	for( var i = classMeta.bases.length - 1; i >= 0; --i )
	{
		var   baseName = classMeta.bases[ i ].inherit
		    , baseID   = classIDs[ baseName ]

		// only store oojs bases for now
		//
		if( !baseID ) continue


		accessibleBases.push( baseName )
		allBases       .push( baseName )

		dummy.push.apply( accessibleBases  , classes[ baseID ].accessibleBases   )
		dummy.push.apply( inaccessibleBases, classes[ baseID ].inaccessibleBases )
		dummy.push.apply( allBases         , classes[ baseID ].allBases          )


		// remove those that the parent inherited as private
		//
		for( var j = classes[ baseID ].bases.length - 1; j >= 0; --j )
		{
			var   ancester = classes[ baseID ].bases[ j ]
			    , toRemove = accessibleBases.indexOf( ancester.inherit )

			if( ancester.as === "private"  &&  toRemove !== -1 )

				dummy.push.apply( inaccessibleBases, classMeta.accessibleBases.splice( toRemove, 1 ) )
		}
	}
}



function Public   (){ return accessModifier.call( this, arguments, FLAGS.PUBLIC    ) }
function Protected(){        accessModifier.call( this, arguments, FLAGS.PROTECTED ) }
function Private  (){        accessModifier.call( this, arguments, FLAGS.PRIVATE   ) }


// Set the classes that are allowed to access the private object
//
function Friends()
{
	var classMeta = classes[ instances[ this.ooID ].classID ]

	// prevent cheating since we rely on ooID
	//
	if( this !== classMeta.Static )

		return


	classMeta.friends = [].concat( Array.prototype.slice.call( arguments, 0, arguments.length ) )
}


// Allow access to the private instance within a class if you have the interface
//
function getPrivateInstance( iFace )
{
	// prevent cheating since we rely on ooID
	//
	if( this  !==  classes[ instances[ this.ooID ].classID ].Static )

		return null


	// find the private objects
	//
	var   access   = []
	    , id       = iFace.ooID
	    , noSelf   = false
	    , result   = null


	while( ( id = findParent( id, this.ooID, true, noSelf ) ) )
	{
		access.unshift( instances[ id ]._this )

		noSelf = true
	}


	// combine the different parts of access
	//
	if( access.length === 1 )

		return access.pop()


	else if( access.length > 1 )
	{
		// need to call with an empty object in order not to change the objects in the array
		//
		result = access.reduce( extend, {} )


		// fix the parent accessors to hold the private members as well
		//
		for( var i = access.length - 1; i >= 0; --i )
		{
			var classMeta = classes[ instances[ access[ i ].ooID ].classID ]

			if( result[ classMeta.name ] )
			{
				// get all the private members, will invalidate the virtual methods
				//
				extend( result[ classMeta.name ], access[ i ], true /*accessor properties only*/ )


				// fix the virtuals
				//
				var layoutType = classMeta.Static === access[ i ]  ?  "staticLayout"  :  "instanceLayout"


				classMeta[ layoutType ].each( function createVirtuals()
				{
					if( this.flags & FLAGS.VIRTUAL )

						Object.defineProperty
						(
							  result[ classMeta.name ]
							, this.name

							,  {
									  enumerable  : true
									, configurable: true

									, get: ( function( ref, _this ){ return function(){ return ref.bind( _this ) } } )( this.reference, access[ i ] )
								}
						)
				})
			}
		}
	}

	return result
}


// get a semantic typeof
//
function typeOf( object ){ return classes[ instances[ object.ooID ].classID ].name }


// First deals with registering the methods as virtual, then returns an array for Public, Private or Protected
//
function Virtual()
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
	if( instances[ this.ooID ]   &&   instances[ this.ooID ].flags & FLAGS.SUPERS )

		throw new Error( "This object already has a parent. You have to call Super before calling Public, Private or Protected." )


	// 1. Make sure object is initialized
	//
	if( this.ooID === undefined )

		initialize.call( this )


	_Super.apply( this, arguments )
}


/// function _Super
//  makes sure 'this' has the needed parents
//
function _Super()
{
	if( instances[ this.ooID ].flags & FLAGS.SUPERS )

		return


	instances[ this.ooID ].flags |= FLAGS.SUPERS


	// if it has an OoJs base and Super hasn't been called yet
	//
	var classMeta = classes[ instances[ this.ooID ].classID ]


	for( var i = classMeta.bases.length - 1; i >= 0; --i )
	{
		var base = classMeta.bases[ i ]


		if( !classIDs[ base.inherit ] )  // base is not OoJs

			continue


		fNewConstr.prototype = base.namespace[ base.inherit ].prototype

		var iFace = new fNewConstr( base.namespace[ base.inherit ], arguments )

		instances[ this.ooID ].supers.push( iFace.ooID )
	}
}



// dummy constructor to pass an array of parameters to another constructor
// allows passing an array of arguments to a constructor
//
function fNewConstr( constructor, aArgs )
{
	return constructor.apply( this, aArgs );
}



function copyInheritedProps( destination, parentRec, info )
{
	var parentClassId = parentRec.classID


	if( this.flags & FLAGS.PRIVATE )
	{
		// if it is an own property of the parent, or it is on an inaccessible base, do nothing
		//
		if
		(
			   this.ownerID === parentClassId
			|| info.classMeta.accessibleBases.indexOf( classes[ this.ownerID ].name ) === -1
		)

			return


		// else, it's on an accessible base, and so we have to remove it
		//
		delete destination[ classes[ this.ownerID ].name ][ this.name ]

		return
	}


	// copy if: it is an own property of the class,
	// or if no own property exist (then the inherited one ends up on the main object)
	//
	if
	(
		   this.ownerID === parentClassId
		|| !classes[ parentClassId ][ info.layoutType ].get( this.name, parentClassId )
	)

		Object.defineProperty( destination, this.name, Object.getOwnPropertyDescriptor( parentRec._this, this.name ) )


	// else if it is from a inaccessible base, but made public or protected, create the base object and put it on
	//
	if( info.classMeta.inaccessibleBases.indexOf( classes[ this.ownerID ].name ) !== -1 )
	{
		var baseName = classIDs[ this.ownerID ]

		destination[ baseName ] = destination[ baseName ] || {}

		Object.defineProperty
		(
			  destination[ baseName ]
			, this.name
			, Object.getOwnPropertyDescriptor( parentRec._this[ baseName ], this.name )
		)
	}
}


// Create properties for the base classes such as Static.Base and this.Base
// in order to allow accessing base versions of members
//
function inheritProperties( info )
{
	if( info.classMeta.bases.length === 0  ||  info.instRec.flags & FLAGS.BASE_ACCESSORS )

		return


	info.instRec.flags |= FLAGS.BASE_ACCESSORS


	// just a single inheritance version
	// loop through parent
	//
	var   parentRec         = instances[ info.supers[ 0 ] ]
	    , accessibleBases   = classes[ info.instRec.classID ].accessibleBases


	// Copy the accessors for all the accessible bases from the parent
	//
	for( var i = accessibleBases.length - 1; i >= 0; --i )
	{
		// do not try to copy the parent itself
		//
		if( classes[ parentRec.classID ].name === accessibleBases[ i ] )

			continue


		this[ accessibleBases[ i ] ] = extend( {}, parentRec._this[ accessibleBases[ i ] ], true /*accessors only*/ )
	}


	// copy the properties from the object itself
	// copy the public or protected properties on inaccessible base classes
	// remove stuff from accessible bases that has been turned private
	//
	classes[ parentRec.classID ][ info.layoutType ].each( copyInheritedProps, this, parentRec, info )


	var baseName = classes[ parentRec.classID ].name

	// now our object looks like what's left of the parent after we removed the private parts
	// copy it under this[ baseName ]
	//
	this[ baseName ]      = extend( {}, this, true /*accessors only*/ )

	// get the parent interface
	//
	for( i = info.classMeta.bases.length - 1; i >= 0; --i )
	{
		if( info.classMeta.bases[i].inherit === baseName )
		{
			// if we inherit this parent as public, copy it's interface over to ours
			//
			if( info.classMeta.bases[i].as === "public" )
			{
				extend( info.iFace, parentRec.iFace )

				info.iFace[ baseName ] = extend( {}, parentRec.iFace, true /*accessors only*/ )

				break
			}
		}
	}
}




/*
 * function accessModifier
 *
 * 1. Make sure object is initialized
 * 2. Store data members
 * 3. Instantiate base classes
 * 4. Copy base class properties
 * 5. Remove baseclass properties that are made private by the direct parent
 * 6. Register inherited layout
 * 7. Register layout if instance and first call
 * 8. Create accessors for own properties
 * 9. Resolve virtual
 * 10. Return iFace if this.Public
 *
 */
function accessModifier( newMembers, accessLvl )
{

	// 1. Make sure object is initialized
	//
	if( this.ooID === undefined )

		initialize.call( this )



	// Store some often used properties
	//
	var   layoutType  = classes[ instances[ this.ooID ].classID ].Static === this  ?  "staticLayout"  :  "instanceLayout"
	    , instRec     = instances[ this.ooID ]
	    , classID     = instRec.classID

	    , info        =
	      {
	           instRec    : instRec
	         , classID    : classID
	         , supers     : instRec.supers
	         , iFace      : instRec.iFace
	         , classMeta  : classes[ classID ]
	         , virtuals   : classes[ classID ].virtuals
	         , layout     : classes[ classID ][ layoutType ]
	         , layoutFlag : classes[ classID ].Static === this  ?  FLAGS.INHERITED_STATIC  :  FLAGS.INHERITED_INSTANCE
	         , layoutType : layoutType
	         , accessLvl  : accessLvl
	         , newMembers : []
	      }



	// 2. Store data members
	//
	var mustCreatePrivate = storeDataMembers.call( this, info )



	// 3. Instantiate base classes
	//
	if( layoutType === "instanceLayout" )

		_Super.call( this )



	// 4. Copy base class properties
	// 5. Remove baseclass properties that are made private by the direct parent
	//
	inheritProperties.call( this, info )


	// 6. Register inherited layout
	// resolve all inherited stuff and write them to the layout once per layout type per class
	//
	inherit.call( this, info )



	// 7. Register layout
	// we keep track of the id of the first instance of this class, so we will no longer execute this
	// after the constructor of that instance is finished
	//
	var member

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

					updateLayout.call( this, info, member[j] )

			else
			{
				updateLayout.call( this, info, member )
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


			if( info.virtuals[ name ] !== undefined )

				for( var m = info.virtuals[ name ].length - 1; m >= 0; --m )

					if( info.virtuals[ name ][ m ].ownerID !== info.classID )

						fixVirtual.call( this, info, name, info.virtuals[ name ][ m ].ownerID )
		}
	}



	// set the actual accessor properties
	// no need to do this with virtual, because virtual is always wrapped in Private, Protected or Public
	//
	if( FLAGS.VIRTUAL !== accessLvl )

		info.layout.each( createAccessors, this, info )



	// if we did storeDataMembers, we must also create the private accessors in case the user never calls this.Private()
	//
	if( mustCreatePrivate && !( accessLvl & FLAGS.PRIVATE ) )
	{
		info.accessLvl = FLAGS.PRIVATE

		info.layout.each( createAccessors, this, info )
	}



	// if this is Public() and we are an instance, return the instance
	//
	if( accessLvl === FLAGS.PUBLIC  &&  layoutType === 'instanceLayout' )

		return info.iFace
}



// take the members on the object and store them in the layout, and store the data in instances
// then delete the original property
//
function storeDataMembers( info )
{
	if( info.instRec.flags & FLAGS.STORED )

		return


	instances[ this.ooID ].flags |= FLAGS.STORED


	for( var key in this )
	{
		if( ! this.hasOwnProperty( key ) )

			continue


		if( info.layout.get( key, info.classID ) === undefined )

			info.layout.set( { name: key, flags: FLAGS.PRIVATE | FLAGS.ACTIVE, ownerID: info.classID, setterID: info.classID } )



		info.instRec.state[ key ] = this[ key ]

		delete this[ key ]
	}


	return true
}



// classID is the id of the class defining this member
//

function updateLayout( info, member )
{
	var ref, name, scope


	if( 'function' === typeof member )
	{
		name = /\W*function\W+([\w\$]+)\(/.exec( member.toString() )[ 1 ]
		ref  = member
	}

	else if( 'string' === typeof member )
	{
		// Do scope resolution
		//
		var split = member.split( '.' )

		name  = split.pop()
		scope = split.pop()

		if( split.length ) throw new Error( "More than one dot found in: " + member )


		// format 'Super.someMember' only exists to change the accessLvl of an inherited property
		//
		if( scope )
		{
			if( !classIDs[ scope ] )

				throw new TypeError( scope + " is not an OoJs base. Setting access level is curently only supported on OoJs bases." )

			if( info.classMeta.accessibleBases.indexOf( scope ) < 0  &&  !info.layout.get( name, scope ) )

				throw new TypeError( scope + " is not an accessible base of " + info.classMeta.name  )

			if( info.accessLvl === FLAGS.VIRTUAL )

				throw new Error( "Can't make base methods virtual (" + member + ") in " + info.classMeta.name )
		}
	}


	else

		throw new TypeError( "Parameters to this.Public/Private/Protected have to be either strings or references to functions. Got: " + member + " in class " + info.classMeta.name )





	var  flags
	   , owner    = scope || info.classMeta.name
	   , existing = info.layout.get( name, owner )

	if( existing )
	{
		if( info.accessLvl & FLAGS.VIRTUAL )

			flags = existing.flags | FLAGS.VIRTUAL

		else

			flags = info.accessLvl | ( existing.flags & FLAGS.VIRTUAL )
	}

	else if( !ref && !scope )

		throw new Error( "Couldn't find property: " + name + " in class: " + info.classMeta.name )

	else

		flags = info.accessLvl


	if( !scope || !info.layout.get( name ) || info.layout.get( name ).ownerID === classIDs[ owner ] )

		flags |= FLAGS.ACTIVE


	info.layout.set({ name: name, reference: ref, flags: flags, ownerID: classIDs[ owner ], setterID: info.classID })



	// deal with virtuality
	//
	if( info.accessLvl & FLAGS.VIRTUAL )
	{
		info.virtuals[ name ] = info.virtuals[ name ] || []

		info.virtuals[ name ].push( info.layout.get( name, info.classID ) )
	}
}



// run through all base classes to get the inherited members
//
function inherit( info )
{
	if( info.classMeta.flags & info.layoutFlag )

		return


	info.classMeta.flags |= info.layoutFlag


	for( var i = info.supers.length - 1; i >= 0; --i )
	{
		var   parentMeta   = classes[ instances[ info.supers[ i ] ].classID ]
		    , parentLayout = parentMeta[ info.layoutType ]
		    , virtuals     = parentMeta.virtuals


		// copy over the parent layout except for the private stuff
		//
		parentLayout.each( inheritLayout, info, parentMeta )


		// copy the entries in the virtual table unless the parent has overridden it with a non-virtual method
		//
		for( var method in virtuals )
		{
			var parentRecord = parentLayout.get( method )

			if
			(
				   virtuals.hasOwnProperty( method )

				&& (
						   parentRecord       === undefined
						|| parentRecord.flags  &  FLAGS.VIRTUAL
					)
			)
			{
				// currently doesn't support multiple inheritance
				//
				info.virtuals[ method ] = []

				for( var parent in virtuals[ method ] )

					info.virtuals[ method ].push( virtuals[ method ][ parent ] )
			}
		}
	}
}



function inheritLayout( info, parentMeta )
{
	if( this.flags & FLAGS.PRIVATE  ||  !( this.flags & FLAGS.ACTIVE ) )

		return


	var  newAccessLvl
		, inheritLvl
		, flags      = this.flags & ~FLAGS.VIRTUAL


	for( var i = info.classMeta.bases.length - 1; i >= 0; --i )

		if( info.classMeta.bases[ i ].inherit === parentMeta.name )

			inheritLvl = info.classMeta.bases[ i ].as


	// deal with classes inherited as private or protected
	//
	if( inheritLvl === "private"  ||  inheritLvl === "protected" )
	{
		newAccessLvl = inheritLvl === "private" ? FLAGS.PRIVATE : FLAGS.PROTECTED

		flags &= ~FLAGS.PUBLIC & ~FLAGS.PROTECTED
		flags |= newAccessLvl
	}


	info.layout.set
	({
		  name      : this.name
		, ownerID   : this.ownerID
		, setterID  : this.setterID
		, reference : this.reference
		, flags     : flags
	})
}



// change this.methodName on the base that declared it virtual to our new method
// this way inherited methods from that baseclass that call this method on their 'this' will
// call the overridden one by this class
//
function fixVirtual( info, name, ownerID )
{
	var parent = findParent( this.ooID, ownerID )

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

				, get: ( function( ref, _this ){ return function(){ return ref.bind( _this ) } } )

							( info.layout.get( name, info.classID ).reference, this )
			}
	)
}




// function createAccessors
// @param protectedOnIFace allows creating an iface with protected members allowing calling base class methods
//
function createAccessors( that, info )
{
	// only do this once for every access level
	//
	if( !( this.flags & info.accessLvl ) || this.setterID !== info.classID )

		return


	// if it is an inherited property, just check if the access level hasn't been changed in this class
	//
	if( this.ownerID !== info.classID )
	{
		// Correct the access level in object.base.member
		// add stuff that has been made public and remove stuff that has been made private or protected
		//
		var   active = info.layout.get( this.name )
		    , own    = info.layout.get( this.name, info.classID )
		    , owner  = classes[ this.ownerID ].name

		if( !( this.flags & FLAGS.PUBLIC ) )
		{
			delete info.instRec.iFace[ owner ][ this.name ]

			// if the version that we are turning private or protected is the one on our interface,
			// we need to remove it
			//
			if( active && active.ownerID === this.ownerID )

				delete info.instRec.iFace[ this.name ]

		}

		else // make public
		{
			info.instRec.iFace[ owner ] = info.instRec.iFace[ owner ] || {}

			var patch = own ? [ info.instRec.iFace[ owner ] ] : [ info.instRec.iFace, info.instRec.iFace[ owner ] ]

			for( var i = patch.length - 1; i >= 0; --i )

				Object.defineProperty
				(
					  patch[ i ]
					, this.name
					, Object.getOwnPropertyDescriptor( info.instRec._this[ owner ], this.name )
				)
		}


		return
	}


	// if it is from this class, it might override a member that we inherited.
	// in that case it is possible that the public interface holds a version that should be
	// removed if this is not public (and thus we won't override it)
	//
	else if( !( this.flags & FLAGS.PUBLIC ) )

		delete info.instRec.iFace[ this.name ]




	// now we are only dealing with non-inherited properties
	//
	var   toBePatched = this.flags & FLAGS.PUBLIC  ?  [ that, info.iFace ]  :  [ that ]
	    , ownerID     = that.ooID

	for( i = toBePatched.length - 1; i >= 0; --i )
	{
		// if it is a data member
		//
		if( !this.reference )
		{
			Object.defineProperty
			(
				  toBePatched[ i ]
				, this.name

				,  {
						  enumerable  : true
						, configurable: true

						, get: ( function( key, ownerID ){ return function()        { return instances[ ownerID ].state[ key ]  } } )( this.name, ownerID )


						, set: ( function( key, ownerID ){ return function( value ) { instances[ ownerID ].state[ key ] = value } } )( this.name, ownerID )
					}
			)
		}


		else // it is a method
		{
			// don't set a setter, so methods can't be overridden
			//
			Object.defineProperty
			(
				  toBePatched[i]
				, this.name

				,  {
						  enumerable  : true
						, configurable: true

						, get: ( function( ref, _this ){ return function(){ return ref.bind( _this ) } } )( this.reference, that )
					}
			)
		}
	}

}



// Find the parent of the object defined by id which belongs to class classID
//
// The alternate form of this function when friendsAlso is true, will also return the given parent if
// the classID refers to a class that is friends with the parent class
//
function findParent( id, classID, friendsAlso, noSelf )
{
	// if the object is of the right class return it
	//
	if
	(
		   !noSelf

		&& (
			     instances[ id ].classID === classID

		     ||    friendsAlso
		        && classes[ instances[ id ].classID ].friends.indexOf( classes[ classID ].name ) !== -1
		   )
	)

		return id


	var   parent = null
	    , ssuper

	for( var i = instances[ id ].supers.length - 1; ( ssuper = instances[ id ].supers[ i ] ) ; --i )
	{
		if
		(
			   ssuper.classID === classID

			||     friendsAlso
			   &&  classes[ instances[ ssuper ].classID ].friends.indexOf( classes[ classID ].name ) !== -1
		)
		{
			parent = ssuper
			break
		}

		else if( null !== ( parent = findParent( ssuper, classID, friendsAlso, noSelf ) ) )

			break
	}

	return parent
}


function initialize()
{
	Object.defineProperty( this, "ooID", { value: uid() } )

	var iFace = new classes[ this.constructor.ooID ].IFace

	Object.defineProperty( iFace, "ooID", { value: this.ooID } )

	instances[ this.ooID ] = new InstanceRecord( this, this.constructor.ooID, iFace )
}


// should return an integer or string unique for all OoJs classes and objects
// should never return something that evaluates to false
//
uid.counter = 0

function uid()
{
	return ++uid.counter
}


function extend( destination, root, accessorOnly )
{
	for( var key in root )
	{
		if( !root.hasOwnProperty( key )  ||  accessorOnly === true && !Object.getOwnPropertyDescriptor( root, key ).get )

			continue

		Object.defineProperty( destination, key, Object.getOwnPropertyDescriptor( root, key ) )
	}

	return destination
}



})( TidBits );


if( 'undefined' !== typeof module )

	module.exports = TidBits

;
