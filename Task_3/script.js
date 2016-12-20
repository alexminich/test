var start = document.getElementsByClassName('start');
var content = ' <b> ||||Added text, wow! </b> ';
var clName = 'bigFont';
var attrName = 'title';
var value = 'changed attribute';


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
