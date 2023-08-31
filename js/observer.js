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
