/* eslint-disable prettier/prettier */
import { Header, Nav, Main, Footer } from './components';
import * as state from '../store';
import Navigo from 'navigo';
import axios from 'axios';
import '../env';

const router = new Navigo(window.location.origin);
router.hooks({
	before: (done, params) => {
		const view = params && params.hasOwnProperty('view') ? params.view : 'Home';
		if (view === 'Bio') {
			Promise.all([axios.get('https://swapi.dev/api/people'), axios.get('https://dante-ipsum.herokuapp.com/list_passages')])
				.then(([swapiData, danteData]) => {
					console.log(danteData);
					state.Bio.listOfSWChars = swapiData.data.results;
					state.Bio.danteStuff = danteData.data;
					done();
				})
				.catch((err) => console.log(err));
		} else {
			done();
		}
	}
});

router
	.on({
		':view': (params) => {
			render(state[params.view]);
		},
		'/': () => render(state.Home)
	})
	.resolve();

function addBioEventListeners(st) {
	if (st.view === 'Bio') {
		//add event listener hear
	}
}

function addNavEventListeners() {
	// add menu toggle to bars icon in nav bar
	document.querySelector('.fa-bars').addEventListener('click', () => document.querySelector('nav > ul').classList.toggle('hidden--mobile'));
}

function addPicOnFormSubmit(st) {
	if (st.view === 'Form') {
		document.querySelector('form').addEventListener('submit', (event) => {
			event.preventDefault();
			// convert HTML elements to Array
			let inputList = Array.from(event.target.elements);
			// remove submit button from list
			inputList.pop();
			// construct new picture object
			// let newPic = inputList.reduce((pictureObject, input) => {
			// 	pictureObject[input.name] = input.value;
			// 	return pictureObject;
			// }, {});
			// add new picture to state.Gallery.pictures
			state.Gallery.pictures.push(newPic);
			render(state.Gallery);
		});
	}
}

function render(st = state.Home) {
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
		submitButton.addEventListener('click', (e) => {
			const email = document.getElementById('email').value;
			console.log(e);
			// const passwordbutton = document.getElementById('password').value;
			// const name = document.getElementById('name').value;
			// if (email) {
			// 	axios
			// 		.put('http://localhost:4000/api/users/test', { email, password })
			// 		.then((res) => console.log(res))
			// 		.catch((err) => console.log(err));
			// }
		});
	}
	addBioEventListeners(st);
}

let inputValue;
const clickHistory = [];

const myInput = document.getElementById('myInput');
myInput.addEventListener('input', () => {
	inputValue = myInput.value;
});
const myTarget = document.querySelectorAll('#targetMe > li');
myTarget.forEach((curr, ind) => {
	curr.addEventListener('click', () => {
		clickHistory.push(curr.textContent);
		if (clickHistory.length > 5) {
			console.log(clickHistory);
		}
	});
});
