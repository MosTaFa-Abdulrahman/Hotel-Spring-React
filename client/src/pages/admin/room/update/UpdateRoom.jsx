// Styles && Icons && Upload-File && Dummy-Data
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  ResultName,
  ResultDetails,
  NoResults,
  LoadingResults,
  SelectedBadge,
  RoomTypeSection,
  RoomTypeHeader,
  RadioGroup,
  RadioOption,
  RadioInput,
  RadioLabel,
  LoadingState,
  LoadingSpinner,
  LoadingText,
} from "./updateRoom.style";
import {
  Edit,
  Image as ImageIcon,
  DollarSign,
  Users,
  Building2,
  AlertCircle,
  X,
  Info,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Home as HomeIcon,
  Bed,
  DoorClosed,
  CheckCircle,
} from "lucide-react";
import upload from "../../../../upload";
import { apartmentRoomTypes, standaloneRoomTypes } from "../../../../dummyData";

// Hook-Form && Zod
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRoomSchema } from "../../../../validation/room/room.validation";

// RTKQ
import {
  useGetRoomQuery,
  useUpdateRoomMutation,
} from "../../../../store/room/roomSlice";
import { useSearchHotelsQuery } from "../../../../store/hotel/hotelSlice";
import { useGetApartmentsQuery } from "../../../../store/apartment/apartmentSlice";
import toast from "react-hot-toast";

function UpdateRoom() {
  const { roomId } = useParams();
  // const navigate = useNavigate();

  // States
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Hotel search states
  const [hotelSearchTerm, setHotelSearchTerm] = useState("");
  const [debouncedHotelSearch, setDebouncedHotelSearch] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showHotelResults, setShowHotelResults] = useState(false);

  // Apartment states
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  // Get room data
  const {
    data: roomData,
    isLoading: isLoadingRoom,
    error: roomError,
  } = useGetRoomQuery(roomId);

  // Hook-Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(updateRoomSchema),
    mode: "onBlur",
    defaultValues: {
      roomNumber: "",
      description: "",
      imageUrl: "",
      pricePerNight: "",
      capacity: "",
      isAvailable: true,
      hasWifi: false,
      hasAirConditioning: false,
      hasTv: false,
      hasMiniBar: false,
      hasBalcony: false,
      hasPrivateBathroom: false,
      bookableIndividually: false,
      roomType: "",
      hotelId: "",
      apartmentId: "",
    },
  });

  const watchRoomType = watch("roomType");

  // RTKQ
  const [updateRoom, { isLoading }] = useUpdateRoomMutation();

  // Populate form with existing room data
  useEffect(() => {
    if (roomData) {
      // Set basic fields
      setValue("roomNumber", roomData.roomNumber || "");
      setValue("description", roomData.description || "");
      setValue("imageUrl", roomData.imageUrl || "");
      setValue("pricePerNight", roomData.pricePerNight?.toString() || "");
      setValue("capacity", roomData.capacity?.toString() || "");
      setValue("isAvailable", roomData.isAvailable ?? true);
      setValue("roomType", roomData.roomType || "");

      // Set amenities
      setValue("hasWifi", roomData.hasWifi || false);
      setValue("hasAirConditioning", roomData.hasAirConditioning || false);
      setValue("hasTv", roomData.hasTv || false);
      setValue("hasMiniBar", roomData.hasMiniBar || false);
      setValue("hasBalcony", roomData.hasBalcony || false);
      setValue("hasPrivateBathroom", roomData.hasPrivateBathroom || false);
      setValue("bookableIndividually", roomData.bookableIndividually || false);

      // Set image preview
      if (roomData.imageUrl) {
        setPreviewImage(roomData.imageUrl);
      }

      // Set room type
      if (roomData.roomType) {
        setSelectedRoomType(roomData.roomType);
      }

      // Set hotel - Create hotel object from DB data
      if (roomData.hotelId) {
        const hotelFromDB = {
          id: roomData.hotelId,
          name: roomData.hotelName || "Selected Hotel",
        };
        setSelectedHotel(hotelFromDB);
        setHotelSearchTerm(roomData.hotelName || "");
        setValue("hotelId", roomData.hotelId);
      }

      // Set apartment - Create apartment object from DB data
      if (roomData.apartmentId) {
        const apartmentFromDB = {
          id: roomData.apartmentId,
          name: roomData.apartmentName || "Selected Apartment",
          apartmentNumber: roomData.apartmentNumber || "",
        };
        setSelectedApartment(apartmentFromDB);
        setValue("apartmentId", roomData.apartmentId);
      }
    }
  }, [roomData, setValue]);

  // Debounce hotel search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHotelSearch(hotelSearchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [hotelSearchTerm]);

  // Search hotels
  const {
    data: hotelsData,
    isLoading: isSearchingHotels,
    isFetching: isFetchingHotels,
  } = useSearchHotelsQuery(
    {
      name: debouncedHotelSearch,
      page: 1,
      size: 10,
    },
    {
      skip: !debouncedHotelSearch || debouncedHotelSearch.length < 2,
    }
  );

  // Get apartments based on selected hotel
  const {
    data: apartmentsData,
    isLoading: isLoadingApartments,
    isFetching: isFetchingApartments,
  } = useGetApartmentsQuery(
    {
      hotelId: selectedHotel?.id,
      page: 1,
      size: 100,
    },
    {
      skip: !selectedHotel?.id,
    }
  );

  // Check if room type is apartment type
  const isApartmentRoomType = apartmentRoomTypes.some(
    (type) => type.value === watchRoomType
  );

  // Reset apartment selection when room type changes to standalone
  useEffect(() => {
    if (watchRoomType && !isApartmentRoomType) {
      setSelectedApartment(null);
      setValue("apartmentId", "", { shouldValidate: false });
    }
  }, [watchRoomType, isApartmentRoomType, setValue]);

  // Handle hotel search input
  const handleHotelSearchChange = (e) => {
    const value = e.target.value;
    setHotelSearchTerm(value);
    setShowHotelResults(true);

    if (!value) {
      setSelectedHotel(null);
      setValue("hotelId", "", { shouldValidate: true });
      setSelectedApartment(null);
      setValue("apartmentId", "", { shouldValidate: false });
    }
  };

  // Handle hotel selection
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setHotelSearchTerm(hotel.name);
    setValue("hotelId", hotel.id, { shouldValidate: true });
    setShowHotelResults(false);

    // Reset apartment selection when hotel changes
    setSelectedApartment(null);
    setValue("apartmentId", "", { shouldValidate: false });
  };

  // Clear hotel selection
  const handleClearHotel = () => {
    setSelectedHotel(null);
    setHotelSearchTerm("");
    setValue("hotelId", "", { shouldValidate: true });
    setSelectedApartment(null);
    setValue("apartmentId", "", { shouldValidate: false });
  };

  // Handle apartment selection
  const handleApartmentChange = (e) => {
    const apartmentId = e.target.value;
    if (apartmentId) {
      const apartment = apartmentsData?.data?.content?.find(
        (apt) => apt.id === apartmentId
      );
      setSelectedApartment(apartment);
      setValue("apartmentId", apartmentId, { shouldValidate: false });
    } else {
      setSelectedApartment(null);
      setValue("apartmentId", "", { shouldValidate: false });
    }
  };

  // Handle room type selection
  const handleRoomTypeChange = (type) => {
    setSelectedRoomType(type);
    setValue("roomType", type, { shouldValidate: true });
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".hotel-search-container")) {
        setShowHotelResults(false);
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

  // Handle Update
  const onSubmit = async (data) => {
    setApiError(null);

    // Convert string values to appropriate types and remove empty values
    const formattedData = {
      roomNumber: data.roomNumber,
      description: data.description || undefined,
      imageUrl: data.imageUrl || undefined,
      pricePerNight: data.pricePerNight
        ? parseFloat(data.pricePerNight)
        : undefined,
      capacity: data.capacity ? parseInt(data.capacity) : undefined,
      isAvailable: data.isAvailable,
      hasWifi: data.hasWifi,
      hasAirConditioning: data.hasAirConditioning,
      hasTv: data.hasTv,
      hasMiniBar: data.hasMiniBar,
      hasBalcony: data.hasBalcony,
      hasPrivateBathroom: data.hasPrivateBathroom,
      bookableIndividually: data.bookableIndividually,
      roomType: data.roomType || undefined,
      hotelId: data.hotelId || undefined,
      apartmentId: data.apartmentId || undefined,
    };

    try {
      await updateRoom({ roomId, ...formattedData }).unwrap();
      toast.success("Room updated successfully!");
      // navigate("/rooms"); // Navigate back to rooms list
    } catch (error) {
      console.error("Update room error:", error);

      let errorMessage = "Failed to update room. Please try again.";

      // Handle different error response structures
      if (error?.data?.errors) {
        // Handle array of error objects with message field
        if (Array.isArray(error.data.errors)) {
          errorMessage = error.data.errors
            .map((err) => err.message || JSON.stringify(err))
            .join(", ");
        }
        // Handle object with key-value error pairs
        else if (typeof error.data.errors === "object") {
          errorMessage = Object.values(error.data.errors)
            .map((err) => {
              if (typeof err === "string") return err;
              if (err?.message) return err.message;
              return JSON.stringify(err);
            })
            .join(", ");
        }
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setApiError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Loading && Error
  if (isLoadingRoom) {
    return (
      <PageContainer>
        <LoadingState>
          <LoadingSpinner size={48} />
          <LoadingText>Loading room data...</LoadingText>
        </LoadingState>
      </PageContainer>
    );
  }
  if (roomError) {
    return (
      <PageContainer>
        <FormCard>
          <ErrorBox>
            <AlertCircle size={20} />
            <span>
              {roomError?.data?.message ||
                "Failed to load room data. Please try again."}
            </span>
          </ErrorBox>
        </FormCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormCard>
        <Header>
          <HeaderIcon size={48} />
          <Title>Update Room</Title>
          <Subtitle>
            Modify the room details for your hotel or apartment
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
            <SearchContainer className="hotel-search-container">
              <SearchInputWrapper>
                <SearchIcon size={20} />
                <SearchInput
                  type="text"
                  value={hotelSearchTerm}
                  onChange={handleHotelSearchChange}
                  onFocus={() => setShowHotelResults(true)}
                  placeholder="Search for a hotel by name..."
                  error={errors.hotelId}
                  disabled={isSubmitting || isLoading}
                />
              </SearchInputWrapper>

              {showHotelResults &&
                hotelSearchTerm.length >= 2 &&
                !selectedHotel && (
                  <SearchResults>
                    {isSearchingHotels || isFetchingHotels ? (
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
                          <ResultName>{hotel.name}</ResultName>
                          <ResultDetails>
                            {hotel.city}, {hotel.country} • {hotel.address}
                          </ResultDetails>
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
              <SelectedBadge>
                <Building2 size={16} />
                {selectedHotel.name}
                {selectedHotel.city && ` - ${selectedHotel.city}`}
                <X
                  size={16}
                  style={{ cursor: "pointer", marginLeft: "4px" }}
                  onClick={handleClearHotel}
                />
              </SelectedBadge>
            )}

            {errors.hotelId && (
              <ErrorMessage>⚠ {errors.hotelId.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Room Type Selection */}
          <SectionTitle>
            <DoorClosed size={22} />
            Room Type Selection
          </SectionTitle>

          <RoomTypeSection>
            <RoomTypeHeader>Apartment Room Types</RoomTypeHeader>
            <RadioGroup>
              {apartmentRoomTypes.map((type) => (
                <RadioOption key={type.value}>
                  <RadioInput
                    type="radio"
                    id={type.value}
                    value={type.value}
                    checked={selectedRoomType === type.value}
                    onChange={() => handleRoomTypeChange(type.value)}
                    disabled={isSubmitting || isLoading}
                  />
                  <RadioLabel htmlFor={type.value}>{type.label}</RadioLabel>
                </RadioOption>
              ))}
            </RadioGroup>

            <RoomTypeHeader style={{ marginTop: "24px" }}>
              Standalone Room Types
            </RoomTypeHeader>
            <RadioGroup>
              {standaloneRoomTypes.map((type) => (
                <RadioOption key={type.value}>
                  <RadioInput
                    type="radio"
                    id={type.value}
                    value={type.value}
                    checked={selectedRoomType === type.value}
                    onChange={() => handleRoomTypeChange(type.value)}
                    disabled={isSubmitting || isLoading}
                  />
                  <RadioLabel htmlFor={type.value}>{type.label}</RadioLabel>
                </RadioOption>
              ))}
            </RadioGroup>

            {errors.roomType && (
              <ErrorMessage>⚠ {errors.roomType.message}</ErrorMessage>
            )}
          </RoomTypeSection>

          {/* Apartment Selection (only for apartment room types) */}
          {isApartmentRoomType && selectedHotel && (
            <FormGroup fullWidth>
              <Label>
                <HomeIcon size={18} />
                Select Apartment (Optional)
              </Label>
              <Select
                {...register("apartmentId")}
                onChange={handleApartmentChange}
                value={selectedApartment?.id || ""}
                disabled={
                  isSubmitting ||
                  isLoading ||
                  !selectedHotel ||
                  isLoadingApartments ||
                  isFetchingApartments
                }
                error={errors.apartmentId}
              >
                <option value="">
                  {isLoadingApartments || isFetchingApartments
                    ? "Loading apartments..."
                    : "Select an apartment"}
                </option>
                {apartmentsData?.data?.content?.map((apartment) => (
                  <option key={apartment.id} value={apartment.id}>
                    {apartment.apartmentNumber} - {apartment.name} (
                    {apartment.apartmentType} • {apartment.numberOfBedrooms}{" "}
                    Bedrooms)
                  </option>
                ))}
              </Select>

              {selectedApartment && (
                <SelectedBadge style={{ marginTop: "12px" }}>
                  <HomeIcon size={16} />
                  {selectedApartment.apartmentNumber &&
                    `${selectedApartment.apartmentNumber} - `}
                  {selectedApartment.name}
                </SelectedBadge>
              )}

              {errors.apartmentId && (
                <ErrorMessage>⚠ {errors.apartmentId.message}</ErrorMessage>
              )}
            </FormGroup>
          )}

          {/* Basic Information */}
          <SectionTitle>
            <Info size={22} />
            Basic Information
          </SectionTitle>

          <FormGrid>
            <FormGroup>
              <Label>
                <DoorClosed size={18} />
                Room Number *
              </Label>
              <Input
                {...register("roomNumber")}
                error={errors.roomNumber}
                placeholder="101"
                disabled={isSubmitting || isLoading}
              />
              {errors.roomNumber && (
                <ErrorMessage>⚠ {errors.roomNumber.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                <Users size={18} />
                Capacity
              </Label>
              <Input
                {...register("capacity")}
                type="number"
                error={errors.capacity}
                placeholder="2"
                disabled={isSubmitting || isLoading}
              />
              {errors.capacity && (
                <ErrorMessage>⚠ {errors.capacity.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormGrid>

          <FormGroup fullWidth>
            <Label>
              <Info size={18} />
              Description
            </Label>
            <TextArea
              {...register("description")}
              error={errors.description}
              placeholder="Describe the room, its features, amenities, and what makes it special..."
              disabled={isSubmitting || isLoading}
            />
            {errors.description && (
              <ErrorMessage>⚠ {errors.description.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Pricing */}
          <SectionTitle>
            <DollarSign size={22} />
            Pricing
          </SectionTitle>

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
              placeholder="100.00"
              disabled={isSubmitting || isLoading}
            />
            {errors.pricePerNight && (
              <ErrorMessage>⚠ {errors.pricePerNight.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Availability */}
          <FormGroup fullWidth>
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
                    <CheckCircle
                      size={16}
                      style={{ display: "inline", marginRight: "4px" }}
                    />
                    Room is Available
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />
          </FormGroup>

          {/* Image Upload */}
          <FormGroup fullWidth>
            <Label>
              <ImageIcon size={18} />
              Room Image (Optional)
            </Label>
            <ImageUploadContainer
              error={errors.imageUrl}
              hasImage={previewImage}
            >
              {previewImage ? (
                <PreviewImage src={previewImage} alt="Room preview" />
              ) : (
                <UploadPlaceholder>
                  <UploadIcon size={48} />
                  <UploadText>Click to upload room image</UploadText>
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

          {/* Amenities */}
          <SectionTitle>
            <Bed size={22} />
            Amenities & Features
          </SectionTitle>

          <FormGrid columns="repeat(2, 1fr)">
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
              name="hasTv"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasTv"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasTv">
                    <Tv
                      size={16}
                      style={{ display: "inline", marginRight: "4px" }}
                    />
                    TV
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="hasMiniBar"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasMiniBar"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasMiniBar">
                    <Coffee
                      size={16}
                      style={{ display: "inline", marginRight: "4px" }}
                    />
                    Mini Bar
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
              name="hasPrivateBathroom"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasPrivateBathroom"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="hasPrivateBathroom">
                    Private Bathroom
                  </CheckboxLabel>
                </CheckboxContainer>
              )}
            />

            <Controller
              name="bookableIndividually"
              control={control}
              render={({ field }) => (
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="bookableIndividually"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting || isLoading}
                  />
                  <CheckboxLabel htmlFor="bookableIndividually">
                    Bookable Individually
                  </CheckboxLabel>
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
                Updating Room...
              </>
            ) : (
              <>
                <Edit size={20} />
                Update Room
              </>
            )}
          </SubmitButton>
        </FormContainer>
      </FormCard>
    </PageContainer>
  );
}

export default UpdateRoom;
