import userEndpoint from "./user.endpoint";
import eventEndpoint from "./event.endpoint";

const routes = (router) => {
  userEndpoint(router);
  eventEndpoint(router);
};

export default routes;
