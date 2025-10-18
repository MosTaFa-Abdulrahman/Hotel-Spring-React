import * as S from "./payment.style";
import { X, CreditCard, FileText, DollarSign } from "lucide-react";
import { useEffect } from "react";

// React-Hook-Form && Zod
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPaymentSchema } from "../../validation/payment/payment.validation";

// RTKQ
import { useCreatePaymentMutation } from "../../store/payment/paymentSlice";
import toast from "react-hot-toast";

// From ((RoomCard.jsx -> Component))
// From ((Apartment.jsx -> Page))
function Payment({ isOpen, onClose, bookingId, maxPrice, onSuccess }) {
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      bookingId: "",
      amount: "",
      notes: "",
    },
  });

  // Update bookingId when it changes or modal opens
  useEffect(() => {
    if (isOpen && bookingId) {
      setValue("bookingId", bookingId);
    }
  }, [isOpen, bookingId, setValue]);

  // Handle Create Payment
  const onSubmit = async (data) => {
    try {
      // Validate amount against maxPrice
      if (maxPrice && Number(data.amount) > maxPrice) {
        toast.error(`Amount cannot exceed $${maxPrice}`);
        return;
      }

      const formattedData = {
        bookingId: data.bookingId,
        amount: Number(data.amount),
        notes: data.notes || null,
      };

      await createPayment(formattedData).unwrap();
      reset();

      // Call onSuccess callback
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Failed to create payment:", error);

      // Show error to user
      if (error?.data?.errors && error.data.errors.length > 0) {
        toast.error(error.data.errors[0].message);
      } else if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to create payment. Please try again.");
      }
    }
  };

  // Handle modal close
  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Create Payment</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>
            <X size={24} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.FormGroup>
              <S.Label>
                <CreditCard size={18} />
                Booking ID
              </S.Label>
              <Controller
                name="bookingId"
                control={control}
                render={({ field }) => <S.Input {...field} disabled readOnly />}
              />
              {errors.bookingId && (
                <S.ErrorMessage>{errors.bookingId.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                <DollarSign size={18} />
                Amount {maxPrice && `(Max: $${maxPrice})`}
              </S.Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <S.Input
                    type="number"
                    step="1"
                    placeholder="0.00"
                    min="0"
                    max={maxPrice || undefined}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow empty value for clearing
                      if (value === "") {
                        field.onChange("");
                        return;
                      }

                      const numValue = Number(value);

                      // Validate against maxPrice if provided
                      if (maxPrice && numValue > maxPrice) {
                        // Don't update if exceeds max
                        return;
                      }

                      // Validate minimum
                      if (numValue >= 0) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
              />
              {errors.amount && (
                <S.ErrorMessage>{errors.amount.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                <FileText size={18} />
                Notes (Optional)
              </S.Label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <S.Textarea
                    rows="4"
                    placeholder="Add any notes about this payment..."
                    {...field}
                  />
                )}
              />
              {errors.notes && (
                <S.ErrorMessage>{errors.notes.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.ModalFooter>
              <S.CancelButton type="button" onClick={handleClose}>
                Cancel
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Create Payment"}
              </S.SubmitButton>
            </S.ModalFooter>
          </form>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default Payment;
