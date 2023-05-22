// window.console.log("testing")
// get quotes from api using asynchronous fetch request in try catch block.

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading(){
    loader.hidden = false; //meaning we dont to be hidden
    quoteContainer.hidden = true;

}
function complete(){
    quoteContainer.hidden = false; 
    loader.hidden = true;  
}
function newQuotes(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // console.log(quote);
    // this just gives me what i have to generate the quote dynamically we need to remove this and add something else.
    if(!quote.author){
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = quote.author; //sometimes i don't have author the i need to give out unknown to do that the above code
    }
    //check the quote length if its long then reduce the font size as defined in class
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote')   
    }
    
    
    quoteText.textContent = quote.text;
    //after setting the quote , we need to hide the loader
    complete();

}
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes'
    loading();
    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        // console.log(apiQuotes[12]);
        newQuotes();

    }catch(error){

    }
}

//to tweet
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank'); //'_blank' makes it open in new tab
}
//Event  Listeners
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);





//on loading
getQuotes();
// loading()
