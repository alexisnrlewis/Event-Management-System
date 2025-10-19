// Create Your Account webpage
// Dylan Edwards worked on this file in its entirety
// Alexis Lewis added styling to match current frontend style and colors
// as well as minimal changes to the content on the webpage
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface ConferenceColors {
  primary: string;
  background: string;
}

const conferenceColorMap: Record<string, ConferenceColors> = {
  "1": { primary: "#228B22", background: "#ffffff" }, // Georgia - Green
  "2": { primary: "#FF8C00", background: "#ffffff" }, // Tennessee - Orange
  "3": { primary: "#87CEEB", background: "#ffffff" }, // Carolinas - Baby Blue
};

const CreateAccount: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    phoneType: "personal",
    organization: "",
    textAlerts: false,
    terms: false,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);

  // Format phone number automatically
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    const [, area, prefix, line] = match;
    if (line) return `(${area}) ${prefix}-${line}`;
    if (prefix) return `(${area}) ${prefix}`;
    if (area) return `(${area}`;
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { id, value, type } = target;
    const newValue =
      id === "contactNumber"
        ? formatPhoneNumber(value)
        : type === "checkbox" && "checked" in target
        ? (target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Password check: inline message instead of alert
    if (formData.password.length < 8) {
      setPasswordError("Your password must be at least 8 characters long.");
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setPasswordError("Your passwords do not match.");
      return;
    } else {
      setPasswordError(null);
    }

    console.log("Account created with:", formData);
    setSuccessMessage(
      "Your account has been successfully created, and you are now signed in!"
    );
    setAccountCreated(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      phoneType: "personal",
      organization: "",
      textAlerts: false,
      terms: false,
    });
  };

  const { primary, background } =
    conferenceColorMap[id || "1"] || conferenceColorMap["1"];
  const textColor = "#000000";

  return (
    <div
      style={{
        backgroundColor: background,
        color: textColor,
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
          color: "#000000",
          padding: "3rem 1rem",
          textAlign: "center",
        }}
      >
        <h1>Create Your Account</h1>
        <p>
          Join EMTS to manage your conference experience as an Admin,
          Attendee, Speaker, or Sponsor.
        </p>
      </header>

      <main
        style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}
      >
        <section>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2
              style={{
                background: `linear-gradient(to right, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Account Details
            </h2>
            <p>
              Your account will allow you to access the dashboard, register for
              conferences, and submit applications.
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div
              style={{
                backgroundColor: "#d1fae5",
                color: primary,
                border: `3px solid ${primary}`,
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {successMessage}
            </div>
          )}

          {/* Password Error Message */}
          {passwordError && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                border: "2px solid #b91c1c",
                padding: "0.75rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {passwordError}
            </div>
          )}

          {/* Form */}
          <form
            id="createAccountForm"
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#ffffff",
              border: `3px solid transparent`,
              borderImage: `linear-gradient(135deg, #228B22 0%, #FF8C00 50%, #87CEEB 100%) 1`,
              borderRadius: "12px",
              padding: "2rem",
              display: "grid",
              gap: "1rem",
              color: textColor,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                { id: "firstName", label: "First Name*", required: true },
                { id: "lastName", label: "Last Name*", required: true },
                { id: "email", label: "Email*", required: true },
                {
                  id: "password",
                  label: "Password*",
                  placeholder: "••••••••",
                  required: true,
                  type: "password",
                },
                {
                  id: "confirmPassword",
                  label: "Confirm Password*",
                  placeholder: "••••••••",
                  required: true,
                  type: "password",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    type={field.type || "text"}
                    id={field.id}
                    placeholder={field.placeholder}
                    value={(formData as any)[field.id]}
                    onChange={handleChange}
                    required={field.required}
                    style={{
                      border: `2px solid black`,
                      borderRadius: "6px",
                      padding: "0.5rem",
                      width: "100%",
                      color: textColor,
                    }}
                  />
                </div>
              ))}

              {/* Phone Number with Type */}
              <div>
                <label htmlFor="contactNumber">Phone Number*</label>
                <input
                  type="text"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  placeholder="(123) 456-7890"
                  style={{
                    border: `2px solid black`,
                    borderRadius: "6px",
                    padding: "0.5rem",
                    width: "100%",
                    color: textColor,
                    marginBottom: "0.5rem",
                  }}
                />
                <select
                  id="phoneType"
                  value={formData.phoneType}
                  onChange={handleChange}
                  style={{
                    border: `2px solid black`,
                    borderRadius: "6px",
                    padding: "0.5rem",
                    width: "100%",
                    color: textColor,
                  }}
                >
                  <option value="personal">Personal Phone Number</option>
                  <option value="work">Work/Company Phone Number</option>
                </select>
              </div>

              <div>
                <label htmlFor="organization">Organization (Optional)</label>
                <input
                  type="text"
                  id="organization"
                  placeholder="Company or School"
                  value={formData.organization}
                  onChange={handleChange}
                  style={{
                    border: `2px solid black`,
                    borderRadius: "6px",
                    padding: "0.5rem",
                    width: "100%",
                    color: textColor,
                  }}
                />
              </div>
            </div>

            {/* Optional text alerts */}
            <div>
              <input
                type="checkbox"
                id="textAlerts"
                checked={formData.textAlerts}
                onChange={handleChange}
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="textAlerts">
                I agree to receive text messages about event updates.
              </label>
            </div>

            {/* Required Terms */}
            <div>
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="terms">
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>

            <button
              type="submit"
              style={{
                background: `linear-gradient(90deg, #228B22, #FF8C00, #87CEEB)`,
                color: "#000000",
                border: "none",
                padding: "0.75rem",
                borderRadius: "8px",
                fontWeight: "bold",
                width: "100%",
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
            >
              Create Account {id}
            </button>
          </form>

          <div
            style={{ height: "1px", background: "#eee", margin: "30px 0" }}
          ></div>

          {/* Role Section */}
          <div style={{ marginTop: "30px" }}>
            <h3
              style={{
                background: `linear-gradient(to right, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              What would you like to do next?
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginTop: "1rem",
              }}
            >
              {[
                {
                  path: "/register",
                  label: "Go to Registration",
                  description: "Secure your spot and choose your sessions.",
                },
                {
                  path: "/application_speaker",
                  label: "Apply as a Speaker",
                  description: "Share your expertise and present at sessions.",
                },
                {
                  path: "/application_sponsor",
                  label: "Apply as a Sponsor",
                  description: "Showcase your brand and reach attendees.",
                },
              ].map(({ path, label, description }) => (
                <div
                  key={path}
                  style={{
                    opacity: accountCreated ? 1 : 0.5,
                    pointerEvents: accountCreated ? "auto" : "none",
                  }}
                >
                  <p
                    style={{ marginBottom: "0.5rem", textAlign: "center" }}
                  >
                    {description}
                  </p>
                  <Link
                    to={path}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: `2px solid black`,
                      color: "black",
                      fontWeight: "bold",
                      textDecoration: "none",
                      backgroundColor: accountCreated ? "#fff" : "#f9f9f9",
                      cursor: accountCreated ? "pointer" : "not-allowed",
                    }}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          marginTop: "2rem",
          backgroundColor: "#ffffff",
          color: textColor,
        }}
      >
        <p>
          &copy; 2025 Event Management & Technology Solutions. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default CreateAccount;
