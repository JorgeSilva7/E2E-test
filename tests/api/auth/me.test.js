import { authService, request } from "../config";
import { expect } from "@jest/globals";

describe("POST auth/me", () => {
	const { login } = authService;

	beforeAll(async function () {}, 45000);

	beforeEach(async function () {}, 45000);

	it("[ERROR] return an error when token is undefined", async () => {
		const response = await request(authService.BASE_URL).get("/me").expect(401);
		expect(response.body.error).toEqual("need an authorization token!");
	});

	it("[SUCCESS] return a logged user data", async () => {
		const loginResponse = await request(authService.BASE_URL)
			.post("/login")
			.send(login.unverified);

		const token = loginResponse.body.token;

		const response = await request(authService.BASE_URL)
			.get("/me")
			.set("Authorization", `Bearer ${token}`)

			.expect(200);
		expect(response.body._id).not.toBeUndefined();
		expect(response.body.email).toBe(login.unverified.email);
	});
}, 4600);
