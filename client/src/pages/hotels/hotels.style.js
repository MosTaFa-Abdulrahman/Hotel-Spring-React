import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: #f7f6f6ff;
  padding: 40px 20px;
  margin-top: 60px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

export const Header = styled.div`
  max-width: 1400px;
  margin: 0 auto 40px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin: 0 0 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #64748b;
  margin: 0;
`;

export const SearchSection = styled.div`
  max-width: 1400px;
  margin: 0 auto 30px;
  display: flex;
  gap: 15px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 18px 25px;
  border-radius: 50px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  svg {
    color: #f093fb;
    flex-shrink: 0;
  }

  &:focus-within {
    box-shadow: 0 12px 40px rgba(240, 147, 251, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 20px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #334155;
  background: transparent;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 18px 35px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(240, 147, 251, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(245, 87, 108, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 15px 30px;
  }
`;

export const FiltersPanel = styled.div`
  max-width: 1400px;
  margin: 0 auto 40px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 30px;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
`;

export const FilterInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #334155;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #f093fb;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #334155;
  transition: all 0.3s ease;
  outline: none;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: #f093fb;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
  }
`;

export const ClearButton = styled.button`
  padding: 12px 30px;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e2e8f0;
    color: #475569;
  }
`;

export const HotelsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const HotelCard = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

  @media (max-width: 768px) {
    height: 240px;
  }
`;

export const HotelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${HotelCard}:hover & {
    transform: scale(1.1);
  }
`;

export const StatusBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  background: ${(props) =>
    props.isActive ? "rgba(34, 197, 94, 0.95)" : "rgba(239, 68, 68, 0.95)"};
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const RatingBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  font-weight: 700;
  color: #1e293b;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const CardContent = styled.div`
  padding: 28px;

  @media (max-width: 768px) {
    padding: 22px;
  }
`;

export const HotelName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 15px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f093fb;
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 15px;

  svg {
    flex-shrink: 0;
  }
`;

export const Description = styled.p`
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #475569;
  font-size: 13px;

  svg {
    color: #94a3b8;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Address = styled.div`
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 20px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
`;

export const BookButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(245, 87, 108, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 100px 20px;

  svg {
    color: #f093fb;
    animation: ${spin} 1s linear infinite;
  }

  p {
    color: #64748b;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const LoadingMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 40px 20px;
  color: #f093fb;
  font-weight: 600;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 500px;
  margin: 0 auto;

  h3 {
    font-size: 2rem;
    color: #1e293b;
    margin: 0 0 15px;
  }

  p {
    color: #64748b;
    font-size: 1.1rem;
  }
`;

export const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  max-width: 600px;
  margin: 40px auto;
  font-weight: 600;
`;

// ============================================
// PAGINATION STYLES (NEW)
// ============================================

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px auto 0;
  padding: 30px 20px;
  max-width: 1400px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);

  @media (max-width: 768px) {
    padding: 25px 15px;
    margin-top: 30px;
    gap: 15px;
  }
`;

export const PaginationInfo = styled.div`
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 1.6;

  strong {
    font-weight: 700;
    color: #ffd700;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
    width: 100%;
    justify-content: space-between;
  }
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: white;
  color: #f093fb;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #f0f4ff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #e0e0e0;
    color: #9e9e9e;
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 13px;

    span {
      display: none;
    }
  }
`;

export const PageIndicator = styled.div`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  min-width: 120px;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 10px 20px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    min-width: 80px;
    padding: 8px 16px;
    font-size: 14px;
  }
`;
