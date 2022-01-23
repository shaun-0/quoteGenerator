 const quoteContainer = document.getElementById('quote-container');
 const quoteText = document.getElementById('quote');
 const authorText = document.getElementById('author');
 const twitterBtn = document.getElementById('twitter');
 const newQuoteBtn = document.getElementById('new-quote');
 const loader = document.getElementById('loader');

 let apiQuotes=[];

 // Show Loader
 function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
 }
 // Hide Loader
 function complete(){
     loader.hidden = true;
     quoteContainer.hidden = false;
 }


 //Get one random quote
 function newQuote(){
     loading();
     //generate a random quote from given array
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     console.log(quote);
     // Addd long-quote css class if text length is longer
     if(quote.text.length>100){
         quoteText.classList.add('long-quote'); //Adding 'long-quote' class to quoteList classes
     }else{
        quoteText.classList.remove('long-quote'); //Else we remove if it was previously applied
     }
     quoteText.textContent = quote.text; //set quote text
     if(!quote.author){ //If there is no author set it to "unknown"
         authorText.textContent = "Unknown"; 
     }else{
        authorText.textContent = quote.author; //set the author
     }
     complete();
 }

 // Get Quotes from API
 async function getQuotes(){
     loading();
     const apiUrl = "https://type.fit/api/quotes";
     try{
         //fetch response from api in response asyncronously
        const response = await fetch(apiUrl); 
        apiQuotes = await response.json(); //convert the api string to json
        newQuote(); //get One quote from array of quotes
     }catch(error){
         console.log(error);
     }
 }

 // Function to tweet the quote
  function tweetQuote(){
      //make url to twitter
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
      window.open(twitterUrl,'_blank');
  }

  //Event Listner
  newQuoteBtn.addEventListener('click',newQuote); // when user click newQuote button

  twitterBtn.addEventListener('click',tweetQuote); // when user click tweet button

 // On page Loading

 getQuotes();   