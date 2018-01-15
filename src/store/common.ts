import { AxiosError } from 'axios';
import _ from 'lodash';
import { message } from 'antd';
import { BaseError } from 'make-error';

export class BusinessLogicError extends BaseError {}

const beautifyMessage = (message: object) => {
  try {
    return JSON.stringify(message).replace(/"/g, '');
  } catch (e) {
    return 'unknown message text';
  }
};

export const showError = (error: AxiosError | BusinessLogicError) => {
  if (process.env.BROWSER) {
    if (error instanceof BusinessLogicError) {
      message.error(error.message);
      return;
    }
    const responseStatus = _.get(error, 'response.status', 'unknown status');
    const responseData = _.get(error, 'response.data', null);
    const responseBody = _.get(error, 'response.body', null);
    const simpleError = _.get(responseData, 'error', null);
    const errorMessage = _.get(simpleError, 'message', null);
    const errorDetails = _.get(simpleError, 'detail', null);
    const errorsObject = _.get(simpleError, 'errors', null);
    if (!responseData && !responseBody) {
      message.error(`Status code: ${responseStatus}. Message: unknown message text`);
    } else if (errorMessage) {
      message.error(`Status code: ${responseStatus}. Message: ${errorMessage}`);
    } else if (errorDetails) {
      message.error(`Status code: ${responseStatus}. Message: ${errorDetails}`);
    } else if (errorsObject) {
      message.error(`Status code: ${responseStatus}. Message: ${beautifyMessage(errorsObject)}`);
    } else if (simpleError) {
      message.error(`Status code: ${responseStatus}. Message: ${beautifyMessage(simpleError)}`);
    } else if (!_.isNull(responseData)) {
      message.error(`Status code: ${responseStatus}. Message: ${beautifyMessage(responseData)}`);
    } else if (!_.isNull(responseBody)) {
      message.error(`Status code: ${responseStatus}. Message: ${beautifyMessage(responseBody)}`);
    } else {
      message.error(`Status code: ${responseStatus}. Message: ${beautifyMessage(error)}`);
    }
  }
};

// WIP deprecated
// export const parseAxiosResponseToError = (resp: AxiosResponse): string => {
//   const responseStatus = _.get(resp, 'status', 'unknown status');
//   let messageText;
//   try {
//     messageText = JSON.stringify(_.get(resp, 'data', {}));
//   } catch (e) {
//     messageText = e;
//   }
//   return `Status code: ${responseStatus}. Message: ${messageText}`;
// };
