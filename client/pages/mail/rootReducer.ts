// rootReducer.ts
import { combineReducers } from 'redux';
import mailReducer, { MailState } from './mailReducers';

export interface RootState {
  mail: MailState;
}

const rootReducer = combineReducers({
  mail: mailReducer,
});

export default rootReducer;
