import eventDAO from "../DAO/eventDAO";
import applicationException from "../service/applicationException";

const create = (context) => {
  const createNewOrUpdate = async (eventData) => {
    const result = await eventDAO.createNewOrUpdate(eventData);
    if (result) {
      return result;
    }
  };

  const getAllEventsForUser = async (userId) => {
    const result = await eventDAO.getAllEventsForUser(userId);
    if (result) {
      return result;
    }
  };

  const getById = async (eventId) => {
    const result = await eventDAO.getById(eventId);
    if (result) {
      return result;
    }
  };

  const removeEvent = async (eventId) => {
    const result = await eventDAO.removeById(eventId);
    if (result) {
      return result;
    }
  };

  return {
    createNewOrUpdate: createNewOrUpdate,
    getAllEventsForUser,
    getById,
    removeEvent,
  };
};

export default {
  create: create,
};
