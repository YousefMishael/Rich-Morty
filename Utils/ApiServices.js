import { request } from "./AppUtils";

/**
 *
 * @param {*} url - url to send request
 * @returns - requests details from api from api
 */

export function getDetails(url) {
  return request({
    url: url,
    method: "GET",
  });
}
