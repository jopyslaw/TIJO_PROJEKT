import mongoose from "mongoose";
import supertest from "supertest";
import config from "../app/config";
import app from "../app/app";
import eventDAO from "../app/DAO/eventDAO";
import userDAO from "../app/DAO/userDAO";
import tokenDAO from "../app/DAO/tokenDAO";

const userData = {
  email: "test@gmail.pl",
  name: "Tomek",
  role: userDAO.userRole.user,
};

let eventData = {
  title: "Test",
  description: "Testowa wiadomość",
  category: eventDAO.category.VISITS,
  start: "2023-11-21T10:00:00+01:00",
  end: "2023-11-21T12:00:00+01:00",
};

describe("Event tests", () => {
  let user = {};
  let event = {};
  let token = {};
  let server = {};

  beforeEach(async () => {
    await mongoose.connect(config.databaseUrl);
    user = await userDAO.createNewOrUpdate(userData);
    eventData = { ...eventData, userId: user.id };
    event = await eventDAO.createNewOrUpdate(eventData);
    token = await tokenDAO.create(user);
  });

  afterEach(async () => {
    await userDAO.removeById(user.id);
    await eventDAO.removeById(event.id);
    user = {};
    event = {};
    await mongoose.connection.close();
  });

  describe("GET /api/event/getAllEventsForUserId/:userId", () => {
    it("should return all events for provided userId", async () => {
      const response = await supertest(app)
        .get(`/api/event/getAllEventsForUserId/${user.id}`)
        .set("Authorization", token.value);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return 401 when token is not provided", async () => {
      const response = await supertest(app).get(
        `/api/event/getAllEventsForUserId/${user.id}`
      );

      expect(response.statusCode).toBe(401);
    });
  });

  describe("POST /api/event/create", () => {
    it("should create new event", async () => {
      const dataToSave = {
        userId: user.id,
        title: "Test",
        description: "Testowa wiadomość",
        category: eventDAO.category.VISITS,
        start: "2023-11-21T10:00:00+01:00",
        end: "2023-11-21T12:00:00+01:00",
      };

      const response = await supertest(app)
        .post("/api/event/create")
        .send(dataToSave)
        .set("Authorization", token.value);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe();
    });
  });

  describe("DELETE /api/event/remove/:eventId", () => {
    it("should remove event by id", async () => {
      const response = await supertest(app)
        .delete(`/api/event/remove/${event.id}`)
        .set("Authorization", token.value);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("/api/event/get/:eventId", () => {
    it("should return event data by provided id", async () => {
      const response = await supertest(app)
        .get(`/api/event/get/${event.id}`)
        .set("Authorization", token.value);
      expect(response.statusCode).toBe(200);
    });
  });
});
