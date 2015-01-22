# exercise.sakura
In which you make a beautiful cherry tree with elegant Javascript.

## Consider the sakura ##

![Sakura, sakura](Massive-blooming-Sakura-tree.jpg)

Let's model a cherry blossom tree from the ground up.

  * A tree has a trunk.
  * As we follow the trunk upwards, it splits into `Branch`es. Let's call these
    `Branch`es its `children`.
  * As we follow each branch, we see that each branches splits into further
    `Branch`es--it has `children` of its own.
  * The trunk has a height and thickness.
  * `Branch`es have length and thickness.
  * `Branch`es that are thin enough may have flowers, if the tree is in bloom.

Trees also have a root system, of course, but let's not worry about that for
now. Branches are also sometimes kindof twisty, but let's also not worry about
that for the moment.

Notice a similarity:

  * The trunk has height, thickness, and children (which are `Branch`es)
  * Each `Branch` has length, thickness, and children (also `Branch`es)

So let's simplify our model and say that the trunk is a `Branch`. It still has
length, it just so happens that it's pointing mostly upwards.

Let's also simplify our model and say that each `Branch` terminates where it
splits into children.Sometimes the tree has what appears to be one long branch
with several sprouts:

    |  | // 
    |  |// 
    |   / //
    |  | //
    |  |//
    |   / 
    |  | / /
    |  |/ /
    |    /
    |   |
    |   |

But we'll model that as several branches:

    |5 |/6/
    |5  6/
    |5 6/ 
    |3 | /4/
    |3 |/4/
    |3  4/
    |3 4/
    |1 | /2/ 
    |1 |/2/
    |1  2/
    |1 2/
    |0 |
    |0 |

Each digit marks a different Branch object. So branch 0 has two children, 1
and 2. Branch 2 has no children. Branch 1 has two children, 3 and 4. And so
on. Branches 0, 1, 3 and 5 look like one branch because they're similar 


