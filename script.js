// GET QUOTE FROM API
async function getQuote() {
  //Bypass CORS error
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const apiUrl = "api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const res = await fetch(proxyUrl + apiUrl);
    const data = await res.json();
    console.log(data);
  } catch(error) {
    getQuote();
    console.log("No quote", error);
  }
}

getQuote();