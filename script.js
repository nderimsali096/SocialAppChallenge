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
let postObject = {}


async function renderPosts() {
    let posts = await getPosts();
    Object.assign(postObject, posts[0])
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
                    <p id="postClicked" class="date">${posts[i].date}</p>
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
        showModal();
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };
  });

  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.close-modal');
  
  
  const closeTheModal = function () {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
  }

  function showModal() {
    let html = `<div class="inner-modal">
    <img class="img-modal" src="${postObject.image}" />
        <div class="left-side">
            <header class="header-modal">
                <div class="header--info-modal">
                    <img 
                        class="avatar" src="${postObject.profile_image}" 
                    />
                    <div class="header--name">
                        <p class="name"><strong>${postObject.name}</strong></p>
                        <p class="date">${postObject.date}</p>
                    </div>
                </div>
                <div>
                    <img src="/assets/icons/instagram-logo.svg" alt="insta svg icon"/>
                </div>
            </header>
            <div class="post__content">
                <hr class="line-tag">
                <div class="post__description">
                    <p class="description">
                        ${postObject.caption}
                    </p>
                </div>
                <div class="notifications">
                    <img src="/assets/icons/heart.svg" alt="insta svg icon"/>
                    <p class="likes">${postObject.likes}</p>                        
                </div>
            </div>
        </div>
    </div>`;
    let modalContainer = document.getElementById('modal');
    modalContainer.innerHTML = html;
  }

  
  btnCloseModal.addEventListener('click',closeTheModal);
  overlay.addEventListener('click',closeTheModal);
  
  document.addEventListener('keydown',function(event){
      if(event.key === 'Escape'){
          if(!modal.classList.contains('hidden')){
              closeTheModal();
          }
      }
  });