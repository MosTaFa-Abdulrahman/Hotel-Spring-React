import {
  Description,
  HomeLink,
  NotFoundContainer,
  Title,
} from "./notFound.style";

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Description>
        Oops! The page you're looking for doesn't exist.
      </Description>
      <HomeLink to="/">Go Back Home</HomeLink>
    </NotFoundContainer>
  );
}
