import {
  SET_LOADING,
  SET_TOFINDV,
  SET_ERRORMS,
  SET_ITEMVID,
  FND_YVIDEOS,
} from "./action-types";

export function setErrorMs(error) {
  return { type: SET_ERRORMS, error };
}

export function setLoading(loading) {
  return { type: SET_LOADING, loading };
}

export function setToFind(toFind) {
  return { type: SET_TOFINDV, toFind };
}

export function setItemVideo(item) {
  return { type: SET_ITEMVID, item };
}

export function fndYVideos(query) {
  return { type: FND_YVIDEOS, query };
}
