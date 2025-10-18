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

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

export const FiltersCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f093fb;
`;

export const FiltersTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #f093fb;
  }
`;

export const ClearButton = styled.button`
  background: transparent;
  color: #f5576c;
  border: 1px solid #f5576c;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f5576c;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(245, 87, 108, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 0.75rem;
    color: #999;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  background: #fafafa;

  &:focus {
    outline: none;
    border-color: #f093fb;
    background: white;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  background: #fafafa;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #f093fb;
    background: white;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
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
    color: #f5576c;
    font-weight: 600;
  }
`;

export const StatusBadge = styled.span`
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) =>
    props.$isActive
      ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
      : "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)"};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const RatingBadge = styled.span`
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
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
