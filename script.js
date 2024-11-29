
/*
Breaking the problem down into parts: 

1. Player stats 

Endpoints: 

const statsUrl = `https://api.chess.com/pub/player/${userName}/stats`;

Requirements: 

Inputs: 
- checkbox: player name (vlaue is player username)
- Dropdown menu: 
  - Blitz
  - Rapid
  - Bullet 



Outputs:
- game name  
- avatar 
- player name
- username 
- title 
- country 
- current rating 
- best rating 
- record: 
  - wins 
  - losses 
  - draws 

Clarifying questions: 
- Do I need to create multiple functions to fetch the data of each game 
- no because once I fetch the player stats data, I can use the name of each game as the datapoint to access the 
  players stats about each game 

Examples: 
const url = 'https://api.chess.com/pub/player/${username}/stats'

try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching Player for ${username}: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.chess_rapid); => display stats about rapid chess game 
        } catch (error) {
            
        }



Functions: 

fetchPlayerProfile()

fetchPlayerStats()
- will use the ${username} endpoint in url 
https://api.chess.com/pub/player/${username}/stats

createPlayerStatsDiv()


fetchSelectedPlayerStats()




==================================
2. Player titles 

Endpoints: 

const userName = `garyleddy`;

const url = `https://api.chess.com/pub/player/${userName}`; 

const users = ['hikaru', 'garyleddy']; // array to store user names 

Requirements: 

Inputs: 
- checkbox: Player titles 
- Dropdown menu: 
  - All countries 
  - United States 
  - United Kingdom 
  - Ireland 
  - Norway 



Outputs:  
- avatar 
- player name
- username 
- title 
- country 
- is streamer 
  - if true then display platformd 
 - if false then display "not a streamer" message 


Clarifying questions: 

Examples: 




Functions: 

fetchTitledPlayerUsernames()


renderPlayerProfiles()

fetchPlayerCountry()

fetchSelectedTitledPlayers()

extractPlayerCountryCode(country)
- takes a string (url) as a parameter
- returns a string (country code)



====================================
3. Leaderboards 

Endpoints: 

Requirements: 

Inputs: 


Outputs: 


Clarifying questions: 
- Should I create functions to render each chess game or can I use one function and pass in game name?
 - I'll start by creating individual functions to get the code to work and I can refactor if need be 

 How will I fetch the country code from each user 
 (the value is a string, which is a link, and has the country code at the end of the string)
 - access the string (value) via the the 'country' key
- split the string using string.SPlit('/') at every forward forward slash which will return an array of strings 
- use the Array.pop() function to remove the last element in the string (the country code)
- save this return value to a variable which is the country code that I can use for filtering the data   


Examples:
https://www.w3schools.com/jsref/jsref_split.asp
https://www.w3schools.com/jsref/jsref_pop.asp

Player.country: https://api.chess.com/pub/country/US
const countryCode = player.country.Split("/").pop()/; 





Functions: 

fetchLeaderboards()
renderLeaderboards()
renderBlitzLeaderboard()
renderBulletLeaderboard()
renderRapidLeaderboard()
renderChessDailyLeaderboard()
fetchPlayerProfile()
fetchPlayerCountry()
fetchPlayerStats()
fetchPlayerTitle()





==================================
4. Streamers 

Endpoints: 

https://api.chess.com/pub/streamers
search for a list of streamers that are live right now in a specified cournty 

Requirements: 

Inputs: 


Outputs: 


Clarifying questions: 
- how will I determine which country a streamer is from? 
  - each player profile has a country and country code 
  - I can access the country code via the player profile endpoint 
 


Examples: 




Functions: 
fetchLiveStreamers()
renderLiveStreamers()
fetchCountryCodeForStreamers()
renderLiveStreamersPerCountry()


============================================================
CODE:
*/

document.addEventListener('DOMContentLoaded', async function () {
    try {
      
       // adding an event listener to the player stats button 
       extractPlayerCountryCode();
//document.getElementById('get-player-stats').addEventListener('click', fetchStatsForSelectedPlayers);

      
    } catch (error) {
        console.error('Oops, an error occured', error);
    }
});

// fetch player profiles 
async function fetchPlayerProfile(username) {
    const url = `https://api.chess.com/pub/player/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching the profile for username: ${username}: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
  

// fetch user stats 
// takes user names as parameter 
async function fetchPlayerStats(username) {
    const url = `https://api.chess.com/pub/player/${username}/stats`;
        
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching Player ${username}: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function createPlayerStatsDiv(profile, playerStats, typeOfGame ) {
    
        const playerStatsDiv = document.createElement('div');
        playerStatsDiv.style.border = '1px solid #ddd';
        playerStatsDiv.style.padding = '10px';
        playerStatsDiv.style.margin = '5px';
 
        // there is a lot of similar code below. Maybe I can refactor 
       if (typeOfGame === 'live_bullet') {
         playerStatsDiv.innerHTML = `
                 <h3>Bullet Chess</h3>
                 <img src="${profile.avatar}" alt="${profile.username}" style="width: 100px; height: 100px;">
                 <p><strong>Player Name:</strong> ${profile.name}</p>
                 <p><strong>Username:</strong> ${profile.username}</p>
                 <p><strong>Title:</strong> ${profile.title}</p>
                 <p><strong>Current Rating:</strong> ${playerStats.chess_bullet.last.rating}</p>
                 <p><strong>Best Rating:</strong> ${playerStats.chess_bullet.best.rating}</p>
                 <p><strong>Total Wins:</strong> ${playerStats.chess_bullet.record.win}</p>
                 <p><strong>Total Losses:</strong> ${playerStats.chess_bullet.record.loss}</p>
                 <p><strong>Total Draws:</strong> ${playerStats.chess_bullet.record.draw}</p>
    
             `;
     return playerStatsDiv; 
       } else if (typeOfGame === 'live_blitz'){
        playerStatsDiv.innerHTML = `
                <h3>Blitz Chess</h3>
                <img src="${profile.avatar}" alt="${profile.username}" style="width: 100px; height: 100px;">
                <p><strong>Player Name:</strong> ${profile.name}</p>
                <p><strong>Username:</strong> ${profile.username}</p>
                <p><strong>Title:</strong> ${profile.title}</p>
                <p><strong>Current Rating:</strong> ${playerStats.chess_blitz.last.rating}</p>
                <p><strong>Best Rating:</strong> ${playerStats.chess_blitz.best.rating}</p>
                <p><strong>Total Wins:</strong> ${playerStats.chess_blitz.record.win}</p>
                <p><strong>Total Losses:</strong> ${playerStats.chess_blitz.record.loss}</p>
                <p><strong>Total Draws:</strong> ${playerStats.chess_blitz.record.draw}</p>

    `;
return playerStatsDiv; 
       }   else if (typeOfGame === 'live_rapid'){
        playerStatsDiv.innerHTML = `
                <h3>Rapid Chess</h3>
                <img src="${profile.avatar}" alt="${profile.username}" style="width: 100px; height: 100px;">
                <p><strong>Player Name:</strong> ${profile.name}</p>
                <p><strong>Username:</strong> ${profile.username}</p>
                <p><strong>Title:</strong> ${profile.title}</p>
                <p><strong>Current Rating:</strong> ${playerStats.chess_rapid.last.rating}</p>
                <p><strong>Best Rating:</strong> ${playerStats.chess_rapid.best.rating}</p>
                <p><strong>Total Wins:</strong> ${playerStats.chess_rapid.record.win}</p>
                <p><strong>Total Losses:</strong> ${playerStats.chess_rapid.record.loss}</p>
                <p><strong>Total Draws:</strong> ${playerStats.chess_rapid.record.draw}</p>

    `;
return playerStatsDiv; 
       } else {
        playerStatsDiv.innerHTML = `<p>No data is available for this game</p>`;
        return playerStatsDiv
       }
    
}
// async function to fetch selected players 
async function fetchStatsForSelectedPlayers() {
    
    const checkboxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
    // array to store selected players
    const selectedPlayers = [];

    // getting 'player stats div by its id 
    const playerStatsContainer = document.getElementById('player-stats');

    const chessGameDropdownMenuInput = document.getElementById('live-games').value;
   
     
    checkboxes.forEach(checkbox => {
        selectedPlayers.push(checkbox.value); // push each element to the selectedPlayers array
    });

    playerStatsContainer.innerHTML = "";

    // for..of loop lets us use the 'await' keyword within the loop 
    for (const username of selectedPlayers) {
        
        const playerProfile = await fetchPlayerProfile(username);
       const playerStats = await fetchPlayerStats(username);

       
        if (playerStats) {
            
            const playerStatsDiv = createPlayerStatsDiv(playerProfile, playerStats, chessGameDropdownMenuInput);
            playerStatsContainer.appendChild(playerStatsDiv);
        }
    }
}


// fetch titled player usernames 
async function fetchTitledPlayerUsernames(title) {
    const url = `https://api.chess.com/pub/titled/${title}`;
        
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching Title: ${title}: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

//---------------------Player Titles Functinos ---------------------------------

async function fetchUserNamesForSelectedTitles() {

    // get data from checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // array to store titles 
    const selectedTitles = [];

    // Titled player container 
    const  titledPlayersContainer = document.getElementById('titled-player-profiles');

    const titledPlayerCountries = document.getAnimations('titled-player-countries').value;

    checkboxes.forEach(checkbox => {
        selectedTitles.push(checkbox.value);
    })

    titledPlayersContainer.innerHTML = "";

    for (const title of selectedTitles) {
        // add await functions here 
    }
}

// extract country code from string url function 

function extractPlayerCountryCode() {
    const country = "testing/IE" // for testing 
    const countryCode = country.split("/").pop();
    console.log(countryCode); // testing funciton 
}

//------------------------ End of Player Titles Functions -------------------------------


