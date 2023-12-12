// initialize codereducer

let engine = new CREngine((e) => {
  submitResponse(e, false, true);
});

engine.addTerm("artex");
engine.addTerm("cloud");

engine.addCommand("artex", [{ flag: "--h", requiredValue: false }], (args) => {
  let p1 = document.createElement("p");
  p1.textContent = "artex help here";
  submitResponse(p1);
});

engine.addCommand(
  "cloud",
  [
    { flag: "--u", requiredValue: true },
    { flag: "--p", requiredValue: true },
  ],
  (args) => {
    console.log(args);
    let p1 = document.createElement("p");
    p1.textContent = "help here";
    submitResponse(p1);
  }
);

// command prompt functionalities here

var commandHistory = [];
var commandIndex = -1;

function checkInput() {
  var event = window.event || event.which;
  // if enter is pressed
  if (event.keyCode == 13) {
    var command = document.getElementById("cmdInp").value;
    submitResponse(command, true);
    commandHistory.push(command);
    commandIndex = commandHistory.length;
    engine.executeCommand(command); // Execute command from codereducer
    document.getElementById("cmdInp").value = "";
    document.getElementById("cmdInp").style.height = "1em";
    event.preventDefault();
  } else if (event.keyCode == 38) {
    // if up arrow is pressed
    if (commandIndex > 0) {
      commandIndex--;
      document.getElementById("cmdInp").value = commandHistory[commandIndex];
    }
    event.preventDefault();
  } else if (event.keyCode == 40) {
    // if down arrow is pressed
    if (commandIndex < commandHistory.length - 1) {
      commandIndex++;
      document.getElementById("cmdInp").value = commandHistory[commandIndex];
    }
    event.preventDefault();
  }
}

const submitResponse = (data, author = false, error = false) => {
  let cont = document.getElementById("history");
  let div = document.createElement("div");
  author ? div.classList.add("inp") : div.classList.add("output");
  if (author) {
    let p1 = document.createElement("p");
    p1.textContent = "artex >";
    let p2 = document.createElement("p");
    p2.textContent = data;
    div.appendChild(p1);
    div.appendChild(p2);
  } else {
    if (error) {
      let p3 = document.createElement("p");
      p3.classList.add("error");
      p3.textContent = data;
      div.appendChild(p3);
    } else {
      div.appendChild(data);
    }
  }
  cont.appendChild(div);
};
