TidBits Javascript OoJs
=======================

This tidbit proposes a way to use a classical OOP paradigm in Javascript.

If you want to skip the lesson about OOP software design, skip down to "How it works".

[toc]

## Why would you want to use OOP
OOP is the best programming paradigm currently known to wo.mankind. The essence of OOP is not turn your nouns into objects and your verbs into methods. That is object based programming, which is the model for custom types in Javascript.

Now what is the difference between OOP and Object Based Programming?

### Abstraction

OOP is about abstraction. It is about creating a high level view on your software which is encumbered as little as possible with  implementation or design details. We will find "what varies" or is likely to vary in the future (a difficult design decision for example) and we will push that further down the hierarchy of our design. Further down the hierarchy can mean different things, for example from class declaration to definition or going from inheritance to aggregation.

Theoretically Javascript allows you to adhere to such principles, but you are not encouraged even less bound to. The essence of a clear structure is to separate interface from implementation and thus have class declarations. Javascript in the wild rarely has class declarations, even the best and most popular libraries.

Javascript allows you to change object structure anywhere along the line, and even if that might seem powerful at first, the downside is that people actually do it which means poor structure. It becomes very hard to see what an object really is, because it is extended all over the place and because there is about ten ways to do anything, including inheritance.

If there would be no traffic rules, we would be more free. We would also be able to most if not all of the things we can do now, or more (at least at the personal level), but a system with rules might be more efficient in the end to get everyone from a to b with as few accidents as possible. That's because things are predictable and understood by everyone. Freedom of action can bring power but also chaos (I'm talking about systems here, not social relations and politics).

That's why the classical model obliges us to make class declarations and to abstract by separating our declaration from our implementation. It is constraining at first sight (when you have to write your method signature several times), but has the ever lasting benefit of everyone, including yourself being able to look up in usually 1 screenheight worth of text **what** an object of this class **is**. That creates one of the fundamental building blocks for scalability and maintainability.

*The class declaration or interface is a contract made with the clients of the class.*



### Loose coupling, tight cohesion

The classical OOP model provides ways to hide data. When you release code which has all its details and properties publicly available, people will write code that relies on them. Their code will become tightly coupled to the inner workings of yours. When you need to change the inner workings of your library because of bugs or new features, things will start breaking. That's why one of the ways to hide the implementation details of your code is private and protected data members. Javascript does not support private data members on objects.

The extra power of being able to change everything from everywhere is compensated for in OOP by sound design and by the possibility to subclass if you need change the behaviour of a class.


### Flexibility vs Scalability and Maintainability

When looking at a small snippet, the javascript model is attractive, but when you need to write software to tackle challenging and complex problems, the classical OOP model scales way better than the object based model but is more cumbersome to just get 3 lines of code executed somewhere. I think the current situation is a consequence of the historical evolution of the internet, and not because the developers of ecmascript thought that object based programming is better than OOP, but it is attractive for **scripting** rather than for **developing software**.

As the the internet evolves it takes more and more place in informatics and these days we want to develop big and complex software in javascript. There is [a draft on the way for Ecmascript 6](http://wiki.ecmascript.org/doku.php?id=strawman%3amaximally_minimal_classes) to finally support the class keywords, but it might take some time before browsers implement it.

## How it works

This section explains the design choices of OoJs. In brief this is are the characteristics:

### Features
- declaration up front, definitions below
- public, private and protected methods
- correct prototype chain (instanceof works)
- subclasses can override methods that are being called from superclass methods (virtual methods in C++)
- all methods and members of your class can be called in the form of `this.myMethod` or `this.myData`
- classname only needs to be specified once and is programmatorically available
- fully unit tested, to garantee it works

### Limitations
- **Major**: all data members have to be private or you will suffer (explained below)
- a bit of sugar code is necessary to set up correct prototype chaining...
- I haven't done performance testing to compare to other models
- it's not cryptic, but you'll probably still need to add a link to this readme for people reading your code

### Private data members

As said, javascript doesn't provide them, which means you can't have one object with private and public properties on it. There is roughly 2 ways to work around the problem. Create `var`'s in your constructor instead of properties on `this`, or keep `this` private. OoJs does the second thing, let's see why:


```js
function Animal()
{
	this.heads      = 5           // public
	var legs        = 3           // private

	this.changeLegs = changeLegs  // if you want it to be public

	function changeLegs()
	{
		++legs
	}

	(return this) // is implied, no need to write this
}

Animal.prototype.growLeg = function(){}
```

This is how you get private variables. However, now every copy of Animal has a copy of each methods which need access to private variables attached to it. That is a major no-go zone as far as performance is concerned, and javascript is a performance sensitive language. The other way of attaching methods doesn't work here, because `growLeg` here won't have access to `legs` as it is not in scope. If we can't have our method definitions in the constructor, we can't use the scope to keep variables private.

The alternative is:

```js
(function()
{
	function Animal()
	{
		this.heads      = 5           // public
		this.legs       = 3           // private

		this.changeLegs = changeLegs


		var iFace = new IFace()
		var that  = this

		iFace.heads      = this.heads
		iFace.changeLegs = function(){ return changeLegs.apply( that, arguments ) }

		return iFace
	}

	function changeLegs()
	{
		++legs
	}

})()
```

We move the method outside of the constructor so every object doesn't get a copy of it. To get access to private data members, we keep `this` private and return a public interface. Some sugar code will make sure the interface inherits from Animal, so `instanceof` will work. The extra code is not the only cost of this method, the disavantages are described below. We wrap the whole block in an anonymous function which is ran immediately to create an execution context. `function changeLegs` is not visible outside this scope unless we put a reference on the iFace.


### Static properties

Javascript doesn't have support for static properties. If you were to: `Animal.static = function...` than this would not be inherited by subclasses. Since static private properties don't need to be attached to an object, they are slightly easier to implement using scope:

```js
(function( namespace )
{
	var __class__          = 'Animal'
	namespace[ __class__ ] = Class

	var staticPrivate = 1

	Class.staticPublic = getClass


	function Class()
	{
		// constructor code
	}

	// all method definitions
	function getClass()
	{
		return __class__
	}

})( namespace )
```

We put the classname in a string, that way it can be changed in one place without breaking **internal** code. Also we can provide a template for making classes which is more generic. This time the `var` method for creating private members works, because we can declare our functions in this scope, as we won't be instanciating objects at this level. We add a namespace parameter which allows you to declare the class within a namespace (such as window for a browser or global for nodejs, or any other object you wich to function as namespace). We put the constructor on the namespace. For the public properties we attach them to the constructor, since that is the object we make publicly available.


### So why can't we make data members public or protected?
As you might know, this works in the normal javascript object model. Since we don't return `this` in the constructor, but a public interface, we need to put references to the actual objects. With primitive types this is downright impossible in javascript and with objects it is problematic. Consider the following:


```js
// in our constructor:
this.options = { lineheight: 12 }

// later we make it public:
iFace.options = this.options

// Now if someone using your class does:
myObject.options.lineheight = 15

// That's fine, but if they do:
myObject.options = { lineheight: 15 }

// oops, myObject.options which actually is iFace.options points no longer to this.options in your class.
// so if methods of your class change this.options, they won't be changing iFace.options


// for primitive types you could use the constructor in order to take a reference to the object, but:
"hi" === String( "hi" ) // false
Boolean( false )        // will evaluate to true
```

That's outright dangerous, because it seems so natural to be able to do all that. It's unfortunate, but there seems no way to safely have public or protected data members with this approach. To work around it, you should write getters and setters, or a combination of both at once:

```js
this._lineheight = 12 // declared in constructor

this.lineheight  = lineheight
this.setProp     = setProp

// with your method definitions
//
function lineheight( value ){ return this.setProp( "_lineheight", value ) }

function setProp( prop, value )
{
	if( 'undefined' !== newHeigth ) this[ prop ] = value
	else return this[ prop ]
}


```
This way each g.s.etter only takes a line plus it's declaration in the constructor. There is folks in OOP world who say you should always keep your data members private and use g.s.etters in order to hide the implementation details of your class hidden from the evil outside world. For small projects that is sometimes overkill, but this approach will garantee you that you'll always be able to change the underlying implementation and it will allow you to do validity checking when people want to set a value. After all, one of the only downsides of this model might not really be one for serious OOP, but it surely is an inconvenience.

### Inheritance

As far as getting properties is concerned it would be possible to implement multiple inheritance, but ...


### Sugar


### Declarations



### Putting it all together



















