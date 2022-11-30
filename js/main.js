const fetchJSON = async function () {
	const JSON_URL = "./data.json";

	const promise = new Promise((resolve, reject) => {
		const fetchedJSON = fetch(JSON_URL)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					return resolve(response.json());
				} else {
					return response.json().then((error) => {
						reject(console.error("we cannot connect now. try later"));
					});
				}
			})
			.catch((error) => {
				console.error("we cannot connect now. try later");
			});
	});

	return promise;
};
