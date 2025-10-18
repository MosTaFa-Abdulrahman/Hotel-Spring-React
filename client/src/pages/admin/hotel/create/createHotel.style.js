import styled from "styled-components";
import { Building2, Loader2, Upload } from "lucide-react";

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
  max-width: 950px;
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

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
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

export const HeaderIcon = styled(Building2)`
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

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  margin-bottom: 28px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
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
  transition: color 0.2s ease;

  svg {
    color: #f093fb;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const Input = styled.input`
  padding: 15px 18px;
  border: 2px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 12px;
  font-size: 15.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  background: ${(props) => (props.error ? "#fef2f2" : "white")};
  color: #1a202c;
  font-weight: 400;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => (props.error ? "#ef4444" : "#cbd5e0")};
  }

  &:focus {
    border-color: ${(props) => (props.error ? "#ef4444" : "#667eea")};
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.error ? "rgba(239, 68, 68, 0.12)" : "rgba(102, 126, 234, 0.15)"};
    transform: translateY(-2px);
    background: white;
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
    opacity: 0.65;
    border-color: #e5e7eb;
  }
`;

export const TextArea = styled.textarea`
  padding: 15px 18px;
  border: 2px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 12px;
  font-size: 15.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
  background: ${(props) => (props.error ? "#fef2f2" : "white")};
  color: #1a202c;
  line-height: 1.7;
  font-weight: 400;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => (props.error ? "#ef4444" : "#cbd5e0")};
  }

  &:focus {
    border-color: ${(props) => (props.error ? "#ef4444" : "#667eea")};
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.error ? "rgba(239, 68, 68, 0.12)" : "rgba(102, 126, 234, 0.15)"};
    transform: translateY(-2px);
    background: white;
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
    opacity: 0.65;
    border-color: #e5e7eb;
  }
`;

export const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 13.5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  animation: shake 0.4s ease;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }
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
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  span {
    line-height: 1.6;
  }
`;

export const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border: 2px solid #6ee7b7;
  border-radius: 14px;
  padding: 18px 22px;
  margin-bottom: 28px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: #065f46;
  font-weight: 500;
  font-size: 14.5px;
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  span {
    line-height: 1.6;
  }
`;

export const ImageUploadContainer = styled.div`
  position: relative;
  border: 3px dashed
    ${(props) =>
      props.error ? "#ef4444" : props.hasImage ? "#10b981" : "#d1d5db"};
  border-radius: 18px;
  padding: ${(props) => (props.hasImage ? "0" : "56px 40px")};
  text-align: center;
  background: ${(props) =>
    props.hasImage ? "#000" : props.error ? "#fef2f2" : "#fafafa"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  min-height: ${(props) => (props.hasImage ? "auto" : "260px")};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${(props) =>
      props.error ? "#ef4444" : props.hasImage ? "#10b981" : "#667eea"};
    background: ${(props) =>
      props.hasImage ? "#000" : props.error ? "#fef2f2" : "#f3f4f6"};
    transform: ${(props) => (props.hasImage ? "none" : "scale(1.008)")};
    box-shadow: ${(props) =>
      props.hasImage ? "none" : "0 8px 24px rgba(102, 126, 234, 0.12)"};
  }

  &:active {
    transform: ${(props) => (props.hasImage ? "none" : "scale(0.995)")};
  }
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 420px;
  border-radius: 14px;
  object-fit: cover;
  display: block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  pointer-events: none;
`;

export const UploadIcon = styled(Upload)`
  color: #9ca3af;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${ImageUploadContainer}:hover & {
    color: #667eea;
    transform: translateY(-6px) scale(1.05);
  }
`;

export const UploadText = styled.p`
  color: #1f2937;
  margin: 0;
  font-weight: 600;
  font-size: 17.5px;
  letter-spacing: -0.2px;
`;

export const UploadSubtext = styled.p`
  color: #6b7280;
  font-size: 14.5px;
  margin: 0;
  font-weight: 400;
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
  gap: 18px;
  color: white;
  border-radius: 18px;
  backdrop-filter: blur(10px);
  z-index: 10;

  span {
    font-size: 15.5px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 19px 28px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 36px;
  letter-spacing: 0.4px;
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.35);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(240, 147, 251, 0.45);
  }

  &:hover:not(:disabled)::before {
    width: 300px;
    height: 300px;
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 12px 32px rgba(240, 147, 251, 0.45);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    position: relative;
    z-index: 1;
  }

  span {
    position: relative;
    z-index: 1;
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
