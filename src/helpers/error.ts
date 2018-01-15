import moment from 'moment';

export interface IAppError extends Error {
  msg: string;
  type?: string;
  isCriticalError?: boolean;
}

const AppError = (name: string, type = 'Unknown error', isCriticalError = false) => {
  const time = moment().format('MMMM Do YYYY, h:mm:ss a');
  const message = `${time} : ${name}`;
  const err: Error = new Error(message);
  const appErr: IAppError = err as IAppError;

  appErr.msg = message;
  appErr.type = type;
  appErr.isCriticalError = isCriticalError;

  Error.captureStackTrace(appErr, AppError);

  return appErr;
};

export default AppError;
