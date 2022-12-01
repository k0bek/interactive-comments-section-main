const cardsSection = document.querySelector(".cards");

const fetchJSON = async function () {
	const JSON_URL = "./data.json";

	return fetch(JSON_URL)
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
				return response.json().then((error) => {
					throw new Error("We cannot connect now. Try later");
				});
			}
		})
		.catch((error) => {
			throw new Error("We cannot connect now. Try later");
		});
};

async function getResponse() {
	const fetchedJSON = await fetchJSON();
	const { currentUser, comments } = fetchedJSON;

	return currentUser, comments;
}

// async function initializeComments() {
// 	const commentsInformations = await getResponse();

// 	for (const commentInfo of commentsInformations) {
// 		const comment = document.createElement("div");
// 		comment.classList.add("card");
// 		cardsSection.append(comment);
// 		comment.innerHTML = `
// 		<div class="card__votes desktop">
// 		<button class="card__votes--plus"><img src="./images/icon-plus.svg" alt=""></button>
// 		<p class="card__votes-amount">12</p>
// 		<button class="card__votes--minus"><img src="./images/icon-minus.svg" alt=""></button>
// 	  </div>

// 	  <div class="card-content">
// 		<div class="card-top">
// 		  <div class="card-top__img">
// 			<img src="./images/avatars/image-amyrobson.png" alt="">
// 		  </div>
// 		  <p class="card-top__username">amyrobson</p>
// 		  <p class="card-top__time">1 month ago</p>
// 		</div>

// 		<p class="card-text">${commentInfo.content}
// 		</p>

// 		<div class="card-bottom">
// 		  <div class="card__votes mobile">
// 			<button class="card__votes--plus"><img src="./images/icon-plus.svg" alt=""></button>
// 			<p class="card__votes-amount">12</p>
// 			<button class="card__votes--minus"><img src="./images/icon-minus.svg" alt=""></button>
// 		  </div>

// 		  <button class="card-bottom__reply">
// 			<span class="card-bottom__reply-icon"><img src="./images/icon-reply.svg" alt=""></span>
// 			<p class="card-bottom__reply-text">Reply</p>
// 		  </button>
// 		</div>
// 	  </div>

// 		`;

// 		const commentInfoArr = commentInfo.replies;

// 		if (commentInfoArr.length !== 0) {
// 			console.log(commentInfoArr);
// 		}
// 	}
// }

initializeComments();
