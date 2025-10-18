import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  background: #ffffff;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 60px;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: #667eea;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

export const SearchCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    position: absolute;
    left: 1rem;
    color: #999;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  background: #fafafa;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const ClearButton = styled.button`
  background: transparent;
  color: #764ba2;
  border: 1px solid #764ba2;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #764ba2;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(118, 75, 162, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SearchInfo = styled.div`
  margin-top: 1rem;
  color: #666;
  font-size: 0.9375rem;

  strong {
    color: #667eea;
    font-weight: 600;
  }
`;

export const TableCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

export const ResultsInfo = styled.div`
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9375rem;

  strong {
    color: #764ba2;
    font-weight: 600;
  }
`;

export const NameCell = styled.div`
  display: flex;
  ${"" /* align-items: center; */}
  gap: 0.5rem;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid #667eea;
`;

export const FullName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 0.9375rem;
`;

export const Username = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-top: 2px;
`;

export const EmailCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;

  svg {
    color: #667eea;
    flex-shrink: 0;
  }
`;

export const PhoneCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;

  svg {
    color: #764ba2;
    flex-shrink: 0;
  }
`;

export const RoleBadge = styled.span`
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.$role?.toUpperCase()) {
      case "ADMIN":
        return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      case "MANAGER":
        return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      case "USER":
        return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
      default:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  }};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(238, 9, 121, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
