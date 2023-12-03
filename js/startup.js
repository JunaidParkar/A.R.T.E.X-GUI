let paths = ["startups/first.html", "startups/second.html"];
let currIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  let iframe = document.querySelector("iframe");
  iframe.src = paths[0];

  iframe.onload = function () {
    if (
      iframe.contentDocument.getElementById("next") &&
      iframe.contentDocument.getElementById("previous")
    ) {
      let nextButton = iframe.contentDocument.getElementById("next");
      nextButton.addEventListener("click", () => {
        if (currIndex < paths.length - 1) {
          currIndex++;
          iframe.src = paths[currIndex];
        }
      });
      let prevoiusButton = iframe.contentDocument.getElementById("previous");
      prevoiusButton.addEventListener("click", () => {
        if (currIndex > 0) {
          currIndex--;
          iframe.src = paths[currIndex];
        }
      });
    }
  };
});

document.oncontextmenu = (e) => {
  e.preventDefault();
};

// const observer = new MutationObserver(function (mutationsList, observer) {
//   for (const mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       mutation.addedNodes.forEach(function (node) {
//         node.childNodes.forEach((nd) => {
//           if (nd.nodeName === "IFRAME") {
//             attachEventHandlers(nd);
//           }
//         });
//       });
//     }
//   }
// });

// observer.observe(document, { childList: true, subtree: true });
