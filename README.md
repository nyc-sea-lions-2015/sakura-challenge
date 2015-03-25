# Sakura, sakura

Today, you're going to make a cherry blossom tree with Javascript.

## Learning Goals ##

  * writing class-like structures in Javascript
  * [immediate mode graphics](http://en.wikipedia.org/wiki/Immediate_mode_%28computer_graphics%29)
    with [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
  * [turtle graphics](http://en.wikipedia.org/wiki/Turtle_graphics)

## 0. Consider the sakura ##

![Photo credit: Agustin Rafael Reyes](doc/Massive-blooming-Sakura-tree.jpg)

Let's model a cherry blossom tree from the ground up.

  * A tree has a trunk.
  * As we follow the trunk upwards, it splits into `Branch`es. Let's call these
    `Branch`es its `children`.
  * As we follow each branch, we see that each branches splits into further
    `Branch`es--it has `children` of its own.
  * The trunk has a height, thickness, and its angle from the ground.
  * `Branch`es have length and thickness, and the angle from the branch they branched from.
  * `Branch`es that are thin enough may have flowers, if the tree is in bloom.

Trees also have a root system, of course, but let's not worry about that for
now. Branches are also sometimes kindof twisty, but let's also not worry about
that for the moment.

Notice a similarity:

  * The trunk has height, thickness, angle, and children (which are `Branch`es)
  * Each `Branch` has length, thickness, angle, and children (also `Branch`es)

So let's simplify our model and say that the trunk is a `Branch`. It still has
length, it just so happens that it's pointing mostly upwards.

Let's also simplify our model and say that each `Branch` terminates where it
splits into children. Sometimes the tree has what appears to be one long branch
with several sprouts:

![Photo credit: Agustin Rafael Reyes](doc/sakura-dia1.jpg)

But we'll model that as several branches:

![Photo credit: Agustin Rafael Reyes](doc/sakura-dia2.jpg)

## 1. Create the markup

Write an `index.html`. Put a `<canvas>` tag and a `<code>` tag in it. Give them IDs.
Both should fill the entire window; you'll want to position them with
`position: absolute`, and make their `width` and `height` the size of the window.

Also in the HTML, put in a `<script>` tag, where we'll put the driver code. Leave
it empty for now.

Finally, create `sakura.js` and link it to the document with a `<script>` tag.

## 2. Write the model

Let's write three classes for the model: `Sakura`, `Branch`, and `World`.

`Sakura`:
  * has a `trunk`, which is a `Branch`
  * has a `tick` method

`Branch`:
  * has `length`, `thickness`, `angle`, and `children` instance variables.
  * has a `tick` method

`World`:
  * has a `tree`, which is a `Sakura`
  * has a `tick` method
  * calls
    [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) in its constructor to request that the browser call its `tick`
    method at the next
    animation interval. You could also use
    [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) instead.

`requestAnimationFrame` and `setInterval` differ in what they do. `setInterval(func, n)` instructs the
browser to call the function you provide every `n` milliseconds. `requestAnimationFrame(func)`
instructs the browser to call `func` once, next time a frame needs to be drawn. Animation frames
don't occur when the tab is in the background, so your tree will stop growing when the tab is in
the background if you use it.

`Sakura`'s `tick` method should be pretty simple for now: it'll just call `tick` on its `trunk`,
which is a `Branch`.

`Branch`'s `tick` method is a bit more involved. On every `tick`, a `Branch` should grow a little
bit longer and a little bit thicker. Use
[`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) to have your branches grow by an uneven amount.

Also on every `tick`, your branch should (possibly) sprout a child. You'll again use `Math.random`,
only this time, use it like a die roll. If `Math.random` is less than, I dunno, `0.005`, have
your `Branch`'s `tick` method create a new `Branch` and add it to `children`.

The `World` is just responsible for connecting a `Sakura` to the passage of time. Its constructor
takes a `Sakura` instance. It also sets up a timer (either with `setInterval` or
`requestAnimationFrame`), which will call its `tick` method every so often. The `World`'s `tick`
method should just call `tick` on its `tree`.

Finally, add some driver code in your HTML page that constructs a `Sakura` and a `World`.

If you put in some `console.log` statements, you should be able to open your HTML file and
see that stuff is happening. That's not the greatest test, so let's print some more structured
output.

## 3. Print the sakura ##

Write a `SakuraPrinter` class. This class will print a textual representation of your cherry
blossom tree.

`SakuraPrinter` should take a `Sakura` instance and a DOM node.

The `SakuraPrinter` should also set up a timer, calling an instance method, `printTree`.
This time, you should definitely use `requestAnimationFrame`, because we don't want to
bother printing output when the tab isn't in use, and we don't have precise requirements
as to how often `printTree` gets called—just so long as it's reasonably often.

`printTree` should set the `textContent` of the DOM node to a textual representation
of the tree. For each branch, include its `angle`, `length`, and `thickness`.

Your display will look nicer if you indent the branches according to their depth, but
you don't have to do this.

You might find that this is easier to do if you write a `toString` method on `Branch` and
maybe `Sakura`.

Yes, `printTree` should probably be a recursive function.

## 4. Draw the sakura ##

Now, write a `SakuraSketcher` class. This class works just like `SakuraPrinter`, only
the dom node it takes *must* be a `<canvas>`, and it will draw a representation of your cherry
blossom tree.

To do this, we're going to use turtle graphics. Add `turtle.js` to your HTML.

Turtle graphics work like this; imagine there's a turtle at point (100, 100) on the canvas:

    var t = new Turtle();
    t.pos = [100, 100];
    t.pos; // -> [100, 100]
    t.x; // -> 100
    t.y; // -> 100

This doesn't draw anything. In fact, the turtle never draws anything, she just helps you
figure out coordinates.

The turtle starts facing up:

    t.bearing; // -> [0, 1]

`[0, -1]` means that if you ask the turtle to move one step, she'll move by `0` horizontally
and `-1` pixel vertically. You don't usually need to look at your turtle's bearing; I'm just
using this as an example.

You can ask the turtle to go forward, and say how far:

    t.fwd(5);
    t.pos;  // -> [100, 95]

Your turtle has now moved five pixels up the screen. Yay! You can also tell the turtle to turn.

    t.turnRight(90);
    t.fwd(10);
    t.pos;  // -> [110, 95]

So far, this doesn't seem that useful—we could have figured out the math ourselves.
But you can tell the turtle to turn by any angle:

    t.turnLeft(30);
    t.fwd(5);
    t.pos;  // -> [114.3301270189222, 92.5]

And that's how we'll figure out the endpoints of the branches on our tree.

One last thing a `Turtle` can do is create a copy of itself. It does this with `spawn`:

   var babyTurtle = t.spawn();
   babyTurtle.pos;  // -> [114.3301270189222, 92.5]

This will be useful to you.

Your `SakuraSketcher` class should have a `draw` method, which it should set up to
be called with `requestAnimationFrame`, and a `drawBranch(branch, turtle)` method, which
draws `branch` and all its descendants, using the position of `turtle` as a starting point.

In your constructor, 
  * set the `width` and the `height` of the canvas element to be the `canvas` element's
    `clientWidth` and `clientHeight`. Yes, you have to do this. Yes, it's kindof dumb.
  * get a drawing `context` with `canvas.getContext('2d')`, and save it in a `ctx` instance
    variable. Getting a context might be expensive, and we don't want to do it on
    every frame.

In your `draw` method,
  * clear the canvas
  * create a `Turtle` and position it in the center of the window, at the bottom. Remember
    that y coordinates start with `0` at the *top* of your screen.
  * call `drawBranch` on the tree's trunk

In your `drawBranch` method,
  * start a new path with `ctx.beginPath()`
  * put the first point of the branch at the turtle's current position. You'll
    use `ctx.moveTo` here.
  * ask the turtle to turn by the branch's angle
  * ask the turtle to walk forward by the branch's length.
  * put the next point of the branch at the turtle's new position. You'll use
    `ctx.lineTo` here.
  * set the width of the line we're about to draw to the branch's thickness by
    setting `ctx.lineWidth`.
  * call `ctx.stroke` to draw the line
  * draw all the branch's children

## 5. Tune your tree ##

You may find that your tree doesn't look exactly how you want. It's randomly generated,
of course, so it may never look *exactly* how you want, but you can tune how the tree
grows by changing the constants in your `Branch`'s `tick` method. If your branches are
too stocky, add a bit less `thickness`. If your tree is growing too thick with branches,
make it less likely that a branch will produce a child.

Also, you might notice that if you leave your tree running for even a little while, it
starts to crush your browser. It turns out that having branches generate branches which
themselves generate branches can quickly produce a **lot** of objects. You can help
this state of affairs by having your branches know their `depth` (how would they set this
in the constructor?) and only allowing a branch to produce children if its `depth` is
less than a certain number (7 seems to work ok for me).

Once you're tracking `depth`, you now have another parameter to play with. You could make
the rate at which a branch adds length dependent on its `depth`, for example.

## 6. Blossom your tree ##

Just as every cherry tree is beautiful and unique, I leave the implementation of blossoms
up to you.

Some things to think about:

  * who decides when a tree is in bloom?
  * if you were to track seasons, where would you do that?
  * relatedly, if you wanted to add functionality to pause and resume animation, where
    would you do that?


## References ##

1. [Sakura photo](https://www.flickr.com/photos/agustinrafaelreyes/8557525252/sizes/l/)
   by [Agustin Rafael Reyes](https://www.flickr.com/photos/agustinrafaelreyes)
   licensed under a
   [Creative Commons Attribution-NonCommercial-ShareAlike license](https://creativecommons.org/licenses/by-nc-sa/2.0/)


