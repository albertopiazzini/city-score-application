"use strict";

// variable
const btn = document.querySelector("#btn");
const textArea = document.querySelector("#textArea");
const sum = document.querySelector(".summary");
const categories = document.querySelector(".categories-grid");
const cityName = document.querySelector(".city-name");
const cityScore = document.querySelector(".score-tot");
const titleBox = document.querySelector(".title-box");
let city;
const box = document.querySelector(".box");

/// function

const correctInput = function (input) {
  const correctIn = input.trim().toLowerCase().replace(" ", "-");

  return correctIn;
};

const showCategories = function () {
  cityScore.style.backgroundColor = "transparent";

  city = correctInput(textArea.value);
  cityName.innerHTML = "";
  cityScore.innerHTML = "";

  fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `City not found (the name must be written in English, thanks)`
        );
      return response.json();
    })
    .then((data) => {
      cityName.innerHTML = `${city.toUpperCase()}: `;
      cityScore.innerHTML = `${data.teleport_city_score.toFixed(1)}`;
      cityScore.style.backgroundColor = "rgb(0, 119, 255)";
      categories.innerHTML = "";

      if (data.categories) {
        data.categories.forEach((el, index) => {
          const html = `<div class="box-cat">

          <div class="title-vote">  <span class="vote" style = "background-color: ${
            el.color
          }"> ${el.score_out_of_10.toFixed(1)} </span> ${el.name} </div>
          
          <div class="full-bar">
            <div class="percent-bar" style = "background-color: ${
              el.color
            }; width: ${el.score_out_of_10.toFixed(1) * 10}%"></div>
          </div>
  
        </div>`;

          categories.insertAdjacentHTML("beforeend", html);
        });
        sum.innerHTML = "";
        if (data.summary) {
          sum.insertAdjacentHTML("afterbegin", data.summary);
        } else {
          sum.innerHTML = "";
        }

        cityName.scrollIntoView({ behavior: "smooth" });

        textArea.value = "";
      } else {
        throw new Error(`Something went wrong 💥 Retry please`);
      }
    })
    .catch((err) => {
      cityScore.style.backgroundColor = "transparent";
      cityScore.innerHTML = "";
      cityName.innerHTML = "";
      sum.innerHTML = "";
      categories.innerHTML = "";

      sum.innerHTML = `<p style='color:red; font-size:1.5rem;''>${err}</p>`;
    });
};

// application

btn.addEventListener("click", showCategories);

textArea.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    showCategories();
  }
});
