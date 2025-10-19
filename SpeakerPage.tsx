// Alexis Lewis worked on this file
import React, { useState } from "react";

const SpeakerApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    isSpeakerSubmitting: true,
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    organization: "",
    topic: "",
    proposedSpeakers: "",
    topicDescription: "",
    topicCategory: "",
    professionOfInterest: "",
    designatedTime: "",
    credentials: "",
    hasAttendedBefore: "",
    referredBy: "",
    agree: false,
    conferenceLocation: "", // added field
  });

  const [submitted, setSubmitted] = useState(false);

  const gradient = "linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)";
  const textColor = "#000000";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;
    const val: string | boolean = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

  if (submitted) {
    return (
      <div style={{ backgroundColor: "#ffffff", color: textColor, minHeight: "100vh", fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
        <header
          style={{
            background: gradient,
            color: textColor,
            padding: "3rem 1rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>
            Submission Confirmed
          </h1>
          <p style={{ fontSize: "1.25rem" }}>
            Thank you for your submission!
          </p>
        </header>
        <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
          <section
            style={{
              backgroundColor: "#ffffff",
              border: "4px solid transparent",
              borderRadius: "12px",
              borderImageSlice: 1,
              borderImageSource: gradient,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <p>
              Admins will reach back out to you with a decision via email at <strong>{formData.email}</strong>.
            </p>
          </section>
        </main>
        <footer style={{ textAlign: "center", padding: "2rem", marginTop: "2rem" }}>
          <p>&copy; 2025 Event Management & Technology Solutions. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ffffff", color: textColor, minHeight: "100vh", fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
      <header
        style={{
          background: gradient,
          color: textColor,
          padding: "3rem 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>
          Speaker and Topic Proposal Application
        </h1>
        <p style={{ fontSize: "1.25rem" }}>
          Apply as a speaker or submit a topic proposal on behalf of a speaker.
        </p>
      </header>

      <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
        <section>
          {/* Info box */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "4px solid transparent",
              borderRadius: "12px",
              borderImageSlice: 1,
              borderImageSource: gradient,
              padding: "1.5rem",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            <p>
              All topic proposals submitted for our conferences will be reviewed by the conference Steering Committee. Accepted topics will receive confirmation by March.
            </p>
            <p>
              <strong>Session Length:</strong> Sessions are 60 minutes. Submit multi-part topics separately if needed.
            </p>
          </div>

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
            {/* Checkbox at top */}
            <div>
              <input
                type="checkbox"
                id="isSpeakerSubmitting"
                checked={formData.isSpeakerSubmitting}
                onChange={handleChange}
                style={{ marginRight: "0.5rem" }}
              />
              <label htmlFor="isSpeakerSubmitting">
                I am the speaker submitting this application
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label htmlFor="firstName" style={getLabelStyle()}>
                  {formData.isSpeakerSubmitting ? "Speaker's First Name *" : "Submitter's First Name *"}
                </label>
                <input id="firstName" type="text" value={formData.firstName} onChange={handleChange} required style={getInputStyle()} />
              </div>

              <div>
                <label htmlFor="lastName" style={getLabelStyle()}>
                  {formData.isSpeakerSubmitting ? "Speaker's Last Name *" : "Submitter's Last Name *"}
                </label>
                <input id="lastName" type="text" value={formData.lastName} onChange={handleChange} required style={getInputStyle()} />
              </div>

              <div>
                <label htmlFor="email" style={getLabelStyle()}>
                  {formData.isSpeakerSubmitting ? "Speaker's Email *" : "Submitter's Email *"}
                </label>
                <input id="email" type="email" value={formData.email} onChange={handleChange} required style={getInputStyle()} />
              </div>

              <div>
                <label htmlFor="contactNumber" style={getLabelStyle()}>
                  {formData.isSpeakerSubmitting ? "Speaker's Phone Number *" : "Submitter's Phone Number *"}
                </label>
                <input id="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} required style={getInputStyle()} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="organization" style={getLabelStyle()}>
                  {formData.isSpeakerSubmitting ? "Speaker's Organization/Company *" : "Submitter's Organization/Company *"}
                </label>
                <input id="organization" type="text" value={formData.organization} onChange={handleChange} required style={getInputStyle()} />
              </div>

              {/* ✅ Added new conference selection field */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="conferenceLocation" style={getLabelStyle()}>
                  Which conference would the speaker like to speak at? *
                </label>
                <select
                  id="conferenceLocation"
                  value={formData.conferenceLocation}
                  onChange={handleChange}
                  required
                  style={getInputStyle()}
                >
                  <option value="">Select a conference</option>
                  <option value="Georgia">Georgia Conference</option>
                  <option value="Tennessee">Tennessee Conference</option>
                  <option value="North Carolina">North Carolina Conference</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="hasAttendedBefore" style={getLabelStyle()}>Has the speaker attended any of our previous conferences? (GA, TN, NC)*</label>
                <select id="hasAttendedBefore" value={formData.hasAttendedBefore} onChange={handleChange} required style={getInputStyle()}>
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="topic" style={getLabelStyle()}>Proposed Topic Title *</label>
                <input id="topic" type="text" value={formData.topic} onChange={handleChange} required style={getInputStyle()} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="proposedSpeakers" style={getLabelStyle()}>Proposed Speakers and Their Organizations *</label>
                <textarea id="proposedSpeakers" value={formData.proposedSpeakers} onChange={handleChange} rows={3} required style={getInputStyle()} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="topicDescription" style={getLabelStyle()}>Brief Description of Proposed Topic *</label>
                <textarea id="topicDescription" value={formData.topicDescription} onChange={handleChange} rows={4} required style={getInputStyle()} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="topicCategory" style={getLabelStyle()}>Topic Category *</label>
                <select id="topicCategory" value={formData.topicCategory} onChange={handleChange} required style={getInputStyle()}>
                  <option value="">Select a category</option>
                  <option value="Air">Air</option>
                  <option value="Brownfields/Land Use/Remediation">Brownfields/Land Use/Remediation</option>
                  <option value="Climate/Resilience/Adaptation">Climate/Resilience/Adaptation</option>
                  <option value="Contaminants of Emerging Concern/Cumulative Impact">Contaminants of Emerging Concern/Cumulative Impact</option>
                  <option value="Energy/Transportation">Energy/Transportation</option>
                  <option value="Hazardous Waste (Compliance)">Hazardous Waste (Compliance)</option>
                  <option value="Industrial Hygiene/Environmental Health and Safety">Industrial Hygiene/Environmental Health and Safety</option>
                  <option value="Legal Profession">Legal Profession</option>
                  <option value="Natural Resources/Conservation">Natural Resources/Conservation</option>
                  <option value="Solid Waste/Recycling">Solid Waste/Recycling</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Water">Water</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="professionOfInterest" style={getLabelStyle()}>Specific Profession of Interest (Optional)</label>
                <input id="professionOfInterest" type="text" value={formData.professionOfInterest} onChange={handleChange} style={getInputStyle()} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="credentials" style={getLabelStyle()}>Credentials / Professional Experience *</label>
                <textarea id="credentials" value={formData.credentials} onChange={handleChange} rows={4} required style={getInputStyle()} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="referredBy" style={getLabelStyle()}>Referral Information</label>
                <input id="referredBy" type="text" value={formData.referredBy} onChange={handleChange} style={getInputStyle()} />
              </div>
            </div>

            <div>
              <input type="checkbox" id="agree" checked={formData.agree} onChange={handleChange} required style={{ marginRight: "0.5rem" }} />
              <label htmlFor="agree">I confirm that the information provided is accurate and complete.</label>
            </div>

            <button
              type="submit"
              style={{
                background: gradient,
                color: "#010101ff",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "1.1rem",
                width: "100%",
                cursor: "pointer",
              }}
            >
              SUBMIT
            </button>
          </form>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "2rem", marginTop: "2rem" }}>
        <p>&copy; 2025 Event Management & Technology Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SpeakerApplication;
