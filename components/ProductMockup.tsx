type ProductMockupProps = {
  imageSrc?: string;
  alt?: string;
};

export function ProductMockup({ imageSrc = "/uploads/skiip-phone-home.jpeg", alt = "SKIIP mobile ordering app" }: ProductMockupProps) {
  return (
    <div className="phone-stage" aria-label="SKIIP mobile ordering preview">
      <div className="phone-glow" />
      <div className="phone">
        <img className="phone-screenshot" src={imageSrc} alt={alt} />
      </div>
    </div>
  );
}
