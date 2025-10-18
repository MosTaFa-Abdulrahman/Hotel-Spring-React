import * as S from "./booking.style";
import { X, Calendar, Users } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useMemo } from "react";

// React-Hook-Form && Zod
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookingSchema } from "../../validation/booking/booking.validation";

// RTKQ
import {
  useCreateBookingMutation,
  useGetBookingsForApartmentQuery,
  useGetBookingsForRoomQuery,
} from "../../store/booking/bookingSlice";
import toast from "react-hot-toast";

function Booking({
  isOpen,
  onClose,
  hotelId,
  roomId,
  apartmentId,
  userId,
  onSuccess,
  maxCapacity,
}) {
  const [createBooking, { isLoading, error: bookingError }] =
    useCreateBookingMutation();
  const [apiError, setApiError] = useState(null);

  // Fetch existing bookings based on type
  const { data: apartmentBookings } = useGetBookingsForApartmentQuery(
    apartmentId,
    {
      skip: !apartmentId || !isOpen,
    }
  );

  const { data: roomBookings } = useGetBookingsForRoomQuery(roomId, {
    skip: !roomId || !isOpen,
  });

  // Determine booking type
  const bookingType = roomId && !apartmentId ? "ROOM" : "APARTMENT";

  // Get the relevant bookings
  const existingBookings =
    bookingType === "ROOM" ? roomBookings : apartmentBookings;

  // Calculate disabled dates from existing bookings
  const disabledDates = useMemo(() => {
    if (!existingBookings?.data) return [];

    const dates = [];
    existingBookings.data.forEach((booking) => {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);

      // Add all dates between check-in and check-out (inclusive)
      for (
        let d = new Date(checkIn);
        d <= checkOut;
        d.setDate(d.getDate() + 1)
      ) {
        dates.push(new Date(d));
      }
    });

    return dates;
  }, [existingBookings]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      checkInDate: "",
      checkOutDate: "",
      numberOfGuests: 1,
      bookingType: bookingType,
      userId,
      hotelId,
      apartmentId: apartmentId || null,
      roomId: roomId || null,
    },
  });

  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");

  // Update form values when modal opens
  useEffect(() => {
    if (isOpen) {
      setValue("bookingType", bookingType);
      setValue("userId", userId);
      setValue("hotelId", hotelId);
      setValue("apartmentId", apartmentId || null);
      setValue("roomId", roomId || null);
      setApiError(null);
    }
  }, [isOpen, bookingType, userId, hotelId, apartmentId, roomId, setValue]);

  // Check if selected dates overlap with existing bookings
  const checkDateOverlap = (startDate, endDate) => {
    if (!existingBookings?.data || !startDate || !endDate) return false;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return existingBookings.data.some((booking) => {
      const bookingStart = new Date(booking.checkInDate);
      const bookingEnd = new Date(booking.checkOutDate);

      // Check if dates overlap
      return start <= bookingEnd && end >= bookingStart;
    });
  };

  // Handle Create Booking
  const onSubmit = async (data) => {
    try {
      setApiError(null);

      if (checkDateOverlap(data.checkInDate, data.checkOutDate)) {
        setApiError(
          "You already have a booking that conflicts with these dates. Please choose different dates."
        );
        return;
      }

      const formattedData = {
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        numberOfGuests: Number(data.numberOfGuests),
        bookingType: bookingType,
        userId: userId,
        hotelId: hotelId,
        apartmentId: apartmentId || null,
        roomId: roomId || null,
      };

      const response = await createBooking(formattedData).unwrap();
      toast.success("Booking Success 😉");
      reset();

      // Pass the booking ID to open Payment modal
      if (onSuccess && response?.id) {
        onSuccess(response.id);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Failed to create booking:", error);

      if (error?.data?.errors && error.data.errors.length > 0) {
        setApiError(error.data.errors[0].message);
      } else if (error?.data?.message) {
        setApiError(error.data.message);
      } else {
        setApiError("Failed to create booking. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Create Booking</S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Show API Error Message */}
            {apiError && (
              <S.ErrorMessage
                style={{
                  marginBottom: "1rem",
                  padding: "0.75rem",
                  backgroundColor: "#fee",
                  borderRadius: "4px",
                  color: "#c00",
                }}
              >
                {apiError}
              </S.ErrorMessage>
            )}

            <S.FormGroup>
              <S.Label>
                <Calendar size={18} />
                Check-in Date
              </S.Label>
              <Controller
                name="checkInDate"
                control={control}
                render={({ field }) => (
                  <S.DatePickerWrapper>
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        const selectedDate = date?.toISOString().split("T")[0];
                        field.onChange(selectedDate);

                        // Check if selected date conflicts
                        if (
                          checkOutDate &&
                          checkDateOverlap(selectedDate, checkOutDate)
                        ) {
                          setApiError(
                            "Selected dates conflict with existing bookings. Please choose different dates."
                          );
                        } else {
                          setApiError(null);
                        }
                      }}
                      minDate={new Date()}
                      excludeDates={disabledDates}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select check-in date"
                      highlightDates={disabledDates}
                    />
                  </S.DatePickerWrapper>
                )}
              />
              {errors.checkInDate && (
                <S.ErrorMessage>{errors.checkInDate.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                <Calendar size={18} />
                Check-out Date
              </S.Label>
              <Controller
                name="checkOutDate"
                control={control}
                render={({ field }) => (
                  <S.DatePickerWrapper>
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        const selectedDate = date?.toISOString().split("T")[0];
                        field.onChange(selectedDate);

                        // Check if selected date conflicts
                        if (
                          checkInDate &&
                          checkDateOverlap(checkInDate, selectedDate)
                        ) {
                          setApiError(
                            "Selected dates conflict with existing bookings. Please choose different dates."
                          );
                        } else {
                          setApiError(null);
                        }
                      }}
                      minDate={checkInDate ? new Date(checkInDate) : new Date()}
                      excludeDates={disabledDates}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select check-out date"
                      highlightDates={disabledDates}
                    />
                  </S.DatePickerWrapper>
                )}
              />
              {errors.checkOutDate && (
                <S.ErrorMessage>{errors.checkOutDate.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                <Users size={18} />
                Number of Guests (Max: {maxCapacity})
              </S.Label>
              <Controller
                name="numberOfGuests"
                control={control}
                render={({ field }) => (
                  <S.Input
                    type="number"
                    min="1"
                    max={maxCapacity}
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value <= maxCapacity && value >= 1) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
              />
              {errors.numberOfGuests && (
                <S.ErrorMessage>{errors.numberOfGuests.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Booking Type</S.Label>
              <Controller
                name="bookingType"
                control={control}
                render={({ field }) => (
                  <S.Select {...field} disabled value={bookingType}>
                    <option value="ROOM">Room</option>
                    <option value="APARTMENT">Apartment</option>
                  </S.Select>
                )}
              />
              {errors.bookingType && (
                <S.ErrorMessage>{errors.bookingType.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.ModalFooter>
              <S.CancelButton type="button" onClick={onClose}>
                Cancel
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={isLoading || !!apiError}>
                {isLoading ? "Creating..." : "Create Booking"}
              </S.SubmitButton>
            </S.ModalFooter>
          </form>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default Booking;
