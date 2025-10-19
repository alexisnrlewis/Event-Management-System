import tenConfig from '../config/ten-2024.ts'
// Alexis Lewis worked on this file
export default function TNWebsite() {
  const { eventInfo, branding, homepage, schedule, speakers } = tenConfig

  return (
    <div style={{
      backgroundColor: "#ffffff",
      color: "#000000",
      minHeight: "100vh",
      fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
    }}>
      {/* Hero Section */}
      <header style={{
        background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})`,
        color: "#ffffff",
        padding: "4rem 1rem",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}>
          {homepage.hero.title}
        </h1>
        <p style={{
          fontSize: "1.5rem",
          marginBottom: "0.5rem",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}>
          {homepage.hero.subtitle}
        </p>
        <p style={{
          fontSize: "1.25rem",
          marginBottom: "2rem",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}>
          {eventInfo.dates.full} | {eventInfo.venue.name}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {homepage.hero.ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "1.1rem",
                textDecoration: "none",
                backgroundColor: button.style === "primary" ? branding.accentColor : "transparent",
                color: "#ffffff",
                border: `2px solid ${button.style === "primary" ? branding.accentColor : "#ffffff"}`,
                transition: "all 0.2s",
              }}
            >
              {button.text}
            </a>
          ))}
        </div>
      </header>

      {/* Quick Info Section */}
      <section style={{ padding: "3rem 1rem", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "2rem",
            color: branding.primaryColor
          }}>
            Conference Overview
          </h2>
          <p style={{
            fontSize: "1.2rem",
            textAlign: "center",
            marginBottom: "3rem",
            maxWidth: "800px",
            margin: "0 auto 3rem"
          }}>
            {homepage.description}
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem"
          }}>
            {homepage.quickInfo.map((info, index) => (
              <div key={index} style={{
                backgroundColor: "#ffffff",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                border: `3px solid ${branding.secondaryColor}`
              }}>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: branding.primaryColor
                }}>
                  {info.title}
                </h3>
                <p style={{ fontSize: "1rem", color: "#64748b" }}>{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section style={{ padding: "3rem 1rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "2rem",
            color: branding.primaryColor
          }}>
            Who Should Attend
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}>
            {homepage.featuredSections[0].items.map((item, index) => (
              <div key={index} style={{
                backgroundColor: branding.secondaryColor,
                color: "#ffffff",
                padding: "1.5rem",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "500",
                textAlign: "center"
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Highlights */}
      <section style={{ padding: "3rem 1rem", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "2rem",
            color: branding.primaryColor
          }}>
            Schedule Highlights
          </h2>
          {schedule.days.map((day, dayIndex) => (
            <div key={dayIndex} style={{ marginBottom: "3rem" }}>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: branding.primaryColor
              }}>
                {day.dayLabel}
              </h3>
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} style={{
                    padding: "1rem 1.5rem",
                    borderBottom: eventIndex < day.events.length - 1 ? "1px solid #e2e8f0" : "none",
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: "1rem",
                    alignItems: "center"
                  }}>
                    <div style={{ fontWeight: "600", color: branding.primaryColor }}>
                      {event.time}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{event.title}</div>
                      <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                        {event.location}
                        {'sponsor' in event && (event as any).sponsor && ` • Sponsored by ${(event as any).sponsor}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Speakers Section */}
      <section style={{ padding: "3rem 1rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "2rem",
            color: branding.primaryColor
          }}>
            Featured Speakers
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            {speakers.map((speaker, index) => (
              <div key={index} style={{
                backgroundColor: "#ffffff",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                border: `3px solid ${branding.secondaryColor}`
              }}>
                <div style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: branding.primaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "2rem",
                  margin: "0 auto 1rem"
                }}>
                  {speaker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: branding.primaryColor
                }}>
                  {speaker.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "0.25rem" }}>
                  {speaker.title}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "1rem" }}>
                  {speaker.organization}
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                  {speaker.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
