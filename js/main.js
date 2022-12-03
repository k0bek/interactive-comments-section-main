import { Button } from "./components/Button.js";
import { CardVotesAmount } from "./components/CardVotesAmount.js";
import { ParagraphText } from "./components/CardText.js";
import { Image } from "./components/Image.js";

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

async function initializeComments() {
	const commentsInformations = await getResponse();

	for (const commentInfo of commentsInformations) {
		const comment = document.createElement("div");
		comment.classList.add("card");
		comment.id = commentInfo.id;
		cardsSection.append(comment);
		comment.innerHTML = `
		<div class="card__votes desktop">

		${Button("./images/icon-plus.svg", "card__votes--plus")}
		
          ${CardVotesAmount(commentInfo.score)}
          ${Button("./images/icon-minus.svg", "card__votes--minus")}
        </div>

        <div class="card-content">
          <div class="card-top">
            <div class="card-top__img">
              ${Image(commentInfo.user.image.png)}
            </div>
            ${ParagraphText("card-top__username", commentInfo.user.username)}
            ${ParagraphText("card-top__time", commentInfo.createdAt)}
          </div>

          ${ParagraphText("card-text", commentInfo.content)}
          

          <div class="card-bottom">
            <div class="card__votes mobile">
			${Button("./images/icon-plus.svg", "card__votes--plus")}
			  ${CardVotesAmount(commentInfo.score)}
			  ${Button("./images/icon-minus.svg", "card__votes--minus")}

            </div>

            ${Button(
							"./images/icon-reply.svg",
							"card-bottom__reply",
							ParagraphText("card-bottom__reply-text", "Reply")
						)}
          </div>
        </div>

		`;

		const commentInfoReplies = commentInfo.replies;

		if (commentInfoReplies.length !== 0) {
			return commentInfoReplies;
		}
	}
}

const initializeRepliesComments = async function () {
	const initialized = await initializeComments();
	console.log(initialized);
};

initializeRepliesComments();
