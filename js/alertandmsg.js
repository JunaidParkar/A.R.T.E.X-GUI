const audioElement = new Audio("../assets/notification.mp3");

const showAlert = (title, msg, onCancel, onConfirm) => {
  let mainDiv = document.createElement("div");
  mainDiv.id = "alert";

  let boxDiv = document.createElement("div");
  boxDiv.classList.add("box");

  let headingDiv = document.createElement("div");
  headingDiv.classList.add("alert-header");
  let headingTxt = document.createElement("p");
  headingTxt.textContent = title || "";
  headingDiv.appendChild(headingTxt);

  let messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  let messageTxt = document.createElement("p");
  messageTxt.textContent = msg || "";
  messageDiv.appendChild(messageTxt);

  let btnsDiv = document.createElement("div");
  btnsDiv.classList.add("btns");
  let btnCancel = document.createElement("button");
  btnCancel.textContent = "cancel";
  let btnConfirm = document.createElement("button");
  btnConfirm.textContent = "confirm";
  btnsDiv.appendChild(btnCancel);
  btnsDiv.appendChild(btnConfirm);

  btnCancel.addEventListener("click", () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
    document.body.removeChild(mainDiv);
  });

  btnConfirm.addEventListener("click", () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
    document.body.removeChild(mainDiv);
  });

  boxDiv.appendChild(headingDiv);
  boxDiv.appendChild(messageDiv);
  boxDiv.appendChild(btnsDiv);

  mainDiv.appendChild(boxDiv);

  document.body.appendChild(mainDiv);
};

// this function should have title , message, cancel function optional and confirm function
// showAlert("Custom Title", "Custom Message");

const showNotification = (appNameOrUrl, message) => {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("notification");

  let iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");

  let messagePara = document.createElement("p");
  messagePara.textContent = message;

  if (appNameOrUrl.startsWith("http")) {
    let img = document.createElement("img");
    img.src = appNameOrUrl;
    iconDiv.appendChild(img);

    console.log(iconDiv);
  } else {
    const app = allApps.find((app) => app.name === appNameOrUrl);
    if (app) {
      let img = document.createElement("img");
      img.src = app.image;
      iconDiv.appendChild(img);
      console.log(iconDiv);
    } else {
      if (appNameOrUrl == "system-error") {
        let img = document.createElement("img");
        img.src = "./assets/system/error.gif";
        iconDiv.appendChild(img);
        console.log(iconDiv);
      } else if (appNameOrUrl == "system-danger") {
        let img = document.createElement("img");
        img.src = "./assets/system/danger.gif";
        iconDiv.appendChild(img);
        console.log(iconDiv);
      } else if (appNameOrUrl == "system-success") {
        let img = document.createElement("img");
        img.src = "./assets/system/success.gif";
        iconDiv.appendChild(img);
        console.log(iconDiv);
      } else {
        let img = document.createElement("img");
        img.src = "https://img.icons8.com/?size=48&id=k5CI39nVUUwM&format=png";
        iconDiv.appendChild(img);
        console.log(iconDiv);
      }
    }
  }

  console.log(iconDiv);

  mainDiv.appendChild(iconDiv);
  mainDiv.appendChild(messagePara);

  document.body.appendChild(mainDiv);

  //   setTimeout(() => {
  mainDiv.style.top = "20px";
  audioElement.play();
  //   }, 100);

  setTimeout(() => {
    mainDiv.style.top = "-100px";
    mainDiv.addEventListener("transitionend", () => {
      document.body.removeChild(mainDiv);
    });
  }, 4000);
};

//first parameter can be url or app name , and second parameter will be message
// showNotification(
//   "fileManager",
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, aperiam!"
// );
