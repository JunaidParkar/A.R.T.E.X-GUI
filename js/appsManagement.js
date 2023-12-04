let RunningApps = [];

const installedApps = {
  apps: [
    {
      name: "n",
      default: false,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "m",
      default: false,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "l",
      default: false,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "a",
      default: false,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "f",
      default: false,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "g",
      default: false,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "b",
      default: false,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "artex",
      default: true,
      icon: "assets/logo.png",
      path: "apps/artex/index.html",
    },
    {
      name: "fileManager",
      default: true,
      icon: "assets/appIcons/files.png",
      path: "apps/fileManager/index.html",
    },
    {
      name: "setting",
      default: true,
      icon: "assets/appIcons/setting.png",
      path: "apps/setting/index.html",
    },
    {
      name: "terminal",
      default: true,
      icon: "assets/appIcons/terminal.png",
      path: "apps/cmd/index.html",
    },
    {
      name: "Artex store",
      default: true,
      icon: "assets/appIcons/store.png",
      path: "apps/appstore/index.html",
    },
  ],
};

installedApps.apps.forEach((a) => {
  if (a.default) {
    let appStructure = `<li id="app-list-${a.name}" class="application">
          <img src="${a.icon}" alt="" data-app="${a.path}" data-name="${a.name}"/>
          <p>${a.name}</p>
          </li>`;

    document.getElementsByClassName("app-list")[0].innerHTML += appStructure;
  } else {
    let appStructure = `<li id="app-list-${a.name}" class="application">
    <img src="${a.icon}" alt="" data-app="${a.path}" />
    <p>${a.name}</p>
    </li>`;

    document.getElementsByClassName("other-apps")[0].innerHTML += appStructure;
  }
});

installedApps.apps.forEach((a) => {
  let appStructure = `<li onclick="document.getElementById('app-list-${a.name}').click()">
    <img src="${a.icon}" alt="" />
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
}

function openApp(e) {
  e.classList.add("select");
  let appPath = e.querySelector("img").dataset.app;
  let id = e.querySelector("img").dataset.app;
  let name = e.querySelector("img").dataset.name;
  let image = e.querySelector("img").src;

  RunningApps.push({ name, image, appPath });

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
  });
});
