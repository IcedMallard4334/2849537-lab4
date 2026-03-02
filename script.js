let URL = "https://restcountries.com/";
const countryCard = document.querySelector('.country-card');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');
const errorMessage = document.getElementById('error-message');
const loadingSpinner = document.getElementById('loading-spinner');

async function searchCountry(countryName) {
    countryName =countryName.trim().toLowerCase();
    countryCard.style.display = "none";
    countryInfo.style.display = "none";
    countryInfo.innerHTML = "";
    borderingCountries.innerHTML = "";
    errorMessage.innerText = "";
    try {
        loadingSpinner.style.display = "block";
        const response = await fetch(URL+`v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const countryTitle = document.createElement("h2");
        countryTitle.innerText = data[0].name.common;
        const capital = data[0].capital ? data[0].capital[0] : "N/A";
        const population = data[0].population.toLocaleString();
        const region = data[0].region;
        const p1 = document.createElement("p");
        p1.innerText = `Capital: ${capital}`;
        const p2 = document.createElement("p");
        p2.innerText = `Population: ${population}`;
        const p3 = document.createElement("p");
        p3.innerText = `Region: ${region}`;
        const mainFlag = document.createElement("img");
        if (data[0].flags && data[0].flags.png) {
            mainFlag.src = data[0].flags.png;
        } else{
            mainFlag.alt = "Country Flag";
        }
        mainFlag.style.width = "auto";
        mainFlag.style.height = "50px";
        mainFlag.style.marginLeft = "20px";
        mainFlag.style.marginTop = "22px";
        mainFlag.style.border = "1px solid #060606";
        countryTitle.style.fontSize = "35px";
        const article = document.createElement("article");
        article.appendChild(countryTitle);
        article.appendChild(mainFlag);
        article.style.display = "flex";
        article.style.flexDirection = "row";
        article.style.paddingTop = "10px";
        loadingSpinner.style.display = "none";
        countryCard.style.display = "block";
        countryInfo.style.display = "block";
        countryInfo.appendChild(article);
        countryInfo.appendChild(p1);
        countryInfo.appendChild(p2);
        countryInfo.appendChild(p3);
        const borderingCountriesTitle = document.createElement("h2");
        borderingCountriesTitle.innerText = "Bordering Countries";
        if (data[0].borders && data[0].borders.length > 0) {
            const borderCodes = data[0].borders.join(",");
            const borderResponse = await fetch(URL+`v3.1/alpha?codes=${borderCodes}`);
            if (!borderResponse.ok) {
                throw new Error(`HTTP error! status: ${borderResponse.status}`);
            }
            const borderData = await borderResponse.json();
            borderingCountriesTitle.style.fontSize = "30px";
            borderingCountries.appendChild(borderingCountriesTitle);
            borderData.forEach(country => {
                const p = document.createElement("p");
                p.style.fontWeight = "bold";
                p.style.fontSize = "20px";
                p.style.width = "50ch"; 
                p.style.margin = "0"; 
                p.innerText = country.name.common;
                const borderFlag = document.createElement("img");
                if (country.flags && country.flags.png) {
                    borderFlag.src = country.flags.png;
                } else {
                    borderFlag.alt = "Country Flag";
                }
                const article = document.createElement("article");
                article.style.display = "flex";
                article.style.flexDirection = "row";
                article.style.alignItems = "center";
                article.style.width = 'fit-content';
                article.appendChild(p);
                article.appendChild(borderFlag);
                borderingCountries.appendChild(article);
            });
        } else{
            const p = document.createElement("p");
            p.style.fontWeight = "bold";
            p.style.fontSize = "20px";
            p.style.fontFamily = "franklin gothic medium, sans-serif";
            const article = document.createElement("article");
            p.innerText = "No bordering countries.";
            article.appendChild(p);
            borderingCountries.appendChild(borderingCountriesTitle);
            borderingCountries.appendChild(article);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.innerText = "An error occurred while fetching data. Please try again.";
    } finally {
        loadingSpinner.style.display = "none";
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});