let random = Math.random();
fetch('https://robohash.org/'+random)
//this api returns binary data(the picture)
.then(function(response){
    console.log('response status', response.status)
    return response.blob(); //extract the binary data/picture
}) .then(function(json){
    //make a temporary url that references this binary data
    const imageObjectURL = URL.createObjectURL(json);
    console.log(imageObjectURL);
     // set this temporary url as the source for the image tag
    document.getElementById('robo-image').src = imageObjectURL

})


fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=2`).then(function(response){
    //do something with response
    //extract json from response
    console.log('response status', response.status)
    return response.json();
}) .then(function(json){
    //do something with the json payload
    console.log('response payload:', json)
    processJson(json)

    //drawing a new card from the pile
    //get the deckId from the current deck
    let api = json;
    let deckId = api.deck_id;
    console.log(deckId);
    //This is definitely not the best way to do this, but i was having trouble with multiple clicks
    //The first click would work but then every card after that would be the same card
    //I know there is a very simple fix to loop through and have each click create a new card but this does work
    
    hitButton = document.getElementById('user-hit');
    hitButton2 = document.getElementById('user-hit2');
    hitButton3 = document.getElementById('user-hit3');
    hitButton4 = document.getElementById('user-hit4');

    //use the current deckId in the new fetch to draw another card from that deck
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(function(response){
        console.log('response status', response.status)
        return response.json();
    })  .then(function(json){
        //when the Hit button is clicked, draw another card
        hitButton.onclick = function(){
            console.log('response payload:', json)
            processJson(json);
        }

        
        
    })  

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(function(response){
        console.log('response status', response.status)
        return response.json();
    })  .then(function(json){
        //when the Hit button is clicked, draw another card
        hitButton2.onclick = function(){
            console.log('response payload:', json)
            processJson(json);
        }

        
        
    })  

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(function(response){
        console.log('response status', response.status)
        return response.json();
    })  .then(function(json){
        //when the Hit button is clicked, draw another card
        hitButton3.onclick = function(){
            console.log('response payload:', json)
            processJson(json);
        }

        
        
    })  

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(function(response){
        console.log('response status', response.status)
        return response.json();
    })  .then(function(json){
        //when the Hit button is clicked, draw another card
        hitButton4.onclick = function(){
            console.log('response payload:', json)
            processJson(json);
        }

        
        
    })  


    
    
})

//--------------------
//let deckId = card.deck_id;
//console.log(deckId);
//fetch(`https://deckofcardsapi.com/api/deck `)


//--------------------


let totalHandValue = 0;
processJson = function(json){
    
    //loop through the results array and process one card at a time
    for(let i=0; i<json.cards.length; i++){
        let card = json.cards[i];
        processCard(card);
        totalHandValue += (parseInt(json.cards[i].value));
        console.log(totalHandValue)
        
        /*try{
        processCard(card);
        } catch(error){
            processError(error);
        }*/
    }
    
    const handValue = document.getElementById('hand-value');
        const value = document.createElement('p')
        const number = document.createTextNode(`Hand Total: ${totalHandValue}`)
        value.appendChild(number);
        handValue.append(value);
}



//this function generates the initial hand for the user
//the images will be displayed on the right hand side of the screen, the value will be used to calculate the users score
let processCard = function(card){
const currentCard = document.getElementById('current-card');
//const handValue = document.getElementById('hand-value');



    //getting the info for each seperate card
    
    let cardValue = card.value;
    let cardSuit = card.suit;
    let cardImage = card.image;
    
    //For counting purposes, make sure jack, queen, and king are all worth 10
    //Will work on Aces later
    if(card.value=='JACK' || card.value=='QUEEN' || card.value=='KING'){
        card.value = '10'
    }
    if(card.value == 'ACE'){
        card.value = '11'
    }
    console.log(parseInt(card.value));

    
    
    /*const value = document.createElement('li')
    const number = document.createTextNode(parseInt(card.value))
    value.appendChild(number);
    handValue.append(value);*/

    //Creates an image of the cards in the users hand from the api
    const image = document.createElement('img');
    image.setAttribute('src', cardImage);
    image.setAttribute('height', '200px')
    document.getElementById('card-img').appendChild(image)
}







let roboHand = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)+min)
}
//In blackjack the dealer must hit if below 17, and busts ~28% of the time
//using a min of 17 and a max of 23 ensures the only legal hands the dealer has will be between 17-21, and the dealer will bust 33% of the time
const roboNumber = roboHand(17,23) 

const dealerHand = document.getElementById('dealer-hand')

const liHand = document.createElement('li')
const handText = document.createTextNode(`dealers hand: ${roboNumber}`)
liHand.appendChild(handText);
dealerHand.append(liHand);




//this is a function for the user to click after they have finished their hand to see if they beat the robo-dealer
function showDealerHand(){
    //show the hidden text of the generated dealer hand value
    let showHand = document.getElementById('dealer-hand')
    showHand.style.display = 'block';
    console.log(`Dealer Score: ${roboNumber}`)
    console.log(`User Score: ${totalHandValue}`)
    if(roboNumber>21 && totalHandValue<=21 || roboNumber<totalHandValue){
        console.log('User Wins!')
    } else if(totalHandValue>21 && roboNumber <=21 || roboNumber > totalHandValue){
        console.log('Robo Dealer Wins!')
    } else if (roboNumber>21 && totalHandValue>21 || roboNumber==totalHandValue){
        console.log('Tie!')
    }
    //code for if user won/lost:
}
