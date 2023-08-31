video.addEventListener("ended", function () {
  this.play();
});

if (window.innerWidth >= 576) {
  changeFlag(currentLang);

  flagsContainer.addEventListener("click", function (e) {
    if (!this.classList.contains("clicked")) {
      const height = parseInt(getComputedStyle(flagsContainer).height);

      flags.reduce((acc, val) => {
        if (!val.classList.contains("flag-selected")) {
          val.style.top = `${(height + 15) * acc}px`;
          return acc + 1;
        }
        return acc;
      }, 1);

      toggleElem(this, "clicked");
    } else {
      flags.forEach((val) => {
        val.removeAttribute("style");
      });

      toggleElem(this, "clicked");
    }
  });

  flags.forEach((val) => {
    val.addEventListener("click", function () {
      flagSwitch(this);
    });
  });
} else {
  hambCross.addEventListener("click", () => {
    toggleElem(menu, "active");
    toggleElem(hamb, "hide");
    toggleElem(cross, "hide");
  });

  flagsContainer.addEventListener("click", (e) => {
    changeLang(e.target.alt);
  });

  menu.addEventListener("click", () => {
    toggleElem(menu, "active");
    toggleElem(hamb, "hide");
    toggleElem(cross, "hide");
  });
}
