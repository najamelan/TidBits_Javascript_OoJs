// minimal template
// you can copy this to start new classes
//
;( function class_Template( namespace )
{
	'use strict';

	if( namespace[ "Template" ] ) return    // protect against double inclusions

	    namespace.Template = Template
	var Static             = TidBits.OoJs.setupClass( namespace, "Template", "BaseClass" )

	// Data members, private by default
	//
	Static.privateStaticDM   = 0
	Static.protectedStaticDM = 0
	Static.publicStaticDM    = 0

	Static.Private
	(
		  "privateStaticDM"     //< can do for consistency, but is the default
		,  privateStaticMethod  //  accesslevel for data members
	)

	Static.Protected
	(
		  "protectedStaticDM"
		,  protectedStaticMethod
	)

	Static.Public
	(
		  "publicStaticDM"
		,  publicStaticMethod
	)



	// constructor
	//
	function Template( parameter )
	{
		// Data members
		//
		this.privateInstanceDM   = parameter
		this.protectedInstanceDM = 0
		this.publicInstanceDM    = 0

		this.Private
		(
			  "privateInstanceDM"
			,  init

			,  this.Virtual
			   (
					virtualPrivateInstanceMethod
			   )
		)

		this.Protected
		(
			  "protectedInstanceDM"
			,  protectedInstanceMethod
		)

		var iFace = this.Public
		(
			  "publicInstanceDM"
			,  publicInstanceMethod
		)

		this.init() // if you have to do something else

		return iFace
	}

	// all your method declarations go here
	//
	function init(){}
	function privateStaticMethod(){}

})( window )





// full example
//
var TidBits = TidBits || {}     // This is how I create my namespace

// nodejs support
//
if( 'undefined' !== typeof module )

	TidBits.OoJs = require( './oojs.js' ).OoJs

// we wrap a class in a function that is executed immediately to create a different scope
// everything defined in here will not be visible in the global scope except the constructor
// which we export onto the namespace
//
;( function class_Animal( namespace /*, $ ->if you want jQuery*/ )
{
	'use strict'; // recommended

	if( namespace[ "Animal" ] ) return    // protect against double inclusions

	    namespace.Animal = Animal
	var Static           = TidBits.OoJs.setupClass( namespace, "Animal" )
	//
	// ^- This is the sugar code you need in your class.
	// You must pass the namespace your class lives in.
	// A third optional string parameter is the base you want to derive from
	// Static is the static private object where the constructor itself is the
	// public Static object

	// Private static data members
	//
	Static.animalCounter = 0
	Static.species       = []

	// Protected static methods
	//
	Static.Protected(	registerSpecies )

	Static.Public
	(
		  whatSpecies
		, numberOfAnimals
	)

	// constructor
	//
	function Animal( species )
	{
		// Data members, private by default
		//
		this.species  = species
		this.hairy    = false  // we'll make this one public for the sake of it
		this.isDead   = false
		this.eaten    = []

		// Private methods
		//
		this.Private
		(
			  init

			, this.Virtual
			  (
				  die   // methods are passed as references, not a strings
			  )
		)

		// Protected data members and methods
		//
		this.Protected
		(
			"isDead"
		)

		var iFace =

			this.Public
			(
				  // data members (have to pass as string)
				  //
				  "hairy"

				  // methods
				  //
				, feedMe
				, isHungry
				, eatAnimal
			)

		// after we have done our calls to Private, Protected and virtual, our object is
		// properly set up and we can start using it. Recommended is to keep the constructor
		// declaration only and just put code logic in an init function
		//
		this.init()

		return iFace
	}

	function numberOfAnimals()
	{
		return Static.animalCounter
	}

	function whatSpecies()
	{
		return Static.species.join( ', ' )
	}

	function registerSpecies( species )
	{
		Static.species.push( species )
	}

	function init()
	{
		Static.animalCounter++
	}

	function die()
	{
		this.isDead = true

		console.log( "a", this.species, "died" );
	}

	function eatAnimal( animal )
	{
		this.eaten.push( TidBits.OoJs.typeOf( animal ) )

		// if we want to call private methods on other objects of this class,
		// we need a little workaround. OoJs provides this function on your Static
		//
		Static.getPrivateInstance( animal ).die()
	}

	function feedMe( food )
	{
		this.eaten.push( food )
	}

	function isHungry()
	{
		if( this.isDead )

			return "sorry mate, this animal is already dead"


		if( this.eaten.length < 3 )

			return true


		else

			return false
	}

})( TidBits /*, jQuery*/ )


// Implementation of BlobFish: http://divaboo.info/img/Blobfish.jpg
// extends Animal
//
;( function class_BlobFish( namespace )
{
	'use strict';

	    namespace.BlobFish = BlobFish
	var Static             = TidBits.OoJs.setupClass( namespace, "BlobFish", "Animal" )

	// if we want to have inherited methods, we must call at least Private, Protected or Public...
	//
	Static.Private()

	Static.registerSpecies( "BlobFish" ) // we inherited this method, remember?

	// constructor
	//
	function BlobFish()
	{
		// pass parameters to the constructor of Animal
		//
		this.Super( "BlobFish" )

		// Data members, private by default
		//

		// Private methods
		//
		this.Private
		(
		  this.Virtual
		  (
			  die
		  )
		)

		// BlobFishes don't like it if anyone can tell if they are hungry
		// make the inherited method protected
		//
		this.Protected( "isHungry" )

		return this.Public()
	}

	function die()
	{
		this.dead = true

		console.log( "booohoooo, BlobFish died" );
	}

})( TidBits )

var Animal   = TidBits.Animal
var BlobFish = TidBits.BlobFish

var shark = new Animal( "shark" )
shark.eatAnimal( new BlobFish )                     // output: booohoooo, BlobFish died

var stayAlive = new BlobFish
stayAlive.eatAnimal( shark )                        // output: a shark died

console.log( "Is shark hungry?"    , shark    .isHungry() )
// output: Is shark hungry? sorry mate, this animal is already dead

console.log( "Is stayAlive hungry?", stayAlive.isHungry() )
// output: TypeError: Object #<BlobFish> has no method 'isHungry'

console.log( Animal.whatSpecies() )                 // output: BlobFish
console.log( Animal.numberOfAnimals() )             // output: 3
