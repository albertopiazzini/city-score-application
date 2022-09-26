(() => {
  "use strict";
  const e = document.querySelector("#btn"),
    t = document.querySelector("#textArea"),
    r = document.querySelector(".summary"),
    n = document.querySelector(".categories"),
    o = document.querySelector(".title"),
    c = document.querySelector(".city-score");
  let i;
  document.querySelector(".box");
  const s = function () {
    var e;
    (e = t.value),
      (i = e.trim().toLowerCase().replace(" ", "-")),
      (o.innerHTML = ""),
      fetch(`https://api.teleport.org/api/urban_areas/slug:${i}/scores/`)
        .then((e) => {
          if (!e.ok)
            throw new Error(
              "City not found (the name must be written in English, thanks)"
            );
          return e.json();
        })
        .then((e) => {
          (o.innerHTML = i.toUpperCase()),
            (n.innerHTML = ""),
            (c.innerHTML = ""),
            (c.innerHTML = e.teleport_city_score.toFixed(1)),
            e.categories.forEach((e, t) => {
              const r = `<p style="color:${e.color};"> ${
                e.name
              }: ${e.score_out_of_10.toFixed(1)}</p>`;
              n.insertAdjacentHTML("beforeend", r);
            }),
            (r.innerHTML = ""),
            r.insertAdjacentHTML("afterbegin", e.summary),
            (c.innerHTML = `CITY SCORE: ${e.teleport_city_score.toFixed(1)}`),
            o.scrollIntoView({ behavior: "smooth" }),
            (t.value = "");
        })
        .catch((e) => {
          (r.innerHTML = `<p style='color:red'>${e}</p>`),
            (n.innerHTML = ""),
            (c.innerHTML = "");
        });
  };
  e.addEventListener("click", s),
    t.addEventListener("keypress", function (e) {
      "Enter" === e.key && s();
    });
})();
