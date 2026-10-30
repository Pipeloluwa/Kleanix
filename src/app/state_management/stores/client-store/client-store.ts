import navValue from "../../reducers/client-reducers/navValue";
import navBgState from "../../reducers/client-reducers/navBgState";
import bookingReducer from "../../reducers/client-reducers/bookingSlice";
import servicesReducer from "../../reducers/client-reducers/servicesSlice";
import uiReducer from "../../reducers/client-reducers/uiSlice";

export const ClientStore = {
  navValue: navValue,
  navBgState: navBgState,
  booking: bookingReducer,
  services: servicesReducer,
  ui: uiReducer
};
