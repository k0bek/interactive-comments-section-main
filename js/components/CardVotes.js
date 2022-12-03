export const CardVotes = (children = "", platform = "desktop") => {
	return `<div class="card__votes ${platform}">${children}</div>`;
};

{
	/* <button class="card__votes--plus"><img src="./images/icon-plus.svg" alt=""></button>
    <p class="card__votes-amount">12</p>
    <button class="card__votes--minus"><img src="./images/icon-minus.svg" alt=""></button> */
}
