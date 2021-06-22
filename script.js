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
        if (counter === 4) {
            break
        }
        let htmlSegment = `<div id="postClicked" class="post">
        <header id="postClicked" class="header">
            <div id="postClicked" class="header--info">
                <img id="postClicked" 
                    class="avatar" src="${posts[i].profile_image}" 
                />
                <div id="postClicked" class="header--name">
                    <p id="postClicked" class="name"><strong>${posts[i].name}</strong></p>
                    <p id="postClicked" class="date">15 oct 2019</p>
                </div>
            </div>
            <div>
                <img id="postClicked" src="/assets/icons/instagram-logo.svg" alt="insta svg icon"/>
            </div>
        </header>
        <div id="postClicked" class="post_image-container">
            <img id="postClicked" 
                src="${posts[i].image}"
            />
        </div>
        <div id="postClicked" class="post__content">
            <div id="postClicked" class="post__description">
                <p id="postClicked" class="description">
                   ${posts[i].caption}
                </p>
            </div>
            <hr class="line-tag">
            <div id="postClicked" class="notifications">
                <img id="postClicked" src="/assets/icons/heart.svg" alt="insta svg icon"/>
                <p id="postClicked" class="likes">${posts[i].likes}</p>                        
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
    if (index > 4) {
        window.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: 'smooth',
        })
    }
}

renderPosts();

let buttonLoad = document.getElementById('btn');

buttonLoad.addEventListener('click', () => {
    renderPosts();
})

document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id === 'postClicked' ) {
      
    };
  } );