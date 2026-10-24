import navValue from "../../reducers/client-reducers/navValue";
import navBgState from "../../reducers/client-reducers/navBgState";
import bookingReducer from "../../reducers/client-reducers/bookingSlice";
import quoteReducer from "../../reducers/client-reducers/quoteSlice";
import servicesReducer from "../../reducers/client-reducers/servicesSlice";
import reviewsReducer from "../../reducers/client-reducers/reviewsSlice";
import suburbsReducer from "../../reducers/client-reducers/suburbsSlice";
import uiReducer from "../../reducers/client-reducers/uiSlice";

export const ClientStore = {
  navValue: navValue,
  navBgState: navBgState,
  booking: bookingReducer,
  quote: quoteReducer,
  services: servicesReducer,
  reviews: reviewsReducer,
  suburbs: suburbsReducer,
  ui: uiReducer
};
