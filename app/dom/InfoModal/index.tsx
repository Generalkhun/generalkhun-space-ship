"use client";

type InfoModalProps = {
  onClose: () => void;
};

export default function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 24,
          backgroundColor: "#0f172a",
          padding: 24,
          color: "white",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Assistance Info</h2>
          <button
            className="rounded-full border border-white/20 px-3 py-1 text-sm text-slate-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <p className="text-sm leading-6 text-slate-300">
          This is the first step of the information view. Clicking the
          assistance object opens this modal, and clicking the close button
          hides it again.
        </p>
      </div>
    </div>
  );
}
