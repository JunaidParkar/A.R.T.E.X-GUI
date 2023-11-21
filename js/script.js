document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'r' || event.code === 'KeyR')) {
        event.preventDefault();
    }
});

document.querySelectorAll('.bar li').forEach(e => {
    e.addEventListener('click', () => {
        if (e.classList.contains('select')) {
            e.classList.remove('select')
            let id = e.querySelector('img').dataset.app
            let elem = document.getElementById(id)
            if (elem.nextSibling === null) {
                document.getElementById('apps').removeChild(elem);
            } else {
                document.getElementById('apps').appendChild(elem);
                e.classList.add('select')
            }
        } else {
            e.classList.add('select')
            let url = e.querySelector('img').dataset.app
            let id = e.querySelector('img').dataset.app
            document.getElementById('apps').innerHTML += "<div class='app' id='" + id + "'><iframe src='" + url + "' frameborder='0'  uid='" + id + "'></iframe></div>";
        }
    })
})


function toggleFullScreen() {
    var elem = document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        document.querySelectorAll('.bar .screen')[0].classList.remove('fullscreen')
        document.querySelectorAll('.bar .screen')[0].classList.add('smallscreen')
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        document.querySelectorAll('.bar .screen')[0].classList.add('fullscreen')
        document.querySelectorAll('.bar .screen')[0].classList.remove('smallscreen')
    }
}

const time = function () {
    var currentDate = new Date();
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    document.getElementById('year').innerHTML = currentDate.getFullYear();
    document.getElementById('month').innerHTML = currentDate.getMonth() + 1;
    document.getElementById('date').innerHTML = currentDate.getDate();
    var dayIndex = currentDate.getDay();
    document.getElementById('day').innerHTML = dayNames[dayIndex];
}

setTimeout(time(), 1000)

const observer = new MutationObserver(function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function (node) {
                node.childNodes.forEach(nd => {
                    if (nd.nodeName === 'IFRAME') {
                        attachEventHandlers(nd);
                    }
                })
            });
        }
    }
});

observer.observe(document, { childList: true, subtree: true });

function attachEventHandlers(iframe) {
    iframe.contentWindow.addEventListener("click", e => {
        e.preventDefault()
        hideMenu()
    })
    iframe.contentWindow.addEventListener("contextmenu", e => {
        e.preventDefault()
        rightClick(e)
        console.log("Right-clicked inside the dynamically appended iframe");
    })
    iframe.contentWindow.addEventListener('keydown', function (event) {
        if (event.ctrlKey && (event.key === 'r' || event.code === 'KeyR')) {
            event.preventDefault();
        }
    });
}

document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById("contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("contextMenu")
        const clickX = e.clientX;
        const clickY = e.clientY;
        const gap = 15
        const edgeX = 150
        const edgeY = 225
        const windowX = window.innerWidth
        const windowY = window.innerHeight
        const contextWindowX = windowX - edgeX
        const contextWindowY = windowY - edgeY
        const menuX = clickX > contextWindowX ? contextWindowX : clickX + gap
        const menuY = clickY > contextWindowY ? contextWindowY : clickY + gap
        menu.style.display = 'block';
        menu.style.display = "block";
        menu.style.left = menuX + "px";
        menu.style.top = menuY + "px";
    }
}



// change date color according to desktop background color
function getMaximumColorFromBackgroundAndSetText(element, textElement) {
    const backgroundImage = getComputedStyle(element).backgroundImage;

    const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');


    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        let maxBrightness = 0;
        let maxBrightnessPixel = null;

        for (let i = 0; i < imageData.data.length; i += 4) {
            const brightness = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
            if (brightness > maxBrightness) {
                maxBrightness = brightness;
                maxBrightnessPixel = imageData.data.subarray(i, i + 4);
            }
        }
        textElement.style.color = `rgb(${maxBrightnessPixel[0]}, ${maxBrightnessPixel[1]}, ${maxBrightnessPixel[2]})`;
    };
}

const desktopElement = document.querySelector('.desktop');
const myText = document.getElementById('date');

getMaximumColorFromBackgroundAndSetText(desktopElement, myText);



// news fetching
async function getNews(keyword) {
    const url = 'http://eventregistry.org/api/v1/article/getArticles';

    const data = `{
  "action": "getArticles",
  "keyword": "${keyword}",
  "articlesPage": 1,
  "articlesCount": 5,
  "articlesSortBy": "date",
  "articlesSortByAsc": false,
  "articlesArticleBodyLen": -1,
  "resultType": "articles",
  "dataType": [
    "news",
    "pr"
  ],
  "apiKey": "f2bb630d-ceca-4a20-9a04-28ccf0f71b8c",
  "forceMaxDataTimeWindow": 31
}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

    const text = await response.json();

    console.log(text);

    const articles = text.articles.results;
    console.log(articles);

    const articlesContainer = document.getElementById('articles-container');
    document.getElementById('articles-container').innerHTML = '';

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const titleElement = document.createElement('h2');
        titleElement.textContent = article.title;

        const sourceElement = document.createElement('p');
        sourceElement.textContent = `Source: ${article.source.title}`;

        const bodyElement = document.createElement('p');
        bodyElement.textContent = article.body;

        const linkElement = document.createElement('a');
        linkElement.href = article.url;
        linkElement.textContent = 'Read More';

        const imageElement = document.createElement('img');
        imageElement.src = article.image;
        imageElement.alt = article.title;
        imageElement.onerror = () => {
            imageElement.style.display = 'none';
        }

        articleDiv.appendChild(imageElement);
        articleDiv.appendChild(titleElement);
        articleDiv.appendChild(sourceElement);
        articleDiv.appendChild(bodyElement);
        articleDiv.appendChild(linkElement);

        articlesContainer.appendChild(articleDiv);
    });
}

fetch('https://geolocation-db.com/json/')
    .then(response => response.json())
    .then(data => {
        const country = data.country_name;
        getNews(country)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



// typing done the get news
let timer;
const waitTime = 1000;
const messageInput = document.getElementById('searchInput');
messageInput.addEventListener('keyup', event => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        doneTyping(event.target.value);
    }, waitTime);
});

function doneTyping(value) {
    if (value !== '') {
        getNews(value);
    }
}


// open search menu when clicked search input
const searchInput = document.getElementById('searchInput');
const searchMenu = document.querySelector('.search-menu');

searchInput.addEventListener('focus', function () {
    searchMenu.style.display = 'flex';
});
// Check if cursor is outside both search input and search menu before hiding the menu
document.addEventListener('click', function (event) {
    const isClickInsideSearchInput = searchInput.contains(event.target);
    const isClickInsideSearchMenu = searchMenu.contains(event.target);

    if (!isClickInsideSearchInput && !isClickInsideSearchMenu) {
        searchMenu.style.display = 'none';
    }
});
// Keep search menu open if cursor is over the search menu
searchMenu.addEventListener('mouseleave', function () {
    searchMenu.style.display = 'none';
});