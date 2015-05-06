// Calling a function with the new keyword causes it to be treated as a constructor
/* 
  The constructor will have its this variable bound to a fresh object, and unless
  you explicitly return a different object, the constructor will return this new
  object.
/*
/*
  Constructors are functions and hence inherit from Function.prototype. However,
  constructors also have a PROPERTY named prototype which is the object that all
  instances of the constructor will inherit from.
*/
//constructors();
function constructors() {
  function Rabbit(type) {
    // type is an INSTANCE variable, it is NOT part of the object referenced by
    // the prototype property
    this.type = type;
  }
  // Is the Rabbit function a constructor yet? aka have the prototype PROPERTY
  console.log("Rabbit.prototype: ");
  console.log(Rabbit.prototype);
  console.log("\n");
  // -> {}

  function Dog(type) {
    // Does this blank function have the prototype property?
  }
  console.log("Dog.prototype: ");
  console.log(Dog.prototype);
  console.log("\n");
  // -> {}

  var isFunctionProto = Object.getPrototypeOf(Rabbit) === Function.prototype;
  console.log("Object.getPrototypeOf(Rabbit) === Function.prototype: "); 
  console.log(isFunctionProto);
  console.log("\n");
  // -> True

  // Instantiate a rabbit of type 'killer'
  var killerRabbit = new Rabbit("killer");

  // Does applying the new keyword to Rabbit change it?
  console.log("Ran new on Rabbit function");
  console.log("Rabbit.prototype: ");
  console.log(Rabbit.prototype);
  console.log("\n");
  // So it looks like every function gets prototype property

  // Peek at killerRabbit's prototype aka Rabbit.prototype
  console.log("Object.getPrototypeOf(killerRabbit): ");
  console.log(Object.getPrototypeOf(killerRabbit));
  console.log("\n");
  // -> {}

  // adding a method to Rabbit.prototype property object
  Rabbit.prototype.speak = function(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
  }
  console.log("Rabbit.prototype: ");
  console.log(Rabbit.prototype);
  // -> { speak: [Function] }
  console.log("\n");

  // Will killerRabbit have a speak method?
  killerRabbit.speak("SKREE");
  console.log("\n");

  // Changing killerRabbit's speak property will not change Rabbit.prototype
  killerRabbit.speak = "CAWWW";

  console.log("Rabbit.prototype: ");
  console.log(Rabbit.prototype);
  // -> { speak: [Function] }
  console.log("\n");

  // and will only change killerRabbit
  console.log("killerRabbit.speak");
  console.log(killerRabbit.speak);
  console.log("\n"); 
}

// Layout Out a Table p.108
function repeat(string, times) {
  var result = "";
  var i = 0;
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}
function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(accWidth, line) {
    return Math.max(accWidth, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
}

//vector();
function vector() {
  // Define constructor
  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }

  // Define prototype methods
  Vector.prototype.plus = function(v2) {
    return new Vector((this.x + v2.x),(this.y + v2.y));
  };
  Vector.prototype.minus = function(v2) {
    return new Vector((this.x - v2.x),(this.y - v2.y));
  };

  // Add a getter to the prototype
  Object.defineProperty(Vector.prototype, "length", {
    get: function() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));  
    }
  });

  console.log(new Vector(1, 2).plus(new Vector(2, 3)));
  // → Vector{x: 3, y: 5}
  console.log(new Vector(1, 2).minus(new Vector(2, 3)));
  // → Vector{x: -1, y: -1}
  console.log(new Vector(3, 4).length);
  // → 5
}

//another_cell();
function another_cell() {
  function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
  }
  // minWidth
  StretchCell.prototype.minWidth = function() {
    var innerWidth = this.inner.minWidth();
    return this.width > innerWidth ? this.width : innerWidth;
  }
  // minHeight
  StretchCell.prototype.minHeight = function() {
    var innerHeight = this.inner.minHeight();
    return this.height > innerHeight ? this.height : innerHeight;
  }
  // draw
  StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(this.minWidth(), this.minHeight());
  }
  var sc = new StretchCell(new TextCell("abc"), 1, 2);
  console.log(sc.minWidth());
  // → 3
  console.log(sc.minHeight());
  // → 2
  console.log(sc.draw(3, 2));
  // → ["abc", "   "]
}

sequences();
function sequences() {
  function ArraySeq(arr) {
    this.arr = arr;
    this.index = 0;
  }

  ArraySeq.prototype.next = function() {
    return this.arr[this.index++];
  }
  ArraySeq.prototype.isEnd = function() {
    return this.arr[this.index] == undefined;
  }

  function RangeSeq(start, end) {
    this.cur = start;
    this.end = end;
  }
  RangeSeq.prototype.next = function() {
    return this.cur++;
  }
  RangeSeq.prototype.isEnd = function() {
    return this.cur == this.end;
  }

  function logFive(arrseq) {
    for(var i = 0; i < 5; i++) {
      if (!arrseq.isEnd())
        console.log(arrseq.next());
    }
  }

  logFive(new ArraySeq([1, 2]));
  // → 1
  // → 2
  var arrseq_instance = new ArraySeq([1,2])
  Object.getPrototypeOf(arrseq_instance) == ArraySeq.prototype;
  // -> true
  Object.getPrototypeOf(ArraySeq) === ArraySeq.prototype; 
  // -> false
  Object.getPrototypeOf(ArraySeq) === Function.prototype;

  logFive(new RangeSeq(100, 1000));
  // → 100
  // → 101
  // → 102
  // → 103
  // → 104
}

// 