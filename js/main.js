const JSON_URL = "./data.json";

const xhr = new XMLHttpRequest();

xhr.open("GET", JSON_URL);

xhr.onload = function () {
	console.log(JSON.parse(xhr.response));
};

xhr.send();
