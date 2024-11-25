// Redo of unnamed functions 
// Select the root element in the HTML where we will append our content
const app = document.getElementById('root');

// Create an image element for the logo and set its source
//const logo = document.createElement('img');
//logo.src = 'logo.png'; // create and add logo 

const userName = `garyleddy`;

const url = `https://api.chess.com/pub/player/${userName}`; 

const users = ['hikaru', 'garyleddy']; // array to store user names 

const statsUrl = `https://api.chess.com/pub/player/${userName}/stats`;


const userGamesUrl = `https://api.chess.com/pub/player/${userName}/games`;