const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authText = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
// GET QUOTE FROM API
async function getQuote() {
  //Bypass CORS error
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const apiUrl = "api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const res = await fetch(proxyUrl + apiUrl);
    const data = await res.json();
    console.log(data)
    // Add "UNKNOWN" if Author is null
    if(data.quoteAuthor === "") {
      authText.innerText = "Unknown"
    } else {
      authText.innerText = data.quoteAuthor;
    }
    //REDUCE FONT SIZE FOR LONG QUOTES
    if(data.quoteText.length > 40) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
  } catch(error) {
    getQuote();
    console.log("No quote", error);
  }
}
//Tweet Quote
const tweetQuote = function() {
  const quote = quoteText.innerText;
  const author = authText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -${author}`;
  window.open(twitterUrl, '_blank')
}

//EVENT LISTENERS
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)

getQuote();