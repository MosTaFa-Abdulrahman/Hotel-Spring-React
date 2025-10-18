import * as S from "./hotel.style";
import { Loader, AlertCircle, Star, MapPin, Phone, Mail } from "lucide-react";
import { useParams } from "react-router-dom";

// Components
import RoomCard from "../../components/card/room/RoomCard";
import ApartmentCard from "../../components/card/apartment/ApartmentCard";

// RTKQ
import { useGetHotelQuery } from "../../store/hotel/hotelSlice";

function Hotel() {
  const { hotelId } = useParams();

  // Fetch hotel details
  const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
  } = useGetHotelQuery(hotelId);

  if (hotelLoading) {
    return (
      <S.LoadingContainer>
        <Loader className="spinner" size={60} />
        <p>Loading hotel details...</p>
      </S.LoadingContainer>
    );
  }

  if (hotelError || !hotelData) {
    return (
      <S.ErrorContainer>
        <AlertCircle size={80} />
        <h2>Hotel Not Found</h2>
        <p>The hotel you're looking for doesn't exist or has been removed.</p>
      </S.ErrorContainer>
    );
  }

  const hotel = hotelData;

  return (
    <S.Container>
      {/* Hotel Header */}
      <S.HotelHeader>
        <S.HotelImageContainer>
          <S.HotelImage src={hotel.imageUrl} alt={hotel.name} />
          <S.HotelOverlay>
            <S.HotelTitle>{hotel.name}</S.HotelTitle>
            <S.HotelLocation>
              <MapPin size={20} />
              <span>
                {hotel.city}, {hotel.country}
              </span>
            </S.HotelLocation>
            {hotel.rating && (
              <S.HotelRating>
                <Star size={20} fill="#ffc107" color="#ffc107" />
                <span>{hotel.rating.toFixed(1)}</span>
              </S.HotelRating>
            )}
          </S.HotelOverlay>
        </S.HotelImageContainer>

        <S.HotelInfo>
          <S.HotelDescription>{hotel.description}</S.HotelDescription>

          <S.ContactSection>
            <S.ContactItem>
              <Phone size={18} />
              <span>{hotel.phoneNumber}</span>
            </S.ContactItem>
            <S.ContactItem>
              <Mail size={18} />
              <span>{hotel.email}</span>
            </S.ContactItem>
            <S.ContactItem>
              <MapPin size={18} />
              <span>
                {hotel.address}, {hotel.postalCode}
              </span>
            </S.ContactItem>
          </S.ContactSection>
        </S.HotelInfo>
      </S.HotelHeader>

      {/* Standalone Rooms Section */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>Standalone Rooms</S.SectionTitle>
          <S.SectionSubtitle>
            Book individual rooms for your perfect stay
          </S.SectionSubtitle>
        </S.SectionHeader>
        <RoomCard hotelId={hotelId} />
      </S.Section>

      {/* Apartments Section */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>Luxury Apartments</S.SectionTitle>
          <S.SectionSubtitle>
            Spacious apartments with premium amenities
          </S.SectionSubtitle>
        </S.SectionHeader>
        <ApartmentCard hotelId={hotelId} />
      </S.Section>
    </S.Container>
  );
}

export default Hotel;
