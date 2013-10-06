var  TidBits  = TidBits || {} // our namespace

if( 'undefined' !== typeof module )
{
	TidBits = require( '../../UnitTesting/TestCase.js' )
}

TidBits.TestData = {}



;(function Class_Single( namespace, undefined )
{
'use strict';

if( namespace[ "Single" ] ) return

    namespace.Single = Single
var Static           = TidBits.OoJs.setupClass( namespace, "Single" )

Static.privateStaticDM   = "privateStaticDM"
Static.protectedStaticDM = "protectedStaticDM"
Static.publicStaticDM    = "publicStaticDM"


Static.Private
(
	 "privateStaticDM"
	, privateStaticMethod
)

Static.Protected
(
	 "protectedStaticDM"
	, protectedStaticMethod
)

Static.Public
(
	  "publicStaticDM"

	, publicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function Single()
{
	this.privateInstanceDM   = "privateInstanceDM"
	this.protectedInstanceDM = "protectedInstanceDM"
	this.publicInstanceDM    = "publicInstanceDM"


	this.Private
	(
		 "privateInstanceDM"
		, privateInstanceMethod
	)

	this.Protected
	(
		 "protectedInstanceDM"
		, protectedInstanceMethod
	)


	return this.Public
	(
		  "publicInstanceDM"

		, publicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function privateStaticMethod  (){ return "privateStaticMethod"   }
function protectedStaticMethod(){ return "protectedStaticMethod" }
function publicStaticMethod   (){ return "publicStaticMethod"    }


function privateInstanceMethod  (){ return "privateInstanceMethod"   }
function protectedInstanceMethod(){ return "protectedInstanceMethod" }
function publicInstanceMethod   (){ return "publicInstanceMethod"    }



})( TidBits.TestData ); // Single







/// Simple Inheritance
//

;(function Class_InheritPrivateA( namespace, undefined )
{
'use strict';

if( namespace[ "InheritPrivateA" ] ) return

    namespace.InheritPrivateA = InheritPrivateA
var Static                    = TidBits.OoJs.setupClass( namespace, "InheritPrivateA" )

Static.AprivateStaticDM   = "AprivateStaticDM"
Static.AprotectedStaticDM = "AprotectedStaticDM"
Static.ApublicStaticDM    = "ApublicStaticDM"


Static.Private
(
	 "AprivateStaticDM"
	, AprivateStaticMethod
)

Static.Protected
(
	 "AprotectedStaticDM"
	, AprotectedStaticMethod
)

Static.Public
(
	  "ApublicStaticDM"

	, ApublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritPrivateA()
{
	this.AprivateInstanceDM   = "AprivateInstanceDM"
	this.AprotectedInstanceDM = "AprotectedInstanceDM"
	this.ApublicInstanceDM    = "ApublicInstanceDM"


	this.Private
	(
		 "AprivateInstanceDM"
		, AprivateInstanceMethod
	)

	this.Protected
	(
		 "AprotectedInstanceDM"
		, AprotectedInstanceMethod
	)


	return this.Public
	(
		  "ApublicInstanceDM"

		, ApublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function AprivateStaticMethod  (){ return "AprivateStaticMethod"   }
function AprotectedStaticMethod(){ return "AprotectedStaticMethod" }
function ApublicStaticMethod   (){ return "ApublicStaticMethod"    }


function AprivateInstanceMethod  (){ return "AprivateInstanceMethod"   }
function AprotectedInstanceMethod(){ return "AprotectedInstanceMethod" }
function ApublicInstanceMethod   (){ return "ApublicInstanceMethod"    }



})( TidBits.TestData ); // InheritPrivateA






;(function Class_InheritPrivateB( namespace, undefined )
{
'use strict';

if( namespace[ "InheritPrivateB" ] ) return

    namespace.InheritPrivateB = InheritPrivateB
var Static = TidBits.OoJs.setupClass( namespace, "InheritPrivateB", "InheritPrivateA" )

Static.BprivateStaticDM   = "BprivateStaticDM"
Static.BprotectedStaticDM = "BprotectedStaticDM"
Static.BpublicStaticDM    = "BpublicStaticDM"


Static.Private
(
	 "BprivateStaticDM"
	, BprivateStaticMethod
)

Static.Protected
(
	 "BprotectedStaticDM"
	, BprotectedStaticMethod
)

Static.Public
(
	  "BpublicStaticDM"

	, BpublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritPrivateB()
{
	this.BprivateInstanceDM   = "BprivateInstanceDM"
	this.BprotectedInstanceDM = "BprotectedInstanceDM"
	this.BpublicInstanceDM    = "BpublicInstanceDM"


	this.Private
	(
		 "BprivateInstanceDM"
		, BprivateInstanceMethod
	)

	this.Protected
	(
		 "BprotectedInstanceDM"
		, BprotectedInstanceMethod
	)


	return this.Public
	(
		  "BpublicInstanceDM"

		, BpublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function BprivateStaticMethod  (){ return "BprivateStaticMethod"   }
function BprotectedStaticMethod(){ return "BprotectedStaticMethod" }
function BpublicStaticMethod   (){ return "BpublicStaticMethod"    }


function BprivateInstanceMethod  (){ return "BprivateInstanceMethod"   }
function BprotectedInstanceMethod(){ return "BprotectedInstanceMethod" }
function BpublicInstanceMethod   (){ return "BpublicInstanceMethod"    }



})( TidBits.TestData ); // InheritPrivateB




;(function Class_InheritPrivateC( namespace, undefined )
{
'use strict';

if( namespace[ "InheritPrivateC" ] ) return

    namespace.InheritPrivateC = InheritPrivateC
var Static = TidBits.OoJs.setupClass( namespace, "InheritPrivateC", "InheritPrivateB" )

Static.CprivateStaticDM   = "CprivateStaticDM"
Static.CprotectedStaticDM = "CprotectedStaticDM"
Static.CpublicStaticDM    = "CpublicStaticDM"


Static.Private
(
	 "CprivateStaticDM"
	, CprivateStaticMethod
)

Static.Protected
(
	 "CprotectedStaticDM"
	, CprotectedStaticMethod
)

Static.Public
(
	  "CpublicStaticDM"

	, CpublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritPrivateC()
{
	this.CprivateInstanceDM   = "CprivateInstanceDM"
	this.CprotectedInstanceDM = "CprotectedInstanceDM"
	this.CpublicInstanceDM    = "CpublicInstanceDM"


	this.Private
	(
		 "CprivateInstanceDM"
		, CprivateInstanceMethod
	)

	this.Protected
	(
		 "CprotectedInstanceDM"
		, CprotectedInstanceMethod
	)


	return this.Public
	(
		  "CpublicInstanceDM"

		, CpublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function CprivateStaticMethod  (){ return "CprivateStaticMethod"   }
function CprotectedStaticMethod(){ return "CprotectedStaticMethod" }
function CpublicStaticMethod   (){ return "CpublicStaticMethod"    }


function CprivateInstanceMethod  (){ return "CprivateInstanceMethod"   }
function CprotectedInstanceMethod(){ return "CprotectedInstanceMethod" }
function CpublicInstanceMethod   (){ return "CpublicInstanceMethod"    }



})( TidBits.TestData ); // InheritPrivateC






// Inherited Protected
//



;(function Class_InheritProtectedA( namespace, undefined )
{
'use strict';

if( namespace[ "InheritProtectedA" ] ) return

    namespace.InheritProtectedA = InheritProtectedA
var Static                      = TidBits.OoJs.setupClass( namespace, "InheritProtectedA" )

Static.AprivateStaticDM   = "AprivateStaticDM"
Static.AprotectedStaticDM = "AprotectedStaticDM"
Static.ApublicStaticDM    = "ApublicStaticDM"


Static.Private
(
	 "AprivateStaticDM"
	, AprivateStaticMethod
)

Static.Protected
(
	 "AprotectedStaticDM"
	, AprotectedStaticMethod
)

Static.Public
(
	  "ApublicStaticDM"

	, ApublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritProtectedA()
{
	this.AprivateInstanceDM   = "AprivateInstanceDM"
	this.AprotectedInstanceDM = "AprotectedInstanceDM"
	this.ApublicInstanceDM    = "ApublicInstanceDM"


	this.Private
	(
		 "AprivateInstanceDM"
		, AprivateInstanceMethod
	)

	this.Protected
	(
		 "AprotectedInstanceDM"
		, AprotectedInstanceMethod
	)


	return this.Public
	(
		  "ApublicInstanceDM"

		, ApublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function AprivateStaticMethod  (){ return "AprivateStaticMethod"   }
function AprotectedStaticMethod(){ return "AprotectedStaticMethod" }
function ApublicStaticMethod   (){ return "ApublicStaticMethod"    }


function AprivateInstanceMethod  (){ return "AprivateInstanceMethod"   }
function AprotectedInstanceMethod(){ return "AprotectedInstanceMethod" }
function ApublicInstanceMethod   (){ return "ApublicInstanceMethod"    }



})( TidBits.TestData ); // InheritProtectedA






;(function Class_InheritProtectedB( namespace, undefined )
{
'use strict';

if( namespace[ "InheritProtectedB" ] ) return

    namespace.InheritProtectedB = InheritProtectedB
var Static = TidBits.OoJs.setupClass( namespace, "InheritProtectedB", { inherit: "InheritProtectedA", as: "protected"} )

Static.BprivateStaticDM   = "BprivateStaticDM"
Static.BprotectedStaticDM = "BprotectedStaticDM"
Static.BpublicStaticDM    = "BpublicStaticDM"


Static.Private
(
	 "BprivateStaticDM"
	, BprivateStaticMethod
)

Static.Protected
(
	 "BprotectedStaticDM"
	, BprotectedStaticMethod
)

Static.Public
(
	  "BpublicStaticDM"

	, BpublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritProtectedB()
{
	this.BprivateInstanceDM   = "BprivateInstanceDM"
	this.BprotectedInstanceDM = "BprotectedInstanceDM"
	this.BpublicInstanceDM    = "BpublicInstanceDM"


	this.Private
	(
		 "BprivateInstanceDM"
		, BprivateInstanceMethod
	)

	this.Protected
	(
		 "BprotectedInstanceDM"
		, BprotectedInstanceMethod
	)


	return this.Public
	(
		  "BpublicInstanceDM"

		, BpublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function BprivateStaticMethod  (){ return "BprivateStaticMethod"   }
function BprotectedStaticMethod(){ return "BprotectedStaticMethod" }
function BpublicStaticMethod   (){ return "BpublicStaticMethod"    }


function BprivateInstanceMethod  (){ return "BprivateInstanceMethod"   }
function BprotectedInstanceMethod(){ return "BprotectedInstanceMethod" }
function BpublicInstanceMethod   (){ return "BpublicInstanceMethod"    }



})( TidBits.TestData ); // InheritProtectedB




;(function Class_InheritProtectedC( namespace, undefined )
{
'use strict';

if( namespace[ "InheritProtectedC" ] ) return

    namespace.InheritProtectedC = InheritProtectedC
var Static = TidBits.OoJs.setupClass( namespace, "InheritProtectedC", { inherit: "InheritProtectedB", as: "protected" } )

Static.CprivateStaticDM   = "CprivateStaticDM"
Static.CprotectedStaticDM = "CprotectedStaticDM"
Static.CpublicStaticDM    = "CpublicStaticDM"


Static.Private
(
	 "CprivateStaticDM"
	, CprivateStaticMethod
)

Static.Protected
(
	 "CprotectedStaticDM"
	, CprotectedStaticMethod
)

Static.Public
(
	  "CpublicStaticDM"

	, CpublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritProtectedC()
{
	this.CprivateInstanceDM   = "CprivateInstanceDM"
	this.CprotectedInstanceDM = "CprotectedInstanceDM"
	this.CpublicInstanceDM    = "CpublicInstanceDM"


	this.Private
	(
		 "CprivateInstanceDM"
		, CprivateInstanceMethod
	)

	this.Protected
	(
		 "CprotectedInstanceDM"
		, CprotectedInstanceMethod
	)


	return this.Public
	(
		  "CpublicInstanceDM"

		, CpublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function CprivateStaticMethod  (){ return "CprivateStaticMethod"   }
function CprotectedStaticMethod(){ return "CprotectedStaticMethod" }
function CpublicStaticMethod   (){ return "CpublicStaticMethod"    }


function CprivateInstanceMethod  (){ return "CprivateInstanceMethod"   }
function CprotectedInstanceMethod(){ return "CprotectedInstanceMethod" }
function CpublicInstanceMethod   (){ return "CpublicInstanceMethod"    }



})( TidBits.TestData ); // InheritProtectedC





// Inherited Public
//



;(function Class_InheritPublicA( namespace, undefined )
{
'use strict';

if( namespace[ "InheritPublicA" ] ) return

    namespace.InheritPublicA = InheritPublicA
var Static                   = TidBits.OoJs.setupClass( namespace, "InheritPublicA" )

Static.Friends( "TestGetPrivateInstance" )


Static.AprivateStaticDM   = "AprivateStaticDM"
Static.AprotectedStaticDM = "AprotectedStaticDM"
Static.ApublicStaticDM    = "ApublicStaticDM"


Static.Private
(
	 "AprivateStaticDM"
	, AprivateStaticMethod
)

Static.Protected
(
	 "AprotectedStaticDM"
	, AprotectedStaticMethod
)

Static.Public
(
	  "ApublicStaticDM"

	, ApublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritPublicA()
{
	this.AprivateInstanceDM   = "AprivateInstanceDM"
	this.AprotectedInstanceDM = "AprotectedInstanceDM"
	this.ApublicInstanceDM    = "ApublicInstanceDM"


	this.Private
	(
		 "AprivateInstanceDM"
		, AprivateInstanceMethod
	)

	this.Protected
	(
		 "AprotectedInstanceDM"
		, AprotectedInstanceMethod
	)


	return this.Public
	(
		  "ApublicInstanceDM"

		, ApublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function AprivateStaticMethod  (){ return "AprivateStaticMethod"   }
function AprotectedStaticMethod(){ return "AprotectedStaticMethod" }
function ApublicStaticMethod   (){ return "ApublicStaticMethod"    }


function AprivateInstanceMethod  (){ return "AprivateInstanceMethod"   }
function AprotectedInstanceMethod(){ return "AprotectedInstanceMethod" }
function ApublicInstanceMethod   (){ return "ApublicInstanceMethod"    }



})( TidBits.TestData ); // InheritPublicA






;(function Class_InheritPublicB( namespace, undefined )
{
'use strict';

if( namespace[ "InheritPublicB" ] ) return

    namespace.InheritPublicB = InheritPublicB
var Static = TidBits.OoJs.setupClass( namespace, "InheritPublicB", { inherit: "InheritPublicA", as: "public"} )

Static.BprivateStaticDM   = "BprivateStaticDM"
Static.BprotectedStaticDM = "BprotectedStaticDM"
Static.BpublicStaticDM    = "BpublicStaticDM"


Static.Private
(
	 "BprivateStaticDM"
	, BprivateStaticMethod
)

Static.Protected
(
	 "BprotectedStaticDM"
	, BprotectedStaticMethod
)

Static.Public
(
	  "BpublicStaticDM"

	, BpublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritPublicB()
{
	this.BprivateInstanceDM   = "BprivateInstanceDM"
	this.BprotectedInstanceDM = "BprotectedInstanceDM"
	this.BpublicInstanceDM    = "BpublicInstanceDM"


	this.Private
	(
		 "BprivateInstanceDM"
		, BprivateInstanceMethod
	)

	this.Protected
	(
		 "BprotectedInstanceDM"
		, BprotectedInstanceMethod
	)


	return this.Public
	(
		  "BpublicInstanceDM"

		, BpublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function BprivateStaticMethod  (){ return "BprivateStaticMethod"   }
function BprotectedStaticMethod(){ return "BprotectedStaticMethod" }
function BpublicStaticMethod   (){ return "BpublicStaticMethod"    }


function BprivateInstanceMethod  (){ return "BprivateInstanceMethod"   }
function BprotectedInstanceMethod(){ return "BprotectedInstanceMethod" }
function BpublicInstanceMethod   (){ return "BpublicInstanceMethod"    }



})( TidBits.TestData ); // InheritPublicB




;(function Class_InheritPublicC( namespace, undefined )
{
'use strict';

if( namespace[ "InheritPublicC" ] ) return

    namespace.InheritPublicC = InheritPublicC
var Static = TidBits.OoJs.setupClass( namespace, "InheritPublicC", { inherit: "InheritPublicB", as: "public" } )

Static.Friends( "TestGetPrivateInstance" )


Static.CprivateStaticDM   = "CprivateStaticDM"
Static.CprotectedStaticDM = "CprotectedStaticDM"
Static.CpublicStaticDM    = "CpublicStaticDM"


Static.Private
(
	 "CprivateStaticDM"
	, CprivateStaticMethod
)

Static.Protected
(
	 "CprotectedStaticDM"
	, CprotectedStaticMethod
)

Static.Public
(
	  "CpublicStaticDM"

	, CpublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function InheritPublicC()
{
	this.CprivateInstanceDM   = "CprivateInstanceDM"
	this.CprotectedInstanceDM = "CprotectedInstanceDM"
	this.CpublicInstanceDM    = "CpublicInstanceDM"


	this.Private
	(
		 "CprivateInstanceDM"
		, CprivateInstanceMethod
	)

	this.Protected
	(
		 "CprotectedInstanceDM"
		, CprotectedInstanceMethod
	)


	return this.Public
	(
		  "CpublicInstanceDM"

		, CpublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function CprivateStaticMethod  (){ return "CprivateStaticMethod"   }
function CprotectedStaticMethod(){ return "CprotectedStaticMethod" }
function CpublicStaticMethod   (){ return "CpublicStaticMethod"    }


function CprivateInstanceMethod  (){ return "CprivateInstanceMethod"   }
function CprotectedInstanceMethod(){ return "CprotectedInstanceMethod" }
function CpublicInstanceMethod   (){ return "CpublicInstanceMethod"    }



})( TidBits.TestData ); // InheritPublicC








/// Data member consistancy
//

;(function Class_GetterSetterA( namespace, undefined )
{
'use strict';

if( namespace[ "GetterSetterA" ] ) return

    namespace.GetterSetterA = GetterSetterA
var Static                  = TidBits.OoJs.setupClass( namespace, "GetterSetterA" )


Static.ApublicStaticDM    = 5


Static.Public
(
	  "ApublicStaticDM"

	, getPrivate
	, getPrivateInst
	, AStaticGet
	, AStaticSet
)


// Constructor
//
function GetterSetterA( set )
{
	this.ApublicInstanceDM = set || 15


	return this.Public
	(
		  "ApublicInstanceDM"

		, AInstanceGet
		, AInstanceSet
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function AStaticGet(       ){ return Static.ApublicStaticDM  }
function AStaticSet( value ){ Static.ApublicStaticDM = value }

function AInstanceGet(       ){ return this.ApublicInstanceDM  }
function AInstanceSet( value ){ this.ApublicInstanceDM = value }

})( TidBits.TestData ); // GetterSetterA





;(function Class_GetterSetterB( namespace, undefined )
{
'use strict';

if( namespace[ "GetterSetterB" ] ) return

    namespace.GetterSetterB = GetterSetterB
var Static                  = TidBits.OoJs.setupClass( namespace, "GetterSetterB", { inherit: "GetterSetterA", as: "public" } )

Static.Friends( "TestDMConsistency" )

Static.Public
(
	  getPrivate
	, getPrivateInst
	, BStaticGet
	, BStaticSet
)


// Constructor
//
function GetterSetterB( set )
{
	this.Super( set )

	return this.Public
	(
		  BInstanceGet
		, BInstanceSet
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function BStaticGet(       ){ return Static.ApublicStaticDM  }
function BStaticSet( value ){ Static.ApublicStaticDM = value }

function BInstanceGet(       ){ return this.ApublicInstanceDM  }
function BInstanceSet( value ){ this.ApublicInstanceDM = value }

})( TidBits.TestData ); // GetterSetterB









;(function Class_VirtualA( namespace, undefined )
{
'use strict';

if( namespace[ "VirtualA" ] ) return

    namespace.VirtualA = VirtualA
var Static             = TidBits.OoJs.setupClass( namespace, "VirtualA" )

Static.Friends( "TestGetPrivateInstance" )


Static.Public
(
	  getPrivate
	, getPrivateInst
)


// Constructor
//
function VirtualA()
{
	this.Private
	(
		this.Virtual
		(
			  privateVirtualMethod
		)

		, privateNonVirtualMethod
	)

	return this.Public
	(
		  callPrivateVirtual
		, callPrivateNonVirtual
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }

function privateVirtualMethod    (){ return "A version"                    }
function privateNonVirtualMethod (){ return "A version non virtual"        }

function callPrivateVirtual      (){ return this.privateVirtualMethod   () }
function callPrivateNonVirtual   (){ return this.privateNonVirtualMethod() }


})( TidBits.TestData ); // VirtualA




;(function Class_VirtualB( namespace, undefined )
{
'use strict';

if( namespace[ "VirtualB" ] ) return

    namespace.VirtualB = VirtualB
var Static             = TidBits.OoJs.setupClass( namespace, "VirtualB", { inherit: "VirtualA", as: "public" } )


Static.Public
(
	  getPrivate
	, getPrivateInst
)


// Constructor
//
function VirtualB()
{
	this.Private
	(
		this.Virtual
		(
			  privateVirtualMethod
		)

		, privateNonVirtualMethod
	)


	return this.Public
	(
		  callAPrivateVirtual
		, callAPrivateNonVirtual
		, callBPrivateVirtual
		, callBPrivateNonVirtual
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }

function privateVirtualMethod   (){ return "B version"             }
function privateNonVirtualMethod(){ return "B version non virtual" }

function callAPrivateVirtual      (){ return this.callPrivateVirtual   () }
function callAPrivateNonVirtual   (){ return this.callPrivateNonVirtual() }

function callBPrivateVirtual      (){ return this.privateVirtualMethod   () }
function callBPrivateNonVirtual   (){ return this.privateNonVirtualMethod() }


})( TidBits.TestData ); // VirtualB





;(function Class_VirtualC( namespace, undefined )
{
'use strict';

if( namespace[ "VirtualC" ] ) return

    namespace.VirtualC = VirtualC
var Static             = TidBits.OoJs.setupClass( namespace, "VirtualC", { inherit: "VirtualB", as: "public" } )

Static.Friends( "TestGetPrivateInstance" )


Static.Public
(
	  getPrivate
	, getPrivateInst
)


// Constructor
//
function VirtualC()
{
	this.Private
	(
		this.Virtual
		(
			  privateVirtualMethod
		)

		, privateNonVirtualMethod
	)


	return this.Public
	(
		  callAPrivateVirtual
		, callAPrivateNonVirtual
		, callCPrivateVirtual
		, callCPrivateNonVirtual
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }

function privateVirtualMethod   (){ return "C version"             }
function privateNonVirtualMethod(){ return "C version non virtual" }

function callAPrivateVirtual      (){ return this.callPrivateVirtual   () }
function callAPrivateNonVirtual   (){ return this.callPrivateNonVirtual() }

function callCPrivateVirtual      (){ return this.privateVirtualMethod   () }
function callCPrivateNonVirtual   (){ return this.privateNonVirtualMethod() }


})( TidBits.TestData ); // VirtualC







/// Data member consistancy
//

;(function Class_OverridePropertiesA( namespace, undefined )
{
'use strict';

if( namespace[ "OverridePropertiesA" ] ) return

    namespace.OverridePropertiesA = OverridePropertiesA
var Static                        = TidBits.OoJs.setupClass( namespace, "OverridePropertiesA" )


Static.privateStaticDM   = "AprivateStaticDM"
Static.protectedStaticDM = "AprotectedStaticDM"
Static.publicStaticDM    = "ApublicStaticDM"


Static.Private
(
	 "privateStaticDM"
	, privateStaticMethod
)

Static.Protected
(
	 "protectedStaticDM"
	, protectedStaticMethod
)

Static.Public
(
	  "publicStaticDM"

	, publicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function OverridePropertiesA( set )
{
	this.privateInstanceDM   = "AprivateInstanceDM"
	this.protectedInstanceDM = "AprotectedInstanceDM"
	this.publicInstanceDM    = "ApublicInstanceDM"


	this.Private
	(
		 "privateInstanceDM"
		, privateInstanceMethod
	)

	this.Protected
	(
		 "protectedInstanceDM"
		, protectedInstanceMethod
	)


	return this.Public
	(
		  "publicInstanceDM"

		, publicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function privateStaticMethod  (){ return "AprivateStaticMethod"   }
function protectedStaticMethod(){ return "AprotectedStaticMethod" }
function publicStaticMethod   (){ return "ApublicStaticMethod"    }


function privateInstanceMethod  (){ return "AprivateInstanceMethod"   }
function protectedInstanceMethod(){ return "AprotectedInstanceMethod" }
function publicInstanceMethod   (){ return "ApublicInstanceMethod"    }

})( TidBits.TestData ); // OverridePropertiesA





;(function Class_OverridePropertiesB( namespace, undefined )
{
'use strict';

if( namespace[ "OverridePropertiesB" ] ) return

    namespace.OverridePropertiesB = OverridePropertiesB
var Static                        = TidBits.OoJs.setupClass( namespace, "OverridePropertiesB", { inherit: "OverridePropertiesA", as: "public" } )


Static.privateStaticDM   = "BprivateStaticDM"
Static.protectedStaticDM = "BprotectedStaticDM"
Static.publicStaticDM    = "BpublicStaticDM"


Static.Private
(
	 "privateStaticDM"
	, privateStaticMethod
)

Static.Protected
(
	 "protectedStaticDM"
	, protectedStaticMethod
)

Static.Public
(
	  "publicStaticDM"

	, publicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function OverridePropertiesB( set )
{
	this.privateInstanceDM   = "BprivateInstanceDM"
	this.protectedInstanceDM = "BprotectedInstanceDM"
	this.publicInstanceDM    = "BpublicInstanceDM"


	this.Private
	(
		 "privateInstanceDM"
		, privateInstanceMethod
	)

	this.Protected
	(
		 "protectedInstanceDM"
		, protectedInstanceMethod
	)


	return this.Public
	(
		  "publicInstanceDM"

		, publicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function privateStaticMethod  (){ return "BprivateStaticMethod"   }
function protectedStaticMethod(){ return "BprotectedStaticMethod" }
function publicStaticMethod   (){ return "BpublicStaticMethod"    }


function privateInstanceMethod  (){ return "BprivateInstanceMethod"   }
function protectedInstanceMethod(){ return "BprotectedInstanceMethod" }
function publicInstanceMethod   (){ return "BpublicInstanceMethod"    }

})( TidBits.TestData ); // OverridePropertiesA





/// Override access levels
//
// a public -> b private -> c


;(function Class_OverrideAccessA( namespace, undefined )
{
'use strict';

if( namespace[ "OverrideAccessA" ] ) return

    namespace.OverrideAccessA = OverrideAccessA
var Static                   = TidBits.OoJs.setupClass( namespace, "OverrideAccessA" )

Static.AprivateStaticDM   = "AprivateStaticDM"
Static.AprotectedStaticDM = "AprotectedStaticDM"
Static.ApublicStaticDM    = "ApublicStaticDM"


Static.Private
(
	 "AprivateStaticDM"
	, AprivateStaticMethod
)

Static.Protected
(
	 "AprotectedStaticDM"
	, AprotectedStaticMethod
)

Static.Public
(
	  "ApublicStaticDM"

	, ApublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function OverrideAccessA()
{
	this.AprivateInstanceDM   = "AprivateInstanceDM"
	this.AprotectedInstanceDM = "AprotectedInstanceDM"
	this.ApublicInstanceDM    = "ApublicInstanceDM"


	this.Private
	(
		 "AprivateInstanceDM"
		, AprivateInstanceMethod
	)

	this.Protected
	(
		 "AprotectedInstanceDM"
		, AprotectedInstanceMethod
	)


	return this.Public
	(
		  "ApublicInstanceDM"

		, ApublicInstanceMethod
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function AprivateStaticMethod  (){ return "AprivateStaticMethod"   }
function AprotectedStaticMethod(){ return "AprotectedStaticMethod" }
function ApublicStaticMethod   (){ return "ApublicStaticMethod"    }


function AprivateInstanceMethod  (){ return "AprivateInstanceMethod"   }
function AprotectedInstanceMethod(){ return "AprotectedInstanceMethod" }
function ApublicInstanceMethod   (){ return "ApublicInstanceMethod"    }



})( TidBits.TestData ); // OverrideAccessA






;(function Class_OverrideAccessB( namespace, undefined )
{
'use strict';

if( namespace[ "OverrideAccessB" ] ) return

    namespace.OverrideAccessB = OverrideAccessB
var Static = TidBits.OoJs.setupClass( namespace, "OverrideAccessB", { inherit: "OverrideAccessA", as: "public"} )

Static.BprivateStaticDM   = "BprivateStaticDM"
Static.BprotectedStaticDM = "BprotectedStaticDM"
Static.BpublicStaticDM    = "BpublicStaticDM"
Static.ApublicStaticDM    = "BApublicStaticDM"


Static.Private
(
	 "BprivateStaticDM"
	, BprivateStaticMethod
)

Static.Protected
(
	  "BprotectedStaticDM"
	, "ApublicStaticDM"

	, BprotectedStaticMethod

	, "OverrideAccessA.ApublicStaticMethod"
)

Static.Public
(
	  "BpublicStaticDM"

	, BpublicStaticMethod
	, getPrivate
	, getPrivateInst
)


// Constructor
//
function OverrideAccessB()
{
	this.BprivateInstanceDM   = "BprivateInstanceDM"
	this.BprotectedInstanceDM = "BprotectedInstanceDM"
	this.BpublicInstanceDM    = "BpublicInstanceDM"


	this.Private
	(
		 "BprivateInstanceDM"
		, BprivateInstanceMethod

		, "OverrideAccessA.ApublicInstanceDM"
	)

	this.Protected
	(
		 "BprotectedInstanceDM"
		, BprotectedInstanceMethod

		, ApublicInstanceMethod
	)


	return this.Public
	(
		  "BpublicInstanceDM"

		, BpublicInstanceMethod

		, "OverrideAccessA.AprotectedInstanceMethod"
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function BprivateStaticMethod  (){ return "BprivateStaticMethod"   }
function BprotectedStaticMethod(){ return "BprotectedStaticMethod" }
function BpublicStaticMethod   (){ return "BpublicStaticMethod"    }


function BprivateInstanceMethod  (){ return "BprivateInstanceMethod"   }
function BprotectedInstanceMethod(){ return "BprotectedInstanceMethod" }
function BpublicInstanceMethod   (){ return "BpublicInstanceMethod"    }

function ApublicInstanceMethod   (){ return "BApublicInstanceMethod"    }



})( TidBits.TestData ); // OverrideAccessB




;(function Class_OverrideAccessC( namespace, undefined )
{
'use strict';

if( namespace[ "OverrideAccessC" ] ) return

    namespace.OverrideAccessC = OverrideAccessC
var Static = TidBits.OoJs.setupClass( namespace, "OverrideAccessC", { inherit: "OverrideAccessB", as: "private" } )

Static.CprivateStaticDM   = "CprivateStaticDM"
Static.CprotectedStaticDM = "CprotectedStaticDM"
Static.CpublicStaticDM    = "CpublicStaticDM"


Static.Private
(
	 "CprivateStaticDM"
	, CprivateStaticMethod
)

Static.Protected
(
	 "CprotectedStaticDM"
	, CprotectedStaticMethod
)

Static.Public
(
	  "CpublicStaticDM"

	, CpublicStaticMethod
	, getPrivate
	, getPrivateInst

	, "OverrideAccessA.AprotectedStaticDM"
)


// Constructor
//
function OverrideAccessC()
{
	this.CprivateInstanceDM   = "CprivateInstanceDM"
	this.CprotectedInstanceDM = "CprotectedInstanceDM"
	this.CpublicInstanceDM    = "CpublicInstanceDM"


	this.Private
	(
		 "CprivateInstanceDM"
		, CprivateInstanceMethod
	)

	this.Protected
	(
		 "CprotectedInstanceDM"
		, CprotectedInstanceMethod
	)


	return this.Public
	(
		  "CpublicInstanceDM"

		, CpublicInstanceMethod

		, "OverrideAccessB.BprotectedInstanceDM"
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }


function CprivateStaticMethod  (){ return "CprivateStaticMethod"   }
function CprotectedStaticMethod(){ return "CprotectedStaticMethod" }
function CpublicStaticMethod   (){ return "CpublicStaticMethod"    }


function CprivateInstanceMethod  (){ return "CprivateInstanceMethod"   }
function CprotectedInstanceMethod(){ return "CprotectedInstanceMethod" }
function CpublicInstanceMethod   (){ return "CpublicInstanceMethod"    }



})( TidBits.TestData ); // OverrideAccessC











// Test Static.getPrivateInstance
//

;(function Class_GetPrivateInstance( namespace, undefined )
{
'use strict';

if( namespace[ "GetPrivateInstance" ] ) return

    namespace.GetPrivateInstance = GetPrivateInstance
var Static                       = TidBits.OoJs.setupClass( namespace, "GetPrivateInstance" )


Static.Friends( "TestGetPrivateInstance" )


Static.Public
(
	  getPrivate
	, getPrivateInst
)


// Constructor
//
function GetPrivateInstance()
{
	this.Private
	(
	)

	this.Protected
	(
	)


	return this.Public
	(
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }

})( TidBits.TestData ); // GetPrivateInstance




;(function Class_GetPrivateInstanceB( namespace, undefined )
{
'use strict';

if( namespace[ "GetPrivateInstanceB" ] ) return

    namespace.GetPrivateInstanceB = GetPrivateInstanceB
var Static                        = TidBits.OoJs.setupClass( namespace, "GetPrivateInstanceB", { inherit: "GetPrivateInstance", as: "public" } )


Static.Public
(
	  getPrivate
	, getPrivateInst
)


// Constructor
//
function GetPrivateInstanceB()
{
	this.Private
	(
	)

	this.Protected
	(
	)


	return this.Public
	(
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }

})( TidBits.TestData ); // GetPrivateInstanceB







;(function Class_GetPrivateInstanceC( namespace, undefined )
{
'use strict';

if( namespace[ "GetPrivateInstanceC" ] ) return

    namespace.GetPrivateInstanceC = GetPrivateInstanceC
var Static                        = TidBits.OoJs.setupClass( namespace, "GetPrivateInstanceC", { inherit: "GetPrivateInstanceB", as: "public" } )


Static.Private
(
)

Static.Protected
(
)

Static.Public
(
	  getPrivate
	, getPrivateInst
)


// Constructor
//
function GetPrivateInstanceC()
{
	this.Private
	(
	)

	this.Protected
	(
	)


	return this.Public
	(
	)
}


// Methods
//
function getPrivate    (       ){ return Static                             }
function getPrivateInst( iFace ){ return Static.getPrivateInstance( iFace ) }

})( TidBits.TestData ); // GetPrivateInstanceC






TidBits.TestData.classLayout =
{

Single :
{
	   className: "Single"

	,  properties :
		[
		  { name: "publicStaticMethod"     , type:"method", value: "publicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "privateStaticMethod"    , type:"method", value: "privateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "protectedStaticMethod"  , type:"method", value: "protectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "privateInstanceMethod"  , type:"method", value: "privateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "protectedInstanceMethod", type:"method", value: "protectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "publicInstanceMethod"   , type:"method", value: "publicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "privateStaticDM"        , type:"DM"    , value: "privateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "protectedStaticDM"      , type:"DM"    , value: "protectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "publicStaticDM"         , type:"DM"    , value: "publicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "privateInstanceDM"      , type:"DM"    , value: "privateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "protectedInstanceDM"    , type:"DM"    , value: "protectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "publicInstanceDM"       , type:"DM"    , value: "publicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},



InheritPublicA :
{
	   className: "InheritPublicA"

	,  properties :
		[
		  { name: "AprivateStaticMethod"    , type:"method", value: "AprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceMethod"  , type:"method", value: "AprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "AprivateStaticDM"        , type:"DM"    , value: "AprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceDM"      , type:"DM"    , value: "AprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},


InheritPublicB :
{
	   className: "InheritPublicB"
	,  ancestors: [ "InheritPublicA" ]

	,  properties :
		[
		  { name: "BprivateStaticMethod"    , type:"method", value: "BprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceMethod"  , type:"method", value: "BprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "BprivateStaticDM"        , type:"DM"    , value: "BprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceDM"      , type:"DM"    , value: "BprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "public"   , scope: "instance" }


		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},


InheritPublicC :
{
	   className: "InheritPublicC"
	,  ancestors: [ "InheritPublicA", "InheritPublicB" ]

	,  properties :
		[
		  { name: "CprivateStaticMethod"    , type:"method", value: "CprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceMethod"  , type:"method", value: "CprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticMethod"  , type:"method", value: "CprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceMethod", type:"method", value: "CprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "CpublicStaticMethod"     , type:"method", value: "CpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceMethod"   , type:"method", value: "CpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "CprivateStaticDM"        , type:"DM"    , value: "CprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceDM"      , type:"DM"    , value: "CprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticDM"      , type:"DM"    , value: "CprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceDM"    , type:"DM"    , value: "CprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "CpublicStaticDM"         , type:"DM"    , value: "CpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceDM"       , type:"DM"    , value: "CpublicInstanceDM"       , access: "public"   , scope: "instance" }


		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "public"   , scope: "instance" }

		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},



InheritProtectedA :
{
	   className: "InheritProtectedA"

	,  properties :
		[
		  { name: "AprivateStaticMethod"    , type:"method", value: "AprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceMethod"  , type:"method", value: "AprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "AprivateStaticDM"        , type:"DM"    , value: "AprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceDM"      , type:"DM"    , value: "AprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},


InheritProtectedB :
{
	   className: "InheritProtectedB"
	,  ancestors: [ "InheritProtectedA" ]

	,  properties :
		[
		  { name: "BprivateStaticMethod"    , type:"method", value: "BprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceMethod"  , type:"method", value: "BprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "BprivateStaticDM"        , type:"DM"    , value: "BprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceDM"      , type:"DM"    , value: "BprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "public"   , scope: "instance" }


		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "protected", scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "protected", scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "protected", scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "protected", scope: "instance" }
		]
},


InheritProtectedC :
{
	   className: "InheritProtectedC"
	,  ancestors: [ "InheritProtectedA", "InheritProtectedB" ]

	,  properties :
		[
		  { name: "CprivateStaticMethod"    , type:"method", value: "CprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceMethod"  , type:"method", value: "CprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticMethod"  , type:"method", value: "CprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceMethod", type:"method", value: "CprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "CpublicStaticMethod"     , type:"method", value: "CpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceMethod"   , type:"method", value: "CpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "CprivateStaticDM"        , type:"DM"    , value: "CprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceDM"      , type:"DM"    , value: "CprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticDM"      , type:"DM"    , value: "CprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceDM"    , type:"DM"    , value: "CprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "CpublicStaticDM"         , type:"DM"    , value: "CpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceDM"       , type:"DM"    , value: "CpublicInstanceDM"       , access: "public"   , scope: "instance" }


		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "protected", scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "protected", scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "protected", scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "protected", scope: "instance" }

		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "protected", scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "protected", scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "protected", scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "protected", scope: "instance" }
		]
},



InheritPrivateA :
{
	   className: "InheritPrivateA"

	,  properties :
		[
		  { name: "AprivateStaticMethod"    , type:"method", value: "AprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceMethod"  , type:"method", value: "AprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "AprivateStaticDM"        , type:"DM"    , value: "AprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceDM"      , type:"DM"    , value: "AprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},


InheritPrivateB :
{
	   className: "InheritPrivateB"
	,  ancestors: [ "InheritPrivateA" ]

	,  properties :
		[
		  { name: "BprivateStaticMethod"    , type:"method", value: "BprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceMethod"  , type:"method", value: "BprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "BprivateStaticDM"        , type:"DM"    , value: "BprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceDM"      , type:"DM"    , value: "BprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "public"   , scope: "instance" }


		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "private", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "private", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "private", scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "private", scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "private", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "private", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "private", scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "private", scope: "instance" }
		]
},


InheritPrivateC :
{
	   className: "InheritPrivateC"
	,  ancestors: [ "InheritPrivateA", "InheritPrivateB" ]

	,  properties :
		[
		  { name: "CprivateStaticMethod"    , type:"method", value: "CprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceMethod"  , type:"method", value: "CprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticMethod"  , type:"method", value: "CprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceMethod", type:"method", value: "CprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "CpublicStaticMethod"     , type:"method", value: "CpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceMethod"   , type:"method", value: "CpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "CprivateStaticDM"        , type:"DM"    , value: "CprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceDM"      , type:"DM"    , value: "CprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticDM"      , type:"DM"    , value: "CprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceDM"    , type:"DM"    , value: "CprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "CpublicStaticDM"         , type:"DM"    , value: "CpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceDM"       , type:"DM"    , value: "CpublicInstanceDM"       , access: "public"   , scope: "instance" }


		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "private", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "private", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "private", scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "private", scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "private", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "private", scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "private", scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "private", scope: "instance" }
		]
},



GetterSetterA :
{
	   className: "GetterSetterA"

	,  properties :
		[
			  { name: "AStaticGet"       , type:"method", value: 5 , access: "public", scope: "static"   }
			, { name: "AStaticSet"       , type:"method"           , access: "public", scope: "static"   }
			, { name: "ApublicStaticDM"  , type:"DM"    , value: 5 , access: "public", scope: "static"   }
			, { name: "AInstanceGet"     , type:"method", value: 15, access: "public", scope: "instance" }
			, { name: "AInstanceSet"     , type:"method"           , access: "public", scope: "instance" }
			, { name: "ApublicInstanceDM", type:"DM"    , value: 15, access: "public", scope: "instance" }
		]
},


GetterSetterB :
{
	   className: "GetterSetterB"
	,  ancestors: [ "GetterSetterA" ]

	,  properties :
		[
			  { name: "BStaticGet"       , type:"method", value: 5 , access: "public", scope: "static"   }
			, { name: "BStaticSet"       , type:"method"           , access: "public", scope: "static"   }
			, { name: "BInstanceGet"     , type:"method", value: 15, access: "public", scope: "instance" }
			, { name: "BInstanceSet"     , type:"method"           , access: "public", scope: "instance" }

			, { name: "AStaticGet"       , type:"method", value: 5 , access: "public", scope: "static"   }
			, { name: "AStaticSet"       , type:"method"           , access: "public", scope: "static"   }
			, { name: "ApublicStaticDM"  , type:"DM"    , value: 5 , access: "public", scope: "static"   }
			, { name: "AInstanceGet"     , type:"method", value: 15, access: "public", scope: "instance" }
			, { name: "AInstanceSet"     , type:"method"           , access: "public", scope: "instance" }
			, { name: "ApublicInstanceDM", type:"DM"    , value: 15, access: "public", scope: "instance" }
		]
},




VirtualA :
{
	   className: "VirtualA"

	,  properties :
		[
			  { name: "privateVirtualMethod"   , type:"method", value: "A version"            , access: "private", scope: "instance" }
			, { name: "privateNonVirtualMethod", type:"method", value: "A version non virtual", access: "private", scope: "instance" }
			, { name: "callPrivateVirtual"     , type:"method", value: "A version"            , access: "public" , scope: "instance" }
			, { name: "callPrivateNonVirtual"  , type:"method", value: "A version non virtual", access: "public" , scope: "instance" }
		]
},


VirtualB :
{
	   className: "VirtualB"
	,  ancestors: [ "VirtualA" ]

	,  properties :
		[
			  { name: "privateVirtualMethod"    , type:"method", value: "B version"            , access: "private", scope: "instance" }
			, { name: "privateNonVirtualMethod" , type:"method", value: "B version non virtual", access: "private", scope: "instance" }
			, { name: "callBPrivateVirtual"     , type:"method", value: "B version"            , access: "public" , scope: "instance" }
			, { name: "callBPrivateNonVirtual"  , type:"method", value: "B version non virtual", access: "public" , scope: "instance" }
			, { name: "callAPrivateVirtual"     , type:"method", value: "B version"            , access: "public" , scope: "instance" }
			, { name: "callAPrivateNonVirtual"  , type:"method", value: "A version non virtual", access: "public" , scope: "instance" }

			, { name: "callPrivateVirtual"      , type:"method", value: "B version"            , access: "public" , scope: "instance" }
			, { name: "callPrivateNonVirtual"   , type:"method", value: "A version non virtual", access: "public" , scope: "instance" }
		]
},




OverridePropertiesA :
{
	   className: "OverridePropertiesA"

	,  properties :
		[
		  { name: "privateStaticMethod"    , type:"method", value: "AprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "privateInstanceMethod"  , type:"method", value: "AprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "protectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "protectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "publicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "publicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "privateStaticDM"        , type:"DM"    , value: "AprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "privateInstanceDM"      , type:"DM"    , value: "AprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "protectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "protectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "publicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "publicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},


OverridePropertiesB :
{
	   className: "OverridePropertiesB"
	,  ancestors: [ "OverridePropertiesA" ]

	,  properties :
		[
		  { name: "privateStaticMethod"    , type:"method", value: "BprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "privateInstanceMethod"  , type:"method", value: "BprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "protectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "protectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "publicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "publicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "privateStaticDM"        , type:"DM"    , value: "BprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "privateInstanceDM"      , type:"DM"    , value: "BprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "protectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "protectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "publicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "publicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},



OverrideAccessA :
{
	   className: "OverrideAccessA"

	,  properties :
		[
		  { name: "AprivateStaticMethod"    , type:"method", value: "AprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceMethod"  , type:"method", value: "AprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "ApublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "AprivateStaticDM"        , type:"DM"    , value: "AprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "AprivateInstanceDM"      , type:"DM"    , value: "AprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicStaticDM"         , type:"DM"    , value: "ApublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "public"   , scope: "instance" }
		]
},


OverrideAccessB :
{
	   className: "OverrideAccessB"
	,  ancestors: [ "OverrideAccessA" ]

	,  properties :
		[
		  { name: "BprivateStaticMethod"    , type:"method", value: "BprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceMethod"  , type:"method", value: "BprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "BprivateStaticDM"        , type:"DM"    , value: "BprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "BprivateInstanceDM"      , type:"DM"    , value: "BprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "public"   , scope: "instance" }

		, { name: "ApublicStaticDM"         , type:"DM"    , value: "BApublicStaticDM"        , access: "protected", scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "BApublicInstanceMethod"  , access: "protected", scope: "instance" }

		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "public"   , scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "protected", scope: "static"   }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "ApublicInstanceDM"       , type:"DM"    , value: "ApublicInstanceDM"       , access: "private"  , scope: "instance" }
		]
},


OverrideAccessC :
{
	   className: "OverrideAccessC"
	,  ancestors: [ "OverrideAccessA", "OverrideAccessB" ]

	,  properties :
		[
		  { name: "CprivateStaticMethod"    , type:"method", value: "CprivateStaticMethod"    , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceMethod"  , type:"method", value: "CprivateInstanceMethod"  , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticMethod"  , type:"method", value: "CprotectedStaticMethod"  , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceMethod", type:"method", value: "CprotectedInstanceMethod", access: "protected", scope: "instance" }
		, { name: "CpublicStaticMethod"     , type:"method", value: "CpublicStaticMethod"     , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceMethod"   , type:"method", value: "CpublicInstanceMethod"   , access: "public"   , scope: "instance" }
		, { name: "CprivateStaticDM"        , type:"DM"    , value: "CprivateStaticDM"        , access: "private"  , scope: "static"   }
		, { name: "CprivateInstanceDM"      , type:"DM"    , value: "CprivateInstanceDM"      , access: "private"  , scope: "instance" }
		, { name: "CprotectedStaticDM"      , type:"DM"    , value: "CprotectedStaticDM"      , access: "protected", scope: "static"   }
		, { name: "CprotectedInstanceDM"    , type:"DM"    , value: "CprotectedInstanceDM"    , access: "protected", scope: "instance" }
		, { name: "CpublicStaticDM"         , type:"DM"    , value: "CpublicStaticDM"         , access: "public"   , scope: "static"   }
		, { name: "CpublicInstanceDM"       , type:"DM"    , value: "CpublicInstanceDM"       , access: "public"   , scope: "instance" }



		, { name: "BprotectedStaticMethod"  , type:"method", value: "BprotectedStaticMethod"  , access: "private", scope: "static"   }
		, { name: "BprotectedInstanceMethod", type:"method", value: "BprotectedInstanceMethod", access: "private", scope: "instance" }
		, { name: "BpublicStaticMethod"     , type:"method", value: "BpublicStaticMethod"     , access: "private", scope: "static"   }
		, { name: "BpublicInstanceMethod"   , type:"method", value: "BpublicInstanceMethod"   , access: "private", scope: "instance" }
		, { name: "BprotectedStaticDM"      , type:"DM"    , value: "BprotectedStaticDM"      , access: "private", scope: "static"   }
		, { name: "BprotectedInstanceDM"    , type:"DM"    , value: "BprotectedInstanceDM"    , access: "public" , scope: "instance" }
		, { name: "BpublicStaticDM"         , type:"DM"    , value: "BpublicStaticDM"         , access: "private", scope: "static"   }
		, { name: "BpublicInstanceDM"       , type:"DM"    , value: "BpublicInstanceDM"       , access: "private", scope: "instance" }

		, { name: "ApublicStaticDM"         , type:"DM"    , value: "BApublicStaticDM"        , access: "private", scope: "static"   }
		, { name: "ApublicInstanceMethod"   , type:"method", value: "BApublicInstanceMethod"  , access: "private", scope: "instance" }

		, { name: "AprotectedStaticMethod"  , type:"method", value: "AprotectedStaticMethod"  , access: "private", scope: "static"   }
		, { name: "AprotectedInstanceMethod", type:"method", value: "AprotectedInstanceMethod", access: "private", scope: "instance" }
		, { name: "ApublicStaticMethod"     , type:"method", value: "ApublicStaticMethod"     , access: "private", scope: "static"   }
		, { name: "AprotectedStaticDM"      , type:"DM"    , value: "AprotectedStaticDM"      , access: "public" , scope: "static"   }
		, { name: "AprotectedInstanceDM"    , type:"DM"    , value: "AprotectedInstanceDM"    , access: "private", scope: "instance" }
		]
}





}


TidBits.TestData.keys = Object.keys( TidBits.TestData.classLayout )

for( var i = TidBits.TestData.keys.length - 1; i >= 0; --i )
{
	TidBits.TestData.classLayout[ TidBits.TestData.keys[i] ].properties.push
	(
		  { name: "getPrivate"    , type: "method", access: "public" , scope: "static" }
		, { name: "getPrivateInst", type: "method", access: "public" , scope: "static" }
	)
}





if( 'undefined' !== typeof module )

	module.exports = TidBits
;
