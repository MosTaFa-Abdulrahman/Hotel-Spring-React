import * as S from "./user.style";
import { useContext, useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Edit,
  X,
  Loader,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Users,
  BanknoteIcon,
  Hotel,
  Building,
  AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import upload from "../../upload";

// Hook-Form && Zod
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../validation/user/user.validation";
import { payShortageSchema } from "../../validation/payment/payment.validation";

// Context && RTKQ
import { AuthContext } from "../../context/AuthContext";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/user/userSlice";
import {
  useGetBookingsForUserQuery,
  useCancelBookingMutation,
} from "../../store/booking/bookingSlice";
import { usePayShortageMutation } from "../../store/payment/paymentSlice";
import toast from "react-hot-toast";

function User() {
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);

  // State Management
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [bookingsPage, setBookingsPage] = useState(1);
  const pageSize = 10;

  // RTK Queries
  const { data: user, isLoading: userLoading } = useGetUserByIdQuery(userId);
  const { data: bookingsData, isLoading: bookingsLoading } =
    useGetBookingsForUserQuery({
      userId,
      page: bookingsPage,
      size: pageSize,
    });

  // RTK Mutations
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const [payShortage, { isLoading: paying }] = usePayShortageMutation();

  // Forms
  const {
    control: updateControl,
    handleSubmit: handleUpdateSubmit,
    formState: { errors: updateErrors },
    setValue: setUpdateValue,
    reset: resetUpdate,
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      profileImageUrl: "",
    },
  });

  const {
    control: paymentControl,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    reset: resetPayment,
  } = useForm({
    resolver: zodResolver(payShortageSchema),
  });

  // Handlers
  const handleOpenUpdateModal = () => {
    if (user) {
      resetUpdate({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        profileImageUrl: user.profileImageUrl || "",
      });
    }
    setShowUpdateModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await upload(file);
      setUpdateValue("profileImageUrl", url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const onUpdateUser = async (data) => {
    try {
      // Only send fields that have values
      const updateData = {};
      if (data.firstName?.trim()) updateData.firstName = data.firstName;
      if (data.lastName?.trim()) updateData.lastName = data.lastName;
      if (data.phoneNumber?.trim()) updateData.phoneNumber = data.phoneNumber;
      if (data.profileImageUrl?.trim())
        updateData.profileImageUrl = data.profileImageUrl;

      if (Object.keys(updateData).length === 0) {
        toast.error("Please update at least one field");
        return;
      }

      await updateUser({ userId, ...updateData }).unwrap();
      toast.success("Profile updated successfully!");
      setShowUpdateModal(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await cancelBooking(bookingId).unwrap();
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to cancel booking");
    }
  };

  const handleOpenPaymentModal = (booking) => {
    setSelectedBooking(booking);
    resetPayment({
      paymnetId: booking.paymentId,
      shortageAmount: booking.shortageAmount,
    });
    setShowPaymentModal(true);
  };

  const onPayShortage = async (data) => {
    try {
      await payShortage({
        paymentId: data.paymnetId,
        shortageAmount: data.shortageAmount,
      }).unwrap();
      toast.success("Payment completed successfully!");
      setShowPaymentModal(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to process payment");
    }
  };

  const getBookingStatusColor = (status) => {
    const colors = {
      PENDING: "#FFA500",
      CONFIRMED: "#4CAF50",
      CANCELLED: "#F44336",
      COMPLETED: "#2196F3",
      PARTIAL_PAYMENT: "#FF9800",
    };
    return colors[status] || "#757575";
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      PENDING: "#FFA500",
      PAID: "#4CAF50",
      REFUNDED: "#9C27B0",
    };
    return colors[status] || "#757575";
  };

  if (userLoading) {
    return (
      <S.LoadingContainer>
        <Loader size={48} />
        <p>Loading user profile...</p>
      </S.LoadingContainer>
    );
  }

  if (!user) {
    return (
      <S.ErrorContainer>
        <p>User not found</p>
      </S.ErrorContainer>
    );
  }

  const bookings = bookingsData?.data?.content || [];
  const bookingsTotalPages = bookingsData?.data?.totalPages || 1;

  return (
    <S.Container>
      {/* User Profile Section */}
      <S.ProfileCard>
        <S.ProfileHeader>
          <S.ProfileImageSection>
            <S.ProfileImage
              src={user.profileImageUrl || "/default-avatar.png"}
              alt={`${user.firstName} ${user.lastName}`}
            />
          </S.ProfileImageSection>
          <S.ProfileInfo>
            <S.ProfileName>
              {user.firstName} {user.lastName}
            </S.ProfileName>
            <S.ProfileDetail>
              <Mail size={16} />
              <span>{user.email}</span>
            </S.ProfileDetail>
            {user.phoneNumber && (
              <S.ProfileDetail>
                <Phone size={16} />
                <span>{user.phoneNumber}</span>
              </S.ProfileDetail>
            )}
            <S.ProfileDetail>
              <Calendar size={16} />
              <span>
                Joined {new Date(user.createdDate).toLocaleDateString()}
              </span>
            </S.ProfileDetail>
          </S.ProfileInfo>
          {currentUser?.id === userId && (
            <S.EditButton onClick={handleOpenUpdateModal}>
              <Edit size={20} />
              Edit Profile
            </S.EditButton>
          )}
        </S.ProfileHeader>
      </S.ProfileCard>

      {/* Bookings Section */}
      <S.Section>
        <S.SectionHeader>
          <h2>My Bookings</h2>
        </S.SectionHeader>
        {bookingsLoading ? (
          <S.LoadingContainer>
            <Loader size={32} />
          </S.LoadingContainer>
        ) : bookings.length === 0 ? (
          <S.EmptyState>No bookings found</S.EmptyState>
        ) : (
          <>
            <S.BookingsGrid>
              {bookings.map((booking) => (
                <S.BookingCard key={booking.id}>
                  <S.BookingImage
                    src={
                      booking.apartmentImgUrl ||
                      booking.roomImgUrl ||
                      booking.hotelImgUrl ||
                      "/default-hotel.jpg"
                    }
                    alt={booking.apartmentName || booking.roomNumber}
                  />
                  <S.BookingContent>
                    <S.BookingHeader>
                      <S.BookingTitle>
                        <Hotel size={20} />
                        {booking.hotelName}
                      </S.BookingTitle>
                      <S.BookingStatus
                        color={getBookingStatusColor(booking.status)}
                      >
                        {booking.status.replace("_", " ")}
                      </S.BookingStatus>
                    </S.BookingHeader>

                    <S.BookingInfo>
                      <S.InfoRow>
                        <MapPin size={16} />
                        <span>
                          {booking.hotelCity}, {booking.hotelCountry}
                        </span>
                      </S.InfoRow>
                      {booking.isApartmentBooking && (
                        <S.InfoRow>
                          <Building size={16} />
                          <span>
                            {booking.apartmentName} - #{booking.apartmentNumber}
                          </span>
                        </S.InfoRow>
                      )}
                      {booking.isRoomBooking && (
                        <S.InfoRow>
                          <Building size={16} />
                          <span>Room #{booking.roomNumber}</span>
                        </S.InfoRow>
                      )}
                      <S.InfoRow>
                        <Calendar size={16} />
                        <span>
                          {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                          {new Date(booking.checkOutDate).toLocaleDateString()}
                        </span>
                      </S.InfoRow>
                      <S.InfoRow>
                        <Users size={16} />
                        <span>{booking.numberOfGuests} Guests</span>
                      </S.InfoRow>
                      <S.InfoRow>
                        <BanknoteIcon size={16} />
                        <span>
                          $
                          {booking.apartmentPricePerNight ||
                            booking.roomPricePerNight}{" "}
                          / night
                        </span>
                      </S.InfoRow>
                    </S.BookingInfo>

                    {/* Payment Information */}
                    {!booking.status === "CANCELLED" && (
                      <S.PaymentInfoBox>
                        <S.PaymentInfoHeader>
                          <S.PaymentStatusBadge
                            color={getPaymentStatusColor(booking.paymentStatus)}
                          >
                            {booking.paymentStatus || "PENDING"}
                          </S.PaymentStatusBadge>
                        </S.PaymentInfoHeader>

                        <S.PaymentDetails>
                          <S.PaymentDetailRow>
                            <span>Paid Amount:</span>
                            <strong>${booking?.paidAmount || 0} </strong>
                          </S.PaymentDetailRow>
                          <S.PaymentDetailRow>
                            <span>Expected Amount:</span>
                            <strong>${booking.expectedAmount}</strong>
                          </S.PaymentDetailRow>
                          {booking.hasShortage && (
                            <S.PaymentDetailRow highlight>
                              <span>Shortage:</span>
                              <strong style={{ color: "#F44336" }}>
                                ${booking.shortageAmount}
                              </strong>
                            </S.PaymentDetailRow>
                          )}
                        </S.PaymentDetails>

                        {/* Pay Shortage Button */}
                        {(booking.hasShortage ||
                          booking.paymentStatus === "REFUNDED" ||
                          booking.status === "PENDING") && (
                          <S.PayShortageButton
                            onClick={() => handleOpenPaymentModal(booking)}
                          >
                            <CreditCard size={18} />
                            Pay Shortage (${booking.shortageAmount})
                          </S.PayShortageButton>
                        )}
                      </S.PaymentInfoBox>
                    )}

                    {/* Cancel Booking Button */}
                    {booking.status === "PENDING" && (
                      <S.CancelButton
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </S.CancelButton>
                    )}
                  </S.BookingContent>
                </S.BookingCard>
              ))}
            </S.BookingsGrid>
            {bookingsTotalPages > 1 && (
              <S.Pagination>
                <S.PaginationButton
                  onClick={() => setBookingsPage((p) => Math.max(1, p - 1))}
                  disabled={bookingsPage === 1}
                >
                  <ChevronLeft size={20} />
                  Previous
                </S.PaginationButton>
                <S.PageInfo>
                  Page {bookingsPage} of {bookingsTotalPages}
                </S.PageInfo>
                <S.PaginationButton
                  onClick={() =>
                    setBookingsPage((p) => Math.min(bookingsTotalPages, p + 1))
                  }
                  disabled={bookingsPage === bookingsTotalPages}
                >
                  Next
                  <ChevronRight size={20} />
                </S.PaginationButton>
              </S.Pagination>
            )}
          </>
        )}
      </S.Section>

      {/* Update User Modal */}
      {showUpdateModal && (
        <S.Modal onClick={() => setShowUpdateModal(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h2>Update Profile</h2>
              <S.CloseButton onClick={() => setShowUpdateModal(false)}>
                <X size={24} />
              </S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <form onSubmit={handleUpdateSubmit(onUpdateUser)}>
                <S.FormGroup>
                  <S.Label>First Name</S.Label>
                  <Controller
                    name="firstName"
                    control={updateControl}
                    render={({ field }) => (
                      <S.Input {...field} placeholder="Enter first name" />
                    )}
                  />
                  {updateErrors.firstName && (
                    <S.ErrorText>{updateErrors.firstName.message}</S.ErrorText>
                  )}
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label>Last Name</S.Label>
                  <Controller
                    name="lastName"
                    control={updateControl}
                    render={({ field }) => (
                      <S.Input {...field} placeholder="Enter last name" />
                    )}
                  />
                  {updateErrors.lastName && (
                    <S.ErrorText>{updateErrors.lastName.message}</S.ErrorText>
                  )}
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label>Phone Number</S.Label>
                  <Controller
                    name="phoneNumber"
                    control={updateControl}
                    render={({ field }) => (
                      <S.Input
                        {...field}
                        placeholder="010XXXXXXXX"
                        type="tel"
                      />
                    )}
                  />
                  {updateErrors.phoneNumber && (
                    <S.ErrorText>
                      {updateErrors.phoneNumber.message}
                    </S.ErrorText>
                  )}
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label>Profile Image</S.Label>
                  <S.FileInputWrapper>
                    <S.FileInput
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && <Loader size={20} />}
                  </S.FileInputWrapper>
                </S.FormGroup>

                <S.ModalActions>
                  <S.CancelButtonModal
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </S.CancelButtonModal>
                  <S.SubmitButton type="submit" disabled={updating}>
                    {updating ? <Loader size={20} /> : "Update Profile"}
                  </S.SubmitButton>
                </S.ModalActions>
              </form>
            </S.ModalBody>
          </S.ModalContent>
        </S.Modal>
      )}

      {/* Pay Shortage Modal */}
      {showPaymentModal && selectedBooking && (
        <S.Modal onClick={() => setShowPaymentModal(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h2>Pay Shortage</h2>
              <S.CloseButton onClick={() => setShowPaymentModal(false)}>
                <X size={24} />
              </S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.PaymentSummary>
                <S.BookingSummaryInfo>
                  <AlertCircle size={20} color="#F44336" />
                  <span>Complete your booking payment</span>
                </S.BookingSummaryInfo>

                <S.SummaryRow>
                  <span>Hotel:</span>
                  <span>{selectedBooking.hotelName}</span>
                </S.SummaryRow>
                <S.SummaryRow>
                  <span>Check-in:</span>
                  <span>
                    {new Date(selectedBooking.checkInDate).toLocaleDateString()}
                  </span>
                </S.SummaryRow>
                <S.SummaryRow>
                  <span>Check-out:</span>
                  <span>
                    {new Date(
                      selectedBooking.checkOutDate
                    ).toLocaleDateString()}
                  </span>
                </S.SummaryRow>
                <S.Divider />
                <S.SummaryRow>
                  <span>Amount Already Paid:</span>
                  <strong>${selectedBooking.paidAmount}</strong>
                </S.SummaryRow>
                <S.SummaryRow>
                  <span>Total Expected:</span>
                  <strong>${selectedBooking.expectedAmount}</strong>
                </S.SummaryRow>
                <S.SummaryRow highlight>
                  <span>Remaining Balance:</span>
                  <strong style={{ color: "#F44336" }}>
                    ${selectedBooking.shortageAmount}
                  </strong>
                </S.SummaryRow>
              </S.PaymentSummary>

              <form onSubmit={handlePaymentSubmit(onPayShortage)}>
                <Controller
                  name="paymnetId"
                  control={paymentControl}
                  render={({ field }) => <input type="hidden" {...field} />}
                />

                <S.FormGroup>
                  <S.Label>Amount to Pay</S.Label>
                  <Controller
                    name="shortageAmount"
                    control={paymentControl}
                    render={({ field }) => (
                      <S.Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                      />
                    )}
                  />
                  {paymentErrors.shortageAmount && (
                    <S.ErrorText>
                      {paymentErrors.shortageAmount.message}
                    </S.ErrorText>
                  )}
                </S.FormGroup>

                <S.ModalActions>
                  <S.CancelButtonModal
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Cancel
                  </S.CancelButtonModal>
                  <S.SubmitButton type="submit" disabled={paying}>
                    {paying ? <Loader size={20} /> : "Pay Now"}
                  </S.SubmitButton>
                </S.ModalActions>
              </form>
            </S.ModalBody>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
}

export default User;
