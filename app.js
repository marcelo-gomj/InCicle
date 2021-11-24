const query = (ele) => document.querySelector(ele)
    , queryAll = (ele) => document.querySelectAll(ele);

const boxPost = query('.posts');

// get the informations of /data.json
async function getPosts(){
    const data = await fetch('/data.json');
    if(data.ok){
        return data.json();
    }else{
        alert('Erro ao encontrar os dados')
    }
}

// create posts card
async function addMainPosts(){
    const posts = await getPosts();
    posts.data.map((item, index) => createCard(item, index));
}

function getTypePost(type) {
    switch(type){
        case 'release':
            return 'Publicado';
        case 'event':
            return 'Evento';
        default:
            return 'Sem Tipo';
    }
}

// Verify invited people
function getMoreDetails(info) {
    const convited = info.invited_people;
    if(convited){
        const confirmed = convited.filter(people => people.confirmed);
        return `${confirmed.length} CONFIRMAÇÕES DE ${convited.length}`;
    }else{
        return '';
    }
}

// Add elements in DOM
function createCard(item, setindex) {
    const div = document.createElement('article')
        , title = item.title
        , postType = item.type;
    const elements = [
        `<img src="${item.files[0].file}" alt="${title}">`,
        `<div><h3>${title}</h3>`,
        `<div>
            <span class="${postType}">${getTypePost(postType)}</span>
            <span>${item.date}</span>
            <span class="post-confirms">${getMoreDetails(item.common)}</span>
        </div>`,
        `<p>${item.description}</p></div>`
    ];

    div.innerHTML = elements.join('');
    div.tabIndex = setindex + 1;
    div.setAttribute('role', 'article')
    boxPost.appendChild(div);
}

addMainPosts();

// Add buttons actions
const btnAbout = query('.bar-about button');
function hideAbout(e){
    const boxAbout = e.target.parentElement;
    boxAbout.style.display = 'none';
    boxAbout.style.ariaHidden = 'false';
}

btnAbout.addEventListener('click', hideAbout)

const list = query('.type-list');
(function() {
    const btnSort = query('.btn-sort')
    btnSort.addEventListener('click', () =>{
        list.classList.toggle('hidden-list');
    })
    
    list.addEventListener('click', () =>{
        list.classList.remove('hidden-list')
    })
}())