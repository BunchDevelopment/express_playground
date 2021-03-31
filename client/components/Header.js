import { UserInfo } from '../../store';

export default st => `
<header>
<div id="headerContainer">
  <h1>Example SPA: ${st.header}</h1>${UserInfo.user ? `<h4 id='user'>${UserInfo.user.name}</h4>` : `<div>Sign In</div>`}
  </div>
</header>
`;
