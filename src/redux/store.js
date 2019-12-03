import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducer from "./reducers";

// Logger is super useful! I like to set this up so it only runs if I'm currently in a dev environment. if(NODE_ENV=development) do logger.
// I will also usually
const store = createStore(reducer, applyMiddleware(logger));

export default store;
