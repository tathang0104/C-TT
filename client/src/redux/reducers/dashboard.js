import { INIT_STATE } from "../../constant";
import { getType, getDashboard } from "../actions";

export default function dashboardReducers(state = INIT_STATE.dashboard, action) {
  switch (action.type) {
    case getType(getDashboard.getDashboardRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getDashboard.getDashboardSuccess):
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    case getType(getDashboard.getDashboardFailure):
      return {
        ...state,
        isLoading: false,
        data: null,
      };
    default:
      return state;
  }
}
