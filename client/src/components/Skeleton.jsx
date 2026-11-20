
export default function Skeleton() {
  return (
    <div
      className="person-card"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">
        Loading person details...
      </span>

      {/* Person Header */}
      <div className="person-header">
        <div className="skeleton-box skeleton-circle" />

        <div className="person-info">
          <div className="skeleton-box skeleton-line title" />

          <div className="skeleton-box skeleton-badge" />
        </div>
      </div>

      {/* Biography */}
      <div className="person-bio">
        <div className="skeleton-box skeleton-line" />
        <div
          className="skeleton-box skeleton-line"
          style={{ width: "85%", marginTop: "8px" }}
        />
        <div
          className="skeleton-box skeleton-line"
          style={{ width: "65%", marginTop: "8px" }}
        />
      </div>

      {/* Person Metadata */}
      <div className="person-meta-grid">
        <div className="meta-item">
          <div className="skeleton-box skeleton-line" />
          <div
            className="skeleton-box skeleton-line"
            style={{ width: "70%" }}
          />
        </div>

        <div className="meta-item">
          <div className="skeleton-box skeleton-line" />
          <div
            className="skeleton-box skeleton-line"
            style={{ width: "60%" }}
          />
        </div>

        <div className="meta-item">
          <div className="skeleton-box skeleton-line" />
          <div
            className="skeleton-box skeleton-line"
            style={{ width: "75%" }}
          />
        </div>

        <div className="meta-item">
          <div className="skeleton-box skeleton-line" />
          <div
            className="skeleton-box skeleton-line"
            style={{ width: "55%" }}
          />
        </div>
      </div>
    </div>
  );
}
