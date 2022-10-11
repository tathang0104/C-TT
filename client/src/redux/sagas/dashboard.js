import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* getDashboardSaga(action) {
  try {
    const dashboard = yield call(api.dashboard);
    yield put(actions.getDashboard.getDashboardSuccess(dashboard.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getDashboard.getDashboardFailure(err));
    localStorage.removeItem("authToken");
  }
}

function* DashboardSaga() {
  yield takeLatest(
    actions.getType(actions.getDashboard.getDashboardRequest),
    getDashboardSaga
  );
}

export default DashboardSaga;
