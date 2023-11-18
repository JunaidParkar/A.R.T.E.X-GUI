let switches = document.querySelectorAll(".button");

switches.forEach((s) => {
  s.addEventListener("click", () => {
    s.classList.toggle("active");
  });
});
