locked_box();
function locked_box() {
  var box = {
    locked: true,
    unlock: function() { this.locked = false; },
    lock: function() { this.locked = true; },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };

  // Unlocks the box, runs body, and then ensures that the box is locked again
  // before returning, regardless of whether the argument function returned 
  // normally or threw an exception
  function withBoxUnlocked(body) {
    // unlock box
    box.unlock();

    try {
      // run body
      body();
      
    } finally {
      // lock box
      box.lock();
    }

  }

  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });

  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised:", e);
  }
  console.log(box.locked);
  // → true
}