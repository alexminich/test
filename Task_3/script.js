var start = document.getElementsByClassName('start');
var content = ' <b> ||||Added text, wow! </b> ';
var clName = 'bigFont';
var attrName = 'title';
var value = 'changed attribute';
var styleName = 'background-color';
var styleValue = 'green';


function myAppend(content) {
    for (var i = 0; i < start.length; i++) {
        start[i].append(content);
    }
}

function myAddClass(clName) {
    for (var i = 0; i < start.length; i++) {
        start[i].classList.add(clName);
    }
}

function myHtml(content) {
    if (content) {
        for (var i = 0; i < start.length; i++) {
            start[i].insertAdjacentHTML('beforeend', content);
        }
    } else {
        for (var i = 0; i < start.length; i++) {
            start[i].replaceWith(start[i].outerHTML);
        }
    }
}

function myAttr(attrName, value) {
    if (value !== undefined) {
        for (var i = 0; i < start.length; i++) {
            start[i].setAttribute(attrName, 'changed attribute | ');
        }
    } else {
        for (var i = 0; i < start.length; i++) {
            start[i].append(' ' + start[i].getAttribute(attrName));
        }
    }
}

function myChildren() {
    var a = document.getElementsByTagName('div')
    var elementChildren = a[0].children;
    for (var i = 0; i < elementChildren.length; i++) {
        elementChildren[i].append('  -I\'m child №' + (i + 1));
    }
}

function myCss(styleName, styleValue) {
    var div = document.body.children[0];
    if (styleName) {
        div.style[styleName] = styleValue;
    } else {
        console.log(getComputedStyle(div));
    }
}
