/* eslint-disable prettier/prettier */
import { Header, Nav, Main, Footer } from './components';
import * as state from '../store';
import Navigo from 'navigo';
import axios from 'axios';

const router = new Navigo(window.location.origin);
router
	.on({
		':page': params => {
			render(state[params.page]);
		},
		'/': () => render(state.Home)
	})
	.resolve();

axios
	.get('http://localhost:4000/api/users/allUsers')
	.then(res => (state.UserInfo.user = res.data[1]))
	.catch(err => console.log(err, 'error on allUsers get'));

axios
	.get('https://jsonplaceholder.typicode.com/posts')
	.then(response => {
		response.data.forEach(post => {
			state.Blog.posts.push(post);
		});
		const params = router.lastRouteResolved().params;
		if (params) {
			render(state[params.page]);
		}
	})
	.catch(err => console.log(err));

function render(st = state.Home) {
	// console.log("rendering state", st);
	// console.log("state.Blog", state.Blog);
	document.querySelector('#root').innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;

	router.updatePageLinks();
	addNavEventListeners();
	addPicOnFormSubmit(st);
	if (st.view === 'Home') {
		const submitButton = document.getElementById('submitButton');
		submitButton.addEventListener('click', e => {
			const email = document.getElementById('email').value;
			if (email) {
				axios
					.put('http://localhost:4000/api/users/test', { email })
					.then(res => console.log(res))
					.catch(err => console.log(err));
			}
		});
	}
}

function addNavEventListeners() {
	// add menu toggle to bars icon in nav bar
	document.querySelector('.fa-bars').addEventListener('click', () => document.querySelector('nav > ul').classList.toggle('hidden--mobile'));
}

function addPicOnFormSubmit(st) {
	if (st.view === 'Form') {
		document.querySelector('form').addEventListener('submit', event => {
			event.preventDefault();
			// convert HTML elements to Array
			let inputList = Array.from(event.target.elements);
			// remove submit button from list
			inputList.pop();
			// construct new picture object
			let newPic = inputList.reduce((pictureObject, input) => {
				pictureObject[input.name] = input.value;
				return pictureObject;
			}, {});
			// add new picture to state.Gallery.pictures
			state.Gallery.pictures.push(newPic);
			render(state.Gallery);
		});
	}
}
