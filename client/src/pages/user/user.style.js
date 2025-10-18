import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  margin-top: 60px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  color: #666;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  font-size: 1.25rem;
  color: #f44336;
`;

export const ProfileCard = styled.div`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 24px rgba(240, 147, 251, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ProfileImageSection = styled.div`
  flex-shrink: 0;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    justify-content: center;
    font-size: 0.9rem;
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const SectionHeader = styled.div`
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BookingCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(240, 147, 251, 0.2);
    transform: translateY(-4px);
  }
`;

export const BookingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const BookingContent = styled.div`
  padding: 1.5rem;
`;

export const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const BookingTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  flex: 1;
`;

export const BookingStatus = styled.span`
  padding: 0.375rem 0.875rem;
  background: ${(props) => props.color || "#757575"};
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #666;
  font-size: 0.9rem;

  svg {
    flex-shrink: 0;
    color: #f5576c;
  }
`;

export const PaymentInfoBox = styled.div`
  background: linear-gradient(135deg, #f9f9f9 0%, #f5f5f5 100%);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid #e8e8e8;
`;

export const PaymentInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e0e0e0;
`;

export const PaymentStatusBadge = styled.span`
  padding: 0.375rem 0.875rem;
  background: ${(props) => props.color || "#757575"};
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const PaymentDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => (props.highlight ? "#333" : "#666")};
  padding: 0.375rem 0;

  strong {
    font-weight: 600;
    font-size: 1rem;
    color: #333;
  }
`;

export const PayShortageButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #f44336;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d32f2f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #999;
  font-size: 1.1rem;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }
`;

export const PageInfo = styled.span`
  font-size: 1rem;
  color: #666;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

// Modal Styles
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #f5f5f5;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;

    h2 {
      font-size: 1.25rem;
    }
  }
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: #f5576c;
    box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #f5576c;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  display: block;
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CancelButtonModal = styled.button`
  flex: 1;
  padding: 0.875rem;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 0.875rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    animation: spin 1s linear infinite;
  }
`;

export const PaymentSummary = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e8e8e8;
`;

export const BookingSummaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #fff3f3;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #f44336;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  color: ${(props) => (props.highlight ? "#333" : "#666")};
  border-bottom: ${(props) =>
    props.highlight ? "2px solid #e0e0e0" : "1px solid #f0f0f0"};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }

  strong {
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

export const Divider = styled.div`
  height: 2px;
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
  margin: 0.75rem 0;
`;
