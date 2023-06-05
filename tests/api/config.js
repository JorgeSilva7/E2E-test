import supertest from "supertest";

const authService = {
	BASE_URL: "http://localhost:3001",
	login: {
		verified: {
			email: "jorge.silva6956@gmail.com",
			password: "2aSsword95%",
		},
		unverified: {
			email: "cokeeerase@gmail.com",
			password: "2aSsword95%",
		},
	},
};

const request = (baseUrl) => {
	return supertest.agent(baseUrl);
};

export { authService, request };
