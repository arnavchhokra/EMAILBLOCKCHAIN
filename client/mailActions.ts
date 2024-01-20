// mailActions.ts

// Action type constants
export const SET_MAIL_CONTENT = 'SET_MAIL_CONTENT';
export const SET_MAIL_SENDER = 'SET_MAIL_SENDER';

// Action interfaces
interface SetMailContentAction {
  type: typeof SET_MAIL_CONTENT;
  payload: string;
}

interface SetMailSenderAction {
  type: typeof SET_MAIL_SENDER;
  payload: string;
}

// Union type of all mail action types
export type MailActionTypes = SetMailContentAction | SetMailSenderAction;

// Action creators
export const setMailContent = (content: string): SetMailContentAction => ({
  type: SET_MAIL_CONTENT,
  payload: content,
});

export const setMailSender = (sender: string): SetMailSenderAction => ({
  type: SET_MAIL_SENDER,
  payload: sender,
});

