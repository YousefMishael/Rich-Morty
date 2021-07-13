/**
 * @param {*} options
 * @returns - responese after fetch
 */
export const request = (options) => {
  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};
