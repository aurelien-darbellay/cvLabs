// TestDialog.js
import { useEffect, useRef } from "react";

export default function TestDialog({ open, onClose }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement;
    if (boxRef.current) boxRef.current.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (prevActive && prevActive.focus) prevActive.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-dialog-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={boxRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 12,
          padding: 20,
          width: "min(520px, 92vw)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <h2 id="test-dialog-title" style={{ margin: 0 }}>
            Test Mode
          </h2>
          <button aria-label="Close" onClick={onClose} style={{ fontSize: 18 }}>
            ×
          </button>
        </div>

        <p style={{ marginTop: 12 }}>Test this app with the following user:</p>
        <pre
          style={{
            background: "#f5f5f5",
            padding: 12,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >{`email: aurelien.tests@gmail.com
password: 1234test`}</pre>
      </div>
    </div>
  );
}
