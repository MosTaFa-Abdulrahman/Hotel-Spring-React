import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  margin-top: 60px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Apartment Section
export const ApartmentSection = styled.section`
  margin-bottom: 3rem;
`;

export const ApartmentCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const ApartmentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 400px;

  @media (max-width: 968px) {
    min-height: 300px;
  }
`;

export const ApartmentInfo = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const ApartmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ApartmentNumber = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const ApartmentTitle = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const HotelName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.95rem;
  margin-top: 0.5rem;

  svg {
    color: #f5576c;
  }
`;

export const ApartmentDescription = styled.p`
  color: #4a5568;
  line-height: 1.7;
  font-size: 1rem;
`;

export const ApartmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #edf2f7;
    transform: translateY(-2px);
  }

  svg {
    color: #f5576c;
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    strong {
      color: #2d3748;
      font-size: 1rem;
    }

    span {
      color: #718096;
      font-size: 0.85rem;
    }
  }
`;

export const AmenitiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const AmenityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%);
  border-radius: 25px;
  color: #f5576c;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #f5576c30;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const AvailabilityBadge = styled.div`
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${(props) =>
    props.available
      ? "linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
      : "linear-gradient(135deg, #fc8181 0%, #f56565 100%)"};
  color: white;
  text-align: center;
  box-shadow: 0 4px 15px
    ${(props) => (props.available ? "#48bb7840" : "#fc818140")};
`;

export const BookButton = styled.button`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Rooms Section
export const RoomsSection = styled.section`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const FilterToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
  }
`;

// Filters
export const FilterContainer = styled.div`
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  border: 2px solid #e2e8f0;
`;

export const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const FilterInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #f5576c;
    box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
  }
`;

export const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #f5576c;
    box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 0.5rem 0;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: #2d3748;
  }
`;

export const FilterCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #f5576c;
`;

export const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ResetButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #cbd5e0;
    transform: translateY(-2px);
  }
`;

// Rooms List
export const RoomsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RoomCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: #f5576c;
  }
`;

export const RoomImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const RoomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${RoomCard}:hover & {
    transform: scale(1.05);
  }
`;

export const RoomAvailabilityBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${(props) =>
    props.available
      ? "linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
      : "linear-gradient(135deg, #fc8181 0%, #f56565 100%)"};
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const RoomDetails = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const RoomNumber = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin: 0;
  font-weight: 700;
`;

export const RoomType = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin: 0.25rem 0 0 0;
  text-transform: capitalize;
`;

export const RoomBookButton = styled.button`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
  }
`;

export const RoomDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
`;

export const RoomInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const RoomInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.95rem;

  svg {
    color: #f5576c;
  }

  span {
    font-weight: 600;
  }
`;

export const RoomAmenities = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
`;

export const AmenityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%);
  border-radius: 50%;
  color: #f5576c;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    transform: translateY(-2px);
  }
`;

// Loading & Error States
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;

  p {
    color: #4a5568;
    font-size: 1.1rem;
  }
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #f5576c;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;

  p {
    color: #e53e3e;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: #f7fafc;
  border-radius: 15px;
  border: 2px dashed #e2e8f0;

  p {
    color: #718096;
    font-size: 1.1rem;
    margin: 0;
  }
`;

// Load More
export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
`;

export const LoadMoreButton = styled.button`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 0.9rem 2.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
