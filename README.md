TidBits Javascript OoJs
=======================

**Latest Stable      Version: None yet - please test me!**  
**Latest Development Version: 13.08.14-alpha**

This tidbit proposes a way to use a classical OOP paradigm in Javascript. It is part of the [TidBits Javascript Library](https://github.com/najamelan/TidBits_Javascript).


This shows the basic syntax of what a class looks like in OoJs

```js
;( function class_Template( namespace )
{
	'use strict'; // recommended

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
```

## Table of Contents

-  [Design goals](#design-goals)
-  [Why would you want to use OOP](#why-would-you-want-to-use-oop)

   -  [Abstraction](#abstraction)
   -  [Loose coupling, tight cohesion](#loose-coupling-tight-cohesion)
   -  [Flexibility vs Scalability and Maintainability](#flexibility-vs-scalability-and-maintainability)

-  [How it works](#how-it-works)

   -  [Features](#features)
   -  [Limitations](#limitations)
   -  [Requirements](#requirements)
   -  [Installation](#installation)
   -  [Verify your installation](#verify-your-installation)
   -  [Usage](#usage)
  
      -  [Reserved keywords](#reserved-keywords)
      -  [API](#api)
      -  [Make sure your object is set up](#make-sure-your-object-is-set-up)
      -  [Do not use logic before your object is set up](#do-not-use-logic-before-your-object-is-set-up)
      -  [Declare data members and call Super before Public/Private/Protected](#declare-data-members-and-call-super-before-publicprivateprotected)
      -  [Do not call virtual methods from your constructor](#do-not-call-virtual-methods-from-your-constructor)
      -  [Sealing your object is nice, but dangerous](#sealing-your-object-is-nice-but-dangerous)
      -  [Do not try to deep copy objects or extend them](#do-not-try-to-deep-copy-objects-or-extend-them)
  
  -  [Seeing it in action](#seeing-it-in-action)
 
  
## Design goals

The goals of OoJs were set as follows (until ES provides decent class support):
1.  provide the featureset of C++ OOP in JavaScript
2.  provide a neat and clean syntax to the end user
3.  require a minimal amount of sugar code
4.  only use standard ES5

It must be said that the current alpha release only partially meets these goals. N°s 2 and 4 are met as far as I'm concerned.

Most of the featureset is implemented and more can be done in the future. There is no fundamental obstacle preventing us from total coverage, but some harder design decisions will have to be made. Also there is incomplete support for one feature. Calling baseclass versions of overridden methods currently is only possible for the direct parent, not for the other ancestors. Please see [limitations](#limitations) for a detailed description of the featureset.

As far as the amount of sugar code is concerned, only about 1 line of sugar code is needed in a class declaration (<-good), but the production version of what makes the magic work now compiles to about 6800 characters (mind you, it's a lot less than this readme), which is about double than what I had hoped for. I would hope that some major design improvement might cut that down, but as the problem domain of inheritance is quite complex, well, there is only a limited amount of features that you can cramm into one line of code...

**If you want to skip the lesson about OOP software design, skip down to "How it works".** -> Not recommended if you have only ever done programming in JavaScript.


## Why would you want to use OOP
OOP is the best programming paradigm currently known to wo.mankind. The essence of OOP is **NOT**: turn your nouns into objects and your verbs into methods. That is object based programming, which is the model for custom types in Javascript.

Now what is the difference between OOP and Object Based Programming?

### Abstraction

OOP is about abstraction. It is about creating a high level view on your software which is encumbered as little as possible with  implementation or design details. We will find "what varies" or is likely to vary in the future (a difficult design decision for example) and we will push that further down the hierarchy of our design. Further down the hierarchy can mean different things, for example from class declaration to definition or going from inheritance to aggregation.

Theoretically Javascript allows you to adhere to such principles, but you are not encouraged even less bound to. The essence of a clear structure is to separate interface from implementation and thus have class declarations. Javascript in the wild rarely has class declarations, even the best and most popular libraries.

Javascript allows you to change object structure anywhere along the line, and even if that might seem powerful at first, the downside is that people actually do it which means poor structure. It becomes very hard to see what an object really is, because it is extended all over the place and because there is about ten ways to do anything, including inheritance.

If there would be no traffic rules, we would be more free. We would also be able to do most if not all of the things we can do now, or more (at least at the personal level), but a system with rules might be more efficient in the end to get everyone from a to b with as few accidents as possible. That's because things are predictable and understood by everyone. Freedom of action can bring power but also chaos (I'm talking about systems here, not social relations and politics).

That's why the classical model obliges us to abstract by separating our declaration from our implementation. It is constraining at first sight (when you have to write your method signature several times), but has the ever lasting benefit of everyone, including yourself being able to look up in usually 1 screenheight worth of text **what** an object of this class **is**. That creates one of the fundamental building blocks for scalability and maintainability.

*The class declaration or interface is a contract made with the clients of the class.*



### Loose coupling, tight cohesion

The classical OOP model provides ways to hide data. When you release code which has all its details and properties publicly available, people will write code that relies on them. Their code will become tightly coupled to the inner workings of yours. When you need to change the inner workings of your library because of bugs or new features, things will start breaking. That's why one of the ways to hide the implementation details of your code is private and protected data members. Javascript does not support private or protected data members on objects.

The extra power of being able to change everything from everywhere is compensated for in OOP by sound design and by the possibility to subclass if you need change the behaviour of a class.


### Flexibility vs Scalability and Maintainability

When looking at a small snippet, the javascript model is attractive, but when you need to write software to tackle challenging and complex problems, the classical OOP model scales way better than the object based model but is more cumbersome to just get 3 lines of code executed somewhere. I think the current situation is a consequence of the historical evolution of the internet, and not because the developers of ecmascript thought that object based programming is better than OOP, but it is attractive for **scripting** rather than for **developing software**.

As the the internet evolves it takes more and more place in informatics and these days we want to develop big and complex software in javascript. There is [a draft on the way for Ecmascript 6](http://wiki.ecmascript.org/doku.php?id=strawman%3amaximally_minimal_classes) to finally support the class keywords, but it might take some time before browsers implement it.

Until that time, JavaScript is not ready for application and library design, and as a downside, all the flexibility of JavaScript invites programmers to fix their poor design by quickly adding a property to some object (maybe not even theirs), the global scope, throw in an inline anonymous function or do some cool closure magic, with as a net result: **most of the Javascript code out there is hard to read, hard to debug, hard to maintain, hard to scale, dangerous to rely on and hard to use as a fundamental building block**.
## How it works

This section explains the design choices of and functioning of OoJs. In brief this is are the characteristics:

### Features
-  neat syntax similar to other OOP languages (public: becomes this.Public())
-  declaration up front, definitions below
-  public, private, protected methods and data members
-  non-pure virtual methods
-  correct prototype chain (instanceof works)
-  supports namespaces. You can make classes without poluting the global scope at all (well except for your namespace of course)
-  all methods and members of your class can internally be called in the form of `this.myMethod` or `this.myData`
-  only one copy of every method, regardless how many objects you have
-  fully unit tested, to garantee it works


### Limitations
-  you will have to include a class with sugar code (about 7KB) in order to make the magic work
-  I haven't done performance testing to compare to other models, but it sure isn't the kind of framework to generate thousands of objects, rather use it to create good application design
-  it's not cryptic, but you'll best still include a link to this readme for people reading your code to understand how it works
-  you can't call a static method on an instance (I don't really know if I find it a good idea to implement that, but I might do for consistency with C++)
-  no friend classes (for the moment)
-  no multiple inheritance (for the moment)
-  no possibility to set a standard access level when inheriting from a class (where C++ allows you to do "class A : protected B"), however you can override the access level on an indivitual basis for your class members.
-  one feature is currently incomplete. It's related to the property .BaseName which will be available on your private object of a Derived class and which will allow you to access Base versions of members. The current implementation only provides .BaseName for your direct parent, and not for ancestors higher up the chain.
-  there is currently no clone utility function provided with OoJs. The problem being I haven't found a simple way to determine which properties should be deep copied and which not. What if someone writes (and they can, so they will): this.myWindow = window. Deep copying a data member like that would be a royal disaster... You will have to provide a copy constructor dealing with the right properties if you want this
-  I haven't tested whether it works well to inherit from non-OoJs bases. Say you could subclass "Function" to generate functions, but I haven't tested fancy stuff like that. (Your objects inherit the prototype of your base, so with most stuff it should be fine)
-  classes that inherit from one another have to live in the same namespace

If you are using OoJs and there's stuff you can't do due to the limitations, please file an issue here at github and/or start a bounty at [bountysource](https://bountysource.com) and I'll do my best to make time for it.


### Requirements

-  nothing, unless you want to run the unit tests, in which case: [TidBits JavaScript UnitTesting](https://github.com/najamelan/TidBits_Javascript_UnitTesting)


### Installation

The easiest way to include this in your project is by adding either TidBits Javascript as a submodule to your repository or if you don't want everything, just take the TidBits OoJs submodule. **For deployment you only really need [oojs.js](https://raw.github.com/najamelan/TidBits_Javascript_OoJs/master/oojs.js)**

So, either:

Check the [installation instructions of the TidBits Javascript Library](https://github.com/najamelan/TidBits_Javascript#installation)

or:

```bash
mkdir includes
git submodule add https://github.com/najamelan/TidBits_Javascript_OoJs.git includes/OoJs
git submodule add https://github.com/najamelan/TidBits_Javascript_UnitTesting.git includes/UnitTesting
```

### Verify your installation

If you are using Nodejs, run the unit tests:

```bash
cd includes/OoJs
node tests/testOoJs.js
```

#### Verify your installation

If you are using Nodejs, run the unit tests:

```bash
cd includes/UnitTesting
node tests/testOoJs.js
```

If you want to test if it works in your browser, open the file **tests/test.htm**


### Usage

Have a look at [the sample code below](#seeing-it-in-action). Once you get the hang of it and before you use it for your own projects, come back to read these instructions. These are a number of things you should and should not do. This section aims at being rather complete and explain some rare edge cases. Don't get demotivated to use OoJs for basic functionality if you don't understand all the details immediately.

#### Reserved keywords

OoJs adds certain properties to your object. They will be non-enumerable, but you shouldn't overwrite/delete them regardless.
-  `ooID` (you can use this if you want, read only, to uniquely identify your objects) It is unique for all OoJs objects, not only those in the same class.
-  `Super`, `Virtual`, `Private`, `Protected`, `Public`
-  OoJs creates a property with the name of your baseclass on your private object, so you can call baseclass versions of methods, so don't create a property with the name of a class you inherit from.
-  `Static.getPrivateInstance` is a property provided by OoJs. It is safe (but not recommended) to create a property with that name on an instance, but not on static level.

#### API

OoJs provides the following functions:

-  **OoJs.setupClass**: need to call this for every class  
  **returns** `Static`  
  **parameters**: `namespace, classname [, baseclassname]`

-  **OoJs.typeOf**: find out the type of an OoJs object (eg. will not return 'object', will return your classname)  
  **returns** `string` classname  
  **parameters**: an object created by a class setup with OoJs
  

-  **Static.getPrivateInstance( interface )**. If you ever need to get the private pointer for an interface of this class. This allows any code within your class scope access to the private part of any object of this class. It also works with objects of subclasses. You will only get access to the private part belonging to your class, eg. you won't be able to access data members or methods added by subclasses, with the exception of virtual methods of your class which have been overridden.
  
-  On your private object, if class Circle inherits from Shape, in Circle, **this.Shape** will be an interface to the Shape parent of your circle, which you can use to call Shape versions of public and protected methods. Currently only available for the direct parent. I should implement that for all ancestors...

-  On both your interface and private object, a property **ooID** will exist. This is a unique identifier for this object. The interface will have the same ooID as the private object, should you ever need to verify their connection.

-  **this.Super( parameters )** allows you to send parameters to your parent class constructor. You should call this before calling Public/Private/Protected.

-  On both static and instance you will have **.Public**, **.Private**, **.Protected** which take your members as parameters. Methods should be passed as references (their name without quotes), whereas data members should be their name as strings. You can override the access level of parent members, in which case you should pass them as strings. These methods also accept the return value of **this.Virtual** as a parameter. For instances, .Public will return an interface which you should return from your constructor.

-  On your instance you can call **this.Virtual**. This method takes method references as parameters. You can call this in the parameter list of the above methods so you don't have to write your method names twice.

#### Make sure your object is set up

You must make at least 1 call to either Public, Private or Protected in order to have your object set up properly and to inherit. You need to do this for both your Static as well as your instance (this)

#### Do not use logic before your object is set up

Don't do something like this:

```js
// constructor
// 
MyClass( check )
{
	if( check )

		this.Protected( someMethod )

	else

		this.Protected( someOtherMethod )
}
```

It won't work as expected, and I won't ever make this work. Until you have finished calling Private/Protected/Public, you should do nothing other than declaration/initialisation.


#### Declare data members and call Super before Public/Private/Protected

You can pass parameters to your baseclass constructor by calling `this.Super( parameters )`. However, this is optional and if you don't need to pass on parameters, when you call Public/Private/Protected, OoJs will call your baseclass constructor for you without parameters. Thus once that's happened, you can't call it manually any more.

When you declare data members, Public/Private/Protected will store them and replace them with accessor properties. So you need to declare them before calling any of these methods.


#### Do not call virtual methods from your constructor

A child class instance calls Super() before finishing setting up, and thus a virtual method in the baseclass won't yet point to overridden versions in the child class.


#### Sealing your object is nice, but dangerous

I would like to encourage people to call Object.seal() on their objects when the declaration is over. However this makes your class final when you seal the public interface (eg. it won't be possible to subclass it) and breaks virtual methods if you seal your private object. That's because when a subclass instance is created, the public interface of the parent is being extended to have the protected properties as well as the public ones (so you can call parent versions as this.ParentClass.protectedMethod()). This happens when the subclass declaration is complete, and thus the parent interface is already created. If it's sealed, that's no longer possible. With virtual methods, the pointer on this get changed by subclasses to point to their overridden versions. That is no longer possible if the private object is sealed.

In conclusion, if your class has no virtual methods, you can safely seal your private object. This will protect you against spelling mistakes in setters for example.

If you seal your interface and you have protected members, your class becomes final. You can work around this by passing a parameter in your constructor to distinguish between when it is safe to seal and when not. Since sealing is logic, not declaration you should do it after calling Private/Protected/Public and so it can happen conditionally. Ex: If in your subclasses you call this.Super( "noseal" ), you can seal it when a client instanciates directly, and thus doesn't pass this parameter.


#### Do not try to deep copy objects or extend them

It won't work as expected. You will have methods that work on the private part of the object you copy and so it won't work as expected. If a user sets a data member to point to some outside object (eg. window), it would be quite bad to deep copy that. It is best you write your own copy constructor which will make sure that all data members that need to be deep copied will be so.







### Seeing it in action

This is some animal sample code. For an extensive example, look at the unit tests for OoJs, they cover all the features in dept (and are written to work in a browser as well as nodejs).

```js
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

```
