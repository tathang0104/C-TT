import { INIT_STATE } from '../../constant';
import { getType, login, getOneUser, getAllUsers, updateProfileUser, deleteUser, getProfile } from '../actions'

export default function usersReducers(state = INIT_STATE.user, action) {
  switch (action.type) {
    case getType(getProfile.getProfileRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getProfile.getProfileSuccess):
      return {
        ...state,
        isLoading: true,
        currentUserLogined: action.payload,
      };
    case getType(getProfile.getProfileFailure):
      return {
        ...state,
        isLoading: false,
        currentUserLogined: null,
      };
    case getType(login.loginRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(login.loginSuccess):
      return {
        ...state,
        isLoading: true,
        currentUserLoginedToken: action.payload.token,
      };
    case getType(login.loginFailure):
      return {
        ...state,
        isLoading: false,
        currentUserLoginedToken: null,
      };
    case getType(getOneUser.getOneUserRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getOneUser.getOneUserSuccess):
      return {
        ...state,
        isLoading: true,
        currentData: action.payload.data,
      };
    case getType(getOneUser.getOneUserFailure):
      return {
        ...state,
        isLoading: false,
        currentData: null,
      };
    case getType(getAllUsers.getAllUsersRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAllUsers.getAllUsersSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    case getType(getAllUsers.getAllUsersFailure):
      return {
        ...state,
        isLoading: false,
      };
    // case getType(createProduct.createProductSuccess):
    //   return {
    //     ...state,
    //     data: [...state.data, action.payload],
    //   };
    case getType(updateProfileUser.updateProfileUserSuccess):
      return {
        ...state,
        data: state.data.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case getType(deleteUser.deleteUserSuccess):
      return {
        ...state,
        data: state.data.filter((product) =>
          product._id === action.payload
        ),
      };
    default:
      return state;
  }
}
