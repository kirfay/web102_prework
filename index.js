/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

        // create a new div element, which will become the game card
        // add the class game-card to the list
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container
        for (let game of games) {
          const gameCard = document.createElement("div");
          gameCard.classList.add("game-card");
      
          gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h3>${game.name} </h3>
            <p>${game.description} </p>
            <p>Backers: ${game.backers} </p>
          `;
      
          gamesContainer.appendChild(gameCard);
        }

    }




        


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

function showFundedGames() {
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
    deleteChildElements(gamesContainer);
    addGamesToPage(fundedGames);
  }
  
  // Initial call to display funded games
  showFundedGames();

  const contributionsCard = document.getElementById("num-contributions");
  const totalContributions = GAMES_JSON.reduce(
    (acc, game) => acc + game.backers,
    0
  );
  contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

// grab the contributions card element
//const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

  
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
    deleteChildElements(gamesContainer);
    addGamesToPage(unfundedGames);
    // use filter() to get a list of games that have not yet met their goal
    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    //deleteChildElements(gamesContainer);
    showFundedGames();

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// create a string that explains the number of unfunded games using the ternary operator
// create a new DOM element containing the template string and append it to the description container
const numUnfunded = GAMES_JSON.filter(
    (game) => game.pledged < game.goal
  ).length;
  const unfundedStr = `A total of ${numUnfunded} game${
    numUnfunded === 1 ? " remains" : "s remain"
  } unfunded. We need your help to fund these amazing games!`;
  
  const unfundedDesc = document.createElement("p");
  unfundedDesc.innerHTML = unfundedStr;
  descriptionContainer.appendChild(unfundedDesc);
  


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort(
    (item1, item2) => item2.pledged - item1.pledged
  );
  
  const [firstGame, secondGame] = sortedGames;
  
  const firstGameElement = document.createElement("p");
  firstGameElement.innerHTML = `Top Pledged Game: ${firstGame.name}`;
  firstGameContainer.appendChild(firstGameElement);
  
  const secondGameElement = document.createElement("p");
  secondGameElement.innerHTML = `Runner-Up Game: ${secondGame.name}`;
  secondGameContainer.appendChild(secondGameElement);
  
  AOS.init();
  
  // Search functionality
  // use destructuring and the spread operator to grab the first and second games
 // create a new element to hold the name of the top pledge game, then append it to the correct element
 // do the same for the runner up item
  const searchInput = document.getElementById("search-input");
  
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter((game) =>
      game.name.toLowerCase().includes(searchTerm)
    );
    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
  });

