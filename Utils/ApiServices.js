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

/**
 *
 * @param {*} list - list of urls to fetch
 */
async function getSubDetails(list) {
  try {
    const results = [];

    for (const character of list) {
      const result = await getDetails(character);
      results.push(result);
    }
    return Promise.all(results).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports.getSubDetails = getSubDetails;
