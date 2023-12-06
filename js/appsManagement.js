let RunningApps = [];

const defaultApps = [
    {
        name: "artex",
        image: "assets/logo.png",
        appPath: "apps/artex",
    },
    {
        name: "fileManager",
        image: "assets/appIcons/files.png",
        appPath: "apps/fileManager",
    },
    {
        name: "setting",
        image: "assets/appIcons/setting.png",
        appPath: "apps/setting",
    },
    {
        name: "terminal",
        image: "assets/appIcons/terminal.png",
        appPath: "apps/cmd",
    },
    {
        name: "setting",
        image: "assets/appIcons/info.png",
        appPath: "apps/setting",
    },
    {
        name: "AI store",
        image: "assets/appIcons/store.png",
        appPath: "apps/appstore",
    },
];

const otherApps = [
    {
        name: "bing",
        image: "https://img.icons8.com/?size=48&id=pOADWgX6vV63&format=png",
        appPath: "https://www.bing.com/",
    },
    {
        name: "playgroundai",
        image:
            "https://yt3.googleusercontent.com/QPpa9S5D-4Bw2P9WciQyLPcp7GzHPJ7fM-SUuxaRcGUIWTLYLuiVtLjpPgI-SGrljPzvpJBlsts=s900-c-k-c0x00ffffff-no-rj",
        appPath: "https://playgroundai.com/",
    },
    {
        name: "Sleekpad",
        image: "https://sleekpad-0.web.app/assets/logo-d879986a.png",
        appPath: "https://sleekpad-0.web.app/notes",
    },
];

// defaultapps
defaultApps.forEach((a) => {
    let appStructure = `<li id="app-list-${a.name}" class="application">
    <img src="${a.image}" alt="" data-app="${a.appPath}" data-name="${a.name}"/>
    <p>${a.name}</p>
    </li>`;

    document.getElementsByClassName("app-list")[0].innerHTML += appStructure;
});

// otherapps
otherApps.forEach((a) => {
    let appStructure = `<li id="app-list-${a.name}" class="application">
    <img src="${a.image}" alt="" data-app="${a.appPath}" />
    <p>${a.name}</p>
    </li>`;

    document.getElementsByClassName("other-apps")[0].innerHTML += appStructure;
});

// softlink
let allApps = defaultApps.concat(otherApps);

// Sort allApps by name
allApps.sort((a, b) => a.name.localeCompare(b.name));

allApps.forEach((a) => {
    let appStructure = `<li onclick="document.getElementById('app-list-${a.name}').click()">
    <img src="${a.image}" alt="" />
    <p>${a.name}</p>
    </li>`;

    document.getElementsByClassName("search-app-list")[0].innerHTML +=
        appStructure;
});

function closeApp(e) {
    e.classList.remove("select");
    let id = e.querySelector("img").dataset.app;
    let elem = document.getElementById(id);
    if (elem.nextSibling === null) {
        document.getElementById("apps").removeChild(elem);

        RunningApps = RunningApps.filter((app) => app.appPath !== id);
    } else {
        document.getElementById("apps").appendChild(elem);
        e.classList.add("select");
    }

    console.log(RunningApps);
}

function openApp(e) {
    e.classList.add("select");
    let appPath = e.querySelector("img").dataset.app;
    let id = e.querySelector("img").dataset.app;
    let name = e.querySelector("img").dataset.name;
    let image = e.querySelector("img").src;

    RunningApps.push({ name, image, appPath });

    console.log(RunningApps);

    document.getElementById("apps").innerHTML +=
        "<div class='app' id='" +
        id +
        "'><iframe src='" +
        appPath +
        "' frameborder='0'  uid='" +
        id +
        "'></iframe></div>";
}

document.querySelectorAll(".application").forEach((e) => {
    e.addEventListener("click", () => {
        let appimg = e.getElementsByTagName("img")[0].src;
        let thisapp = document.querySelector(
            ".app-list img[data-app='" + appimg + "']"
        );
        if (thisapp) {
            console.log("there in .app-list");
            
        } else {
            console.log("add to other-app-list");
        }

        if (e.classList.contains("select")) {
            closeApp(e);
        } else {
            openApp(e);
        }

        checkAppCount()
    });
});


function checkAppCount() {
    const appList = document.querySelector('.other-apps');
    const apps = appList.querySelectorAll('.select');

    alert(apps.length)

    if (apps.length > 4) {
        appList.classList.add('overlap');
    } else {
        appList.classList.remove('overlap');
    }
}
