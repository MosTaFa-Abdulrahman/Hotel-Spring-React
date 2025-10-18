// Styles && Icons && Upload-File
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  FormCard,
  FormContainer,
  FormGrid,
  FormGroup,
  Header,
  HeaderIcon,
  HiddenFileInput,
  ImageUploadContainer,
  Input,
  Label,
  LoadingOverlay,
  PageContainer,
  PreviewImage,
  SpinnerIcon,
  SubmitButton,
  Subtitle,
  TextArea,
  Title,
  UploadIcon,
  UploadPlaceholder,
  UploadSubtext,
  UploadText,
  ErrorBox,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
} from "./updateHotel.style";
import {
  CheckCircle,
  FileText,
  Globe,
  Image as ImageIcon,
  Phone,
  MapPin,
  Building2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import upload from "../../../../upload";

// Hook-Form && Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateHotelSchema } from "../../../../validation/hotel/hotel.validation";

// RTKQ
import {
  useGetHotelQuery,
  useUpdateHotelMutation,
} from "../../../../store/hotel/hotelSlice";
import toast from "react-hot-toast";

function UpdateHotel() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  // States
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // RTKQ
  const {
    data: hotelData,
    isLoading: isFetching,
    error: fetchError,
  } = useGetHotelQuery(hotelId, {
    skip: !hotelId,
  });

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(updateHotelSchema),
    mode: "onBlur",
  });

  // RTKQ
  const [updateHotel, { isLoading: isUpdating }] = useUpdateHotelMutation();

  // Populate form with existing hotel data
  useEffect(() => {
    if (hotelData) {
      reset({
        name: hotelData.name || "",
        description: hotelData.description || "",
        address: hotelData.address || "",
        city: hotelData.city || "",
        country: hotelData.country || "",
        postalCode: hotelData.postalCode || "",
        phoneNumber: hotelData.phoneNumber || "",
        imageUrl: hotelData.imageUrl || "",
      });
      setPreviewImage(hotelData.imageUrl || null);
    }
  }, [hotelData, reset]);

  // Handle fetch error
  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to load hotel data");
      setApiError("Unable to load hotel information. Please try again.");
    }
  }, [fetchError]);

  // ******************************* ((Actions-Buttons)) ******************************************* //
  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsUploading(true);
    setApiError(null);

    try {
      const url = await upload(file);
      setValue("imageUrl", url, { shouldValidate: true });
      setPreviewImage(URL.createObjectURL(file));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Update
  const onSubmit = async (data) => {
    setApiError(null);

    try {
      await updateHotel({ hotelId, ...data }).unwrap();
      toast.success("Hotel updated successfully!");

      // Navigate back or to hotel details page
      setTimeout(() => {
        navigate(`/admin/hotels/${hotelId}`); // Adjust route as needed
      }, 1500);
    } catch (error) {
      console.error("Update hotel error:", error);

      let errorMessage = "Failed to update hotel. Please try again.";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.errors) {
        const validationErrors = error.data.errors;
        errorMessage = Object.values(validationErrors).join(", ");
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setApiError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Loading && Error
  if (isFetching) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingSpinner size={48} />
          <LoadingText>Loading hotel information...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }
  if (fetchError && !hotelData) {
    return (
      <PageContainer>
        <FormCard>
          <ErrorBox>
            <AlertCircle size={24} />
            <div>
              <strong>Hotel Not Found</strong>
              <p style={{ marginTop: "8px" }}>
                The hotel you're trying to edit doesn't exist or has been
                deleted.
              </p>
            </div>
          </ErrorBox>
          <SubmitButton
            type="button"
            onClick={() => navigate("/admin/hotels")}
            style={{ marginTop: "20px" }}
          >
            <ArrowLeft size={20} />
            Back to Hotels
          </SubmitButton>
        </FormCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormCard>
        <Header>
          <HeaderIcon size={48} />
          <Title>Update Hotel</Title>
          <Subtitle>
            Edit the details of {hotelData?.name || "your hotel"}
          </Subtitle>
        </Header>

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          {/* API Error Display */}
          {apiError && (
            <ErrorBox>
              <AlertCircle size={20} />
              <span>{apiError}</span>
            </ErrorBox>
          )}

          {/* Image Upload */}
          <FormGroup fullWidth>
            <Label>
              <ImageIcon size={18} />
              Hotel Image *
            </Label>
            <ImageUploadContainer
              error={errors.imageUrl}
              hasImage={previewImage}
            >
              {previewImage ? (
                <PreviewImage src={previewImage} alt="Hotel preview" />
              ) : (
                <UploadPlaceholder>
                  <UploadIcon size={48} />
                  <UploadText>Click to upload new hotel image</UploadText>
                  <UploadSubtext>PNG, JPG up to 10MB</UploadSubtext>
                </UploadPlaceholder>
              )}

              <HiddenFileInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading || isSubmitting || isUpdating}
              />

              {isUploading && (
                <LoadingOverlay>
                  <SpinnerIcon size={40} />
                  <span>Uploading image...</span>
                </LoadingOverlay>
              )}
            </ImageUploadContainer>
            {errors.imageUrl && (
              <ErrorMessage>⚠ {errors.imageUrl.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Form Fields */}
          <FormGrid>
            <FormGroup>
              <Label>
                <Building2 size={18} />
                Hotel Name *
              </Label>
              <Input
                {...register("name")}
                error={errors.name}
                placeholder="Grand Plaza Hotel"
                disabled={isSubmitting || isUpdating}
              />
              {errors.name && (
                <ErrorMessage>⚠ {errors.name.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <Phone size={18} />
                Phone Number *
              </Label>
              <Input
                {...register("phoneNumber")}
                error={errors.phoneNumber}
                placeholder="+1 234 567 8900"
                disabled={isSubmitting || isUpdating}
              />
              {errors.phoneNumber && (
                <ErrorMessage>⚠ {errors.phoneNumber.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <MapPin size={18} />
                City *
              </Label>
              <Input
                {...register("city")}
                error={errors.city}
                placeholder="New York"
                disabled={isSubmitting || isUpdating}
              />
              {errors.city && (
                <ErrorMessage>⚠ {errors.city.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <Globe size={18} />
                Country *
              </Label>
              <Input
                {...register("country")}
                error={errors.country}
                placeholder="United States"
                disabled={isSubmitting || isUpdating}
              />
              {errors.country && (
                <ErrorMessage>⚠ {errors.country.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <MapPin size={18} />
                Postal Code *
              </Label>
              <Input
                {...register("postalCode")}
                error={errors.postalCode}
                placeholder="10001"
                disabled={isSubmitting || isUpdating}
              />
              {errors.postalCode && (
                <ErrorMessage>⚠ {errors.postalCode.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormGrid>

          <FormGroup fullWidth>
            <Label>
              <MapPin size={18} />
              Address *
            </Label>
            <Input
              {...register("address")}
              error={errors.address}
              placeholder="123 Main Street"
              disabled={isSubmitting || isUpdating}
            />
            {errors.address && (
              <ErrorMessage>⚠ {errors.address.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup fullWidth>
            <Label>
              <FileText size={18} />
              Description *
            </Label>
            <TextArea
              {...register("description")}
              error={errors.description}
              placeholder="Describe your hotel, amenities, and what makes it special..."
              disabled={isSubmitting || isUpdating}
            />
            {errors.description && (
              <ErrorMessage>⚠ {errors.description.message}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting || isUploading || isUpdating}
          >
            {isSubmitting || isUpdating ? (
              <>
                <SpinnerIcon size={20} />
                Updating Hotel...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Update Hotel
              </>
            )}
          </SubmitButton>
        </FormContainer>
      </FormCard>
    </PageContainer>
  );
}

export default UpdateHotel;
