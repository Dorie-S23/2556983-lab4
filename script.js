
const button = document.getElementById("search-btn");
const img = document.getElementById("flag");


const fetchCountry = async () =>{
    try{
        const search = document.getElementById("country-input").value.toLowerCase();
        const url = `https://restcountries.com/v3.1/name/${search}`;
        let response = await fetch(url);
        if (!response.ok){
            throw new Error("Can't fetch data");
        }
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.error(error);
    }
}
button.addEventListener("click", fetchCountry);