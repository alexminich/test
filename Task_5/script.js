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
        '&maxResults=' + encodeURIComponent(15) +
        '&q=' + encodeURIComponent(request) +
        '&type=' + encodeURIComponent('video');

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + params, true);

    xhr.onload = function() {
        createList(this.responseText);
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
    }

    xhr.send();
}


function createList(resp) {
    if (document.body.contains(document.getElementsByClassName('wrap')[0])) {
        document.body.removeChild(document.getElementsByClassName('wrap')[0]);
    }

    var response = JSON.parse(resp);
    console.log(response);

    var wrap = document.createElement('div');
    wrap.className = "wrap";
    var list = document.createElement('div');
    list.className = "resultList";

    for (var i = 0; i < 15; i++) {
        let elem = document.createElement('div'); // block creation
        elem.className = "resultElem";

        let link = document.createElement('a'); // youtube link creation
        link.className = "link";
        link.href = "https://youtube.com/watch?v=" + response.items[i].id.videoId;
        link.target = "_blank";

        let title = document.createElement('h4'); // video title creation
        title.className = "title";
        title.innerHTML = response.items[i].snippet.title;

        let thumbnail = document.createElement('img'); // thumbnail creation
        thumbnail.className = "thumbnail";
        thumbnail.src = response.items[i].snippet.thumbnails.medium.url;
        thumbnail.alt = "Prewiew";

        link.appendChild(thumbnail);
        link.appendChild(title);

        elem.appendChild(link);
        list.appendChild(elem);
    }

    wrap.appendChild(list);
    document.body.appendChild(wrap);
}
