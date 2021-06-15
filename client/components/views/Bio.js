import { default as Card } from '../utils/Card/Card';

export default (st) => {
	console.log(st, 'LOOK AT ME STATE');
	return `
	<section id="bio">
		<h2>Vivamus ac justo eu nisi</h2>
		<img
			src="https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
			alt="me"
		/>
        <div class="flex alignCenter flexRow">
		${
			st.listOfSWChars.length > 0 &&
			st.listOfSWChars
				.map((curr) => {
					return Card(curr, 'name', 'hair_color');
				})
				.join('')
		}
        ${
			st.danteStuff.length > 0 &&
			st.danteStuff
				.map((curr) => {
					return Card(curr, 'id', 'body');
				})
				.join()
		}
        </div>
		<a href="http://localhost:1234/Bio">im a clickable link</a>

	</section>
`;
};