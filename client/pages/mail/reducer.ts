// mailReducers.ts
import action from "redux"
import { SET_MAIL_CONTENT, SET_MAIL_SENDER, MailActionTypes } from './mailActions';

export interface State {
  mailContent: string;
  mailSender: string;
}

export const initialState: State = {
  mailContent: 'Contents of the mail',
  mailSender: 'Senders Address',
};

export const reducer = (state: State = initialState, action: MailActionTypes): State => {
  switch (action.type) {
    case SET_MAIL_CONTENT:
      console.log(action.payload);
      return { ...state, mailContent: action.payload };
    case SET_MAIL_SENDER:
      console.log(action.payload);
      return { ...state, mailSender: action.payload };
    default:
      return state;
  }
};

export default reducer;
