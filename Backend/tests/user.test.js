import supertest from "supertest";
import app from "../app/app";
import passwordDAO from "../app/DAO/passwordDAO";
import userDAO from "../app/DAO/userDAO";
import mongoose from "mongoose";
import config from "../app/config";
import sha1 from "sha1";
import tokenDAO from "../app/DAO/tokenDAO";

const userData = {
    email: "testTestowy@gmail.pl",
    name: "TomekTest",
    role: userDAO.userRole.user,
};

describe("User tests", () => {
    let user = {};
    let password = {};
    const userPassword = "test";
    let token = {};

    beforeEach(async () => {
        await mongoose.connect(config.databaseUrl);
        user = await userDAO.createNewOrUpdate(userData);
        const passwordData = {
            userId: user.id,
            password: sha1(userPassword),
        };
        password = await passwordDAO.createOrUpdate(passwordData);
        token = await tokenDAO.create(user);
    });

    afterEach(async () => {
        await userDAO.removeById(user.id);
        await mongoose.connection.close();
    });

    describe("POST /api/user/auth", () => {
        it("should check if user provide corrected data and return token", async () => {
            const dataToLog = {
                login: user.email,
                password: userPassword,
            };
            const response = await supertest(app)
                .post("/api/user/auth")
                .send(dataToLog);

            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBeDefined();
            expect(response.body.token).not.toBe("");
        });

        it("should return 404 when user provided incorrect data", async () => {
            const dataToLog = {
                username: "cos",
                password: "drugieCos",
            };
            const response = await supertest(app)
                .post("/api/user/auth")
                .send(dataToLog);

            expect(response.statusCode).toBe(404);
        });
    });

    describe("POST /api/user/create", () => {
        it("should add new user with provided data", async () => {
            const providedData = {
                name: "jkfdghjkhdfgdjkfghgdfsgjkhdfsgjkh",
                password: "Test15",
                email: "test789456@gmail.com",
            };

            const response = await supertest(app)
                .post("/api/user/create")
                .send(providedData);

            expect(response.statusCode).toBe(200);

            await userDAO.removeById(response.body.userId);
        });

        it("should add new user with provided data", async () => {
            const providedData = {
                name: "jkfdghjkhdfgdjkfghgdfsgjkhdfsgjkh",
                password: "Test15",
                email: "test789456@gmail.com",
            };

            const response = await supertest(app)
                .post("/api/user/create")
                .send(providedData);

            expect(response.statusCode).toBe(200);

            await userDAO.removeById(response.body.userId);
        });
    });

    describe("DELETE /api/user/logout/:userId", () => {
        it("should remove hash session for provided user id", async () => {
            const response = await supertest(app)
                .delete(`/api/user/logout/${user.id}`)
                .set("Authorization", token.value);

            expect(response.statusCode).toBe(200);
        });
    });
});
