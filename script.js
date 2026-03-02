
const button = document.getElementById("search-btn");
const img = document.getElementById("flag");
const spin = document.getElementById("loading-spinner");
spin.hidden= true;

const fetchCountry = async () =>{
    const search = document.getElementById("country-input").value.toLowerCase();
        if (!search) return;
        spin.hidden = false;
    try{
        
        const url = `https://restcountries.com/v3.1/name/${search}`;
        let response = await fetch(url);
        if (!response.ok){
            throw new Error("Country not found");
        }
        const data = await response.json();
        //console.log(data);
        displayCountry(data[0]);
    }
    catch(error){
        console.error(error);
    } finally {
        spin.hidden= true;
    }
     
}
function displayCountry(country){
    document.getElementById('country-info').innerHTML = `
    <section>
    <h2>${country.name.common}</h2>
    <img src = "${country.flags.png}" width="150" />
    <p>Capital: ${country.capital?.[0]}</p>
    <p>Population: ${country.population.toLocaleString()}</p>
    <p>Region: ${country.region}</p>
    <h3>Bordering Countries:</h3>
    <ul id="borders"></ul>
    </section>
    `;
    
   // const borderingc = document.getElementById('bordering-countries');

    if (country.borders) {
    fetchBorders(country.borders);
  } else {
    document.getElementById("borders").innerHTML = "<li>None</li>";
  }
}



async function fetchBorders(borders) {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`
  );
  const data = await res.json();

  document.getElementById("borders").innerHTML = data
    .map(
      (c) => `
      <li>
        <img src="${c.flags.png}" width="40" alt="Flag of ${c.name.common}" />
        <span>${c.name.common}</span>
      </li>
    `
    )
    .join("");
}
button.addEventListener("click", fetchCountry);