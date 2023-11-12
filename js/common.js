document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'r' || event.code === 'KeyR')) {
        event.preventDefault();
    }
});

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

        console.log(menuX, menuY)
        menu.style.display = 'block';
        menu.style.display = "block";
        menu.style.left = menuX + "px";
        menu.style.top = menuY + "px";
    }
}