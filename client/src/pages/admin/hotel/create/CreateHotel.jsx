// Styles && Icons && Upload-File
import { useState } from "react";
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
} from "./createHotel.style";
import {
  CheckCircle,
  FileText,
  Globe,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  Building2,
  AlertCircle,
} from "lucide-react";
import upload from "../../../../upload";

// Hook-Form && Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createHotelSchema } from "../../../../validation/hotel/hotel.validation";

// RTKQ
import { useCreateHotelMutation } from "../../../../store/hotel/hotelSlice";
import toast from "react-hot-toast";

function CreateHotel() {
  // States
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(createHotelSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      description: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      phoneNumber: "",
      imageUrl: "",
    },
  });

  // RTKQ
  const [createHotel, { isLoading, error: mutationError }] =
    useCreateHotelMutation();

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

  // Handle Create
  const onSubmit = async (data) => {
    setApiError(null);

    try {
      await createHotel(data).unwrap();

      toast.success("Hotel created successfully!");
      reset();
      setPreviewImage(null);
    } catch (error) {
      // Handle API errors
      console.error("Create hotel error:", error);

      let errorMessage = "Failed to create hotel. Please try again.";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.errors) {
        // Handle validation errors from backend
        const validationErrors = error.data.errors;
        errorMessage = Object.values(validationErrors).join(", ");
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setApiError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <PageContainer>
      <FormCard>
        <Header>
          <HeaderIcon size={48} />
          <Title>Create New Hotel</Title>
          <Subtitle>
            Fill in the details to add a new hotel to your platform
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
                  <UploadText>Click to upload hotel image</UploadText>
                  <UploadSubtext>PNG, JPG up to 10MB</UploadSubtext>
                </UploadPlaceholder>
              )}

              <HiddenFileInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading || isSubmitting || isLoading}
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
                disabled={isSubmitting || isLoading}
              />
              {errors.name && (
                <ErrorMessage>⚠ {errors.name.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <Mail size={18} />
                Email *
              </Label>
              <Input
                {...register("email")}
                type="email"
                error={errors.email}
                placeholder="contact@hotel.com"
                disabled={isSubmitting || isLoading}
              />
              {errors.email && (
                <ErrorMessage>⚠ {errors.email.message}</ErrorMessage>
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
                disabled={isSubmitting || isLoading}
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
                disabled={isSubmitting || isLoading}
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
                disabled={isSubmitting || isLoading}
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
                disabled={isSubmitting || isLoading}
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
              disabled={isSubmitting || isLoading}
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
              disabled={isSubmitting || isLoading}
            />
            {errors.description && (
              <ErrorMessage>⚠ {errors.description.message}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting || isUploading || isLoading}
          >
            {isSubmitting || isLoading ? (
              <>
                <SpinnerIcon size={20} />
                Creating Hotel...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Create Hotel
              </>
            )}
          </SubmitButton>
        </FormContainer>
      </FormCard>
    </PageContainer>
  );
}

export default CreateHotel;
