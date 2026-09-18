export default function PoiPhoto({
  placeId,
  alt,
  className,
  maxWidth = 400,
}: {
  placeId: string | null | undefined;
  alt: string;
  className?: string;
  maxWidth?: number;
}) {
  if (!placeId) return null;
  return (
    <img
      src={`/api/poi-photo?place_id=${encodeURIComponent(placeId)}&maxWidth=${maxWidth}`}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}
