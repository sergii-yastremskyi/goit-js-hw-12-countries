import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core';
var debounce = require('lodash.debounce');
import getCountries from "./fetchCountries.js"
const refs = {
  input: document.querySelector("input"),
  wrapper: document.querySelector(".wrapper"),
}



refs.input.addEventListener("input", debounce(searchCountry, 500))


function cardsMarkUp({ name }) {
  return ` <div class="card-wrapper">
      <div class="wrap-for-one-country">
        <p>${name}</p>
      </div>`

}
function cardMarkUpForOneCountry({ name, capital, flag, languages, population }) {
  return `
  <div class="countryName"><p >${name}</p></div>  
  <div class="card-wrapper-country">
  
      <div class="left-part">
        
        <p>${capital}</p>
        <p>${languages.map((lang) => lang.name)}</p>
        <p>${population}</p>
      </div>
      <div class="right-part"><img src="${flag}" alt="flag"></div>
    </div>`
}
function toManyCountries() {
  alert({
    text: "Too many matches found. Please enter a more specific query!"
  });
}
function NotFound() {
  error({
    text: "Please enter another name of country"
  });
}
function searchCountry(event) {
  refs.wrapper.innerHTML = ''
  event.preventDefault();
  const country = refs.input.value.trim();
  let cards = '';
  if (!country) {
    refs.wrapper.innerHTML = ''
    return
  }
  getCountries(country)
    .then((country) => {
      if (country.length > 2 && country.length < 11) {
        cardsMarkUp
        cards = country.map((dataItem) => cardsMarkUp(dataItem)).join("")
      } else if (country.length < 2) {
        cardMarkUpForOneCountry
        cards = country.map((dataItem) => cardMarkUpForOneCountry(dataItem)).join("")

      } else if (country.length > 11) {
        toManyCountries()

      } else {
        NotFound()
      }

      refs.wrapper.insertAdjacentHTML("beforeend", cards)


    })
}
