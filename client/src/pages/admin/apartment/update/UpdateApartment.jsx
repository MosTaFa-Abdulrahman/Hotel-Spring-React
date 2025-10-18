// Styles && Icons && Upload-File && Dummy-Data
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PageContainer,
  FormCard,
  Header,
  HeaderIcon,
  Title,
  Subtitle,
  FormContainer,
  SectionTitle,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  ErrorMessage,
  ErrorBox,
  ImageUploadContainer,
  PreviewImage,
  UploadPlaceholder,
  UploadIcon,
  UploadText,
  UploadSubtext,
  HiddenFileInput,
  LoadingOverlay,
  SubmitButton,
  SpinnerIcon,
  LoadingState,
  LoadingSpinner,
  LoadingText,
} from "./updateApartment.style";
import {
  CheckCircle,
  Image as ImageIcon,
  DollarSign,
  Users,
  Bed,
  Bath,
  Layers,
  Maximize,
  Settings,
  Building2,
  AlertCircle,
  Info,
  Wifi,
  Wind,
  Car,
  Home as HomeIcon,
  ArrowLeft,
} from "lucide-react";
import upload from "../../../../upload";
import { apartmentTypes } from "../../../../dummyData";

// Hook-Form && Zod
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateApartmentSchema } from "../../../../validation/apartment/apartment.validation";

// RTKQ
import {
  useGetApartmentQuery,
  useUpdateApartmentMutation,
} from "../../../../store/apartment/apartmentSlice";
import toast from "react-hot-toast";

function UpdateApartment() {
  const { apartmentId } = useParams();
  const navigate = useNavigate();

  // States
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch apartment data
  const {
    data: apartmentData,
    isLoading: isLoadingApartment,
    isError: isErrorApartment,
    error: apartmentError,
  } = useGetApartmentQuery(apartmentId);

  // Hook-Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(updateApartmentSchema),
    mode: "onBlur",
  });

  // RTKQ
  const [updateApartment, { isLoading }] = useUpdateApartmentMutation();

  // Populate form with apartment data
  useEffect(() => {
    if (apartmentData) {
      reset({
        apartmentNumber: apartmentData.apartmentNumber || "",
        name: apartmentData.name || "",
        description: apartmentData.description || "",
        imageUrl: apartmentData.imageUrl || "",
        pricePerNight: apartmentData.pricePerNight?.toString() || "",
        totalCapacity: apartmentData.totalCapacity?.toString() || "",
        numberOfBedrooms: apartmentData.numberOfBedrooms?.toString() || "",
        numberOfBathrooms: apartmentData.numberOfBathrooms?.toString() || "",
        floorNumber: apartmentData.floorNumber?.toString() || "",
        areaSqm: apartmentData.areaSqm?.toString() || "",
        roomsBookableSeparately: apartmentData.roomsBookableSeparately || false,
        hasKitchen: apartmentData.hasKitchen || false,
        hasLivingRoom: apartmentData.hasLivingRoom || false,
        hasDiningArea: apartmentData.hasDiningArea || false,
        hasBalcony: apartmentData.hasBalcony || false,
        hasWifi: apartmentData.hasWifi || false,
        hasAirConditioning: apartmentData.hasAirConditioning || false,
        hasParking: apartmentData.hasParking || false,
        hasLaundry: apartmentData.hasLaundry || false,
        apartmentType: apartmentData.apartmentType || "",
        isAvailable: apartmentData.isAvailable ?? true,
      });

      if (apartmentData.imageUrl) {
        setPreviewImage(apartmentData.imageUrl);
      }
    }
  }, [apartmentData, reset]);

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
      setPreviewImage(url);
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

    // Only include changed fields
    const changedData = {};

    if (data.apartmentNumber !== apartmentData.apartmentNumber) {
      changedData.apartmentNumber = data.apartmentNumber;
    }
    if (data.name !== apartmentData.name) {
      changedData.name = data.name;
    }
    if (data.description !== apartmentData.description) {
      changedData.description = data.description;
    }
    if (data.imageUrl !== apartmentData.imageUrl) {
      changedData.imageUrl = data.imageUrl;
    }
    if (
      data.pricePerNight &&
      parseFloat(data.pricePerNight) !== apartmentData.pricePerNight
    ) {
      changedData.pricePerNight = parseFloat(data.pricePerNight);
    }
    if (
      data.totalCapacity &&
      parseInt(data.totalCapacity) !== apartmentData.totalCapacity
    ) {
      changedData.totalCapacity = parseInt(data.totalCapacity);
    }
    if (
      data.numberOfBedrooms &&
      parseInt(data.numberOfBedrooms) !== apartmentData.numberOfBedrooms
    ) {
      changedData.numberOfBedrooms = parseInt(data.numberOfBedrooms);
    }
    if (
      data.numberOfBathrooms &&
      parseInt(data.numberOfBathrooms) !== apartmentData.numberOfBathrooms
    ) {
      changedData.numberOfBathrooms = parseInt(data.numberOfBathrooms);
    }
    if (
      data.floorNumber &&
      parseInt(data.floorNumber) !== apartmentData.floorNumber
    ) {
      changedData.floorNumber = parseInt(data.floorNumber);
    }
    if (data.areaSqm && parseFloat(data.areaSqm) !== apartmentData.areaSqm) {
      changedData.areaSqm = parseFloat(data.areaSqm);
    }
    if (data.apartmentType !== apartmentData.apartmentType) {
      changedData.apartmentType = data.apartmentType;
    }

    // Boolean fields
    if (data.isAvailable !== apartmentData.isAvailable) {
      changedData.isAvailable = data.isAvailable;
    }
    if (
      data.roomsBookableSeparately !== apartmentData.roomsBookableSeparately
    ) {
      changedData.roomsBookableSeparately = data.roomsBookableSeparately;
    }
    if (data.hasKitchen !== apartmentData.hasKitchen) {
      changedData.hasKitchen = data.hasKitchen;
    }
    if (data.hasLivingRoom !== apartmentData.hasLivingRoom) {
      changedData.hasLivingRoom = data.hasLivingRoom;
    }
    if (data.hasDiningArea !== apartmentData.hasDiningArea) {
      changedData.hasDiningArea = data.hasDiningArea;
    }
    if (data.hasBalcony !== apartmentData.hasBalcony) {
      changedData.hasBalcony = data.hasBalcony;
    }
    if (data.hasWifi !== apartmentData.hasWifi) {
      changedData.hasWifi = data.hasWifi;
    }
    if (data.hasAirConditioning !== apartmentData.hasAirConditioning) {
      changedData.hasAirConditioning = data.hasAirConditioning;
    }
    if (data.hasParking !== apartmentData.hasParking) {
      changedData.hasParking = data.hasParking;
    }
    if (data.hasLaundry !== apartmentData.hasLaundry) {
      changedData.hasLaundry = data.hasLaundry;
    }

    try {
      await updateApartment({ apartmentId, ...changedData }).unwrap();
      toast.success("Apartment updated successfully!");
      // setTimeout(() => {
      //   navigate("/apartments");
      // }, 1500);
    } catch (error) {
      console.error("Update apartment error:", error);

      let errorMessage = "Failed to update apartment. Please try again.";

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
  if (isLoadingApartment) {
    return (
      <PageContainer>
        <LoadingState>
          <LoadingSpinner size={48} />
          <LoadingText>Loading apartment data...</LoadingText>
        </LoadingState>
      </PageContainer>
    );
  }
  if (isErrorApartment) {
    return (
      <PageContainer>
        <FormCard>
          <ErrorBox>
            <AlertCircle size={20} />
            <span>
              {apartmentError?.data?.message ||
                "Failed to load apartment data. Please try again."}
            </span>
          </ErrorBox>
          <SubmitButton onClick={() => navigate("/apartments")}>
            <ArrowLeft size={20} />
            Back to Apartments
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
          <Title>Update Apartment</Title>
          <Subtitle>
            Modify the details of apartment {apartmentData?.apartmentNumber}
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

          {/* Hotel Selection */}
          <SectionTitle>
            <Building2 size={22} />
            Hotel Information
          </SectionTitle>

          <FormGroup fullWidth>
            <Label>
              <Building2 size={18} />
              Current Hotel:{" "}
              <span style={{ color: "purple" }}>{apartmentData.hotelName}</span>
            </Label>
          </FormGroup>

          {/* Basic Information */}
          <SectionTitle>
            <Info size={22} />
            Basic Information
          </SectionTitle>

          <FormGrid>
            <FormGroup>
              <Label>
                <HomeIcon size={18} />
                Apartment Number
              </Label>
              <Input
                {...register("apartmentNumber")}
                error={errors.apartmentNumber}
                placeholder="A101"
                disabled={isSubmitting || isLoading}
              />
              {errors.apartmentNumber && (
                <ErrorMessage>⚠ {errors.apartmentNumber.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <HomeIcon size={18} />
                Apartment Type
              </Label>
              <Select
                {...register("apartmentType")}
                error={errors.apartmentType}
                disabled={isSubmitting || isLoading}
              >
                <option value="">Select type</option>
                {apartmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              {errors.apartmentType && (
                <ErrorMessage>⚠ {errors.apartmentType.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormGrid>

          <FormGroup fullWidth>
            <Label>
              <HomeIcon size={18} />
              Apartment Name
            </Label>
            <Input
              {...register("name")}
              error={errors.name}
              placeholder="Luxury Penthouse Suite"
              disabled={isSubmitting || isLoading}
            />
            {errors.name && (
              <ErrorMessage>⚠ {errors.name.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup fullWidth>
            <Label>
              <Info size={18} />
              Description
            </Label>
            <TextArea
              {...register("description")}
              error={errors.description}
              placeholder="Describe the apartment, its features, amenities, and what makes it special..."
              disabled={isSubmitting || isLoading}
            />
            {errors.description && (
              <ErrorMessage>⚠ {errors.description.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Image Upload */}
          <FormGroup fullWidth>
            <Label>
              <ImageIcon size={18} />
              Apartment Image
            </Label>
            <ImageUploadContainer
              error={errors.imageUrl}
              hasImage={previewImage}
            >
              {previewImage ? (
                <PreviewImage src={previewImage} alt="Apartment preview" />
              ) : (
                <UploadPlaceholder>
                  <UploadIcon size={48} />
                  <UploadText>Click to upload apartment image</UploadText>
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

          {/* Pricing & Capacity */}
          <SectionTitle>
            <DollarSign size={22} />
            Pricing & Capacity
          </SectionTitle>

          <FormGrid>
            <FormGroup>
              <Label>
                <DollarSign size={18} />
                Price Per Night
              </Label>
              <Input
                {...register("pricePerNight")}
                type="number"
                step="0.01"
                error={errors.pricePerNight}
                placeholder="150.00"
                disabled={isSubmitting || isLoading}
              />
              {errors.pricePerNight && (
                <ErrorMessage>⚠ {errors.pricePerNight.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <Users size={18} />
                Total Capacity
              </Label>
              <Input
                {...register("totalCapacity")}
                type="number"
                error={errors.totalCapacity}
                placeholder="4"
                disabled={isSubmitting || isLoading}
              />
              {errors.totalCapacity && (
                <ErrorMessage>⚠ {errors.totalCapacity.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormGrid>

          {/* Room Details */}
          <SectionTitle>
            <Bed size={22} />
            Room Details
          </SectionTitle>

          <FormGrid columns="repeat(3, 1fr)">
            <FormGroup>
              <Label>
                <Bed size={18} />
                Bedrooms
              </Label>
              <Input
                {...register("numberOfBedrooms")}
                type="number"
                error={errors.numberOfBedrooms}
                placeholder="2"
                disabled={isSubmitting || isLoading}
              />
              {errors.numberOfBedrooms && (
                <ErrorMessage>⚠ {errors.numberOfBedrooms.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <Bath size={18} />
                Bathrooms
              </Label>
              <Input
                {...register("numberOfBathrooms")}
                type="number"
                error={errors.numberOfBathrooms}
                placeholder="2"
                disabled={isSubmitting || isLoading}
              />
              {errors.numberOfBathrooms && (
                <ErrorMessage>
                  ⚠ {errors.numberOfBathrooms.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <Layers size={18} />
                Floor Number
              </Label>
              <Input
                {...register("floorNumber")}
                type="number"
                error={errors.floorNumber}
                placeholder="5"
                disabled={isSubmitting || isLoading}
              />
              {errors.floorNumber && (
                <ErrorMessage>⚠ {errors.floorNumber.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label>
              <Maximize size={18} />
              Area (sqm)
            </Label>
            <Input
              {...register("areaSqm")}
              type="number"
              step="0.01"
              error={errors.areaSqm}
              placeholder="75.50"
              disabled={isSubmitting || isLoading}
            />
            {errors.areaSqm && (
              <ErrorMessage>⚠ {errors.areaSqm.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Availability Status */}
          <SectionTitle>
            <Settings size={22} />
            Availability Status
          </SectionTitle>

          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="isAvailable"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={isSubmitting || isLoading}
                />
                <CheckboxLabel htmlFor="isAvailable">
                  Apartment is Available for Booking
                </CheckboxLabel>
              </CheckboxContainer>
            )}
          />

          {/* Amenities & Features */}
          <SectionTitle>
            <Settings size={22} />
            Amenities & Features
          </SectionTitle>

          <FormGrid columns="repeat(2, 1fr)">
            <Controller
              name="roomsBookableSeparately"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="roomsBookableSeparately"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="roomsBookableSeparately">
                    Rooms Bookable Separately
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasKitchen"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasKitchen"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasKitchen">Kitchen</CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasLivingRoom"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasLivingRoom"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasLivingRoom">
                    Living Room
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasDiningArea"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasDiningArea"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasDiningArea">
                    Dining Area
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasBalcony"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasBalcony"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasBalcony">Balcony</CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasWifi"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasWifi"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasWifi">
                    <Wifi
                      size={16}
                      style={{ display: "inline", marginRight: "4px" }}
                    />
                    WiFi
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasAirConditioning"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasAirConditioning"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasAirConditioning">
                    <Wind
                      size={16}
                      style={{ display: "inline", marginRight: "4px" }}
                    />
                    Air Conditioning
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasParking"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasParking"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasParking">
                    <Car
                      size={16}
                      style={{ display: "inline", marginRight: "4px" }}
                    />
                    Parking
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasLaundry"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasLaundry"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasLaundry">Laundry</CheckboxLabel>
                </CheckboxContainer>
              )}
            />
          </FormGrid>

          <FormGrid columns="repeat(2, 1fr)">
            <SubmitButton
              type="button"
              onClick={() => navigate("/apartments")}
              disabled={isSubmitting || isLoading}
              style={{
                background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
              }}
            >
              <ArrowLeft size={20} />
              <span>Cancel</span>
            </SubmitButton>

            <SubmitButton
              type="submit"
              disabled={isSubmitting || isUploading || isLoading}
            >
              {isSubmitting || isLoading ? (
                <>
                  <SpinnerIcon size={20} />
                  <span>Updating Apartment...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Update Apartment</span>
                </>
              )}
            </SubmitButton>
          </FormGrid>
        </FormContainer>
      </FormCard>
    </PageContainer>
  );
}

export default UpdateApartment;
