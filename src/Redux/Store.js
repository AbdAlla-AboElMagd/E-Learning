import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducer from "./Reducers/combineReducer";

const eLearningStore = createStore(combineReducer, composeWithDevTools());
export default eLearningStore;
