var start = document.getElementsByClassName('start');
var content = '  ||||Added text, wow! ';
var clName = 'bigFont';

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
