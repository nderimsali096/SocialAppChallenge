'use strict'

// Fetching data from data.json file

async function getPosts() {
    let url = '/data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
let index = 0;

async function renderPosts() {
    let posts = await getPosts();
    let html = '';
    let counter = 0;
    for (let i = index;i < posts.length;i++){
        if (i === 3) {
            if (counter === 3) {
                break
            }
        } else {
            if (counter === 4) {
                break
            }
        }
        let htmlSegment = `<div class="post">
        <header class="header">
            <div class="header--info">
                <img 
                    class="avatar" src="${posts[i].profile_image}" 
                />
                <div class="header--name">
                    <p class="name"><strong>${posts[i].name}</strong></p>
                    <p class="date">15 oct 2019</p>
                </div>
            </div>
            <div>
                <img src="/assets/icons/instagram-logo.svg" alt="insta svg icon"/>
            </div>
        </header>
        <div class="post_image-container">
            <img 
                src="${posts[i].image}"
            />
        </div>
        <div class="post__content">
            <div class="post__description">
                <p class="description">
                   ${posts[i].caption}
                </p>
            </div>
            <hr class="line-tag">
            <div class="notifications">
                <img src="/assets/icons/heart.svg" alt="insta svg icon"/>
                <p class="likes">${posts[i].likes}</p>                        
            </div>
        </div>
        </div>`;
        html += htmlSegment;
        index++;
        counter++;
    }
    let container = document.getElementById('posts');
    container.innerHTML += html;
    if (index === posts.length) {
        buttonLoad.style.display = "none";
    }
    
}

renderPosts();

let buttonLoad = document.getElementById('btn');

buttonLoad.addEventListener('click', () => {
    renderPosts();
})