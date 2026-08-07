import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
/**
 * Centered spinner + label, used while a context's `loading` flag is true.
 * @param {{label?: string, minHeight?: number}} props - `minHeight` reserves
 *   vertical space so the page doesn't jump when content pops in.
 */
export function Loader({ label, minHeight = 240 }) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        minHeight,
      }}
    >
      <CircularProgress size={28} sx={{ color: "var(--color-accent)" }} />
      <Typography variant="body2" color="text.secondary">
        {label || t("common.loading")}
      </Typography>
    </Box>
  );
}
