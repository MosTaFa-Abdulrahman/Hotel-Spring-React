import { configureStore } from "@reduxjs/toolkit";

// User
import { userSlice } from "./user/userSlice";
// Hotel
import { hotelSlice } from "./hotel/hotelSlice";
// Apartment
import { apartmentSlice } from "./apartment/apartmentSlice";
// Room
import { roomSlice } from "./room/roomSlice";
// Booking
import { bookingSlice } from "./booking/bookingSlice";
// Payment
import { paymentSlice } from "./payment/paymentSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [hotelSlice.reducerPath]: hotelSlice.reducer,
    [apartmentSlice.reducerPath]: apartmentSlice.reducer,
    [roomSlice.reducerPath]: roomSlice.reducer,
    [bookingSlice.reducerPath]: bookingSlice.reducer,
    [paymentSlice.reducerPath]: paymentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userSlice.middleware)
      .concat(hotelSlice.middleware)
      .concat(apartmentSlice.middleware)
      .concat(roomSlice.middleware)
      .concat(bookingSlice.middleware)
      .concat(paymentSlice.middleware),
});
