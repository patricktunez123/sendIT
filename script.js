const dataUrl = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
fetch(dataUrl).
then(blob => blob.json()).
then(saveData).
catch(errorMessage);

const dataArray = [];
//Expand an array into a list
function saveData(data) {
  dataArray.push(...data); // spread operator
  return dataArray;
}

const searchQuery = document.querySelector('.city-search');
searchQuery.addEventListener('keyup', displayDetails);
const list = document.querySelector('.list');

function displayDetails() {
  list.innerHTML = '';
  const html = dataArray.map(matches => {
    let { city, state, population, growth_from_2000_to_2013 } = matches;
    //Regular 
    //Regular expressions are patterns used to match character combinations in strings. 
    let re = new RegExp(this.value, 'gi');
    if (re.test(city + state)) {
      let cName = city.replace(re, `<span class="highlight">${this.value}</span>`);
      let sName = state.replace(re, `<span class="highlight">${this.value}</span>`);
      if (growth_from_2000_to_2013 > '0%') {
        return `<a class="city-search" href="#"> <li><span class="name">${cName}, ${sName}</span><span class="population">${commasForPopulationNum(population)}</span><span class="growth_from_2000_to_2013">${(growth_from_2000_to_2013)}</span></li> </a>`;
      }else{
        return `<a class="city-search" href="#"> <li><span class="name">${cName}, ${sName}</span><span class="population">${commasForPopulationNum(population)}</span><span class="growth_from_2000_to_2013_red">${(growth_from_2000_to_2013)}</span></li> </a>`;
      }  
    }
  }).join('');

  list.innerHTML = html;
}

function commasForPopulationNum(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function errorMessage(error) {
  list.textContent = `There was an error when trying to connect to server, pls try again later`;
}