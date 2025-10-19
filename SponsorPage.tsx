// Alexis Lewis worked on this file
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SponsorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    organization: "",
    donationAmount: "",
    message: "",
    agree: false,
    conference: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const gradient = "linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)";
  const textColor = "#000000";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { id, value, type } = target;
    let val: string | boolean;

    if (type === "checkbox" && target instanceof HTMLInputElement) {
      val = target.checked;
    } else {
      val = value;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.conference) {
      alert("Please select a conference to sponsor.");
      return;
    }

    const donation = parseFloat(formData.donationAmount);
    if (isNaN(donation) || donation < 250) {
      alert("Minimum sponsorship amount is $250.");
      return;
    }

    console.log("Sponsor Application Submitted:", formData);

    const confNames: Record<string, string> = {
      ga: "Georgia Environmental Conference",
      tn: "Tennessee Environmental Network Show of the South",
      nc: "North Carolina Sustainability Summit",
    };

    setSuccessMessage(
      `Thank you, ${formData.firstName}! Your sponsorship donation of $${formData.donationAmount} for the ${confNames[formData.conference]} has been submitted. Redirecting to booth reservations...`
    );

    const conferenceRoutes: Record<string, string> = {
      ga: "/conferences/1/booth-reservation",
      tn: "/conferences/2/booth-reservation",
      nc: "/conferences/3/booth-reservation",
    };

    setTimeout(() => {
      navigate(conferenceRoutes[formData.conference]);
    }, 2000);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      organization: "",
      donationAmount: "",
      message: "",
      agree: false,
      conference: "",
    });
  };

  const getInputStyle = () => ({
    border: "2px solid black",
    borderRadius: "8px",
    padding: "0.75rem",
    width: "100%",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "#ffffff",
  });

  const getLabelStyle = () => ({
    display: "block",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "0.5rem",
    color: textColor,
  });

  const gradientButtonStyle = {
    background: gradient,
    color: "#000000",
    border: "none",
    padding: "1rem",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "1.1rem",
    width: "100%",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: textColor,
        minHeight: "100vh",
        fontFamily:
          "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: gradient,
          color: textColor,
          padding: "3rem 1rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
        >
          Sponsor Application
        </h1>
        <p style={{ fontSize: "1.25rem" }}>
          Apply to sponsor our conference and showcase your brand to attendees.
        </p>
      </header>

      <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
        {/* Sponsorship Tiers Section */}
        <section
          style={{
            border: "4px solid transparent",
            borderRadius: "12px",
            borderImageSlice: 1,
            borderImageSource: gradient,
            padding: "1.5rem",
            marginBottom: "2rem",
            backgroundColor: "#ffffff",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              marginBottom: "1rem",
              textAlign: "center",
              color: "#000000",
            }}
          >
            Sponsorship Tiers
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              color: "#000000",
              fontWeight: "500",
            }}
          >
            Minimum sponsorship amount: <strong>$250</strong>
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#000000",
            }}
          >
            <thead>
              <tr
                style={{
                  background: gradient,
                  color: "#000000",
                }}
              >
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Tier</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "0.75rem", textAlign: "left" }}>Recognition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.75rem", fontWeight: "600" }}>Bronze</td>
                <td style={{ padding: "0.75rem" }}>$250 – $499</td>
                <td style={{ padding: "0.75rem" }}>
                  Name listed on website + social media thank you
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", fontWeight: "600" }}>Silver</td>
                <td style={{ padding: "0.75rem" }}>$500 – $999</td>
                <td style={{ padding: "0.75rem" }}>
                  Small booth space or banner mention
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", fontWeight: "600" }}>Gold</td>
                <td style={{ padding: "0.75rem" }}>$1,000 – $2,499</td>
                <td style={{ padding: "0.75rem" }}>
                  Booth + logo on event signage
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", fontWeight: "600" }}>Platinum</td>
                <td style={{ padding: "0.75rem" }}>$2,500+</td>
                <td style={{ padding: "0.75rem" }}>
                  Premium booth, stage shout-out, logo on main banner
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Sponsor Registration Form */}
        <section>
          {successMessage && (
            <div
              style={{
                backgroundColor: "#e6ffe6",
                color: "#228B22",
                border: `1px solid #228B22`,
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

          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#ffffff",
              border: "4px solid transparent",
              borderRadius: "12px",
              borderImageSlice: 1,
              borderImageSource: gradient,
              padding: "2rem",
              display: "grid",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label htmlFor="firstName" style={getLabelStyle()}>
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={getInputStyle()}
                />
              </div>

              <div>
                <label htmlFor="lastName" style={getLabelStyle()}>
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={getInputStyle()}
                />
              </div>

              <div>
                <label htmlFor="email" style={getLabelStyle()}>
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={getInputStyle()}
                />
              </div>

              <div>
                <label htmlFor="contactNumber" style={getLabelStyle()}>
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  style={getInputStyle()}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="organization" style={getLabelStyle()}>
                  Organization*
                </label>
                <input
                  type="text"
                  id="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  style={getInputStyle()}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="conference" style={getLabelStyle()}>
                  Which conference would you like to sponsor?*
                </label>
                <select
                  id="conference"
                  value={formData.conference}
                  onChange={handleChange}
                  required
                  style={getInputStyle()}
                >
                  <option value="">-- Select Conference --</option>
                  <option value="ga">Georgia Environmental Conference</option>
                  <option value="tn">
                    Tennessee Environmental Network Show of the South
                  </option>
                  <option value="nc">
                    North Carolina Sustainability Summit
                  </option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="donationAmount" style={getLabelStyle()}>
                  Donation Amount ($)* <span style={{ color: "#888" }}>(Minimum $250)</span>
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  value={formData.donationAmount}
                  onChange={handleChange}
                  required
                  min="250"
                  style={getInputStyle()}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="message" style={getLabelStyle()}>
                  Message / Notes (Optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  style={getInputStyle()}
                />
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                id="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="agree">
                I confirm that the information provided is accurate.
              </label>
            </div>

            <button type="submit" style={gradientButtonStyle}>
              SUBMIT
            </button>
          </form>
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

export default SponsorPage;
