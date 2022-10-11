import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';


// Auth

function* loginSaga(action) {
  try {
    const user = yield call(api.login, action.payload);
    console.log(user.data)
    localStorage.setItem("authToken", user.data.token);
    yield put(actions.login.loginSuccess(user.data));
  } catch (err) {
    console.error(err);
    yield put(actions.login.loginFailure(err));
  }
}

function* registerSaga(action) {
  try {
    const user = yield call(api.register, action.payload);
    console.log(user.data)
    localStorage.setItem("authToken", user.data.token);
    yield put(actions.register.registerSuccess(user.data));
  } catch (err) {
    console.error(err);
    yield put(actions.register.registerFailure(err));
  }
}

function* logoutSaga(action) {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem('userLoginedRole');
    localStorage.removeItem("userLoginedname");
    localStorage.removeItem("userLoginedAvtUrl");
    localStorage.removeItem("userLoginedEmail");
    yield put(actions.logout.logoutSuccess());
  } catch (err) {
    console.error(err);
    yield put(actions.logout.logoutFailure(err));
  }
}

function* getUserlogined(action) {
  try {
    const userProfile = yield call(api.getProfile, action.payload);
    localStorage.setItem("userLoginedRole", userProfile.data.user.role);
    localStorage.setItem("userLoginedname", userProfile.data.user.username);
    localStorage.setItem("userLoginedAvtUrl", userProfile.data.user.avatar_url);
    localStorage.setItem("userLoginedEmail", userProfile.data.user.email);
    yield put(actions.getProfile.getProfileSuccess(userProfile.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getProfile.getProfileFailure(err));
  }
}


function* fetchAllUsersSaga(action) {
  try {
    const payload = action?.payload ? action?.payload : {page: 1, size: 10, search: ''}
    const users = yield call(api.fetchAllUsers, payload);
    yield put(actions.getAllUsers.getAllUsersSuccess(users.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getAllUsers.getAllUsersFailure(err));
  }
}


function* fetchOneUserSaga(action) {
  try {
    const user = yield call(api.fetchOneUser, action.payload);
    yield put(actions.getOneUser.getOneUserSuccess(user.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getOneUser.getOneUserFailure(err));
  }
}

function* createUserSaga(action) {
  try {
    const user = yield call(api.createUser, action.payload);
    yield put(actions.createUser.createUserSuccess(user.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createUser.createUserFailure(err));
  }
}

function* updateProfileUserSaga(action) {
  try {
    const updatedProfileUser = yield call(api.updateUser, action.payload);
    yield put(actions.updateProfileUser.updateProfileUserSuccess(updatedProfileUser.data));
  } catch (err) {
    yield put(actions.updateProfileUser.updateProfileUserFailure(err));
  }
}

function* deleteUserSaga(action) {
  try {
    const deletedUser = yield call(api.deleteUser, action.payload );
    console.log(deletedUser.data)
    yield fetchAllUsersSaga()
  } catch (err) {
    console.error(err);
    yield put(actions.deleteUser.deleteUserFailure(err));
  }
}

function* UserSaga() {
  yield takeLatest(actions.getType(actions.register.registerRequest) , registerSaga);
  yield takeLatest(actions.getType(actions.login.loginRequest) , loginSaga);
  yield takeLatest(actions.getType(actions.logout.logoutRequest) , logoutSaga);
  yield takeLatest(actions.getType(actions.getProfile.getProfileRequest) , getUserlogined);
  yield takeLatest(actions.getType(actions.getAllUsers.getAllUsersRequest) , fetchAllUsersSaga);
  yield takeLatest(actions.getType(actions.getOneUser.getOneUserRequest) , fetchOneUserSaga);
  yield takeLatest(actions.getType(actions.createUser.createUserRequest), createUserSaga);
  yield takeLatest(actions.getType(actions.updateProfileUser.updateProfileUserRequest), updateProfileUserSaga);
  yield takeLatest(actions.getType(actions.deleteUser.deleteUserRequest), deleteUserSaga);
}


export default UserSaga;
