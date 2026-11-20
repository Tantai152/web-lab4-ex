
export default function PersonDetail({ person = {} }) {
  const defaultPerson = {
    name: "Nguyen Van An",
    role: "Software Architect",
    initials: "NA",
    bio: "Software Architect and Information Systems researcher at the University of Information Technology (UIT). Focuses on software architecture, distributed systems, and building scalable applications.",
    department: "Information Systems",
    email: "an.nguyen@uit.edu.vn",
    location: "Ho Chi Minh City",
    id: "UIT2024001",
  };

  const profile = {
    ...defaultPerson,
    ...person,
  };

  const getInitials = (name) => {
    if (profile.initials) return profile.initials;

    return name
      .trim()
      .split(/\s+/)
      .slice(-2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  const metadata = [
    {
      label: "Department",
      value: profile.department,
    },
    {
      label: "Email",
      value: profile.email,
    },
    {
      label: "Location",
      value: profile.location,
    },
    {
      label: "Student / Employee ID",
      value: profile.id,
    },
  ];

  return (
    <div className="person-card">
      {/* Person Header */}
      <div className="person-header">
        <div
          className="person-avatar"
          aria-label={`${profile.name} initials`}
          role="img"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          {getInitials(profile.name)}
        </div>

        <div className="person-info">
          <h2 className="person-name" title={profile.name}>
            {profile.name}
          </h2>

          <span className="person-role">
            {profile.role}
          </span>
        </div>
      </div>

      {/* Biography */}
      <div className="person-bio">
        <p>{profile.bio}</p>
      </div>

      {/* Person Metadata */}
      <div className="person-meta-grid">
        {metadata.map((item) => (
          <div className="meta-item" key={item.label}>
            <span className="meta-label">
              {item.label}
            </span>

            <span className="meta-value" title={item.value}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
