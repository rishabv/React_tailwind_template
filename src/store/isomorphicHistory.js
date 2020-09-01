// Checking of app environment (dom, server, mobile)
import { createBrowserHistory, createMemoryHistory } from "history";

import * as utils from "./../utils";

const createHistory = (initialUrl) => {
    let options = initialUrl
        ? {
              initialEntries: [initialUrl], // The initial URLs in the history stack
              initialIndex: 0, // The starting index in the history stack
              keyLength: 6, // The length of location.key
              // A function to use to confirm navigation with the user. Required
              // if you return string prompts from transition hooks (see below)
              getUserConfirmation: null,
          }
        : undefined;
    return utils.canUseDOM()
        ? createBrowserHistory()
        : createMemoryHistory(options);
};

export default createHistory;
