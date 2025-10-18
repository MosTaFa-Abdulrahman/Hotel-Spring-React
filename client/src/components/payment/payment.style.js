import styled from "styled-components";

export const ModalOverlay = styled.div`
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
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(240, 147, 251, 0.3);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px 16px 0 0;
`;

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: 0.3px;
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

export const ModalBody = styled.div`
  padding: 28px 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 22px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;

  svg {
    color: #f5576c;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #f093fb;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
    color: #a0aec0;
  }

  &::placeholder {
    color: #cbd5e0;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #f093fb;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
  }

  &::placeholder {
    color: #cbd5e0;
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #f5576c;
  font-size: 13px;
  margin-top: 6px;
  font-weight: 500;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;

  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(240, 147, 251, 0.3);
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;
