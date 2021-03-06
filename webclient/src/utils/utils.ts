// Redux
import store from "../redux/store";
import {
  pushError,
  deleteError,
  pushSuccess,
  deleteSuccess,
  pushWarning,
  deleteWarning,
} from "../redux/appActionSlice";
// Lodash
import _ from "lodash";

import soundSuccess from "../assets/audio/sounds_message4.mp3";
import soundWarning from "../assets/audio/sounds_message4.mp3";
import soundError from "../assets/audio/sounds_message4.mp3";
import { RootStateOrAny } from "react-redux";

const colors = require("tailwindcss/colors");

delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];
delete colors["lightBlue"];
delete colors["gray"];
delete colors["zinc"];
delete colors["neutral"];
delete colors["stone"];

/**
 * getColors
 * @param {string} color The tailwind keyword for the color e.g "blue", "yellow", "pink"
 * @returns {Object}
 * @description Method that returns all colors object or a specific color object
 */
export const getColors = (color: string) => {
  // If the passed color is all, then return the whole colors object, if not, then return the specific object
  if (color === "all") {
    return colors;
  } else {
    return colors[color];
  }
};

/**
 * defineDate
 * @param {number} date The date that was passed will be subtracted from the current date, so we get the time that has elapsed
 * @returns {string}
 * @description Method that returns the time that has elapsed from a passed date
 */
export const defineDate = (date: number): string => {
  if ((Date.now() - date) / 60000 < 1) {
    return "< 1min";
  } else if ((Date.now() - date) / 3600000 < 1) {
    return "< 1h";
  } else if (
    (Date.now() - date) / 3600000 > 1 &&
    (Date.now() - date) / 86400000 < 1
  ) {
    return `${parseInt(`${(Date.now() - date) / 3600000}`)}h`;
  } else if (
    (Date.now() - date) / 86400000 > 1 &&
    (Date.now() - date) / 2629800000 < 1
  ) {
    return `${parseInt(`${(Date.now() - date) / 86400000}`)}d`;
  } else if (
    (Date.now() - date) / 2629800000 > 1 &&
    (Date.now() - date) / 31557600000 < 1
  ) {
    return `${parseInt(`${(Date.now() - date) / 2629800000}`)}m`;
  } else {
    return `${parseInt(`${(Date.now() - date) / 31557600000}`)}y`;
  }
};

/**
 * defineError
 * @param {string} error The error that was thrown
 * @returns {string}
 * @description Method that converts the thrown error to a friendlier message
 */
export const defineError = (error: string): string => {
  if (error === "sendfriendrequest") {
    return "Couldn't send a friend request!";
  }

  if (error === "acceptfriendrequest") {
    return "Couldn't add as a friend!";
  }

  if (error === "rejectfriendrequest") {
    return "Couldn't reject the friend request!";
  }

  if (error === "cancelfriendrequest") {
    return "Couldn't cancell the friend request!";
  }

  if (error === "removefriend") {
    return "Couldn't remove as a friend!";
  }

  return "Couldn't connect to the API, try in a second!";
};

/**
 * defineSuccess
 * @param success The successful action short message, so we can display a better message
 * @returns {string}
 * @description Method that converts the thrown success message to a friendlier message
 */
export const defineSuccess = (success: string): string => {
  if (success === "message") {
    return "Successfully created a message!";
  }

  if (success === "login") {
    return "Successfully logged in!";
  }

  if (success === "register") {
    return "Successfully registered!";
  }

  if (success === "settings") {
    return "Successfully updated the settings!";
  }

  if (success === "sendfriendrequest") {
    return "Successfully sent a friend request!";
  }

  if (success === "acceptfriendrequest") {
    return "Successfully added as a friend!";
  }

  if (success === "rejectfriendrequest") {
    return "Successfully rejected the friend request!";
  }

  if (success === "cancelfriendrequest") {
    return "Successfully cancelled the friend request!";
  }

  if (success === "removefriend") {
    return "Successfully removed as a friend!";
  }

  return success;
};

/**
 * defineWarning
 * @param warning The warning action short message, so we can display a better message
 * @returns {string}
 * @description Method that converts the thrown warning message to a friendlier message
 */
export const defineWarning = (warning: string): string => {
  if (warning === "notsaved") {
    return "You have unsaSecurityved work!";
  }

  return warning;
};

/**
 * addError
 * @param {any} data The thrown error object
 * @description Method that creates a new error object from the thrown one, then passes it to the redux store. The function is debounced, because we don't want the same error pushed many times
 */
export const addError = _.debounce((data) => {
  // Get all errors from the store
  const errors = store.getState().actions.errors;

  // Create the new error object
  const error = {
    _id: errors.length,
    message: data.toString(),
  };

  // Push the error to the redux store
  store.dispatch(pushError(error));

  const loggedUser: RootStateOrAny = store.getState().user.user;

  if (loggedUser.settings.sound.success) {
    const audio = new Audio(soundError);

    audio.play();
  }

  // Create a timeout, with which the pushed error will be deleted
  setTimeout(() => {
    store.dispatch(deleteError(error._id));
  }, 5000);
}, 500);

/**
 * addSuccess
 * @param {any} data The thrown success object
 * @description Method that creates a new success object from the thrown one, then passes it to the redux store. The function is debounced, because we don't want the same success pushed many times
 */
export const addSuccess = _.debounce((data) => {
  // Get all successes from the store
  const successes = store.getState().actions.successes;

  // Create the new success object
  const success = {
    _id: successes.length,
    message: data.toString(),
  };

  // Push the success to the redux store
  store.dispatch(pushSuccess(success));

  const loggedUser: RootStateOrAny = store.getState().user.user;

  if (loggedUser.settings.sound.success) {
    const audio = new Audio(soundSuccess);

    audio.play();
  }

  // Create a timeout, with which the pushed success will be deleted
  setTimeout(() => {
    store.dispatch(deleteSuccess(success._id));
  }, 5000);
}, 500);

/**
 * addWarning
 * @param {any} data The thrown warning object
 * @description Method that creates a new warning object from the thrown one, then passes it to the redux store. The function is debounced, because we do not want the same warning pushed many times
 */
export const addWarning = _.debounce((data) => {
  // Get all warnings from the store
  const warnings = store.getState().actions.warnings;

  // Create the new warning object
  const warning = {
    _id: warnings.length,
    message: data.toString(),
  };

  // Push the warning to the redux store
  store.dispatch(pushWarning(warning));

  const loggedUser: RootStateOrAny = store.getState().user.user;

  if (loggedUser.settings.sound.warning) {
    const audio = new Audio(soundWarning);

    audio.play();
  }

  // Create a timeout, with which the pushed warning will be deleted
  setTimeout(() => {
    store.dispatch(deleteWarning(warning._id));
  }, 5000);
}, 500);
