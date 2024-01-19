// mailReducers.ts
import { SET_MAIL_CONTENT, SET_MAIL_SENDER, MailActionTypes } from './mailActions';

export interface MailState {
  mailContent: string;
  mailSender: string;
}

const initialState: MailState = {
  mailContent: 'Contents of the mail',
  mailSender: 'Senders Address',
};

const mailReducer = (state: MailState = initialState, action: MailActionTypes): MailState => {
  switch (action.type) {
    case SET_MAIL_CONTENT:
      return { ...state, mailContent: action.payload };
    case SET_MAIL_SENDER:
      return { ...state, mailSender: action.payload };
    default:
      return state;
  }
};

export default mailReducer;
