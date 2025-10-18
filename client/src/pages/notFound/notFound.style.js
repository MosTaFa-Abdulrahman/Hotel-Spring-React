import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  top: 0;
  background-color: ${({ theme }) => theme.bgPrimary};
  color: ${({ theme }) => theme.textPrimary};
`;

export const Title = styled.h1`
  font-size: 10rem;
  margin: 0;
  color: ${({ theme }) => theme.buttonPrimary};

  @media (max-width: 768px) {
    font-size: 8rem;
  }

  @media (max-width: 480px) {
    font-size: 6rem;
  }
`;

export const Description = styled.p`
  font-size: 1.5rem;
  margin: 1rem 0;
  color: ${({ theme }) => theme.textSecondary};

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const HomeLink = styled(NavLink)`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #e016a3ff;
  background-color: ${({ theme }) => theme.buttonPrimary};
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }
`;
