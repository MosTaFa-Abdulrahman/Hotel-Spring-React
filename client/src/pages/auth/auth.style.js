import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, sans-serif;
  padding: 20px;
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Title = styled.h2`
  margin: 0 0 8px 0;
  color: #333;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  margin: 0 0 32px 0;
  color: #666;
  text-align: center;
  font-size: 14px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 2px solid ${(props) => (props.$hasError ? "#f8d7da" : "#e0e0e0")};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#dc3545" : "#667eea")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError
          ? "rgba(220, 53, 69, 0.1)"
          : "rgba(102, 126, 234, 0.1)"};
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Button = styled.button`
  padding: 14px;
  background: ${(props) =>
    props.disabled
      ? "#ccc"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 8px 20px rgba(102, 126, 234, 0.4)"};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(0)")};
  }

  .animate-spin {
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

export const ErrorMessage = styled.p`
  margin: 8px 0 0 0;
  padding: 8px 12px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
