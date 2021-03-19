function getData(url) {
	return fetch(url, {
		method: 'GET'
	}).then(response => {
		if (!response.ok) {
			throw response;
		}
		return response;
	});
}

getData('http://localhost:4000/api/users/allUsers')
	.then(results => results.json())
	.then(res => {
		const app = document.getElementById('root');
		const html = res.map(curr => {
			return `<p>${curr.name}</p>`;
		});
		app.innerHTML = html;
	});
