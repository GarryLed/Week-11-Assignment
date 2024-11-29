
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

ALGORITHM (steps)
- gather checkbox data
  - store values in an array  
- gather country data 

- fetch the titled players JSON data (array of player usernames)
- function will take title as a parameter 
- will return an array of usernames (associated with a specified title)

loop through titledUsername array 
-fetch profile for each user 
  - display: 
    - player name 
    - username 
    - title 
    - avatar 
    - is streamer 







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
//document.getElementById('get-player-stats').addEventListener('click', fetchStatsForSelectedPlayers);

       // adding an event listener to the player stats button 
//document.getElementById('get-titled-player-profiles').addEventListener('click', fetchPlayerProfilesForSelectedTitles);

document.getElementById('get-leaderboard-results').addEventListener('click', fetchLeaderboards);

document.getElementById('get-live-streamers').addEventListener('click', fetchStreamers);
      
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

//---------------------Player Titles Functinos ---------------------------------

// fetch titled player usernames 
async function fetchTitledPlayerUsernames(title) {
    const url = `https://api.chess.com/pub/titled/${title}`;
        
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`EHTTP Error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// fetch country code for player 
async function fetchCountryCodeForPlayer(username) {

    const url = `https://api.chess.com/pub/player/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status:: ${response.status}`);
        }
        const data =  await response.json();
        const countryUrl = data.country; // returna a string (url) 
        const countryCode = extractPlayerCountryCode(countryUrl); // extract the country code form string
        return countryCode; // return country code 
    } catch (error) {
        console.error(`Error trying to fectc country code for ${username}`,error);
        return null;
    }
}

// fetch user
async function fetchPlayerProfilesForSelectedTitles() {

    // get data from checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    // Titled player container 
    const  titledPlayersContainer = document.getElementById('titled-player-profiles');
    // selected country 
    const titledPlayerSelectedCountries = document.getElementById('titled-player-selected-countries').value;
    // array to store titles 
    const selectedTitles = [];

    checkboxes.forEach(checkbox => {
        selectedTitles.push(checkbox.value);
    })

    titledPlayersContainer.innerHTML = "";

    for (const title of selectedTitles) {
        const titledPlayerUsernamesResponse = await fetchTitledPlayerUsernames(title) // => array of usernames for each title

        // array of titled player usernames 
        const titledPlayerUsernames = titledPlayerUsernamesResponse.players; // access the players array 
        // loop through array of titled usernames 
        for (const username of titledPlayerUsernames) {
            // at each iteration fetch the player profile 
            const titledPlayerProfile = await fetchPlayerProfile(username);

            const titledPlayerProfileDiv = createTitlePlayerDiv(titledPlayerProfile);
            titledPlayersContainer.appendChild(titledPlayerProfileDiv);
        
    }
    }
}

function createTitlePlayerDiv(profile) {
    const titledPlayerProfileDiv = document.createElement('div');
    titledPlayerProfileDiv.style.border = '1px solid #ddd';
    titledPlayerProfileDiv.style.padding = '10px';
    titledPlayerProfileDiv.style.margin = '5px';

   
     titledPlayerProfileDiv.innerHTML = `
             <img src="${profile.avatar}" alt="${profile.username}" style="width: 100px; height: 100px;">
             <p><strong>Player Name:</strong> ${profile.name}</p>
             <p><strong>Username:</strong> ${profile.username}</p>
             <p><strong>Title:</strong> ${profile.title}</p>
             

         `;
         return titledPlayerProfileDiv;
}


//------------------------ Leaderboard Functions  -------------------------------

async function fetchLeaderboards() {
    //const card = document.createElement('div');
        //card.setAttribute('class', 'card');
        const leaderboardContainer = document.getElementById('leaderboards');
        try {
            const response = await fetch('https://api.chess.com/pub/leaderboards');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
        
            // data for daily chess leaderboards 
            data.daily.forEach(player => {
                const PlayerElement = document.createElement('div');
                PlayerElement.setAttribute('class', 'leaderboard-card')
                PlayerElement.style.border = '1px solid #ddd';
                PlayerElement.style.padding - '5px';
            
                const avatar = document.createElement('img');
                avatar.setAttribute('src', player.avatar);
                avatar.setAttribute('width', '200px');
                avatar.setAttribute('height', '250px');
                const h1 = document.createElement('h1');
                h1.textContent = `Rank: ${player.rank}`;
                const h2name = document.createElement('h2');
                h2name.textContent =   `Name: ${player.name};`
                const h2 = document.createElement('h2');
                h2.textContent =   `Username: ${player.username};`
                const h2title = document.createElement('h2');
                h2title.textContent = `Title: ${player.title}`;
                const para1 = document.createElement('p');
                para1.textContent = `Score: ${player.score}`;
                
                PlayerElement.appendChild(h1);
                PlayerElement.appendChild(avatar);
                PlayerElement.appendChild(h2name);
                PlayerElement.appendChild(h2);
                PlayerElement.appendChild(h2title);
                PlayerElement.appendChild(para1);
                
                leaderboardContainer.appendChild(PlayerElement);
            });
        } catch (error) {
            console.error('Fetch error:', error);
            PlayerElement.textContent = 'Could not fetch users: ' + error;
        }
}



async function fetchFilteredLeaderboards() {

}












//---------------------- Live Streamers Functinos ------------------------------

async function fetchStreamers() {
    const url = `https://api.chess.com/pub/streamers`;
        const streamerContainer = document.getElementById('streamer-container');
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`EHTTP Error! Status: ${response.status}`);
        }
        const data=  await response.json();
        console.log(data.streamers);
        data.streamers.forEach(player => {
            const PlayerElement = document.createElement('div');
            PlayerElement.setAttribute('class', 'leaderboard-card')
            PlayerElement.style.border = '1px solid #ddd';
            PlayerElement.style.padding - '5px';
        
            const avatar = document.createElement('img');
            avatar.setAttribute('src', player.avatar);
            avatar.setAttribute('width', '200px');
            avatar.setAttribute('height', '250px');
            
            const username = document.createElement('h2');
            username.textContent =   `Username: ${player.username};`
           
            
           
            PlayerElement.appendChild(avatar);
            PlayerElement.appendChild(username);
           
            
            streamerContainer.appendChild(PlayerElement);
        })} catch (error) {
        console.error(error);
        return null;
        }
}









//------------------------ Helper Functions for testing code ------------------------------------

// extract country code from string url function 

function extractPlayerCountryCode(country) { 
    return country.split("/").pop();  
}

//------------------------ End of Helper Functions ------------------------------------


