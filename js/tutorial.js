document.oncontextmenu = (e) => {
  e.preventDefault();
};

let practiceSet = [
  {
    title: "Open the apps",
    message: "Click the File manager icon below in the Taskbar",
    activate: [5],
    conformation:
      "Congratulations!!! You have now opened File manager app. Now let's move on to Closing the app...",
  },
  {
    title: "Close the apps",
    message: "Again click the File manager icon below in the Taskbar",
    activate: [5],
    conformation:
      "Congratulations!! You have now Closed File manager app successfully. Now Let's see how to keep app running in the background...",
  },
];

let currentSession = 0;

const startSession = () => {
  let tutor = document.getElementById("tutorialIntro");
  tutor.querySelector("h3").textContent = practiceSet[currentSession].title;
  tutor.querySelector("p").textContent = practiceSet[currentSession].message;
  document.querySelectorAll(".bar li").forEach((elem, ind) => {
    if (practiceSet[currentSession].activate.includes(ind)) {
      if (!elem.classList.contains("act")) {
        elem.classList.add("act");
        elem.addEventListener("click", () => {
          elem.classList.remove("act");
          tutor.querySelector("p").textContent =
            practiceSet[currentSession].conformation;
          setTimeout(() => {
            if (currentSession < practiceSet.length) {
              currentSession++;
              startSession();
            } else {
              window.location.href = "/";
            }
          }, 3000);
        });
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  startSession();
});

// document.querySelectorAll(".bar li").forEach((e) => {
//   e.addEventListener("click", () => {
// if (e.classList.contains("select")) {
//   e.classList.remove("select");
//   let id = e.querySelector("img").dataset.app;
//   let elem = document.getElementById(id);
//   if (elem.nextSibling === null) {
//     document.getElementById("apps").removeChild(elem);
//   } else {
//     document.getElementById("apps").appendChild(elem);
//     e.classList.add("select");
//   }
// } else {
//   e.classList.add("select");
//   let url = e.querySelector("img").dataset.app;
//   let id = e.querySelector("img").dataset.app;
//   document.getElementById("apps").innerHTML +=
//     "<div class='app' id='" +
//     id +
//     "'><iframe src='" +
//     url +
//     "' frameborder='0'  uid='" +
//     id +
//     "'></iframe></div>";
// }
//   });
// });
