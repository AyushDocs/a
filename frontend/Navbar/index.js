/** @format */

const hamburger = document.querySelector('.hamburger');
const list = document.querySelector('.nav-list');
console.log('in component');
hamburger.addEventListener('click', e => {
	hamburger.classList.toggle('active');
	list.classList.toggle('active');
});
