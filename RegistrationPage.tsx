// Alexis Lewis worked on this file
// Zach added styling to make this webpage match the current frontend style

import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface ConferenceRegistrationFormProps {
  conferenceName?: string;
}

const ConferenceRegistrationForm: React.FC<ConferenceRegistrationFormProps> = ({ }) => {
  const { id } = useParams<{ id: string }>();


  const [formData, setFormData] = useState({
    userId: "",
    eventId: Number(id) || 1,
    role: "ATTENDEE",
    firstTimeAttendee: "YES",
    howDidYouHear: "FRIEND",
    howDidYouHearOther: "",
    environmentalPriorities: "",
    environmentalPrioritiesOther: "",
    dietaryPreferences: "",
    dietaryPreferencesOther: "",
    scholarshipDonationChoice: "NO",
    scholarshipDonation: "",
    mayPublishEmail: "NO",
    ticketType: "REGULAR",
    eventSpecificAccessibility: "",
    firstName: "",
    lastName: "",
    email: "",
    studentUniversity: "",
    studentProgram: "",
    studentGraduationDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const getLabelStyle = () => ({
    display: "block",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "0.5rem",
    color: "#1e293b"
  });

  const getInputStyle = () => ({
    border: "2px solid #000000",
    borderRadius: "8px",
    padding: "0.75rem",
    width: "100%",
    fontSize: "1rem",
    transition: "all 0.2s",
    outline: "none",
    background: "white",
  });

  const handleInputFocus = () => { };
  const handleInputBlur = () => { };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const getFriendlyTicketName = (ticketType: string) => {
    switch (ticketType) {
      case "REGULAR": return "Regular Attendee";
      case "GUN": return "Government, University, Non-Profit (GUN)";
      case "STUDENT": return "Student Attendee";
      default: return ticketType;
    }
  };

  const getTicketPrice = (ticketType: string) => {
    switch (ticketType) {
      case "REGULAR": return "$595 (Early Bird $550 before May 31)";
      case "GUN": return "$495 (Early Bird $450 before May 31)";
      case "STUDENT": return "$250";
      default: return "";
    }
  };

  const getTicketInfo = (ticketType: string) => {
    switch (ticketType) {
      case "REGULAR":
        return <>
          <p>Regular Attendee: $595 (Early Bird $550 before May 31)</p>
          <p>
            Includes optional Early Session, choice of courses in 11 Breakout Sessions, 2 Keynotes, 2 breakfasts, 2 lunches, 1 evening reception.
          </p>
        </>;
      case "GUN":
        return <>
          <p>GUN Attendee: $495 (Early Bird $450 before May 31)</p>
          <p>
            Includes optional Early Session, choice of courses in 11 Breakout Sessions, 2 Keynotes, 2 breakfasts, 2 lunches, 1 evening reception.
          </p>
        </>;
      case "STUDENT":
        return <>
          <p>Student Attendee: $250 (Verification Required)</p>
          <p>
            Includes optional Early Session, choice of courses in 11 Breakout Sessions, 2 Keynotes, 2 breakfasts, 2 lunches, 1 evening reception.
          </p>
        </>;
      default: return null;
    }
  };

  return (
    <div style={{
      backgroundColor: "#ffffffff",
      color: "#000000ff",
      minHeight: "100vh",
      fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
      lineHeight: "1.5",
      fontWeight: "400"
    }}>
      <header
        style={{
          background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
          color: "#000000",
          padding: "4rem 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          color: "#000000"
        }}>
          Conference Registration
        </h1>
        <p style={{
          fontSize: "1.25rem",
          opacity: 0.95,
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          color: "#000000"
        }}>
          Join us for our conference - we are excited to have you!
        </p>
        <p style={{
          fontSize: "1.25rem",
          opacity: 0.95,
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          color: "#000000"
        }}>
          Please fill out the form below to register.
        </p>
      </header>

      <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              border: "4px solid transparent",
              padding: "2rem",
              display: "grid",
              gap: "2rem",
              background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #228B22, #FF8C00, #87CEEB) border-box",
            }}
          >
            {/* Personal Info */}
            <section>
              <h2 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem",  
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>Personal Information</h2>
              <div>
                <label style={getLabelStyle()}>First Name*</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              </div>
              <div>
                <label style={getLabelStyle()}>Last Name*</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              </div>
              <div>
                <label style={getLabelStyle()}>Email*</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              </div>
            </section>

            {/* Attendance Info */}
            <section>
              <h2 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem", 
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>Attendance Information</h2>
              <div>
                <label style={getLabelStyle()}>Is this your first time attending?</label>
                <select name="firstTimeAttendee" value={formData.firstTimeAttendee} onChange={handleChange} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur}>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
              <div>
                <label style={getLabelStyle()}>How did you hear about us?</label>
                <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleChange} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur}>
                  <option value="FRIEND">Friend</option>
                  <option value="FAMILY">Family</option>
                  <option value="SOCIAL_MEDIA">Social Media</option>
                  <option value="SEARCH_ENGINE">Search Engine</option>
                  <option value="EMAIL">Email</option>
                  <option value="OTHER">Other</option>
                </select>
                {formData.howDidYouHear === "OTHER" && (
                  <input type="text" name="howDidYouHearOther" value={formData.howDidYouHearOther} onChange={handleChange} placeholder="Please Explain" style={{ ...getInputStyle(), marginTop: "0.5rem" }} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                )}
              </div>
            </section>

            {/* Environmental & Dietary */}
            <section>
              <h2 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem", 
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>Environmental & Dietary Preferences</h2>
              <div>
                <label style={getLabelStyle()}>Environmental Priorities</label>
                <select name="environmentalPriorities" value={formData.environmentalPriorities} onChange={handleChange} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur}>
                  <option value="CLIMATE_CHANGE">Climate Change</option>
                  <option value="AIR_POLLUTION">Air Pollution</option>
                  <option value="DEFORESTATION">Deforestation</option>
                  <option value="WATER_POLLUTION">Water Pollution</option>
                  <option value="PLASTIC_POLLUTION">Plastic Pollution</option>
                  <option value="OTHER">Other</option>
                </select>
                {formData.environmentalPriorities === "OTHER" && (
                  <input type="text" name="environmentalPrioritiesOther" value={formData.environmentalPrioritiesOther} onChange={handleChange} placeholder="Please Explain" style={{ ...getInputStyle(), marginTop: "0.5rem" }} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                )}
              </div>
              <div>
                <label style={getLabelStyle()}>Dietary Preferences (Optional)</label>
                <input type="text" name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              </div>
            </section>

            {/* Scholarship & Privacy */}
            <section>
              <h2 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem", 
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>Scholarship & Privacy</h2>
              <div>
                <label style={getLabelStyle()}>Would you like to donate to our scholarship fund?</label>
                <select name="scholarshipDonationChoice" value={formData.scholarshipDonationChoice} onChange={(e) => {
                  const choice = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    scholarshipDonationChoice: choice,
                    scholarshipDonation: choice === "NO" ? "" : prev.scholarshipDonation,
                  }));
                }} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur}>
                  <option value="NO">No</option>
                  <option value="YES">Yes</option>
                </select>
                {formData.scholarshipDonationChoice === "YES" && (
                  <>
                    <input type="number" name="scholarshipDonation" value={formData.scholarshipDonation} onChange={handleChange} placeholder="Enter Donation Amount" min="1" step="0.01" style={{ ...getInputStyle(), marginTop: "0.5rem" }} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                    {formData.scholarshipDonation && Number(formData.scholarshipDonation) > 0 && (
                      <p style={{ marginTop: "0.5rem", color: "#16a34a", fontWeight: "500" }}>
                        Thank you for your generous donation of ${Number(formData.scholarshipDonation).toFixed(2)}!
                      </p>
                    )}
                  </>
                )}
              </div>
              <div>
                <label style={getLabelStyle()}>May we publish your email in the attendee list?*</label>
                <select name="mayPublishEmail" value={formData.mayPublishEmail} onChange={handleChange} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur}>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
            </section>

            {/* Ticket Info */}
            <section>
              <h2 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem", 
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>Ticket Information</h2>
              <div>
                <label style={getLabelStyle()}>Ticket Type* (Students must register using their college or university email)</label>
                <select name="ticketType" value={formData.ticketType} onChange={handleChange} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur}>
                  <option value="REGULAR">Regular Attendee</option>
                  <option value="GUN">Government, University, Non-Profit (GUN) Attendee</option>
                  <option value="STUDENT">Student Attendee</option>
                </select>
                <div style={{ marginTop: "0.5rem" }}>{getTicketInfo(formData.ticketType)}</div>

                {formData.ticketType === "STUDENT" && (
                  <>
                    <div style={{ marginTop: "0.5rem" }}>
                      <label style={getLabelStyle()}>University*</label>
                      <input type="text" name="studentUniversity" value={formData.studentUniversity} onChange={handleChange} required style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                    </div>
                    <div style={{ marginTop: "0.5rem" }}>
                      <label style={getLabelStyle()}>College Program*</label>
                      <input type="text" name="studentProgram" value={formData.studentProgram} onChange={handleChange} required style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                    </div>
                    <div style={{ marginTop: "0.5rem" }}>
                      <label style={getLabelStyle()}>Expected Graduation Date*</label>
                      <input type="month" name="studentGraduationDate" value={formData.studentGraduationDate} onChange={handleChange} required style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Accessibility */}
            <section>
              <h2 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem", 
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>Accessibility</h2>
              <div>
                <label style={getLabelStyle()}>Any accessibility needs? (Optional)</label>
                <input type="text" name="eventSpecificAccessibility" value={formData.eventSpecificAccessibility} onChange={handleChange} style={getInputStyle()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              </div>
            </section>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                color: "#000000ff",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "1.1rem",
                width: "100%",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)"
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(-2px)";
                target.style.boxShadow = "0 8px 15px -3px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
            >
              SUBMIT
            </button>
          </form>
        ) : (
          <div
            style={{
              marginTop: "2rem",
              padding: "2rem",
              border: "4px solid transparent",
              background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #228B22, #FF8C00, #87CEEB) border-box",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ 
                fontSize: "2rem", 
                fontWeight: "700", 
                marginBottom: "1rem",
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>
                Registration Confirmed!
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#000000", marginBottom: "0.5rem" }}>
                Thank you for registering for the conference!
              </p>
              <p style={{ fontSize: "1rem", color: "#000000" }}>
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>
            </div>

            <section style={{ marginBottom: "2rem" }}>
              <h3 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem",
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>Registration Details</h3>
              
              <div style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label style={getLabelStyle()}>Name:</label>
                  <div style={{ 
                    padding: "0.75rem", 
                    border: "2px solid #000000", 
                    borderRadius: "8px", 
                    backgroundColor: "white",
                    color: "#000000",
                    fontWeight: "500"
                  }}>
                    {formData.firstName} {formData.lastName}
                  </div>
                </div>
                
                <div>
                  <label style={getLabelStyle()}>Ticket:</label>
                  <div style={{ 
                    padding: "0.75rem", 
                    border: "2px solid #000000", 
                    borderRadius: "8px", 
                    backgroundColor: "white",
                    color: "#000000",
                    fontWeight: "500"
                  }}>
                    {getFriendlyTicketName(formData.ticketType)}
                  </div>
                </div>
                
                <div>
                  <label style={getLabelStyle()}>Price:</label>
                  <div style={{ 
                    padding: "0.75rem", 
                    border: "2px solid #000000", 
                    borderRadius: "8px", 
                    backgroundColor: "white",
                    color: "#000000",
                    fontWeight: "500"
                  }}>
                    {getTicketPrice(formData.ticketType)}
                  </div>
                </div>

                {formData.ticketType === "STUDENT" && (
                  <>
                    <div>
                      <label style={getLabelStyle()}>University:</label>
                      <div style={{ 
                        padding: "0.75rem", 
                        border: "2px solid #000000", 
                        borderRadius: "8px", 
                        backgroundColor: "white",
                        color: "#000000",
                        fontWeight: "500"
                      }}>
                        {formData.studentUniversity}
                      </div>
                    </div>
                    <div>
                      <label style={getLabelStyle()}>Program:</label>
                      <div style={{ 
                        padding: "0.75rem", 
                        border: "2px solid #000000", 
                        borderRadius: "8px", 
                        backgroundColor: "white",
                        color: "#000000",
                        fontWeight: "500"
                      }}>
                        {formData.studentProgram}
                      </div>
                    </div>
                  </>
                )}

                {formData.scholarshipDonation && Number(formData.scholarshipDonation) > 0 && (
                  <div>
                    <label style={getLabelStyle()}>Scholarship Donation:</label>
                    <div style={{ 
                      padding: "0.75rem", 
                      border: "2px solid #000000", 
                      borderRadius: "8px", 
                      backgroundColor: "white",
                      color: "#16a34a",
                      fontWeight: "600"
                    }}>
                      ${Number(formData.scholarshipDonation).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
              <h3 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "600", 
                marginBottom: "1rem",
                background: `linear-gradient(135deg, #228B22, #FF8C00, #87CEEB)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent" 
              }}>What's Included</h3>
              <div style={{ 
                padding: "1rem", 
                border: "2px solid #000000", 
                borderRadius: "8px", 
                backgroundColor: "white"
              }}>
                <ul style={{ marginLeft: "1.25rem", color: "#000000", lineHeight: "1.8" }}>
                  <li>Optional Early Session</li>
                  <li>Choice of courses in 11 Breakout Sessions</li>
                  <li>2 Keynote presentations</li>
                  <li>2 breakfasts, 2 lunches, and 1 evening reception</li>
                </ul>
              </div>
            </section>

            <div style={{ textAlign: "center", color: "#000000", fontSize: "1rem" }}>
              <p style={{ marginBottom: "0.5rem" }}>We look forward to seeing you at the event!</p>
              <p>
                Questions? Contact us at <a href="mailto:DMook@CentergyGroup.com" style={{ color: "#228B22", fontWeight: "500", textDecoration: "none" }}>DMook@CentergyGroup.com</a> or <a href="mailto:JGeraghty@CentergyGroup.com" style={{ color: "#228B22", fontWeight: "500", textDecoration: "none" }}>JGeraghty@CentergyGroup.com</a>
              </p>
            </div>
          </div>
        )}
      </main>
      
      <footer style={{
        textAlign: "center",
        padding: "2rem",
        marginTop: "3rem",
        color: "#000000ff"
      }}>
        <p>&copy; 2025 Event Management & Technology Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ConferenceRegistrationForm;
    
