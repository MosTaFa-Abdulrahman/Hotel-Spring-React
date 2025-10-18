import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fce4ec 0%, #fff5f7 100%);
  padding-bottom: 60px;
  margin-top: 55px;
`;

// Hotel Header Styles
export const HotelHeader = styled.div`
  position: relative;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 60px;
  animation: ${slideDown} 0.6s ease;
`;

export const HotelImageContainer = styled.div`
  position: relative;
  height: 500px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const HotelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HotelOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

export const HotelTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0 0 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

export const HotelLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  margin-bottom: 15px;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const HotelRating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 8px 16px;
  }
`;

export const HotelInfo = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const HotelDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

export const ContactSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #475569;
  font-size: 1rem;

  svg {
    color: #f093fb;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

// Section Styles
export const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto 80px;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-bottom: 35px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin: 0 0 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #64748b;
  margin: 0;
`;

// Loading and Error States
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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  gap: 20px;
  color: #ef4444;

  svg {
    animation: ${pulse} 2s ease-in-out infinite;
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
    color: #1e293b;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;
