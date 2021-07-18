import React from "react";
import { Dimensions } from "react-native";

export const win = Dimensions.get("window");
//image ratio for different devices
export const ratio = win.width / 300;

/**
 * @param {*} options
 * @returns - responese after fetch
 */
export const request = (options) => {
  return fetch(options.url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Network error occured");
        return Promise.reject(response);
      }
    })
    .catch((error) => console.error(error));
};

/**
 *
 * @returns - generate id's for flatlist items
 */
// export function keyGenerator() {
//   var S4 = function () {
//     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//   };
//   return (
//     S4() +
//     S4() +
//     "-" +
//     S4() +
//     "-" +
//     S4() +
//     "-" +
//     S4() +
//     S4() +
//     S4() +
//     S4()
//   ).toString();
// }
