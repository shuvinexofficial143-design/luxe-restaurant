"use client";

export default function RatingStars({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
}) {
  const classes = size === "lg" ? "text-3xl" : size === "sm" ? "text-sm" : "text-xl";

  return (
    <div className={`flex gap-1 ${classes}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) =>
        onChange ? (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={star <= value ? "text-[#d89a4b]" : "text-[#d9cec4]"}
            aria-label={`${star} stars`}
          >
            ★
          </button>
        ) : (
          <span key={star} className={star <= value ? "text-[#d89a4b]" : "text-[#d9cec4]"}>
            ★
          </span>
        )
      )}
    </div>
  );
}
