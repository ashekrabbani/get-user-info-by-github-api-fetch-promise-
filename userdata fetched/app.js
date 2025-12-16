const serachbox = document.querySelector('.serachbox');
const search_input = document.querySelector('.search_input');
const wrapper = document.querySelector('.wrapper');

let url = "https://api.github.com/users/";

function userdata(username) {
    fetch(url + username)
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('User not found');
            }
        })
        .then(data => {
        let output = `
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
        </div>`; 
        wrapper.innerHTML = output;
        })
    }




serachbox.addEventListener('submit', (e) => {
    e.preventDefault();
    userdata(search_input.value);
    })

