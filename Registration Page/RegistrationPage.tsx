import React, { useState } from "react";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: "",
    eventId: 1, // default to event 1; you can update dynamically
    role: "ATTENDEE",
    firstTimeAttendee: "YES",
    howDidYouHear: "FRIEND",
    industry: "PRIVATE",
    companySize: "",
    environmentalPriorities: "",
    dietaryPreferences: "",
    scholarshipDonation: "",
    mayPublishEmail: "NO",
    ticketType: "REGULAR",
    eventSpecificAccessibility: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({
          userId: "",
          eventId: 1,
          role: "ATTENDEE",
          firstTimeAttendee: "YES",
          howDidYouHear: "FRIEND",
          industry: "PRIVATE",
          companySize: "",
          environmentalPriorities: "",
          dietaryPreferences: "",
          scholarshipDonation: "",
          mayPublishEmail: "NO",
          ticketType: "REGULAR",
          eventSpecificAccessibility: "",
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">User Registration</h2>

        {message && (
          <div
            className={`mb-4 text-center p-2 rounded ${
              message.includes("successful")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="ATTENDEE">Attendee</option>
              <option value="SPEAKER">Speaker</option>
              <option value="SPONSOR">Sponsor</option>
            </select>
          </div>

          {/* First-time attendee */}
          <div>
            <label className="block text-sm font-medium mb-1">First Time Attendee?</label>
            <select
              name="firstTimeAttendee"
              value={formData.firstTimeAttendee}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>

          {/* How did you hear about us */}
          <div>
            <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
            <select
              name="howDidYouHear"
              value={formData.howDidYouHear}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="FRIEND">Friend</option>
              <option value="FAMILY">Family</option>
              <option value="GOOGLE">Google</option>
              <option value="AD">Ad</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="GOVERNMENT">Government</option>
              <option value="NONPROFIT">Nonprofit</option>
              <option value="EDUCATION">Education</option>
              <option value="PRIVATE">Private</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Company size */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Size</label>
            <input
              type="number"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 50"
            />
          </div>

          {/* Environmental priorities */}
<div>
  <label className="block text-sm font-medium mb-1">Environmental Priorities</label>
  <select
    name="environmentalPriorities"
    value={formData.environmentalPriorities}
    onChange={handleChange}
    className="w-full border rounded-lg p-2"
  >
    <option value="">Select one</option>
    <option value="Recycling">Recycling</option>
    <option value="Energy Efficiency">Energy Efficiency</option>
    <option value="Water Conservation">Water Conservation</option>
    <option value="Sustainable Sourcing">Sustainable Sourcing</option>
    <option value="Carbon Reduction">Carbon Reduction</option>
    <option value="Other">Other</option>
  </select>
</div>

         {/* Dietary preferences */}
<div>
  <label className="block text-sm font-medium mb-1">Dietary Preferences</label>
  <select
    name="dietaryPreferences"
    value={formData.dietaryPreferences}
    onChange={handleChange}
    className="w-full border rounded-lg p-2"
  >
    <option value="">Select one</option>
    <option value="None">None</option>
    <option value="Vegan">Vegan</option>
    <option value="Vegetarian">Vegetarian</option>
    <option value="Gluten-Free">Gluten-Free</option>
    <option value="Halal">Halal</option>
    <option value="Kosher">Kosher</option>
    <option value="Other">Other</option>
  </select>
</div>

          {/* Scholarship / Donation */}
          <div>
            <label className="block text-sm font-medium mb-1">Scholarship / Donation</label>
            <input
              type="number"
              name="scholarshipDonation"
              value={formData.scholarshipDonation}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 50.00"
            />
          </div>

          {/* May publish email */}
          <div>
            <label className="block text-sm font-medium mb-1">May we publish your email?</label>
            <select
              name="mayPublishEmail"
              value={formData.mayPublishEmail}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
          </div>

          {/* Ticket Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Ticket Type</label>
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="REGULAR">Regular</option>
              <option value="GOVERNMENT, UNIVERSITY, OR NONPROFIT">
                Government, University, or Nonprofit
              </option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          {/* Event Specific Accessibility */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Specific Accessibility</label>
            <input
              type="text"
              name="eventSpecificAccessibility"
              value={formData.eventSpecificAccessibility}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., Wheelchair Access"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
