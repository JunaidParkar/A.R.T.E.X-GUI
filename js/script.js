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
        // If not in fullscreen, enter fullscreen
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
        // If in fullscreen, exit fullscreen
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


// 


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



document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById(
        "contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document
            .getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
} 