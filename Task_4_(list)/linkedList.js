'use strict';

function List() {
    this.start = null;
    this.end = null;
}


List.prototype.makeElement = function() {
    return {
        data: null,
        next: null,
        previous: null
    };
}


// вставка в конец списка
List.prototype.add = function(data) {
    // если список пуст
    if (this.start === null) {
        this.start = this.makeElement();
        this.end = this.start;
    }
    // если список не пуст
    else {
        this.end.next = this.makeElement();
        let temp = this.end;
        this.end = this.end.next;
        this.end.previous = temp;
    }
    this.end.data = data;
}


// вставка в начало списка
List.prototype.addAsFirst = function(data) {
    // если список пуст
    if (this.start === null) {
        this.start = this.makeElement();
        this.end = this.start;
    }
    // если список не пуст
    else {
        this.start.previous = this.makeElement();
        let temp = this.start;
        this.start = this.start.previous;
        this.start.next = temp;
    }
    this.start.data = data;
}


// удаление элемента
List.prototype.delete = function(data) {
    var element = this.start;
    while (element !== null) {
        if (element.data === data) {
            if (element === this.start) { // если первый элемент
                element.next.previous = null;
                this.start = element.next;
                return this;
            }
            if (element === this.end) { // если последний
                element.previous.next = null;
                this.end = element.previous;
                return this;
            }
            element.previous.next = element.next; // если в середине
            element.next.previous = element.previous;
            return this;
        }
        element = element.next;
    }
}
