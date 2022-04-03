
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "d0b30ebf17b185c4a17dd179ec716839";
            

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";

      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } 
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `${
        filteredArray[0].querySelector(".city-name span").textContent
      }`;
      form.reset();
      input.focus();
      return;
    }
  }

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name,  } = data;
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name}">
          <span>${name}</span>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
       
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    
});