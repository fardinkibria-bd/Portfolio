import { content } from "../content";

export function Portrait() {
  return (
    <div className="portrait">
      <img
        className="portrait__image"
        src={content.portrait.src}
        alt={content.portrait.alt}
        width={content.portrait.width}
        height={content.portrait.height}
      />
    </div>
  );
}
