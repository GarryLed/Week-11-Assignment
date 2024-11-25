
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

// testing the API 
//fetchPlayerTitles(`GM`);