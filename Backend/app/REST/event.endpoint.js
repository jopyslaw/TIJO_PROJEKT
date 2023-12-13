import businessContainer from "../business/business.container";
import applicationException from "../service/applicationException";
import auth from "../middleware/auth";

const eventEndpoint = (router) => {
  router.post("/api/event/create", auth, async (request, response, next) => {
    try {
      const result = await businessContainer
        .getEventManager(request)
        .createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete(
    "/api/event/remove/:eventId",
    auth, async (request, response, next) => {
      try {
        let result = await businessContainer
          .getEventManager(request)
          .removeEvent(request.params.eventId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/event/getAllEventsForUserId/:userId",
      auth, async (request, response, next) => {
      try {
        const result = await businessContainer
          .getEventManager()
          .getAllEventsForUser(request.params.userId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get("/api/event/get/:eventId",auth,  async (request, response, next) => {
    try {
      const result = await businessContainer
        .getEventManager()
        .getById(request.params.eventId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default eventEndpoint;
