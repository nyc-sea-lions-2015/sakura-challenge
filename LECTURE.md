# Javascript constructors, callbacks, and canvas drawing

This lecture will be delivered to students at Dev Bootcamp on 2 April, 2015.

It covers material that's useful for completing this challenge: Javascript
constructors and immediate mode rendering with `<canvas>`. It's target at
students who are familiar with Ruby classes and have minimal experience with
Javascript and computer graphics.

## 1. Constructors

Say we have this Ruby code:

    class Sakura
      def initialize(message)
        @message = message
      end

      def tick
        puts(@message)
      end
    end

    sakura = Sakura.new('tock')
    sakura.tick()

How do we translate this into the equivalent Javascript?

First of all, Javascript doesn't have a `class` keyword. Instead, you just define
a constructor function. The body of the constructor function is roughly
equivalent to the body of your `initialize` method in Ruby.

So instead of this,

    class Sakura
      @message = message
    end

We'll have this:

    function Sakura(message) {
      this.message = message;
    }

(Note another difference: In Ruby, it's syntactically challenging to access `@message`
without creating an `attr_reader`, `attr_writer`, or `attr_accessor`. In Javascript,
all your instance variables and functions are always public.)

In Javascript, we define method like so:

    Sakura.prototype.tick = function() {
      console.log(this.message);
    };

We'll discuss `prototype` more in the future. For now, understand that in Javascript,
putting a function in a constructor's `prototype` is equivalent to creating an
instance method in Ruby.

Finally, in Javascript, we construct new instances of a prototype using the `new`
keyword. Also, we use `var` when declaring variables. And if we're being very good,
which we always should be, we'll begin all our Javascript files with `"use strict";`.

So here's `sakura.rb`:

    class Sakura
      def initialize(message)
        @message = message
      end

      def tick
        puts(@message)
      end
    end

    sakura = Sakura.new('tock')
    sakura.tick()

And here's the equivalent `sakura.js`:

    function Sakura(message) {
      this.message = message;
    }

    Sakura.prototype.tick = function() {
      console.log(this.message);
    };

    var sakura = new Sakura('tock');
    sakura.tick();

Not so different. If we look at sakura.message, we'll get this:

    console.log(sakura.message);
      // -> 'tock'

## 2. Callbacks

You've all seen `setTimeout` {Zack: have they?}. I'd like to introduce you to her cousin,
`requestAnimationFrame`.

(These are both functions on `Window.prototype`. You will sometimes see them referred to as
`window.setInterval` and `window.requestAnimationFrame`. In the browser, `window` is the global
object, so global variables and functions go into `window`, and if a function or variable is in
`window`, you can use it anywhere without qualification.)

`requestAnimationFrame` works like this:

    function callMeOnce(timestamp) {
      console.log(timestamp);
    }

    requestAnimationFrame(callMeOnce);  // note: no parentheses! we're referencing, not
                                        // calling callMeOnce

This will call `callMeOnce` once. It gets called once, on the next animation frame. The
`timestamp` argument contains the current high-precision time. We won't be using it, but
know that it's there.

That's all `requestAnimationFrame` does. It's similar to `setInterval`, but the delay
is up to the browser, and it varies. For example, if your tab is in the background.
the callback won't be called until the tab returns to the foreground.

If we want to run an animation, we'll need to call it `requestAnimationFrame`
repeatedly. Here's how:

    function callMeOften(timestamp) {
      requestAnimationFrame(callMeOften);
      console.log(timestamp);
    }

    callMeOften();

So, on every animation frame, we request another frame, and then do animation stuff. In
this case, we print the timestamp.

What if we want to use a method as our `requestAnimationFrame` callback?

    function Sakura(message) {
      this.message = message;
    }

    Sakura.prototype.tick = function() {
      requestAnimationFrame(this.tick);
      console.log(this.message);
    };

    var sakura = new Sakura('tock');
    sakura.tick();

This only works once. That is, we only get one frame. That's because `this` inside the
`requestAnimationFrame` callback is the `Window`:

    Sakura.prototype.tick = function(timestamp) {
      console.log(this);
      // -> [object Window]
    };

The solution here is to create a version of `Sakura.prototype.tick` which is *bound* to
an instance, so `this` will always be what we want. Without going into too much detail,
here's a way to do that:

    function Sakura(message) {
      this.message = message;
      this.tick = this.tick.bind(this);
    }

Now it works. We'll learn more about `bind` in phase 3.

## 3. Canvas drawing

HTML 5 has a `Canvas` tag. This tag is really cool. It lets you perform immediate mode
rendering.

All the rendering we've been doing has been with the DOM. The DOM is a bunch of objects.
You create a box, and fill it with some content, and it stays on the screen. It has a life
of its own. If you change the content, the screen updates.

Canvas isn't like that. Immediate mode rendering means that you say, "draw this", and the computer draws that. It sprays pixels to the screen, and that's that. If you want to change the color
of text on a page, you can change the CSS, and the browser will redraw what it needs to. If
you want to change the color of a circle you drew with canvas, you'll need to clear the canvas
and repaint it yourself.

Let's say I have a canvas like this,

    <canvas id=my-canvas>

I can fetch it like this,

    var canvas = document.getElementById('my-canvas');

And I can get a drawing context like this,

    var ctx = canvas.getContext('2d');

If the canvas is a sheet of paper (or, well, a canvas), think of the context as a set of
brushes.

You can draw lines like this,

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.stroke();

If I want to change the color of the line that gets drawn, I need to set the `strokeStyle`,

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.strokeStyle = 'fuchsia';
    ctx.stroke();

Likewise if I want to change the width.

    ctx.beginPath();
    ctx.moveTo(300, 300);
    ctx.lineTo(200, 200);
    ctx.lineWidth = 10;
    ctx.stroke();

This is all the canvas drawing you need for today's challenge. There's a lot more you can do
with it, of course. If you're interested, I encourage you to read the MDN tutorial on canvas
rendering linked from the challenge.