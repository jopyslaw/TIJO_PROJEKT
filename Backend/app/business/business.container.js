import userManager from "./user.manager";
import eventManager from "./event.manager";

function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
  getUserManager: getter(userManager),
  getEventManager: getter(eventManager),
};
