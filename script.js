"use strict";

// variable
const btn = document.querySelector("#btn");
const textArea = document.querySelector("#textArea");
const sum = document.querySelector(".summary");
const categories = document.querySelector(".categories");
const title = document.querySelector(".title");
const cityScore = document.querySelector(".city-score");
let city;
const box = document.querySelector(".box");

/// function

const correctInput = function (input) {
  const correctIn = input.trim().toLowerCase().replace(" ", "-");

  return correctIn;
};

const showCategories = function () {
  city = correctInput(textArea.value);
  title.innerHTML = "";
  fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`)
    .then((response) => {
      if (!response.ok) throw new Error(`City not found (${response.status})`);
      return response.json();
    })
    .then((data) => {
      title.innerHTML = city.toUpperCase();
      categories.innerHTML = "";
      cityScore.innerHTML = "";

      cityScore.innerHTML = data.teleport_city_score.toFixed(1);
      data.categories.forEach((el, index) => {
        const html = `<p style="color:${el.color};"> ${
          el.name
        }: ${el.score_out_of_10.toFixed(1)}</p>`;
        categories.insertAdjacentHTML("beforeend", html);
      });
      sum.innerHTML = "";
      sum.insertAdjacentHTML("afterbegin", data.summary);
      cityScore.innerHTML = `CITY SCORE: ${data.teleport_city_score.toFixed(
        1
      )}`;
      title.scrollIntoView({ behavior: "smooth" });

      textArea.value = "";
    })
    .catch((err) => {
      sum.innerHTML = `<p style='color:red'>${err}</p>`;
      categories.innerHTML = "";
      cityScore.innerHTML = "";
    });
};

// application

btn.addEventListener("click", showCategories);

textArea.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    showCategories();
  }
});
