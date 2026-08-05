import { loginDefaultValues, loginSchema, type LoginSchema } from "@/features/login/schema";
import { paths } from "@/routes/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { login } from "@/api/user";

export const useLogin = () => {
  const [signInFailed, setSignInFailed] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (formData: LoginSchema) => {
    setSignInFailed(false);

    try {
      await login(formData);

      navigate(paths.home, { replace: true });
    } catch {
      setSignInFailed(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  return {
    signInFailed,
    isSubmitting,
    errors,
    register,
    setSignInFailed,
    onSubmit,
    handleSubmit,
  };
};
