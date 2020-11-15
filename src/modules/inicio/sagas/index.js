import { put, call, takeLatest } from "redux-saga/effects";
import { FND_YVIDEOS } from "../reducers/action-types";
import {
  setErrorMs,
  setLoading,
  setToFind,
  setItemVideo,
} from "../reducers/actions";
import { ytVideos } from "./services";

function* findYVideos(acc) {
  try {
    yield put(setLoading(true));
    yield put(setErrorMs(undefined));
    const res = yield call(ytVideos, acc.query);
    const items = res.data.items;
    const vids = items.filter((it) => "youtube#video" === it.id.kind);
    if (items && items.length) yield put(setItemVideo(vids[0]));
    return;
  } catch (err) {
    yield put(setErrorMs(err.message));
  } finally {
    yield put(setToFind(false));
    yield put(setLoading(false));
  }
}

export default function* mdInicio() {
  yield takeLatest(FND_YVIDEOS, findYVideos);
}
