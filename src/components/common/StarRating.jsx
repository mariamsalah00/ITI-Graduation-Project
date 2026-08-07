import { Box, Typography } from "@mui/material";
import { FiStar } from "react-icons/fi";
/**
 * @param {{value?: number, showValue?: boolean, size?: number}} props
 */
export function StarRating({ value = 0, showValue = true, size = 14 }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Box sx={{ display: "flex", color: "var(--color-accent)" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={size}
            fill={i < Math.round(value) ? "currentColor" : "none"}
          />
        ))}
      </Box>
      {showValue && (
        <Typography variant="caption" color="text.secondary">
          {value.toFixed(1)}
        </Typography>
      )}
    </Box>
  );
}
