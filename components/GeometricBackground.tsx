const GeometricBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full py-6 relative">
      {/*  Diagonal Cross Center Fade Grid Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
        linear-gradient(45deg, transparent 49%, #fda4af 49%,#fda4af 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #fda4af 49%, #fda4af 51%, transparent 51%)
      `,
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      <main className="z-50">{children}</main>
    </div>
  );
};

export default GeometricBackground;
