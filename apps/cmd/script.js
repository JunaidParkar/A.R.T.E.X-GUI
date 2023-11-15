document.onload = () => {
  cmdInp.focus();
};

cmdContainer.addEventListener("click", () => {
  cmdInp.focus();
});

cmdInp.addEventListener("input", () => {
  let contentWidth = cmdInp.scrollWidth;
  cmdInp.style.width = contentWidth + "px";
});
