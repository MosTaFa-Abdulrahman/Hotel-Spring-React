// Styles && Icons && Upload-File && Dummy-Data
import { useState, useEffect } from "react";
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
  SearchContainer,
  SearchInputWrapper,
  SearchIcon,
  SearchInput,
  SearchResults,
  SearchResultItem,
  HotelName,
  HotelDetails,
  NoResults,
  LoadingResults,
  SelectedHotelBadge,
} from "./createApartment.style";
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
  X,
  Info,
  Wifi,
  Wind,
  Car,
  Home as HomeIcon,
} from "lucide-react";
import upload from "../../../../upload";
import { apartmentTypes } from "../../../../dummyData";

// Hook-Form && Zod
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApartmentSchema } from "../../../../validation/apartment/apartment.validation";

// RTKQ
import { useCreateApartmentMutation } from "../../../../store/apartment/apartmentSlice";
import { useSearchHotelsQuery } from "../../../../store/hotel/hotelSlice";
import toast from "react-hot-toast";

function CreateApartment() {
  // States
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Hotel search states
  const [hotelSearchTerm, setHotelSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Hook-Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(createApartmentSchema),
    mode: "onBlur",
    defaultValues: {
      apartmentNumber: "",
      name: "",
      description: "",
      imageUrl: "",
      pricePerNight: "",
      totalCapacity: "",
      numberOfBedrooms: "",
      numberOfBathrooms: "",
      floorNumber: "",
      areaSqm: "",
      roomsBookableSeparately: false,
      hasKitchen: false,
      hasLivingRoom: false,
      hasDiningArea: false,
      hasBalcony: false,
      hasWifi: false,
      hasAirConditioning: false,
      hasParking: false,
      hasLaundry: false,
      apartmentType: "",
      hotelId: "",
    },
  });

  // RTKQ
  const [createApartment, { isLoading }] = useCreateApartmentMutation();

  // Debounce hotel search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(hotelSearchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [hotelSearchTerm]);

  // Search hotels
  const {
    data: hotelsData,
    isLoading: isSearching,
    isFetching,
  } = useSearchHotelsQuery(
    {
      name: debouncedSearchTerm,
      page: 1,
      size: 10,
    },
    {
      skip: !debouncedSearchTerm || debouncedSearchTerm.length < 2,
    }
  );

  // Handle hotel search input
  const handleHotelSearchChange = (e) => {
    const value = e.target.value;
    setHotelSearchTerm(value);
    setShowSearchResults(true);

    if (!value) {
      setSelectedHotel(null);
      setValue("hotelId", "", { shouldValidate: true });
    }
  };

  // Handle hotel selection
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setHotelSearchTerm(hotel.name);
    setValue("hotelId", hotel.id, { shouldValidate: true });
    setShowSearchResults(false);
  };

  // Clear hotel selection
  const handleClearHotel = () => {
    setSelectedHotel(null);
    setHotelSearchTerm("");
    setValue("hotelId", "", { shouldValidate: true });
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

    // Convert string values to appropriate types
    const formattedData = {
      ...data,
      pricePerNight: parseFloat(data.pricePerNight),
      totalCapacity: parseInt(data.totalCapacity),
      numberOfBedrooms: parseInt(data.numberOfBedrooms),
      numberOfBathrooms: parseInt(data.numberOfBathrooms),
      floorNumber: data.floorNumber ? parseInt(data.floorNumber) : null,
      areaSqm: data.areaSqm ? parseFloat(data.areaSqm) : null,
    };

    try {
      await createApartment(formattedData).unwrap();
      toast.success("Apartment created successfully!");

      reset();
      setPreviewImage(null);
      setSelectedHotel(null);
      setHotelSearchTerm("");
    } catch (error) {
      console.error("Create apartment error:", error);

      let errorMessage = "Failed to create apartment. Please try again.";

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

  return (
    <PageContainer>
      <FormCard>
        <Header>
          <HeaderIcon size={48} />
          <Title>Create New Apartment</Title>
          <Subtitle>
            Fill in the details to add a new apartment to your hotel
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
            Hotel Selection
          </SectionTitle>

          <FormGroup fullWidth>
            <Label>
              <Building2 size={18} />
              Select Hotel *
            </Label>
            <SearchContainer className="search-container">
              <SearchInputWrapper>
                <SearchIcon size={20} />
                <SearchInput
                  type="text"
                  value={hotelSearchTerm}
                  onChange={handleHotelSearchChange}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search for a hotel by name..."
                  error={errors.hotelId}
                  disabled={isSubmitting || isLoading}
                />
              </SearchInputWrapper>

              {showSearchResults &&
                hotelSearchTerm.length >= 2 &&
                !selectedHotel && (
                  <SearchResults>
                    {isSearching || isFetching ? (
                      <LoadingResults>
                        <SpinnerIcon size={20} />
                        Searching hotels...
                      </LoadingResults>
                    ) : hotelsData?.content?.length > 0 ? (
                      hotelsData.content.map((hotel) => (
                        <SearchResultItem
                          key={hotel.id}
                          onClick={() => handleHotelSelect(hotel)}
                        >
                          <HotelName>{hotel.name}</HotelName>
                          <HotelDetails>
                            {hotel.city}, {hotel.country} • {hotel.address}
                          </HotelDetails>
                        </SearchResultItem>
                      ))
                    ) : (
                      <NoResults>
                        No hotels found. Try a different search term.
                      </NoResults>
                    )}
                  </SearchResults>
                )}
            </SearchContainer>

            {selectedHotel && (
              <SelectedHotelBadge>
                <Building2 size={16} />
                {selectedHotel.name} - {selectedHotel.city}
                <X
                  size={16}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                  onClick={handleClearHotel}
                />
              </SelectedHotelBadge>
            )}

            {errors.hotelId && (
              <ErrorMessage>⚠ {errors.hotelId.message}</ErrorMessage>
            )}
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
                Apartment Number *
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
                Apartment Type *
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
              Apartment Name *
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
              Description *
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
              Apartment Image *
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
                Price Per Night *
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
                Total Capacity *
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
                Bedrooms *
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
                Bathrooms *
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

          <SubmitButton
            type="submit"
            disabled={isSubmitting || isUploading || isLoading}
          >
            {isSubmitting || isLoading ? (
              <>
                <SpinnerIcon size={20} />
                Creating Apartment...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Create Apartment
              </>
            )}
          </SubmitButton>
        </FormContainer>
      </FormCard>
    </PageContainer>
  );
}

export default CreateApartment;
