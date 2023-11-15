import businessContainer from "../business/business.container";
import applicationException from "../service/applicationException";

const eventEndpoint = (router) => {
  router.post("/api/event/create", async (request, response, next) => {
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
    async (request, response, next) => {
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
    async (request, response, next) => {
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

  router.get("/api/event/get/:eventId", async (request, response, next) => {
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
