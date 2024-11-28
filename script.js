
/*
Breaking the problem down into parts: 

1. Player stats 

Endpoints: 

const statsUrl = `https://api.chess.com/pub/player/${userName}/stats`;

Requirements: 

Inputs: 


Outputs: 


Clarifying questions: 

Examples: 




Functions: 

fetchPlayerUsername()
fetchPlayerStats()
renderPlayerStats()



==================================
2. Player titles 

Endpoints: 

const userName = `garyleddy`;

const url = `https://api.chess.com/pub/player/${userName}`; 

const users = ['hikaru', 'garyleddy']; // array to store user names 

Requirements: 

Inputs: 


Outputs: 


Clarifying questions: 

Examples: 




Functions: 

fetchPlayerTitles()
fetchPlayerUsername()
renderPlayerProfiles()



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
        //await fetchPlayerTitles();
        //await fetchPlayerProfiles();
      //await fetchLeaderboards();
    } catch (error) {
        console.error('Oops, an error occured', error);
    }
});


// async function to fetch player titles 
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
/*
async function fetchLeaderboards()
{
    
    const url = `https://api.chess.com/pub/leaderboards`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching Player for ${title}: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.daily[0].username);
        } catch (error) {
            console.error(error);
            //return null;
        }

}

    const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            const p = document.createElement('p');
            p.textContent = `${movie.description.substring(0, 300)}...`;

            const director = document.createElement('p');
            director.textContent = 'Director: ' + movie.director;

            const movImg = document.createElement('img');
            movImg.setAttribute('src', movie.image);
            movImg.setAttribute('width', '200px');
            movImg.setAttribute('height', '350px');

            card.appendChild(h1);
            card.appendChild(p);
            card.appendChild(director);
            card.appendChild(movImg);
            container.appendChild(card);
*/
async function fetchLeaderboards() {
    //const card = document.createElement('div');
        //card.setAttribute('class', 'card');
        const leaderboardContainer = document.getElementById('leaderboards');
        try {
            const response = await fetch('https://api.chess.com/pub/leaderboards');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
        
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


// add an event listener 
//document.getElementById('get-player-profiles').addEventListener('click', fetchPlayerProfiles)

/**
 * Fetch movie data and display each movie in a card format.
 * Uses async/await for a cleaner asynchronous flow.
 */
async function fetchPlayerProfiles() {
    try {
      //const response = await fetch(`https://api.chess.com/pub/player/garyleddy`);
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