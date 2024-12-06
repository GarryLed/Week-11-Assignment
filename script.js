
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
/leaderboards 

Requirements: 

Inputs: 
dropdown menus:
Games:
all 
Blitz
Bullet 
Rapid 

countries:
All 
United States 
United Kingdom 
Russia 
Ukraine 
India 


Outputs: 
Leaderboard:
position 
atatar 
player username 
title 
counrty 
rating 
wins 
losses 
draws 


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
fetchPlayerProfile()
fetchPlayerCountry()
fetchPlayerStats()
fetchPlayerTitle()

ALGORITHM:
- User selects a game type and or country (drop down menu )
- user clicks the "Get leaderboard results" button (add event listener here)
- fetch the leaderboard data using teh /leaderboards endpoint 
  - this will return a list of the top players 
  - extract the players username, rank  and score 
- loop through the players array 
  - extract: 
    - name 
    - username 
    - avatar 
    - title 
    - country 
- Filter by country (fetch)
  - if player is not form selected country then skip to next player 
- get stats for the palyer (fetch)
- get streamer data (fetch)
- create a fuction that will create the div for displaying data 
==================================
4. Streamers 

Endpoints: 

https://api.chess.com/pub/streamers
search for a list of streamers that are live right now in a specified cournty 

Clarifying questions: 
- how will I determine which country a streamer is from? 
  - each player profile has a country and country code 
  - I can access the country code via the player profile endpoint 
 
Functions: 
fetchLiveStreamers()
renderLiveStreamers()
fetchCountryCodeForStreamers()
renderLiveStreamersPerCountry()
============================================================
CODE:
*/

// Event listener for the DOMContent 
document.addEventListener('DOMContentLoaded', async function () {
    try {
      
// adding an event listener to the player stats button 
document.getElementById('get-player-stats').addEventListener('click', fetchStatsForSelectedPlayers);

// adding an event listener to the titled player button 
document.getElementById('get-titled-player-profiles').addEventListener('click', fetchPlayerProfilesForSelectedTitles);

// adding an event listener to the leaderboard results button 
document.getElementById('get-leaderboard-results').addEventListener('click', fetchFilteredLeaderboards);

// adding an event listener to the liverstreamers button 
document.getElementById('get-live-streamers').addEventListener('click', fetchSelectedLiveStreamers);
      
    } catch (error) {
        console.error('Oops, an error occured', error);
    }
});

// fetch player profiles 
// takes username as parameter 
async function fetchPlayerProfile(username) {
    // uses players username datapoint to access the players profile 
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
  
// fetch player stats 
// takes usernames as parameter 
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

// dynamically create a player stats div and populate the inner HTML 
function createPlayerStatsDiv(player, gameName, playerStats ) {
    
    // styling the div
        const playerStatsDiv = document.createElement('div');
        playerStatsDiv.style.border = '1px solid #ddd';
        playerStatsDiv.style.borderRadius = '10px';
        playerStatsDiv.style.backgroundColor = "rgb(255, 193, 150";
        playerStatsDiv.style.padding = '5px';
        playerStatsDiv.style.margin = '5px';
 
      
        // dynamically displaying content 
        playerStatsDiv.innerHTML = `
               <h3>${gameName}</h3>
               <img src="${player.avatar}" alt="${player.username}" style="width: 200px; height: 200px;">
               <p><strong>Player Name:</strong> ${player.name}</p>
               <p><strong>Username:</strong> ${player.username}</p>
               <p><strong>Title:</strong> ${player.title}</p>
               <p><strong>Current Rating:</strong> ${playerStats.last.rating}</p>
               <p><strong>Best Rating:</strong> ${playerStats.best.rating}</p>
               <p><strong>Total Wins:</strong> ${playerStats.record.win}</p>
               <p><strong>Total Losses:</strong> ${playerStats.record.loss}</p>
               <p><strong>Total Draws:</strong> ${playerStats.record.draw}</p>
             
   `;
   return playerStatsDiv;   
}

// async function to fetch stats for selected players 
async function fetchStatsForSelectedPlayers() {  
    // find all the checked checkboxes
    const checkboxes = document.querySelectorAll(`input[type="checkbox"]:checked`);

    // array to store selected players
    const selectedPlayers = [];

    // getting player stats div by its id 
    const playerStatsContainer = document.getElementById('player-stats');

    // return the selected game form the dropdown menu 
    const selectedGame = document.getElementById('live-games').value;
   
    // loop through checkboxes 
    // at each iteration push each element to the selectedPlayers array
    checkboxes.forEach(checkbox => {
        selectedPlayers.push(checkbox.value); 
    });

    // empty the container content 
    playerStatsContainer.innerHTML = "";

    // variables for filtering data for display
    let gameName;
    let gameStats;
        
    // for..of loop lets us use the 'await' keyword within the loop 
    for (const username of selectedPlayers) {
        // fetch the player profile 
        const playerProfile = await fetchPlayerProfile(username);

        // fetch player stats 
        const playerStats = await fetchPlayerStats(username);

        // checks which game was selected
        // assigns gameName to the name of the game 
        // assings game stats to 
        if (selectedGame === 'live_blitz') {   
            gameName = 'Blitz';
            gameStats = playerStats.chess_blitz;      
        } else if (selectedGame === 'live_bullet') {  
            gameName = 'Bullet';
            gameStats = playerStats.chess_bullet; 
        } else if (selectedGame === 'live_rapid') {
            gameName = 'Rapid';
            gameStats = playerStats.chess_rapid; 
        } 
        // call createPlayerStatsDiv and pass in three arguments 
        // store return value in playerStatsDiv
        const playerStatsDiv = createPlayerStatsDiv(playerProfile, gameName, gameStats);
        // append playerStatsDiv to parent div 
        playerStatsContainer.appendChild(playerStatsDiv); 
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

async function fetchPlayerCountry(countryCode) {
    const url = `https://api.chess.com/pub/country/${countryCode}`;
        
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`EHTTP Error! Status: ${response.status}`);
        }
        const country =  await response.json();
        return country.name; // returns the name of the country 
    } catch (error) {
        console.error(error);
        return null;
    }
}

// fetch player profiles from selected titles 
async function fetchPlayerProfilesForSelectedTitles() {

    // get data from checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    // titled player container 
    const  titledPlayersContainer = document.getElementById('titled-player-profiles');
    // selected country 
    const selectedCounty = document.getElementById('titled-player-selected-countries').value;
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

            // Extracting the country code: 
            const countryUrl = titledPlayerProfile.country; // returns a string (country url) 
            const countryCode = extractPlayerCountryCode(countryUrl); // extract the country code form url
            const playerCountry = await fetchPlayerCountry(countryCode);

            // filtering the country data by using 'continue' if the expression returns false 
            if (selectedCounty !== 'all' && countryCode !== selectedCounty) continue; 

            // create aa title player div 
            const titledPlayerProfileDiv = createTitlePlayerDiv(titledPlayerProfile, playerCountry);
            // append title player div to parent div 
            titledPlayersContainer.appendChild(titledPlayerProfileDiv);    
    }
    }
}

// div to display title player data 
function createTitlePlayerDiv(profile, country) {

     // styling the div
    const titledPlayerProfileDiv = document.createElement('div');
    titledPlayerProfileDiv.style.border = '1px solid #ddd';
    titledPlayerProfileDiv.style.borderRadius = '10px';
    titledPlayerProfileDiv.style.backgroundColor = "rgb(255, 193, 150";
    titledPlayerProfileDiv.style.padding = '10px';
    titledPlayerProfileDiv.style.margin = '5px';
    
    // check if player is a streamer 
    // if so, then a link to the players streaming channel will be displayed 
    // else display player is not a stereamer 
    const isStreamer = profile.is_streamer; // returns true or false
    let streamerMessage;
    if (isStreamer) {
         streamerMessage = `<p><strong>Streaming Platform:</strong> <a href="${profile.twitch_url}" target="_blank">Twitch</a></p>`;
    } else {
         streamerMessage = `<p>Not a Streamer</p>`;
    }
   
        titledPlayerProfileDiv.innerHTML = `
             <img src="${profile.avatar}" alt="${profile.username}" style="width: 150px; height: 150px;">
             <p><strong>Player Name:</strong> ${profile.name}</p>
             <p><strong>Username:</strong> ${profile.username}</p>
             <p><strong>Title:</strong> ${profile.title}</p>
             <p><strong>Country:</strong> ${country}</p>
             ${streamerMessage}
         `;
         return titledPlayerProfileDiv;

}

//------------------------ Leaderboard Functions  -------------------------------

// fetch the leaderboard data 
async function fetchLeaderboards() {
    
    try {
        const response = await fetch('https://api.chess.com/pub/leaderboards');
        if (!response.ok) {
            throw new Error(`EHTTP Error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
    
}

// div to display leaderboard data 
function createLeaderboardDiv(player, playerStats, country, gameType) {

     // styling the div
    const leaderboardDiv = document.createElement('div');
    leaderboardDiv.style.border = '1px solid #ddd';
    leaderboardDiv.style.backgroundColor = "rgb(255, 193, 150";
    leaderboardDiv.style.borderRadius = '10px';
    leaderboardDiv.style.padding = '10px';
    leaderboardDiv.style.margin = '5px';
    
       leaderboardDiv.innerHTML = `
               <h3>${gameType}</h3>
               <p><strong>Rank:</strong> ${player.rank}</p>
               <img src="${player.avatar}" alt="${player.username}" style="width: 200px; height: 200px;">
               <p><strong>Player Name:</strong> ${player.name}</p>
               <p><strong>Username:</strong> ${player.username}</p>
               <p><strong>Score:</strong> ${player.score}</p>
               <p><strong>Title:</strong> ${player.title}</p>
               <p><strong>Country:</strong> ${country}</p>
               <p><strong>Current Rating:</strong> ${playerStats.chess_blitz.last.rating}</p>
               <p><strong>Best Rating:</strong> ${playerStats.chess_blitz.best.rating}</p>
               <p><strong>Total Wins:</strong> ${playerStats.chess_blitz.record.win}</p>
               <p><strong>Total Losses:</strong> ${playerStats.chess_blitz.record.loss}</p>
               <p><strong>Total Draws:</strong> ${playerStats.chess_blitz.record.draw}</p>
             
   `;
return leaderboardDiv; 
     
} 

// fetch filtered leaderboard data 
async function fetchFilteredLeaderboards() {
    // create a leaderboard div container 
    const  leaderboardContainer = document.getElementById('leaderboards');

    // get leaderboard games form dropdown menu 
    const selectedGame = document.getElementById('leaderboard-games-filter').value;

    // get leaderboard countries from dropdown menu 
    //const leaderboardSelectedCountries = document.getElementById('leaderboard-country-filter').value;
    
    leaderboardContainer.innerHTML = ''; 
    
    // fetch the leaderboard data 
    const leaderboardsResponse = await fetchLeaderboards();
    
   // filter leaderboards by game type 
   const dailyLeaderboard = leaderboardsResponse.daily; 
   const blitzLeaderboard = leaderboardsResponse.live_blitz;
   const bulletLeaderboard = leaderboardsResponse.live_bullet;
   const rapidLeaderboard = leaderboardsResponse.live_rapid; 

   //console.log(blitzLeaderboard);

    let currentLeaderboard;
    let gameName;
        
    // checks which game was selected
        // assigns gameName to the name of the game 
        // assings currentLeaderboard to the leaderboard choosen game 
        if (selectedGame === 'chess_daily') {
            currentLeaderboard = dailyLeaderboard;
            gameName = 'Chess Daily';
        } else if (selectedGame === 'live_blitz') {
            currentLeaderboard = blitzLeaderboard;
            gameName = 'Blitz'
        } else if (selectedGame === 'live_bullet') {
            currentLeaderboard = bulletLeaderboard;
            gameName = 'Bullet'
        } else if (selectedGame === 'live_rapid') {
            currentLeaderboard = rapidLeaderboard;
            gameName = 'Rapid'
        }

    // loop though leaderboards 
    for (player of currentLeaderboard) {

        // fetch player stats 
        const playerStats = await fetchPlayerStats(player.username);
    
       
        // extracting the country code: 
        const countryUrl = player.country; // returns a string (country url) 
        const countryCode = extractPlayerCountryCode(countryUrl); // extract the country code form url
        //fetch the country name 
        const playerCountry = await fetchPlayerCountry(countryCode);

        // create div and append to parent 
        const leaderboardDiv = createLeaderboardDiv(player, playerStats, playerCountry, gameType);
        leaderboardContainer.appendChild(leaderboardDiv);
    }
}

//---------------------- Live Streamers Functinos ------------------------------

// fetch streames 
async function fetchStreamers() {
        try {
            const response = await fetch('https://api.chess.com/pub/streamers');
            if (!response.ok) {
                throw new Error(`EHTTP Error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
}

// fiilter streamers by titles and countries 
async function fetchSelectedLiveStreamers() {
     // create a streamer div container 
     const  liveStreamerContainer = document.getElementById('streamer-container');
    
     // get leaderboard countries from dropdown menu 
     const streamerSelectedCountries = document.getElementById('streamer-country-filter').value;
 
     liveStreamerContainer.innerHTML = ''; 

     const streamerResponse = await fetchStreamers();
     console.log(streamerResponse);

     const streamers = streamerResponse.streamers;

    // console.log(streamers);

     let liveStream =``;
     let streamerCountry = ``;

     for (const streamer of streamers) {

        // returns a boolean true if streamer is live 
         const isLive = streamer.is_live;

         if (!isLive) continue; // if a streamer is not live then skip to next iteration 

         // get streamer platforms (an array)
         const streamerPlatforms = streamer.platforms;

        // loop through each streamers playforms 
        // assign the liveSteam variable to the live stream url 
         for (const platform of streamerPlatforms) {
            console.log(platform.stream_url)
            liveStream = platform.stream_url;
         }

            streamerProfile = await fetchPlayerProfile(streamer.username)
            // fetch streamer country 
            // Extracting the country code: 
            const countryUrl = streamerProfile.country; // returns a string (country url) 
            const countryCode = extractPlayerCountryCode(countryUrl); // extract the country code form url
            // fetch the country name 
            streamerCountry = await fetchPlayerCountry(countryCode);

    
            // filtering the country data by using 'continue' if the expression returns false 
            if (streamerSelectedCountries !== 'all' && countryCode !== streamerSelectedCountries) continue; 
    // create div and append
    const liveStreamerDiV = createLiveStreamerDiv(streamerProfile, streamerCountry, liveStream);
    liveStreamerContainer.appendChild(liveStreamerDiV);

     }
}

// create div to hold and display live streamer data 
function createLiveStreamerDiv(profile, country, liveStream) {

    const liveStreamerDiv = document.createElement('div');
    liveStreamerDiv.style.border = '2px solid #ddd';
    liveStreamerDiv.style.backgroundColor = "rgb(255, 193, 150";
    liveStreamerDiv.style.borderRadius = '10px';
    liveStreamerDiv.style.padding = '10px';
    liveStreamerDiv.style.margin = '5px';

        liveStreamerDiv.innerHTML = `
        <img src="${profile.avatar}" alt="${profile.username}" style="width: 200px; height: 200px;">
    
        <p><strong>Username:</strong> ${profile.username}</p>
        <p><strong>Title:</strong> ${profile.title}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Watch Live Stream:</strong> <a href="${liveStream}" target="_blank">Twitch</a></p>
     `;
     return liveStreamerDiv; 
}
//------------------------ Helper Function ------------------------------------

// extract country code from string url 

function extractPlayerCountryCode(countryUrl) { 
    return countryUrl.split("/").pop();  
}




