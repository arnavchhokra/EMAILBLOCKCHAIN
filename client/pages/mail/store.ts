import { createStore, combineReducers } from 'redux';
import rootReducer, { RootState } from './rootReducer';

const store = createStore(rootReducer);

export default store