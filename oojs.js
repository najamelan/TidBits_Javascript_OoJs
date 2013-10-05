/*
 TidBits OoJs - version: 13.08.20-alpha
 README: https://github.com/najamelan/TidBits_Javascript_OoJs
*/
var TidBits=TidBits||{};
(function(x,p){function r(a,d){this.classID=a;this.type=d;this.table={}}function G(a,d,c,b,e){this.Static=d;this.IFace=e;this.Class=a[c];this.name=c;this.id=b;this.bases=[];this.allBases=[];this.accessibleBases=[];this.inaccessibleBases=[];this.staticLayout=new r(d.ooID,"staticLayout");this.instanceLayout=new r(d.ooID,"instanceLayout");this.layoutInstance=null;this.flags=0;this.virtuals={};this.namespace=a}function y(a,d,c){this._this=a;this.classID=d;this.iFace=c;this.state={};this.supers=[];this.flags=
0}function t(){return null}function H(a,d,c){function b(){}function e(){}var f=a[d];Object.defineProperty(b,"Public",{value:z});Object.defineProperty(b,"Protected",{value:A});Object.defineProperty(b,"Private",{value:B});Object.defineProperty(b,"getPrivateInstance",{value:I});Object.defineProperty(b,"ooID",{value:u()});Object.defineProperty(f,"ooID",{value:b.ooID});Object.defineProperty(b,"toString",{value:function(){return"function Static(){ /*"+d+"*/ }"}});Object.defineProperty(f,"toString",{value:function(){return"function "+
d+"()"}});m[b.ooID]=new G(a,b,d,b.ooID,e);k[b.ooID]=new y(b,b.ooID,f);n[d]=b.ooID;if(c!==p){Array.isArray(c)||(c=Array(c));for(var h=c.length-1;0<=h;--h){var g={as:"public",namespace:a};"string"===typeof c[h]&&(c[h]={inherit:c[h]});c[h]=s(g,c[h]);if(0>["public","private","protected"].indexOf(c[h].as))throw Error("Invalid class access level in class: "+d+". Trying to inherit "+c[h].inherit+" as "+c[h].as+". Only 'public', 'private' or 'protected' are supported");}m[b.ooID].bases=c;for(var l,h=c.length-
1;0<=h;--h)(l=n[c[h].inherit])&&k[b.ooID].supers.push(l);f.prototype=Object.create(a[c[0].inherit].prototype);J(b.ooID)}Object.defineProperty(f.prototype,"constructor",{configurable:!0,value:f});Object.defineProperty(f.prototype,"Public",{configurable:!0,value:z});Object.defineProperty(f.prototype,"Protected",{configurable:!0,value:A});Object.defineProperty(f.prototype,"Private",{configurable:!0,value:B});Object.defineProperty(f.prototype,"Super",{configurable:!0,value:K});Object.defineProperty(f.prototype,
"Virtual",{configurable:!0,value:L});e.prototype=Object.create(f.prototype);return b}function J(a){a=m[a];for(var d=a.accessibleBases,c=a.inaccessibleBases,b=a.allBases,e=[],f=a.bases.length-1;0<=f;--f){var h=a.bases[f].inherit,g=n[h];if(g)for(d.push(h),b.push(h),e.push.apply(d,m[g].accessibleBases),e.push.apply(c,m[g].inaccessibleBases),e.push.apply(b,m[g].allBases),h=m[g].bases.length-1;0<=h;--h){var l=m[g].bases[h],k=d.indexOf(l.inherit);"private"===l.as&&-1!==k&&e.push.apply(c,a.accessibleBases.splice(k,
1))}}}function z(){return v.call(this,arguments,g.PUBLIC)}function A(){v.call(this,arguments,g.PROTECTED)}function B(){v.call(this,arguments,g.PRIVATE)}function I(a){var d;return this!==m[k[this.ooID].classID].Static?null:(d=w(a.ooID,this.ooID))?k[d]._this:null}function M(a){return m[k[a.ooID].classID].name}function L(){v.call(this,arguments,g.VIRTUAL);var a=Array.prototype.slice.apply(arguments);a[a.length]=g.VIRTUAL;return a}function K(){if(k[this.ooID]&&k[this.ooID].flags&g.SUPERS)throw Error("This object already has a parent. You have to call Super before calling Public, Private or Protected.");
this.ooID===p&&C.call(this);D.apply(this,arguments)}function D(){if(!(k[this.ooID].flags&g.SUPERS)){k[this.ooID].flags|=g.SUPERS;for(var a=m[k[this.ooID].classID],d=a.bases.length-1;0<=d;--d){var c=a.bases[d].inherit;n[c]&&(E.prototype=a.namespace[c].prototype,c=new E(a.namespace[c],arguments),k[this.ooID].supers.push(c.ooID))}}}function E(a,d){return a.apply(this,d)}function N(a,d,c){var b=d.classID;this.flags&g.PRIVATE?this.ownerID!==b&&-1!==c.classMeta.accessibleBases.indexOf(m[this.ownerID].name)&&
delete a[m[this.ownerID].name][this.name]:(this.ownerID!==b&&m[b][c.layoutType].get(this.name,b)||Object.defineProperty(a,this.name,Object.getOwnPropertyDescriptor(d._this,this.name)),-1!==c.classMeta.inaccessibleBases.indexOf(m[this.ownerID].name)&&(c=n[this.ownerID],a[c]=a[c]||{},Object.defineProperty(a[c],this.name,Object.getOwnPropertyDescriptor(d._this[c],this.name))))}function v(a,d){this.ooID===p&&C.call(this);var c=m[k[this.ooID].classID].Static===this?"staticLayout":"instanceLayout",b=k[this.ooID],
e=b.classID,b={instRec:b,classID:e,supers:b.supers,iFace:b.iFace,classMeta:m[e],virtuals:m[e].virtuals,layout:m[e][c],layoutFlag:m[e].Static===this?g.INHERITED_STATIC:g.INHERITED_INSTANCE,layoutType:c,accessLvl:d,newMembers:[]};if(!(b.instRec.flags&g.STORED)){k[this.ooID].flags|=g.STORED;for(var f in this)this.hasOwnProperty(f)&&(b.layout.get(f,b.classID)===p&&b.layout.set({name:f,flags:g.PRIVATE|g.ACTIVE,ownerID:b.classID,setterID:b.classID}),b.instRec.state[f]=this[f],delete this[f])}"instanceLayout"===
c&&D.call(this);if(!(0===b.classMeta.bases.length||b.instRec.flags&g.BASE_ACCESSORS)){b.instRec.flags|=g.BASE_ACCESSORS;f=k[b.supers[0]];for(var h=m[b.instRec.classID].accessibleBases,e=h.length-1;0<=e;--e)m[f.classID].name!==h[e]&&(this[h[e]]=s({},f._this[h[e]],!0));m[f.classID][b.layoutType].each(N,this,f,b);h=m[f.classID].name;this[h]=s({},this,!0);for(e=b.classMeta.bases.length-1;0<=e;--e)if(b.classMeta.bases[e].inherit===h&&"public"===b.classMeta.bases[e].as){s(b.iFace,f.iFace);b.iFace[h]=s({},
f.iFace,!0);break}}if(!(b.classMeta.flags&b.layoutFlag))for(b.classMeta.flags|=b.layoutFlag,f=b.supers.length-1;0<=f;--f){var n=m[k[b.supers[f]].classID],e=n[b.layoutType],h=n.virtuals;e.each(O,b,n);for(var l in h)if(n=e.get(l),h.hasOwnProperty(l)&&(n===p||n.flags&g.VIRTUAL)){b.virtuals[l]=[];for(var q in h[l])b.virtuals[l].push(h[l][q])}}if(null===b.classMeta.layoutInstance||this.ooID===b.classMeta.layoutInstance)for("instanceLayout"===c&&(b.classMeta.layoutInstance=this.ooID),q=a.length-1;0<=q;--q)if(l=
a[q],Array.isArray(l)&&l[l.length-1]===g.VIRTUAL)for(f=l.length-2;0<=f;--f)F.call(this,b,l[f]);else F.call(this,b,l);if("instanceLayout"===c)for(q=a.length-1;0<=q;--q)if(l=a[q],"function"===typeof l&&(l=/\W*function\W+([\w\$]+)\(/.exec(l.toString())[1],b.virtuals[l]!==p))for(f=b.virtuals[l].length-1;0<=f;--f)b.virtuals[l][f].ownerID!==b.classID&&P.call(this,b,l,b.virtuals[l][f].ownerID);g.VIRTUAL!==d&&b.layout.each(Q,this,b);if(d===g.PUBLIC&&"instanceLayout"===c)return b.iFace}function F(a,d){var c,
b,e;if("function"===typeof d)b=/\W*function\W+([\w\$]+)\(/.exec(d.toString())[1],c=d;else if("string"===typeof d){var f=d.split(".");b=f.pop();e=f.pop();if(f.length)throw Error("More than one dot found in: "+d);if(e){if(!n[e])throw new TypeError(e+" is not an OoJs base. Setting access level is curently only supported on OoJs bases.");if(0>a.classMeta.accessibleBases.indexOf(e)&&!a.layout.get(b,e))throw new TypeError(e+" is not an accessible base of "+a.classMeta.name);if(a.accessLvl===g.VIRTUAL)throw Error("Can't make base methods virtual ("+
d+") in "+a.classMeta.name);}}else throw new TypeError("Parameters to this.Public/Private/Protected have to be either strings or references to functions. Got: "+d+" in class "+a.classMeta.name);var h,f=e||a.classMeta.name;if(h=a.layout.get(b,f))h=a.accessLvl&g.VIRTUAL?h.flags|g.VIRTUAL:a.accessLvl|h.flags&g.VIRTUAL;else if(c||e)h=a.accessLvl;else throw Error("Couldn't find property: "+b+" in class: "+a.classMeta.name);e&&a.layout.get(b)&&a.layout.get(b).ownerID!==n[f]||(h|=g.ACTIVE);a.layout.set({name:b,
reference:c,flags:h,ownerID:n[f],setterID:a.classID});a.accessLvl&g.VIRTUAL&&(a.virtuals[b]=a.virtuals[b]||[],a.virtuals[b].push(a.layout.get(b,a.classID)))}function O(a,d){if(!(this.flags&g.PRIVATE)&&this.flags&g.ACTIVE){for(var c,b=this.flags&~g.VIRTUAL,e=a.classMeta.bases.length-1;0<=e;--e)a.classMeta.bases[e].inherit===d.name&&(c=a.classMeta.bases[e].as);if("private"===c||"protected"===c)c="private"===c?g.PRIVATE:g.PROTECTED,b&=~g.PUBLIC&~g.PROTECTED,b|=c;a.layout.set({name:this.name,ownerID:this.ownerID,
setterID:this.setterID,reference:this.reference,flags:b})}}function P(a,d,c){c=w(this.ooID,c);delete k[c]._this[d];Object.defineProperty(k[c]._this,d,{enumerable:!0,configurable:!0,get:function(a,c){return function(){return a.bind(c)}}(a.layout.get(d,a.classID).reference,this)})}function Q(a,d){if(this.flags&d.accessLvl&&this.setterID===d.classID)if(this.ownerID!==d.classID){var c=d.layout.get(this.name),b=d.layout.get(this.name,d.classID),e=m[this.ownerID].name;if(this.flags&g.PUBLIC)for(d.instRec.iFace[e]=
d.instRec.iFace[e]||{},b=b?[d.instRec.iFace[e]]:[d.instRec.iFace,d.instRec.iFace[e]],c=b.length-1;0<=c;--c)Object.defineProperty(b[c],this.name,Object.getOwnPropertyDescriptor(d.instRec._this[e],this.name));else delete d.instRec.iFace[e][this.name],c&&c.ownerID===this.ownerID&&delete d.instRec.iFace[this.name]}else for(this.flags&g.PUBLIC||delete d.instRec.iFace[this.name],e=this.flags&g.PUBLIC?[a,d.iFace]:[a],b=a.ooID,c=e.length-1;0<=c;--c)this.reference?Object.defineProperty(e[c],this.name,{enumerable:!0,
configurable:!0,get:function(a,b){return function(){return a.bind(b)}}(this.reference,a)}):Object.defineProperty(e[c],this.name,{enumerable:!0,configurable:!0,get:function(a,b){return function(){return k[b].state[a]}}(this.name,b),set:function(a,b){return function(c){k[b].state[a]=c}}(this.name,b)})}function w(a,d){if(k[a].classID===d)return a;for(var c=null,b,e=k[a].supers.length-1;b=k[a].supers[e];--e)if(b.classID===d){c=b;break}else if(null!==(c=w(b,d)))break;return c}function C(){Object.defineProperty(this,
"ooID",{value:u()});var a=new m[this.constructor.ooID].IFace;Object.defineProperty(a,"ooID",{value:this.ooID});k[this.ooID]=new y(this,this.constructor.ooID,a)}function u(){return++u.counter}function s(a,d,c){for(var b in d)!d.hasOwnProperty(b)||!Object.getOwnPropertyDescriptor(d,b).get&&c||Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(d,b));return a}if(!x.OoJs){x.OoJs=t;var m={},k={},n={},g={PRIVATE:1,PROTECTED:2,PUBLIC:4,VIRTUAL:8,INHERITED_INSTANCE:16,INHERITED_STATIC:32,BASE_ACCESSORS:64,
STORED:128,SUPERS:256,ACTIVE:512};r.prototype.get=function(a,d){if(this.table[a]===p)return p;if(d===p)for(var c=this.table[a].length-1;0<=c;--c)if(this.table[a][c].flags&g.ACTIVE)return this.table[a][c];"string"===typeof d&&(d=n[d]);for(c=this.table[a].length-1;0<=c;--c)if(this.table[a][c].ownerID===d)return this.table[a][c];return p};r.prototype.getAll=function(a){return this.table[a]};r.prototype.setActive=function(a,d){console.assert(this.table[a]!==p);"string"===typeof d&&(d=n[d]);for(var c=
this.table[a].length-1;0<=c;--c)this.table[a][c].flags=this.table[a][c].ownerID===d?this.table[a][c].flags|g.ACTIVE:this.table[a][c].flags&~g.ACTIVE};r.prototype.set=function(a){var d=a.name;console.assert(a.ownerID);console.assert(d);this.table[d]===p?this.table[d]=[a]:this.get(d,a.ownerID)?s(this.get(d,a.ownerID),a):this.table[d].push(a);a.flags&g.ACTIVE&&this.setActive(d,a.ownerID)};r.prototype.each=function(){var a=Array.prototype.splice.call(arguments,0,1).pop(),d=[],c;for(c in this.table)if(this.table.hasOwnProperty(c))for(var b=
this.table[c].length-1;0<=b;--b)d.push(a.apply(this.table[c][b],arguments));return d};t.setupClass=H;t.typeOf=M;t.extend=s;u.counter=0}})(TidBits);"undefined"!==typeof module&&(module.exports=TidBits);
