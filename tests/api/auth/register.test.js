import { authService, request } from "../config";
import { expect } from "@jest/globals";
import { v4 as uuid } from "uuid";

describe("POST auth/register", () => {
	beforeEach(async function () {}, 45000);

	it("[ERROR] return an error when email is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				password: "password",
				rut: "77777777-7",
				name: "name",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("register_validation_error");
	});

	it("[ERROR] return an error when password is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				email: "email@email.com",
				rut: "77777777-7",
				name: "name",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("register_validation_error");
	});

	it("[ERROR] return an error when rut is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				password: "password",
				email: "email@email.com",
				name: "name",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("register_validation_error");
	});

	it("[ERROR] return an error when name is undefined", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				email: "email@email.com",
				password: "password",
				rut: "77777777-7",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("register_validation_error");
	});

	it("[ERROR] return an error when email format is incorrect", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				email: "email",
				name: "name",
				password: "password",
				rut: "77777777-7",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("register_validation_error");
	});

	it("[ERROR] return an error when the given rut has criminal records", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				email: "email@email.com",
				name: "name",
				password: "Password1#",
				rut: "33333333-3",
			})
			.expect(403);
		expect(response.body.error.name).toEqual("register_user_not_allowed_error");
	});

	it.skip("[SUCCESS] register correctly with random email", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				email: `${uuid()}@gmail.com`,
				name: "name",
				password: "Password1#",
				rut: "66666666-6",
			})
			.expect(201);
		expect(response.body.userId).not.toBeUndefined();
	});

	it("[ERROR] return an error when try to register with already register rut", async () => {
		const response = await request(authService.BASE_URL)
			.post("/register")
			.send({
				email: `${uuid()}@gmail.com`,
				name: "name",
				password: "Password1#",
				rut: "66666666-6",
			})
			.expect(400);
		expect(response.body.error.name).toEqual("register_already_exists_error");
		expect(response.body.error.msg).toEqual("the rut already exists");
	});
}, 4600);
