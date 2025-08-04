"use client";
import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context";
import { loginUser, registerUser } from "@/api";

const register = async ({ email, password, user_name, phone_number, role }:
  { user_name: string; email: string; password: string; phone_number?: string; role: string }) => {
  const { data } = await registerUser({ email, password, user_name, phone_number, role });
  console.log(data);
  return data;
};

const login = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await loginUser({ email, password });
  return data;
};

const InputField = memo(function InputField({ name, type, placeholder, value, onChange, }: {
  name: string; type: string; placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      autoComplete={
        type === "password"
          ? name === "password" || name === "confirmPassword"
            ? "new-password"
            : "current-password"
          : "on"
      }
      inputMode="text"
      className="w-full px-3 py-2 rounded-full bg-white/20 placeholder-white/70 text-white text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
    />
  );
});

export default function AuthPage() {
  const { login: loginContext } = useAuth();
  const [form, setForm] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    role: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const isValidPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      password
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { user_name, email, password, confirmPassword, phone_number, role } = form;
    console.log(form);

    try {
      if (isSignUp) {
        // if (!isValidPassword(password)) {
        //   setError(
        //     "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
        //   );
        //   return;
        // }
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        // await register({ name, email, password });

        const res = await register({ user_name, email, password, phone_number, role });
        // console.log(res);

        loginContext(res.user, res.token);

        if (res.message === "user created successfully") {
          localStorage.setItem('auth', res?.data?.access_token?.access_token)
          localStorage.setItem('role', res?.data?.role)
          router.push("/");
        } else {
          router.push("/auth");
        }
      } else {
        const res = await login({ email, password });
        // console.log(res);

        loginContext(res.user, res.token);

        if (res.message === "login successfully") {
          localStorage.setItem('auth', res?.data?.access_token?.access_token)
          localStorage.setItem('role', res?.data?.role)
          router.push("/");
        } else {
          router.push("/auth");
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const inputConfigs = [
    ...(isSignUp
      ?
      [
        { name: "user_name", type: "text", placeholder: "Full Name" },
        { name: "phone_number", type: "text", placeholder: "Phone" },
      ]
      : []),
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    ...(isSignUp ?
      [
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password", }
      ] : [])
  ];

  const SubmitButton = () => (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-2 rounded-full bg-white text-blue-700 font-semibold text-sm transition-all ${isLoading
        ? "opacity-70 cursor-not-allowed"
        : "hover:bg-gray-100 hover:scale-105 active:scale-95"
        }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin mr-2" />
          {isSignUp ? "Signing up..." : "Signing in..."}
        </div>
      ) : isSignUp ? "Sign Up" : "Sign In"}
    </button>
  );

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] flex items-center justify-center overflow-hidden">
      {/* Animations */}
      <div className="absolute w-[420px] h-[420px] rounded-full border-t-4 border-white/20 animate-rotateRing" />
      <div className="absolute w-[480px] h-[480px] rounded-full border-b-4 border-white/10 animate-rotateRingReverse" />
      <div className="absolute w-[540px] h-[540px] rounded-full border-l-4 border-white/5 animate-rotateRingSlow" />

      {/* Card */}
      <div
        className={`relative w-[460px] rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col justify-center items-center transition-all duration-700 ease-out transform z-10 px-8 py-10 ${show ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-white/80 text-sm text-center mb-6 px-6">
          {isSignUp
            ? "Please fill in the details to sign up"
            : "Please sign in to continue"}
        </p>

        {error && (
          <div className="mb-3 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {inputConfigs.map(({ name, type, placeholder }) => (
            <InputField
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
            />
          ))}
          {isSignUp && (
            <select
              name="role"
              defaultValue=""
              required
              onChange={handleSelectChange}
              className="w-full px-3 py-2 rounded-full bg-white/20 placeholder-white/70 text-black text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            >
              <option disabled value="">choose your role</option>
              <option value="doctor">doctor</option>
              <option value="lab">lab</option>
              <option value="company">company</option>
              <option value="technician">technician</option>
            </select>
          )}
          {!isSignUp && (
            <div className="flex items-center justify-between text-xs px-1 text-white/80">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-white/50" />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="hover:underline hover:text-white/90"
              >
                Forgot password?
              </a>
            </div>
          )}

          <SubmitButton />

          <p className="text-center text-white/80 text-xs mt-4">
            {isSignUp
              ? "Already have an account?"
              : "Don’t have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white font-semibold hover:underline hover:text-white/90"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
