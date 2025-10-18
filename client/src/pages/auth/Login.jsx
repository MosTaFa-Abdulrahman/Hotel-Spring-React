// Styles && Icons
import {
  Container,
  FormWrapper,
  Title,
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
import { loginSchema } from "../../validation/auth/auth.validate";

// Context
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { makeRequest } from "../../requestMethod";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const { login: loginContext } = useContext(AuthContext);
  // const navigate = useNavigate();

  const {
    register: login,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  // Handle Login
  const handleLogin = async (data) => {
    try {
      const res = await makeRequest.post("/auth/login", data);

      if (res.data.status === "success" && res.data.data?.token) {
        await loginContext(res.data.data.token);
        toast.success("Login Successful 🥰");
        reset();
        // navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(data.message || "Login failed. Please try again 🙄");
      console.error("Login error:", error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Welcome Back 🤞</Title>

        <FormContainer onSubmit={handleSubmit(handleLogin)}>
          <InputWrapper>
            <Input
              type="email"
              placeholder="Email Address"
              $hasError={!!errors.email}
              {...login("email")}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="password"
              placeholder="Password"
              $hasError={!!errors.password}
              {...login("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputWrapper>

          <Button disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </FormContainer>
      </FormWrapper>
    </Container>
  );
}

export default Login;
