const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let data = JSON.parse(localStorage.getItem('items'));
console.log(data[id - 1]);

let comic = document.getElementById('comic');
comic.innerHTML = data[id - 1].content;

let comic_image = document.getElementById('comic-image');
comic_image.src = data[id - 1].image;