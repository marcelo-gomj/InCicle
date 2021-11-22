const query = (ele) => document.querySelector(ele)
    , queryAll = (ele) => document.querySelectAll(ele);

const boxPost = query('.posts');

async function getPosts(){
    const data = await fetch('/data.json');
    if(data.ok) return data.json();
}

async function addMainPosts(){
    const posts = await getPosts();
    console.log(posts)
    posts.data.map(item => createCard(item));
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

function getMoreDetails(info) {
    const convited = info.invited_people
    if(convited){
        const confirmed = convited.filter(people => people.confirmed);
        return `${confirmed.length} CONFIRMACÕES DE ${convited.length}`;
    }else{
        return '';
    }
}

function createCard(item){
    const div = document.createElement('div');
    const elements = [
        `<img src="${item.files[0].file}">`,
        `<div><h3>${item.title}</h3>`,
        `<div>
            <span class="${item.type}">${getTypePost(item.type)}</span>
            <span>${item.date}</span>
            <span class="post-confirms">${getMoreDetails(item.common)}</span>
        </div>`,
        `<p>${item.description}</p></div>`
    ];

    div.innerHTML = elements.join('');
    boxPost.appendChild(div);
}

addMainPosts();

const btnAbout = query('.bar-about button');
function hideAbout(e){
    e.target.parentElement.style.display = 'none';
}
btnAbout.addEventListener('click', hideAbout)


const list = query('.type-list');

(function() {
    const btnSort = query('.btn-sort')
    btnSort.addEventListener('click', (e) =>{
        list.classList.toggle('hidden-list');
    })
    
    list.addEventListener('click', () =>{
        list.classList.remove('hidden-list')
    })
}())



