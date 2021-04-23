import { default as dataToCard } from '../Card';

export default (st) => `
<section id="bio">
  <h2>Vivamus ac justo eu nisi</h2>
  <img src="https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="me">
  ${
		st.listOfSWChars &&
		st.listOfSWChars.map((curr) => {
			return `<p class="swChar">${curr.name}</p>`;
		})
  }
  <a href="http://localhost:1234/Bio">im a clickable link</a>
  <iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyDHnJ0lEiymL0Whvmh24P6hgBwVyZz5XQs
  &q=foodbank+near+63122">
</iframe>
</section>
`;
