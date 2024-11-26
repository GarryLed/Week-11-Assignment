
// select a root element to append the rest of the content 
const chessRoot = document.getElementById('root');

// create an element image for the logo 
const logo = document.createElement('img');
// add logo png here 
//logo.src = 'logo.png';




/*

const userName = `garyleddy`;

const url = `https://api.chess.com/pub/player/${userName}`; 

const users = ['hikaru', 'garyleddy']; // array to store user names 

const statsUrl = `https://api.chess.com/pub/player/${userName}/stats`;


const userGamesUrl = `https://api.chess.com/pub/player/${userName}/games`;

https://api.chess.com/pub/streamers
search for a list of streamers that are live right now in a specified cournty 

*/

// add event listerners 


// 

async function fetchPlayerTitles(title) {
        const url = `https://api.chess.com/pub/titled/${title}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching Player for ${title}: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.players);
        } catch (error) {
            console.error(error);
            //return null;
        }
}

// add an event listener 
document.getElementById('get-player-profiles').addEventListener('click', fetchPlayerProfiles)

/**
 * Fetch movie data and display each movie in a card format.
 * Uses async/await for a cleaner asynchronous flow.
 */
async function fetchPlayerProfiles() {
    try {
      const response = await fetch(`https://api.chess.com/pub/player/garyleddy`);
      const data = await response.json(); // Parses the response as JSON
     console.log(data);
      // Iterate over each movie object and create a card for it
      //data.forEach(player => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
  
        const h1 = document.createElement('h1');
        h1.textContent = data.username;
  
        const p = document.createElement('p');
        p.textContent = ` Membership: ${data.title}`;

        const p2 = document.createElement('p');
        p.textContent = data.status;
  
       const container = document.getElementById('get-player-profiles');
  
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(p2);
     // });
    } catch (error) {
      // Display an error message if the fetch fails
      const errorMessage = document.createElement('div');
      errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
      container.appendChild(errorMessage);
    }
  }

// testing the API 
//fetchPlayerTitles(`GM`);

//fetchPlayerProfiles('garryleddy');