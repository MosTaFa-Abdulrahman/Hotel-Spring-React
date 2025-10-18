import styled from "styled-components";
import { Home, Loader2, Upload, Search } from "lucide-react";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
`;

export const FormCard = styled.div`
  max-width: 1100px;
  width: 100%;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e8eaed;
`;

export const Header = styled.div`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 50px 40px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 70%
    );
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.08);
      opacity: 0.7;
    }
  }
`;

export const HeaderIcon = styled(Home)`
  margin: 0 auto 20px;
  display: block;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 38px;
  font-weight: 700;
  position: relative;
  z-index: 1;
  letter-spacing: -0.8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Subtitle = styled.p`
  margin: 0;
  opacity: 0.96;
  font-size: 17px;
  position: relative;
  z-index: 1;
  font-weight: 400;
  line-height: 1.5;
`;

export const FormContainer = styled.form`
  padding: 50px 48px 48px;
  background: white;

  @media (max-width: 768px) {
    padding: 36px 28px 32px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin: 32px 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f093fb;
  display: flex;
  align-items: center;
  gap: 10px;

  &:first-of-type {
    margin-top: 0;
  }

  svg {
    color: #f093fb;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "repeat(2, 1fr)"};
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => props.fullWidth && "grid-column: 1 / -1;"}
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #1a202c;
  font-size: 14.5px;
  gap: 8px;
  letter-spacing: 0.2px;

  svg {
    color: #f093fb;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const Input = styled.input`
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
  background: ${(props) => (props.error ? "#fef2f2" : "white")};
  color: #1a202c;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${(props) => (props.error ? "#ef4444" : "#f093fb")};
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.error ? "rgba(239, 68, 68, 0.12)" : "rgba(240, 147, 251, 0.15)"};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const Select = styled.select`
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
  background: ${(props) => (props.error ? "#fef2f2" : "white")};
  color: #1a202c;
  cursor: pointer;

  &:focus {
    border-color: ${(props) => (props.error ? "#ef4444" : "#f093fb")};
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.error ? "rgba(239, 68, 68, 0.12)" : "rgba(240, 147, 251, 0.15)"};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const TextArea = styled.textarea`
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  background: ${(props) => (props.error ? "#fef2f2" : "white")};
  color: #1a202c;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${(props) => (props.error ? "#ef4444" : "#f093fb")};
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.error ? "rgba(239, 68, 68, 0.12)" : "rgba(240, 147, 251, 0.15)"};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #f093fb;
`;

export const CheckboxLabel = styled.label`
  font-size: 14.5px;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
`;

export const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 13px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`;

export const ErrorBox = styled.div`
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 2px solid #f87171;
  border-radius: 14px;
  padding: 18px 22px;
  margin-bottom: 28px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: #991b1b;
  font-weight: 500;
  font-size: 14.5px;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export const ImageUploadContainer = styled.div`
  position: relative;
  border: 3px dashed
    ${(props) =>
      props.error ? "#ef4444" : props.hasImage ? "#10b981" : "#d1d5db"};
  border-radius: 18px;
  padding: ${(props) => (props.hasImage ? "0" : "40px 30px")};
  text-align: center;
  background: ${(props) =>
    props.hasImage ? "#000" : props.error ? "#fef2f2" : "#fafafa"};
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  min-height: ${(props) => (props.hasImage ? "auto" : "200px")};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${(props) =>
      props.error ? "#ef4444" : props.hasImage ? "#10b981" : "#f093fb"};
    background: ${(props) =>
      props.hasImage ? "#000" : props.error ? "#fef2f2" : "#f3f4f6"};
  }
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 350px;
  border-radius: 14px;
  object-fit: cover;
  display: block;
`;

export const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  pointer-events: none;
`;

export const UploadIcon = styled(Upload)`
  color: #9ca3af;
`;

export const UploadText = styled.p`
  color: #1f2937;
  margin: 0;
  font-weight: 600;
  font-size: 16px;
`;

export const UploadSubtext = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 0;
`;

export const HiddenFileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
  color: white;
  border-radius: 18px;
  z-index: 10;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 18px 28px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.35);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(240, 147, 251, 0.45);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SpinnerIcon = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Hotel Search Styles
export const SearchContainer = styled.div`
  position: relative;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
`;

export const SearchInput = styled(Input)`
  padding-left: 48px;
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  max-height: 280px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
`;

export const SearchResultItem = styled.div`
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fef3f8;
  }

  &.selected {
    background: #fce7f3;
    font-weight: 600;
  }
`;

export const HotelName = styled.div`
  font-weight: 600;
  color: #1a202c;
  font-size: 14.5px;
  margin-bottom: 4px;
`;

export const HotelDetails = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
`;

export const LoadingResults = styled.div`
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const SelectedHotelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #fce7f3 0%, #fce7f3 100%);
  border: 2px solid #f093fb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #831843;
  margin-top: 8px;
`;
