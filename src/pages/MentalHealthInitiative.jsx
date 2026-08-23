

const MentalHealthInitiative = ({
  title,
  text,
  image,
  alt,
  link,
  reverse,
}) => {
  return (
    <div className={`grid-row ${reverse ? "reverse" : ""}`}>

      <div className="grid-text">

        <span className="initiative-label">
          MENTAL WELLNESS INITIATIVE
        </span>

        <h2>{title}</h2>

        <p>{text}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="initiative-button"
        >
          Visit Initiative
          <span aria-hidden="true">→</span>
        </a>

      </div>

      <div className="grid-image">
        <img
          src={image}
          alt={alt}
          loading="lazy"
        />
      </div>

    </div>
  );
};

export default MentalHealthInitiative;