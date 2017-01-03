'use strict';


function doSearch() {
    var form = document.forms.search;
    var searchRequest = form.elements.searchRequest.value;
    doRequest(searchRequest);
}


function doRequest(request) {
    var xhr = new XMLHttpRequest();

    var params = 'part=' + encodeURIComponent('snippet') +
        '&key=' + encodeURIComponent("AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ") +
        '&maxResults=' + encodeURIComponent(2) +
        '&q=' + encodeURIComponent(request) +
        '&type=' + encodeURIComponent('video');

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + params, true);

    xhr.onload = function() {
        alert(this.responseText);
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
    }

    xhr.send();
}


function createList() {
    var wrap = document.createElement('div');
    wrap.className = "wrap";
    var list = document.createElement('div');
    list.className = "resultList";
    for (var i = 0; i < 5; i++) {
        let elem = document.createElement('div');
        elem.className = "resultElem";
        list.appendChild(elem);
    }
    wrap.appendChild(list);
    document.body.appendChild(wrap);
}
