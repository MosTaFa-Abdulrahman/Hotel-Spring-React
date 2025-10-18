import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto 30px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(240, 147, 251, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 24px;
  }
`;

export const FilterPanel = styled.div`
  background: white;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
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
  border-radius: 10px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #f093fb;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
  }
`;

export const FilterCheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding-top: 20px;
  border-top: 2px solid #f1f5f9;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #f093fb;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 35px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

export const Card = styled.div`
  position: relative;
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

export const CardImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    height: 240px;
  }
`;

export const CardBadges = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 2;
`;

export const AvailabilityBadge = styled.div`
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  background: ${(props) =>
    props.isAvailable ? "rgba(34, 197, 94, 0.95)" : "rgba(239, 68, 68, 0.95)"};
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const TypeBadge = styled.div`
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  background: rgba(240, 147, 251, 0.95);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const CardContent = styled.div`
  padding: 28px;

  @media (max-width: 768px) {
    padding: 22px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 15px;
  gap: 15px;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;

  &::after {
    content: "/night";
    font-size: 0.8rem;
    color: #94a3b8;
    margin-left: 5px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const CardDescription = styled.p`
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;

  svg {
    color: #f093fb;
    flex-shrink: 0;
  }
`;

export const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 12px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

export const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: linear-gradient(135deg, #fce4ec 0%, #fff5f7 100%);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  transition: all 0.3s ease;

  svg {
    color: #f093fb;
    flex-shrink: 0;
  }

  &:hover {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    transform: translateY(-2px);

    svg {
      color: white;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

export const BookButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(240, 147, 251, 0.6);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 14px 20px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
  color: #64748b;

  .spinner {
    animation: ${spin} 1s linear infinite;
    color: #f093fb;
  }

  p {
    font-size: 1.1rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    min-height: 300px;
    gap: 15px;

    p {
      font-size: 1rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: #fee2e2;
  border: 2px solid #fecaca;
  border-radius: 16px;
  color: #dc2626;
  font-weight: 600;
  margin: 20px 0;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 16px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  gap: 20px;
  color: #94a3b8;

  svg {
    opacity: 0.5;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #475569;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;

    h3 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const LoadingMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 30px 20px;
  color: #64748b;
  font-weight: 600;

  .spinner {
    animation: ${spin} 1s linear infinite;
    color: #f093fb;
  }

  @media (max-width: 768px) {
    padding: 20px;
    font-size: 14px;
  }
`;
