export default (dataToAccess, headingProperty, bodyProperty) => {
	return `
    <div class="cardContainer">
        <h3>${dataToAccess[headingProperty]}</h3>
        <small>
            <b>${dataToAccess[bodyProperty]}</b>
        </small>
    </div>
    `;
};
