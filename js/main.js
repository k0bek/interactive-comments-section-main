import { Button } from "./components/Button.js";
import { CardVotesAmount } from "./components/CardVotesAmount.js";
import { ParagraphText } from "./components/CardText.js";
import { Image } from "./components/Image.js";

const cardsSection = document.querySelector(".cards");
const cardAddBtn = document.querySelector(".card-add");

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

function initializeCommentsInner(commentInfo, addnotation = "") {
	const createdComment = `
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
			${addYouSpanToOwnComment(commentInfo.user.username)}
            ${ParagraphText("card-top__time", commentInfo.createdAt)}
          </div>

          ${ParagraphText("card-text", addnotation + commentInfo.content)}
          

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

	return createdComment;
}

async function initializeComments() {
	const commentsInformations = await getResponse();

	for (const commentInfo of commentsInformations) {
		const comment = document.createElement("div");
		comment.classList.add("card");
		comment.id = commentInfo.id;
		cardsSection.append(comment);
		comment.innerHTML = `
		${initializeCommentsInner(commentInfo)}
		`;

		const commentInfoReplies = commentInfo.replies;

		if (commentInfoReplies.length !== 0) {
			return commentInfoReplies;
		}
	}
}

function initializeCreatedComment(commentInfo) {
	const comment = document.createElement("div");
	comment.classList.add("card");
	comment.id = commentInfo.id;
	cardsSection.append(comment);
	comment.innerHTML = `
		${initializeCommentsInner(commentInfo)}
		`;
}

async function initializeRepliesComments() {
	const replyComments = await initializeComments();

	const answersSection = document.createElement("div");
	answersSection.className = "answers";
	cardsSection.append(answersSection);

	for (const replyComment of replyComments) {
		const comment = document.createElement("div");
		comment.className = "card card-answer";
		comment.id = replyComment.id;
		comment.dataset.type = "reply";
		answersSection.append(comment);
		const replyingTo = `<span class="card-text-span">@${replyComment.replyingTo}</span> `;
		comment.innerHTML = `
		${initializeCommentsInner(replyComment, replyingTo)}
		`;

		if (replyComment.user.username === "juliusomo") {
			initializeOwnComment(comment);
		}
	}
}

function initializeOwnComment(comment) {
	const cardBottomReply = comment.querySelector(".card-bottom__reply");

	cardBottomReply.innerHTML = `
	<span class="card-bottom__delete-icon"><img src="./images/icon-delete.svg" alt=""></span>
              <p class="card-bottom__delete-text">Delete</p>
              <span class="card-bottom__reply-icon"><img src="./images/icon-edit.svg" alt=""></span>
              <p class="card-bottom__reply-text">Edit</p>
	`;
}

function addYouSpanToOwnComment(username) {
	if (username === "juliusomo") {
		return `
		<span class="card-top__you">you</span>
		`;
	} else {
		return "";
	}
}

function createOwnComment(e) {
	const comment = {
		id: 1,
		content:
			"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
		createdAt: "1 month ago",
		score: 12,
		user: {
			image: {
				png: "./images/avatars/image-amyrobson.png",
				webp: "./images/avatars/image-amyrobson.webp",
			},
			username: "amyrobson",
		},
	};
	if (e.target.classList.contains("card-add__send")) {
		initializeCreatedComment(comment);
	}
}

initializeRepliesComments();
cardAddBtn.addEventListener("click", createOwnComment);
