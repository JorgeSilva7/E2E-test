import { authService, request } from "../config";
import { expect } from "@jest/globals";

describe("POST auth/login", () => {
	const { login } = authService;

	beforeEach(async function () {}, 45000);

	it("[ERROR] return an error when email is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/login")
			.send({
				password: "password",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("login_validation_error");
	});

	it("[ERROR] return an error when password is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/login")
			.send({
				email: "email@email.com",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("login_validation_error");
	});

	it("[ERROR] return an error when email format is incorrect", async () => {
		const response = await request(authService.BASE_URL)
			.post("/login")
			.send({
				email: "email",
				password: "password",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("login_validation_error");
	});

	it("[SUCCESS] logged correctly with verified user", async () => {
		const response = await request(authService.BASE_URL)
			.post("/login")
			.send(login.verified)
			.expect(200);
		expect(response.body.token).not.toBeUndefined();
		expect(typeof response.body.token).toBe("string");
		expect(response.body.verified).toBe(true);
	});

	it("[SUCCESS] logged correctly with unverified user", async () => {
		const response = await request(authService.BASE_URL)
			.post("/login")
			.send(login.unverified)
			.expect(200);
		expect(response.body.token).not.toBeUndefined();
		expect(typeof response.body.token).toBe("string");
		expect(response.body.verified).toBe(false);
	});
}, 4600);
