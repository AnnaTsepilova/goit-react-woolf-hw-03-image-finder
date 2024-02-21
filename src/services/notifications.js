import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INFO_MESSAGE =
  "We're sorry, but you've reached the end of search results.";
const EMPTY_QUERY_MESSAGE = 'Please enter your search query.';
const NO_FOUND_MESSAGE =
  'Sorry, there are no images matching your search query. Please try again.';
const ERROR_MESSAGE = 'API error:';

function NotificationInfo(message) {
  toast.info(message);
}
function NotificationWarning(message) {
  toast.warn(message);
}
function NotificationError(message) {
  toast.error(message);
}

export {
  INFO_MESSAGE,
  EMPTY_QUERY_MESSAGE,
  NO_FOUND_MESSAGE,
  ERROR_MESSAGE,
  NotificationInfo,
  NotificationWarning,
  NotificationError,
};
