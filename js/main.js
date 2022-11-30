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

function createSingleComment(params) {}

async function createComments() {
	const commentsInformations = await getResponse();

	for (const commentInfo of commentsInformations) {
		const comment = document.createElement("div");
		comment.classList.add("card");
		cardsSection.append(comment);
		comment.innerHTML = `
		 <div class="card">

		<div class="card-top">
		  <div class="card-top__img">
			<img src="./images/avatars/image-amyrobson.png" alt="">
		  </div>
		  <p class="card-top__username">amyrobson</p>
		  <p class="card-top__time">1 month ago</p>
		</div>

		<p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem error atque
		  voluptates at esse. Excepturi suscipit beatae fugit velit nesciunt ea earum, repellendus dolor aperiam.
		</p>

		<div class="card-bottom">
		  <div class="card-bottom__votes">
			<button class="card-bottom__votes--plus"><img src="./images/icon-plus.svg" alt=""></button>
			<p class="card-bottom__votes-amount">12</p>
			<button class="card-bottom__votes--minus"><img src="./images/icon-minus.svg" alt=""></button>
		  </div>

		  <button class="card-bottom__reply">
			<span class="card-bottom__reply-icon"><img src="./images/icon-reply.svg" alt=""></span>
			<p class="card-bottom__reply-text">Reply</p>
		  </button>
		</div>

	  </div>

		`;
	}
}

createComments();
