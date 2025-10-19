// Alexis Lewis worked on this file
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Fake users for each role
const fakeUsers = [
  {
    name: "John West",
    email: "johnw@example.com",
    password: "johnw123",
    role: "attendee",
    contactNumber: "(111) 111-1111",
    organization: "Company or School",
    registeredConferences: [
      {
        id: 1,
        title: "Georgia Environmental Conference",
        date: "August 19-21, 2026",
        location: "Jekyll Island Convention Center | Jekyll Island, Georgia",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"
      },
      {
        id: 2,
        title: "Tennessee Environmental Network Show of the South",
        date: "May 13-15, 2026",
        location: "Chattanooga Convention Center | Chattanooga, Tennessee",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60"
      }
    ]
  },
  {
    name: "Alice Green",
    email: "aliceg@example.com",
    password: "alice123",
    role: "sponsor",
    contactNumber: "(222) 222-2222",
    organization: "Eco Corp",
    sponsoredConferences: [
      {
        id: 3,
        title: "North Carolina Sustainability Summit",
        date: "September 10-12, 2026",
        location: "Raleigh Convention Center | Raleigh, North Carolina",
        imageUrl: "https://images.unsplash.com/photo-1562183240-2df7b5b3a11c?auto=format&fit=crop&w=800&q=60"
      }
    ]
  },
  {
    name: "Bob Blue",
    email: "bob@example.com",
    password: "bob123",
    role: "speaker",
    contactNumber: "(333) 333-3333",
    organization: "University of Green",
    speakingConferences: [
      {
        id: 1,
        title: "Georgia Environmental Conference",
        date: "August 19-21, 2026",
        location: "Jekyll Island Convention Center | Jekyll Island, Georgia",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"
      }
    ]
  }
] as const

type UserRole = 'attendee' | 'sponsor' | 'speaker'

export default function UserDashboard() {
  const [userType, setUserType] = useState<UserRole>('attendee')
  const fakeUser = fakeUsers.find(u => u.role === userType)!

  const [formData, setFormData] = useState({
    firstName: fakeUser.name.split(" ")[0],
    lastName: fakeUser.name.split(" ")[1],
    email: fakeUser.email,
    contactNumber: fakeUser.contactNumber,
    organization: fakeUser.organization,
    password: '',
    confirmPassword: ''
  })

  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    setSuccessMessage("Your account has been updated successfully!")
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
  }

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as UserRole
    setUserType(selectedType)
    const newUser = fakeUsers.find(u => u.role === selectedType)!
    setFormData({
      firstName: newUser.name.split(" ")[0],
      lastName: newUser.name.split(" ")[1],
      email: newUser.email,
      contactNumber: newUser.contactNumber,
      organization: newUser.organization,
      password: '',
      confirmPassword: ''
    })
    setSuccessMessage(null)
  }

  const colors = {
    green: '#228B22',
    orange: '#FF8C00',
    babyBlue: '#87CEEB',
    text: '#333'
  }

  const gradientButton = {
    padding: '0.75rem',
    borderRadius: '6px',
    border: 'none',
    background: `linear-gradient(90deg, ${colors.green}, ${colors.orange}, ${colors.babyBlue})`,
    color: 'black',
    fontWeight: 600,
    textAlign: 'center' as const,
    cursor: 'pointer',
    display: 'inline-block',
    width: '100%',
    textDecoration: 'none'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div className="dashboard-container" style={{ maxWidth: '1200px', margin: '0 auto', color: 'black' }}>
        <h1 style={{ marginBottom: '1rem', color: 'black' }}>Welcome, {formData.firstName}!</h1>

        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="userType" style={{ color: 'black', marginRight: '0.5rem' }}>Switch Role:</label>
          <select id="userType" value={userType} onChange={handleUserTypeChange} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid black' }}>
            <option value="attendee">Attendee</option>
            <option value="sponsor">Sponsor</option>
            <option value="speaker">Speaker</option>
          </select>
        </div>

        {/* Account Details Form */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'black' }}>Account Details</h2>
          {successMessage && (
            <div style={{
              backgroundColor: "#d1fae5",
              color: colors.green,
              border: `3px solid ${colors.green}`,
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              fontWeight: 500
            }}>
              {successMessage}
            </div>
          )}
          <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '1rem', backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {['firstName','lastName','email','contactNumber','organization','password','confirmPassword'].map(field => (
                <div key={field}>
                  <label htmlFor={field} style={{ color: 'black' }}>
                    {field === 'password' ? 'New Password' : field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type={field.includes('password') ? 'password' : 'text'}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field === 'password' ? "Leave this blank to keep your current password" : field === 'confirmPassword' ? "Confirm new password" : undefined}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: `2px solid black`, color: 'black' }}
                  />
                </div>
              ))}
            </div>
            <button type="submit" style={gradientButton}>Update Account</button>
          </form>
        </section>

        {/* Conditional Dashboard Sections */}
        {userType === 'attendee' && 'registeredConferences' in fakeUser && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'black' }}>Registered Conferences</h2>
            <div className="conference-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {fakeUser.registeredConferences.map(conf => (
                <div key={conf.id} className="conference-card" style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={conf.imageUrl} alt={conf.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem', color: 'black' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{conf.title}</h3>
                    <p style={{ margin: '0.25rem 0' }}>{conf.date}</p>
                    <p style={{ margin: '0.25rem 0' }}>{conf.location}</p>
                    <Link to={`/conferences/${conf.id}`} style={gradientButton}>View Conference</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {userType === 'sponsor' && 'sponsoredConferences' in fakeUser && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'black' }}>Your Sponsored Conferences</h2>
            <div className="conference-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {fakeUser.sponsoredConferences.map(conf => (
                <div key={conf.id} className="conference-card" style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={conf.imageUrl} alt={conf.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem', color: 'black' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{conf.title}</h3>
                    <p style={{ margin: '0.25rem 0' }}>{conf.date}</p>
                    <p style={{ margin: '0.25rem 0' }}>{conf.location}</p>
                    <Link to={`/sponsor/${conf.id}`} style={gradientButton}>View Sponsorship</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {userType === 'speaker' && 'speakingConferences' in fakeUser && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'black' }}>Your Speaking Engagements</h2>
            <div className="conference-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {fakeUser.speakingConferences.map(conf => (
                <div key={conf.id} className="conference-card" style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={conf.imageUrl} alt={conf.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem', color: 'black' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{conf.title}</h3>
                    <p style={{ margin: '0.25rem 0' }}>{conf.date}</p>
                    <p style={{ margin: '0.25rem 0' }}>{conf.location}</p>
                    <Link to={`/speaker/${conf.id}`} style={gradientButton}>View Session</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Common Actions (all roles can do all three) */}
        <section>
          <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: 'black' }}>Additional Actions</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', width: '100%' }}>
              <div>
                <p style={{ marginBottom: '0.25rem', fontSize: '0.9rem', color: 'black' }}>
                  Secure your spot and choose your sessions.
                </p>
                <Link to="/register" style={gradientButton}>Register for a Conference</Link>
              </div>
              <div>
                <p style={{ marginBottom: '0.25rem', fontSize: '0.9rem', color: 'black' }}>
                  Showcase your brand and reach attendees.
                </p>
                <Link to="/application_sponsor" style={gradientButton}>Apply as a Sponsor</Link>
              </div>
              <div>
                <p style={{ marginBottom: '0.25rem', fontSize: '0.9rem', color: 'black' }}>
                  Share your expertise and present at sessions.
                </p>
                <Link to="/application_speaker" style={gradientButton}>Apply as a Speaker</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
