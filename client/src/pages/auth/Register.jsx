// Styles && Icons
import {
  Container,
  FormWrapper,
  Title,
  Subtitle,
  FormContainer,
  InputWrapper,
  Input,
  Button,
  ErrorMessage,
} from "./auth.style";
import { Loader2 } from "lucide-react";

// Hook-Form && Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/auth/auth.validate";

// MakeRequest && Navigation
// import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../requestMethod";
import toast from "react-hot-toast";

function Register() {
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // Handle Register
  const handleRegister = async (data) => {
    try {
      // Prepare data for backend (remove confirmPassword)
      const { confirmPassword, ...registerData } = data;

      await makeRequest.post("/auth/register", registerData);

      toast.success("Registration successful! Please login.");
      reset();
      // navigate("/login");
    } catch (error) {
      toast.error(data.message || "Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Create Account</Title>
        <Subtitle>Join us today and get started</Subtitle>

        <FormContainer onSubmit={handleSubmit(handleRegister)}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Username"
              $hasError={!!errors.username}
              {...register("username")}
            />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="email"
              placeholder="Email Address"
              $hasError={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="text"
              placeholder="First Name"
              $hasError={!!errors.firstName}
              {...register("firstName")}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="text"
              placeholder="Last Name"
              $hasError={!!errors.lastName}
              {...register("lastName")}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="tel"
              placeholder="Phone Number"
              $hasError={!!errors.phoneNumber}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="password"
              placeholder="Password"
              $hasError={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="password"
              placeholder="Confirm Password"
              $hasError={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </InputWrapper>

          <Button disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </FormContainer>
      </FormWrapper>
    </Container>
  );
}

export default Register;
