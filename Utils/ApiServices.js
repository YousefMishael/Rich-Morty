import { request } from "./AppUtils";

/**
 *
 * @returns - all episodes
 */

export function getEpisodes() {
  return request({
    url: "https://rickandmortyapi.com/api/episode",
    method: "GET",
  });
}

/**
 *
 * @param {*} episodeUrl - episode url from json
 * @returns - episode details from api
 */

export function getEpisodeDetails(episodeUrl) {
  return request({
    url: episodeUrl,
    method: "GET",
  });
}

/**
 *
 * @param {*} CharacterUrl - character url from json
 * @returns - character details from api
 */

export function getCharacter(CharacterUrl) {
  return request({
    url: CharacterUrl,
    method: "GET",
  });
}
