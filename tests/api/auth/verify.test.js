import { authService, request } from "../config";
import { expect } from "@jest/globals";

describe("POST auth/verify", () => {
	const { login } = authService;

	let token;

	beforeAll(async function () {
		const loginResponse = await request(authService.BASE_URL)
			.post("/login")
			.send(login.unverified);

		token = loginResponse.body.token;
	}, 45000);

	beforeEach(async function () {}, 45000);

	it("[ERROR] return an error when token is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/verify")
			.send()
			.expect(401);
		expect(response.body.error).toEqual("need an authorization token!");
	});

	it("[ERROR] return an error when code is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/verify")
			.send()
			.set("Authorization", `Bearer ${token}`)
			.expect(400);
		expect(response.body.error.name).toEqual("verify_validation_error");
	});

	// it("[ERROR] return an error when the code is incorrect", async () => {
	// 	const response = await request(authService.BASE_URL)
	// 		.post("/verify")
	// 		.send({
	// 			code: "asd",
	// 		})
	// 		.set("Authorization", `Bearer ${token}`)

	// 		.expect(400);
	// 	expect(response.body.error.name).toEqual("verify_invalid_code_error");
	// });

	it("[ERROR] return an error when the user are already verified", async () => {
		const loginResponse = await request(authService.BASE_URL)
			.post("/login")
			.send(login.verified);

		const token = loginResponse.body.token;

		const response = await request(authService.BASE_URL)
			.post("/verify")
			.send({
				code: "asd",
			})
			.set("Authorization", `Bearer ${token}`)

			.expect(400);
		expect(response.body.error.name).toEqual("verify_already_verified_error");
	});
}, 4600);
