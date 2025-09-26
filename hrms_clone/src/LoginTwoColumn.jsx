// LoginTwoColumnPrime.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

// PrimeReact styles
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function LoginTwoColumnPrime({ onLogin, imageUrl = "/assets/login_image.png" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin();
    }
    navigate('/'); // Navigate to the main page
  };

  return (
    <div className="grid min-h-screen surface-0">
      {/* Left column with image + text */}
      <div className="col-12 md:col-6 flex flex-column align-items-center justify-content-center p-6">
        <img src={imageUrl} alt="Login Visual" className="w-10 md:w-8 lg:w-6 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-center">
          Onboarding New Talent With Digital HRMS
        </h2>
        <p className="text-600 text-center">
          Everything you need is an easily customizable dashboard
        </p>
      </div>

      {/* Right column with form */}
      <div className="col-12 md:col-6 flex align-items-center justify-content-center p-4">
        <Card
          className="w-full md:w-8 lg:w-6 shadow-3 border-round-2xl"
          style={{ border: "6px solid teal" }}
        >
          <h2 className="text-center mb-2">Welcome Back</h2>
          <p className="text-600 text-center mb-4">
            Please enter your credentials to login
          </p>

          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <InputText
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
                toggleMask
                required
              />
            </div>

            <div className="flex align-items-center justify-content-between mb-4">
              <div className="flex align-items-center">
                <Checkbox
                  inputId="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.checked)}
                />
                <label htmlFor="remember" className="ml-2">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-primary">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              label="Login"
              className="w-full"
              style={{ background: "#6366f1", border: "none" }}
            />

            <Divider align="center">OR</Divider>

            <p className="text-center text-600">
              Don’t have an account? <a href="#">Sign up</a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
