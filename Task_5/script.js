'use strict';


var nextPageToken = 0;
var request = "";
var list;
var currentPage;
var buttonsWidth;
var endFlag = 0;
var currentDocumentWidth = document.documentElement.clientWidth;


function doSearch() {
    endFlag = 0;
    nextPageToken = 0;
    var form = document.forms.search;
    var searchRequest = form.elements.searchRequest.value;
    request = searchRequest;
    doRequest(request);
}


function doRequest(request) {
    if (endFlag === 1) {
        return 0;
    }
    var xhr = new XMLHttpRequest();

    if (nextPageToken === 0) {
        var params = 'part=' + 'snippet' +
            '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
            '&maxResults=' + 20 +
            '&q=' + request +
            '&type=' + 'video';
    } else {
        var params = 'part=' + 'snippet' +
            '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
            '&maxResults=' + 20 +
            '&q=' + request +
            '&type=' + 'video' +
            '&pageToken=' + nextPageToken;
    }

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + params, true);

    xhr.onload = function() {
        if (nextPageToken === 0) {
            createList(this.responseText);
        } else {
            var response = JSON.parse(this.responseText);
            nextPageToken = response.nextPageToken;
            appendItems(response);
        }
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
        return 0;
    }

    xhr.send();
}


function createList(serverResponse) {
    if (document.body.contains(document.getElementsByClassName('wrap')[0])) {
        document.body.removeChild(document.getElementsByClassName('wrap')[0]);
    }
    if (document.body.contains(document.getElementsByClassName('error')[0])) {
        document.body.removeChild(document.getElementsByClassName('error')[0]);
    }
    if (document.body.contains(document.getElementsByClassName('pagination')[0])) {
        document.body.removeChild(document.getElementsByClassName('pagination')[0]);
    }

    var response = JSON.parse(serverResponse);
    console.log(response);

    // если ничего не найдено
    if (response.items.length === 0) {
        let error = document.createElement('span');
        error.className = "error";
        error.innerHTML = 'Ничего не найдено по данному запросу';
        document.body.appendChild(error);
        return 0;
    }
    nextPageToken = response.nextPageToken;

    var wrap = document.createElement('div');
    wrap.className = "wrap";
    list = document.createElement('div');
    list.className = "resultList";

    // кнопки лево\право
    var leftButton = document.createElement('button');
    var rightButton = document.createElement('button');
    leftButton.className = "leftButton";
    rightButton.className = "rightButton";
    leftButton.onclick = function() {
        scrollLeft();
    };
    rightButton.onclick = function() {
        scrollRight();
    };

    appendItems(response);

    wrap.appendChild(leftButton);
    wrap.appendChild(list);
    wrap.appendChild(rightButton);
    document.body.appendChild(wrap);
    buttonsWidth = leftButton.offsetWidth + rightButton.offsetWidth;

    // first page pagination
    var pagination = document.createElement('ul');
    pagination.className = "pagination";
    var firstPage = document.createElement('li');
    firstPage.className = "fa fa-square fa-lg";
    firstPage.classList.add("firstPage");
    firstPage.classList.add("page");

    pagination.appendChild(firstPage);
    document.body.appendChild(pagination);

    //задать начальный размер wrap
    resize(wrap);

    window.onresize = function() {
        resize(wrap);
    };

    return list;
}



// добавляем видео в результаты поиска
function appendItems(response) {
    for (var i = 0; i < 20; i++) {
        if (response.items[i] !== undefined) {
            let elem = document.createElement('div'); // element block creation
            elem.className = "resultElem";

            let link = document.createElement('a'); // youtube link creation
            link.className = "link";
            link.href = "https://youtube.com/watch?v=" + response.items[i].id.videoId;
            link.target = "_blank";

            let title = document.createElement('h4'); // video title creation
            title.className = "title";
            title.style.marginTop = 10;
            title.innerHTML = response.items[i].snippet.title;

            let thumbnail = document.createElement('img'); // thumbnail creation
            thumbnail.className = "thumbnail";
            thumbnail.src = response.items[i].snippet.thumbnails.medium.url;
            thumbnail.alt = "Prewiew";

            let linkBlock = document.createElement('div'); // link Block creation
            linkBlock.className = "linkBlock";

            let channel = document.createElement('p'); // cahnnel title creation
            channel.className = "channel";
            channel.innerHTML = 'Channel: <b>' + '<a href="https://www.youtube.com/channel/' + response.items[i].snippet.channelId + '" target=_blank>' + response.items[i].snippet.channelTitle + '</a></b><br><br>';

            let description = document.createElement('div'); // description and date creation
            var date = new Date(response.items[i].snippet.publishedAt);
            description.className = "description";
            description.innerHTML = response.items[i].snippet.description + '<br><br><b>опубликовано:</b> ' + date.toLocaleString("ru", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }) + '<br><br>';

            getStatistics(response.items[i].id.videoId, elem);

            //  breakpoint if < 525px
            var mq = window.matchMedia("(max-width: 525px)");
            if (mq.matches) {
                channel.innerHTML = 'Channel: <b>' + '<a href="https://www.youtube.com/channel/' + response.items[i].snippet.channelId + '" target=_blank>' + response.items[i].snippet.channelTitle + '</a></b>';
                description.innerHTML = response.items[i].snippet.description + '<br><b>опубликовано:</b> ' + date.toLocaleString("ru", {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                }) + '<br>';
            }
            //  breakpoint if < 330px
            var mq2 = window.matchMedia("(max-width: 330px)");
            if (mq2.matches) {
                channel.innerHTML = 'Channel: <b>' + '<a href="https://www.youtube.com/channel/' + response.items[i].snippet.channelId + '" target=_blank>' + response.items[i].snippet.channelTitle + '</a></b>';
            }

            linkBlock.appendChild(thumbnail);
            linkBlock.appendChild(title);
            link.appendChild(linkBlock);

            elem.appendChild(link);
            elem.appendChild(channel);
            elem.appendChild(description);

            list.appendChild(elem);
        } else {
            endFlag = 1;
            return;
        }
    }
}


// получение количества просмотров и лайков
function getStatistics(videoId, elem) {
    var xhr = new XMLHttpRequest();

    var params = 'part=' + 'statistics' +
        '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
        '&id=' + videoId;

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?' + params, true);

    xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        let statistics = document.createElement('div');
        statistics.className = "statistics";
        let watchesIcon = document.createElement('i');
        watchesIcon.className = "fa fa-eye";
        let likeIcon = document.createElement('i');
        likeIcon.className = "fa fa-thumbs-up";
        let dislikeIcon = document.createElement('i');
        dislikeIcon.className = "fa fa-thumbs-down";

        statistics.appendChild(watchesIcon);
        var formatter = new Intl.NumberFormat("ru");
        statistics.innerHTML += ' : <b>' + formatter.format(response.items[0].statistics.viewCount) + '</b><br>';
        statistics.appendChild(likeIcon);

        // проверка на отключенные лайки\дизлайки
        if (response.items[0].statistics.likeCount === undefined) {
            statistics.appendChild(dislikeIcon);
            statistics.innerHTML += 'отключены :(';
        } else {
            statistics.innerHTML += formatter.format(response.items[0].statistics.likeCount) + ' ';
            statistics.appendChild(dislikeIcon);
            statistics.innerHTML += formatter.format(response.items[0].statistics.dislikeCount);
        }

        elem.appendChild(statistics);
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
        return 0;
    }

    xhr.send();
}


function scrollLeft() {
    if (document.body.contains(document.getElementsByClassName('error')[0])) {
        document.body.removeChild(document.getElementsByClassName('error')[0]);
    }

    list.scrollLeft -= list.clientWidth;
    doPagination();

    // анимация скроллинга, глючит при частом листании
    // var prevPage = list.scrollLeft - list.clientWidth;
    // var animationLeft = setInterval(moveLeft, 1);
    // function moveLeft() {
    //   if(list.scrollLeft === prevPage){
    //       clearInterval(animationLeft);
    //   } else{
    //       list.scrollLeft -= 10;
    //   }
    // }
}


function scrollRight() {
    if (document.body.contains(document.getElementsByClassName('error')[0])) {
        document.body.removeChild(document.getElementsByClassName('error')[0]);
    }

    list.scrollLeft += list.clientWidth;
    doPagination();

    //  анимация скроллинга, глючит при частом листании
    // var nextPage = list.scrollLeft + list.clientWidth;
    // var animationRight = setInterval(moveRight, 10);
    //
    // function moveRight() {
    //   if(list.scrollLeft === nextPage){
    //       clearInterval(animationRight);
    //   } else{
    //       list.scrollLeft += 10;
    //   }
    // }
    // doPagination();

    // подгрузка новых роликов
    var elementWidth = document.getElementsByClassName('resultElem')[0].offsetWidth;
    let countHiddenRightElements = (list.scrollWidth - list.scrollLeft - document.getElementsByClassName('wrap')[0].clientWidth - buttonsWidth) / elementWidth;
    if (countHiddenRightElements < 15) {
        doRequest(request);
    }
}


function resize(wrap) {
    if (document.body.contains(document.getElementsByClassName('error')[0])) {
        document.body.removeChild(document.getElementsByClassName('error')[0]);
    }

    wrap.style.width = document.documentElement.clientWidth + 'px';
    var elementWidth = document.getElementsByClassName('resultElem')[0].offsetWidth;
    let countVisibleElements = Math.floor((wrap.clientWidth - buttonsWidth) / elementWidth);
    let wrapWidth = countVisibleElements * elementWidth + buttonsWidth;
    wrap.style.width = wrapWidth + 'px';

    if ((currentDocumentWidth > 525 && document.documentElement.clientWidth < 525) || (currentDocumentWidth < 525 && document.documentElement.clientWidth > 525) || (currentDocumentWidth < 330 && document.documentElement.clientWidth > 330) || (currentDocumentWidth > 330 && document.documentElement.clientWidth < 330)) {
        list.scrollLeft = 0;
        currentPage = 1;
    }

    if (list.scrollLeft >= list.scrollWidth - list.clientWidth * 1.5) {
        list.scrollLeft = list.scrollWidth;
    }

    currentDocumentWidth = document.documentElement.clientWidth;
    doPagination();
}


function doPagination() {
    var elementWidth = document.getElementsByClassName('resultElem')[0].offsetWidth;
    let countHiddenLeftElements = list.scrollLeft / elementWidth;
    let countVisibleElements = Math.floor((document.getElementsByClassName('wrap')[0].clientWidth - buttonsWidth) / elementWidth);
    if (countVisibleElements === 0) {
        return 0;
    }
    currentPage = Math.ceil(countHiddenLeftElements / countVisibleElements) + 1;
    console.log("visibleElements = " + countVisibleElements);
    console.log("current page = " + currentPage);

    // добавляет троеточие в конце
    if (!document.getElementsByClassName('pagination')[0].contains(document.getElementsByClassName('miss2')[0])) {
        var miss2 = document.createElement('span');
        miss2.className = "miss2";
        miss2.innerHTML = "...";
        document.getElementsByClassName("pagination")[0].appendChild(miss2);
    }

    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = '';
    }

    // добавляет новые элементы в пейджинг, если нужно
    if (!pages[currentPage + 2]) {
        for (var i = pages.length; i < currentPage + 3; i++) {
            var newPage = document.createElement('li');
            newPage.className = "fa fa-square-o fa-lg";
            newPage.classList.add("page");
            document.getElementsByClassName("pagination")[0].insertBefore(newPage, document.getElementsByClassName('miss2')[0]);
        }
    }

    // делает закрашенным текущий элемент пейджинга
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].classList.contains("fa-square")) {
            pages[i].classList.remove("fa-square");
            pages[i].classList.add("fa-square-o");
        }
    }
    console.log(pages);
    pages[currentPage - 1].classList.remove("fa-square-o");
    pages[currentPage - 1].classList.add("fa-square");

    // переход на страницу по клику на ее пэйджинг
    pages[currentPage].onclick = function() {
        scrollRight();
    }
    pages[currentPage + 1].onclick = function() {
        scrollRight();
        scrollRight();
    }
    pages[currentPage + 2].onclick = function() {
        for (var i = 0; i < 3; i++) {
            scrollRight();
        }
    }
    pages[0].onclick = function() {
        list.scrollLeft = 0;
        doPagination();
    }
    if (currentPage > 2) {
        pages[currentPage - 2].onclick = function() {
            scrollLeft();
        }
        if (currentPage > 3) {
            pages[currentPage - 3].onclick = function() {
                scrollLeft();
                scrollLeft();
            }
            if (currentPage > 4) {
                pages[currentPage - 4].onclick = function() {
                    for (var i = 0; i < 3; i++) {
                        scrollLeft();
                    }
                }
                if (currentPage > 5) {
                    pages[currentPage - 5].onclick = function() {
                        for (var i = 0; i < 4; i++) {
                            scrollLeft();
                        }
                    }
                }
            }
        }
    }
    pages[currentPage - 1].onclick = function() {}

    // Tooltip adding
    for (var i = 0; i < pages.length; i++) {
        if (!pages[i].childNodes[0]) {
            pages[i].classList.add("tooltip");
            var tooltipText = document.createElement('span');
            tooltipText.className = "tooltipText";
            tooltipText.innerHTML = i + 1;
            pages[i].appendChild(tooltipText);
        }
    }


    // свертка при большом количестве страниц
    // в начале
    if (pages.length > 6 && currentPage > 6) {
        for (var i = 1; i < currentPage - 5; i++) {
            pages[i].style.display = 'none';
        }
        if (!document.getElementsByClassName('pagination')[0].contains(document.getElementsByClassName('miss1')[0])) {
            var miss1 = document.createElement('span');
            miss1.className = "miss1";
            miss1.innerHTML = "...";
            document.getElementsByClassName('pagination')[0].insertBefore(miss1, document.getElementsByClassName('pagination')[0].childNodes[1]);
        }
    } else {
        if (document.getElementsByClassName('pagination')[0].contains(document.getElementsByClassName('miss1')[0])) {
            document.getElementsByClassName('pagination')[0].removeChild(document.getElementsByClassName('miss1')[0]);
        }
    }
    //  в конце
    if (pages.length > currentPage + 3) {
        for (var i = currentPage + 3; i < pages.length; i++) {
            pages[i].style.display = 'none';
        }
    }

    // при подходе к последней странице не показывать лишние пэйджи
    if (list.scrollLeft >= list.scrollWidth - list.clientWidth * 4) {
        if (document.getElementsByClassName('miss2')[0]) {
            document.getElementsByClassName('pagination')[0].removeChild(document.getElementsByClassName('miss2')[0]);
        }
        if (list.scrollLeft >= list.scrollWidth - list.clientWidth * 3) {
            if (document.getElementsByClassName('page').length > currentPage + 2) {
                for (var i = currentPage + 2; i < document.getElementsByClassName('page').length + 1; i++) {
                    document.getElementsByClassName('pagination')[0].removeChild(document.getElementsByClassName('pagination')[0].lastChild);
                }
            }
            if (list.scrollLeft >= list.scrollWidth - list.clientWidth * 2) {
                if (document.getElementsByClassName('page').length > currentPage + 1) {
                    document.getElementsByClassName('pagination')[0].removeChild(document.getElementsByClassName('pagination')[0].lastChild);
                }
                if (list.scrollLeft === list.scrollWidth - list.clientWidth) {
                    if (document.getElementsByClassName('page').length > currentPage) {
                        document.getElementsByClassName('pagination')[0].removeChild(document.getElementsByClassName('pagination')[0].lastChild);
                    }
                    var error = document.createElement('span');
                    error.className = "error";
                    error.innerHTML = '<br><br><b>Больше ничего не найдено!</b>';
                    document.body.appendChild(error);
                    list.scrollLeft = list.scrollWidth - list.clientWidth;
                }
            }
        }
    }


    // отцентрировать
    var paginationMarginLeft = (document.documentElement.clientWidth - document.getElementsByClassName("pagination")[0].offsetWidth) / 2;
    document.getElementsByClassName("pagination")[0].style.marginLeft = paginationMarginLeft + 'px';
}
