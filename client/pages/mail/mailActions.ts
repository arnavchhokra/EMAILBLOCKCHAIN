// mailActions.ts
export const SET_MAIL_CONTENT = 'SET_MAIL_CONTENT';
export const SET_MAIL_SENDER = 'SET_MAIL_SENDER';

interface SetMailContentAction {
  type: typeof SET_MAIL_CONTENT;
  payload: string;
}

interface SetMailSenderAction {
  type: typeof SET_MAIL_SENDER;
  payload: string;
}

export type MailActionTypes = SetMailContentAction | SetMailSenderAction;

export const setMailContent = (content: string): SetMailContentAction => ({
  type: SET_MAIL_CONTENT,
  payload: content,
});

export const setMailSender = (sender: string): SetMailSenderAction => ({
  type: SET_MAIL_SENDER,
  payload: sender,
});
