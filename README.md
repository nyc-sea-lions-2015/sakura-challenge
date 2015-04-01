# Sakura, sakura

Today, you're going to make a cherry blossom tree with Javascript.

## Learning Goals ##

  * object oriented modeling in Javascript
  * [immediate mode graphics](http://en.wikipedia.org/wiki/Immediate_mode_%28computer_graphics%29)
    with [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
  * [turtle graphics](http://en.wikipedia.org/wiki/Turtle_graphics)

## 0. Consider the sakura ##

![Photo credit: Agustin Rafael Reyes](doc/Massive-blooming-Sakura-tree.jpg)

Let's model a cherry blossom tree from the ground up.

  * A tree has a trunk.
  * The trunk has length and thickness.
  * The trunk grows at some angle to the ground.
  * As we follow the trunk upwards, it splits into branches.
  * Branches also have length and thickness.
  * Branches split off at some angle to their parent branch.
  * Some branches have flowers.

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

But we'll model that as several `Branch` instances:

![Photo credit: Agustin Rafael Reyes](doc/sakura-dia2.jpg)

## 1. Create the markup

Write an `index.html` with a `<canvas>` tag and a `<code>` tag in it.
Both should [fill the entire window](https://developer.mozilla.org/en-US/docs/Web/CSS/position).

Finally, create `sakura.js` and link it to the document with a `<script>` tag. Also link in
`turtle.js`, which we'll use later.

## 2. Write the model

Let's write two classes for the model: `Sakura` and `Branch`.

`Sakura`:
  * has a `trunk` instance variable, which is a `Branch`.
  * has a `tick` method, which:
    * requests another animation frame using
      [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
    * and calls `tick` on the tree's `trunk`.
    

`Branch`:
  * has `length`, `thickness`, `angle`, and `children` instance variables,
  * has a `tree` instance variable, which is its parent `Sakura`,
  * has a `tick` method, which:
    * grows the branch by a
      [random amount](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random),
    * sprouts new children 0.5% of the time,
    * and then calls `tick` on all its children.

`requestAnimationFrame(func)` asks the browser to call `func` the next time a frame is needed. This
is the preferred way to do Javascript animations in modern browsers.

When the browser calls your function from `requestAnimationFrame`, `this` will be `undefined`.
You can fix this in your `Sakura` constructor:

    this.tick = this.tick.bind(this);

This line of code is more complex than it appears. If you understand its ways, you will
have a deeper knowledge of Javascript.

Finally, add some driver code in your HTML page that constructs a `Sakura`.

If you put in some `console.log` statements, you should be able to open your HTML file and
see that stuff is happening. That's not the greatest test, so let's print some more structured
output.

## 3. Print the sakura ##

Write a `toString` method for your `Sakura` and `Branch` classes. `Branch`'s `toString` should
return information about the branch and all its children, recursively.

Next, have the Sakura constructor take a DOM node as an argument. Write a `debugPrint`
method on `Sakura` that sets the `textContent` of that node to the value returned
from `toString`.

Call `debugPrint` from `tick`.

Finally, pass a DOM node to `Sakura` in your driver code. Give the `<code>` tag an `id` and find it with
[`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).
(You could use jQuery, but you won't be doing any other DOM manipulation, so it seems excessive).

When you reload your page, you should see (data about) your tree's growth.

Your output will be more readable if you set the CSS property
[`white-space: pre`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
for the `<code>` element and put newlines (`'\n'`) after each branch's output.

## 4. Keep your sakura from taking over the entire world ##

If you let your tab run long enough, your computer will start feeling sluggish, and then your tab
will crash.

This is because the Sakura grows without bound, and since your branches replicate like bunnies,
it's easy to overwhelm your computer.

Fix this by having a `maxBranches` instance variable on `Sakura` global variable and keeping track
objects that have been created. Stop sprouting branches if you have more than a million of them.

## 4. Draw your sakura ##

To draw our tree, we're going to draw one line for each `Branch`. The line's width will be
defined by the `Branch`'s `thickness`, its length will be defined by the `Branch`'s length,
and its position on the screen will be determined by its `angle` with respect to its parent,
and the position of its parent.

Add another argument to `Sakura`. This argument will be a
[`<canvas>` element](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial).

You'll need to set the `width` and the `height` of the canvas element to be the
`canvas` element's `clientWidth` and `clientHeight`. This is kindof dumb, but yes, you
have to do it.

Also, have your `Sakura` get a canvas drawing context with `canvas.getContext('2d')` and
save it in a `ctx` instance variable. A drawing context is an object with a whole bunch
of drawing functions on it. When you call them, they draw stuff to the canvas.

Add a `draw` method to both your `Branch` and `Sakura` classes, and call it from both their
`tick`s.

`Sakura`'s `draw` should clear the screen. That's all.

`Branch`'s `draw` should draw a line on the canvas for the branch. Here's how to draw
a line with a drawing context:

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineWidth = widthInPixels;
    ctx.stroke();

`x0`, `y0`, `x1`, `y1`, and `widthInPixels` are all values you specify. We know how wide
we want the `Branch` to be, but how do we figure out its coordinates?

We can use a turtle to help us.

What's a turtle?

### A brief discussion of turtles ###

To figure out where to draw the lines this, we're going to use turtle graphics.

Turtle graphics work like this; imagine there's a turtle at point (100, 100) on the canvas:

    var t = new Turtle();
    t.pos = [100, 100];
    t.pos; // -> [100, 100]
    t.x;   // -> 100
    t.y;   // -> 100

This doesn't draw anything. In fact, the turtle never draws anything, she can just move around
and report her position.

The turtle starts facing straight up, towards the top of the screen:

    t.bearing; // -> [0, -1]

`[0, -1]` means that if you ask the turtle to move one step, she'll move by `0` pixels
horizontally and `-1` pixel vertically.

You don't need to use `bearing` directly.

You can just ask the turtle to go forward, and say how far:

    t.fwd(5);
    t.pos;  // -> [100, 95]

Your turtle has now moved five pixels up the screen. Yay! You can also tell the turtle to turn.

    t.turnRight(90);
    t.fwd(10);
    t.pos;  // -> [110, 95]

But you can tell the turtle to turn by any angle:

    t.turnLeft(30);
    t.fwd(5);
    t.pos;  // -> [114.3301270189222, 92.5]

And that's how we'll figure out the endpoints of the branches on our tree.

One last thing a `Turtle` can do is create a copy of itself. It does this with `spawn`:

    var babyTurtle = t.spawn();
    babyTurtle.pos;  // -> [114.3301270189222, 92.5]

This will be useful to you.

You'll want to create a `new Turtle` for each frame, position it where you want
the base of the tree, and then pass the turtle down from each branch to its children.

## 5. Tune your tree ##

You may find that your tree doesn't look exactly how you want. It's randomly generated,
of course, so it may never look *exactly* how you want, but you can guide how the tree
grows by changing the constants in your `Branch`'s `tick` method. Parameters like
this are known as "tuning parameters"—numbers you can tweak until a program works how you
want it to. If your branches are too stocky, add a bit less `thickness` on each frame. If your
tree is growing too thick with branches, make it less likely that a branch will produce a child.

  * Given our data model, how might you create the appearance of longer, twistier branches?
  * What if a branch's thickness didn't start off as 0?
  * Can you replicate different styles of growth?
  * What if we wanted the trunk to have special rules governing its growth? How might
    we architect that?

## 6. Blossom your tree ##

Just as every cherry tree is beautiful and unique, I leave the implementation of blossoms
up to you.

## Conclusions & Further work ##

In a broad sense, our tree is the expression of two simple rules: (1) branches grow, and
(2) branches may have many children. In tuning your tree, you might notice that slight
changes in the rules can produce profound changes in the final result when the rules are
applied recursively. In this regard, you and the sakura are the same.

## References ##

1. [Sakura photo](https://www.flickr.com/photos/agustinrafaelreyes/8557525252/sizes/l/)
   by [Agustin Rafael Reyes](https://www.flickr.com/photos/agustinrafaelreyes)
   licensed under a
   [Creative Commons Attribution-NonCommercial-ShareAlike license](https://creativecommons.org/licenses/by-nc-sa/2.0/)


