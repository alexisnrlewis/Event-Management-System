// Alexis Lewis worked on this file
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Fake users for each role
const fakeUsers = [
  {
    name: "John West",
    email: "johnw@example.com",
    password: "johnw123",
    role: "attendee",
  },
  {
    name: "Alice Green",
    email: "aliceg@example.com",
    password: "alice123",
    role: "sponsor",
  },
  {
    name: "Bob Blue",
    email: "bob@example.com",
    password: "bob123",
    role: "speaker",
  }
]

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const user = fakeUsers.find(
      (u) => u.email === email && u.password === password
    )

    if (user) {
      setNotification(`Welcome back, ${user.name}! Redirecting...`)
      setTimeout(() => {
        navigate('/dashboard') // Naviagtes to user dashboard webpage
      }, 1500)
    } else {
      setNotification('No account found. Please create an account.')
      setTimeout(() => navigate('/create-account'), 2000)
    }
  }

  const colors = {
    green: '#228B22',
    orange: '#FF8C00',
    babyBlue: '#87CEEB',
    text: '#333'
  }

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif', background: '#f5f5f5' }}>
      
      {/* Gradient Header at Top */}
      <header
        style={{
          width: '100%',
          padding: '3rem 0',
          background: `linear-gradient(135deg, ${colors.green}, ${colors.orange}, ${colors.babyBlue})`,
          textAlign: 'center',
          color: 'black'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>LOGIN</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Sign in to your account to access your personal details and view your dashboard.
        </p>
      </header>

      {/* Form Container Centered */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
          padding: '2rem'
        }}
      >
        <div
          style={{
            width: '400px',
            padding: '2rem',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            textAlign: 'center',
            color: 'black',
          }}
        >
          {notification && (
            <p style={{ 
              color: 'black', 
              marginBottom: '1rem',
              fontWeight: 600
            }}>
              {notification}
            </p>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '2px solid black',
                outline: 'none',
                fontSize: '1rem',
                color: 'black',
                background: 'white'
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: '2px solid black',
                outline: 'none',
                fontSize: '1rem',
                color: 'black',
                background: 'white'
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                background: `linear-gradient(90deg, ${colors.green}, ${colors.orange}, ${colors.babyBlue})`,
                color: 'black',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              LOGIN
            </button>
          </form>

          <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: 'black' }}>
            Don't have an account?{' '}
            <Link to="/create-account" style={{ fontWeight: 600, color: 'black' }}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
