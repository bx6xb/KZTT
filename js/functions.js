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

changeLang(currentLang);
video.play();
obsElems(featuresCards);
obsElems(steps);
