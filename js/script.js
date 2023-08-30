window.addEventListener("DOMContentLoaded", () => {
  // Page elements
  const flags = Array.from(document.querySelectorAll(".flag"));
  const flagsContainer = document.querySelector(".flags");
  const menu = document.querySelector(".menu");
  const hambCross = document.querySelector(".hamb-cross");
  const hamb = document.querySelector(".hamb");
  const cross = document.querySelector(".cross");
  const video = document.querySelector("video");
  const elementsToObs = document.querySelectorAll(".obs");
  const featuresCards = document.querySelectorAll(".card");
  const steps = document.getElementById("working").querySelectorAll(".row");

  // JS variables
  let currentLang = localStorage.getItem("lang") ?? "kz";
  let languagesObj = undefined;

  // Functions
  const changeFlag = (lang) => {
    flags.forEach((val) => {
      if (val.alt === lang) {
        val.classList.add("flag-selected");
      } else {
        val.classList.remove("flag-selected");
      }
    });
  };

  const changeLang = (lang) => {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    for (let key in languagesObj) {
      let elem = document.querySelectorAll(`.${key}`);

      elem.forEach((val) => {
        val.innerHTML = languagesObj[key][currentLang];
      });
    }
  };

  const getLanguages = async () => {
    fetch("../json/language.json")
      .then((resp) => resp.json())
      .then((obj) => {
        languagesObj = obj;
        changeLang(currentLang);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const flagSwitch = (flag) => {
    if (!flag.classList.contains("flag-selected")) {
      flags.forEach((val) => {
        if (val === flag) {
          toggleElem(flag, "flag-selected");
          changeFlag(flag.alt);
          changeLang(flag.alt);
        } else {
          val.classList.remove("flag-selected");
        }
      });
    }
  };

  const toggleElem = (elem, prop) => {
    elem.classList.toggle(prop);
  };

  const obsElems = (elemColl) => {
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((ent) => {
        if (ent.isIntersecting) {
          elemColl.forEach((val, i) => {
            setTimeout(() => {
              val.classList.add("move");
              val.classList.remove("invisible");
              obs.unobserve(ent.target);
            }, 500 * i);
          });
        }
      });
    });

    obs.observe(elemColl[0]);
  };

  // Function call
  getLanguages();
  video.play();
  obsElems(featuresCards);
  obsElems(steps);

  // Event listeners
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

  // Observer
  const obs = new IntersectionObserver((ents) => {
    ents.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add("move");
        obs.unobserve(ent.target);
      }
    });
  });

  elementsToObs.forEach((elem) => {
    obs.observe(elem);
  });
});
