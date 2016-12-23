'use strict';

//
// function makeSmth() {
//     var list = new List();
//     list.add(2);
//     list.add('три');//     list.add(4);
//     list.addAsFirst('первый');
//     list.delete(2);
//     console.dir(list);
//     return list;
// }


var squares = new List();


function Square(color, side){
  this.color = color;
  this.side = side;
}
Square.prototype.toString = function () {
  return (this.color + this.side);
}

function addSquare () {
  var color = prompt('Color?', 'white');
  var side = prompt('Size?', 10);
  var a = new Square(color, side);
  squares.add(a);
  console.log(squares);
  console.log(a.toString());
}

function deleteSquare() {
  var color = prompt('Color?', 'white');
  var side = prompt('Size?', 10);
  var a = new Square(color, side);
  squares.delete(a);
  console.log(squares);
  console.log(a.toString());
}
