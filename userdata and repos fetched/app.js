// const serachbox = document.querySelector('.serachbox');   //html theke class name
const search_input = document.querySelector('.search_input'); //html theke class name
const wrapper = document.querySelector('.wrapper'); //html theke class name

let url = "https://api.github.com/users/";  //github api url

function userdata(username) {        //function to get user data
    fetch(url + username)           //fetching data from api
        .then(response => {
            if(response.ok){            //if response is ok then data return korbe json format e
                return response.json();
            }else{
                throw new Error('User not found');
            }
        })
        .then(data => {             //data pawa gele nicher code run hobe
        // console.log(data);           // ki ki data paisi ta console e dekhabe
        let output = `              //template literal use kore data gulo ke html e display korano hocche
        <div class="usercard">
            <div class="profilepic">
                <img src="${data.avatar_url}" alt="">
            </div>
            <div class="userinfo">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul>
                    <li>${data.followers} Followers</li>
                    <li>${data.following} Following</li>
                    <li>${data.public_repos} Repos</li>
                </ul>
            </div>
            <div class="repo">

            </div>
        </div>`; 
        wrapper.innerHTML = output;             //wrapper er moddhe output ta ke set kore dibe
        })
        .catch(error => {
        wrapper.innerHTML = 'Something went Wrong :) <br> Error: ' + error
    })
    }

    function repos(username) {                  //function to get user repos
    fetch(url + username + '/repos')        //fetching repos data from api
        .then(response => {                 
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Repos not found');
            }
        })
        .then(data => {                     //data pawa gele nicher code run hobe
            // console.log(data);           // ki ki data paisi ta console e dekhabe
            let repo = ''           //empty string declare kore nicher loop e data gulo ke append korbo
            for(let i = 0; i <data.length; i++){                            //for use kore loop calabo length porjonto
                repo += `<a href="${data[i].html_url}" target="_blank">${data[i].name}</a>`             //template literal use kore data gulo ke html e display korano hocche, '=+' use koresi jate kore length porjonto sob gulo data ke append kore
            }
            document.querySelector('.repo').innerHTML = repo                                //repo class er moddhe repo gulo ke set kore dibe
        })
        .catch(error => {
        wrapper.innerHTML = 'Something went Wrong :) <br> Error: ' + error
        })
    }



serachbox.addEventListener('submit', (e) => {                   //event listener use kore form submit hole nicher code run hobe
    e.preventDefault();
    userdata(search_input.value);                       //userdata function call kore input value 'username' pass korano hocche
    repos(search_input.value);                              //repos function call kore input value 'username' pass korano hocche
    })

