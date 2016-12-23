'use strict';


function makeSmth() {
    var list = new List();
    list.add(2);
    list.add('три');
    list.add(4);
    list.addAsFirst('первый');
    list.delete(2);
    console.dir(list);
}
