/* eslint import/prefer-default-export: 0 */

import { postJson } from "../utils/net";

// Auth
export const login = (url, params) => postJson(url, params);
