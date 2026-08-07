import { Box, Typography, Button } from "@mui/material";
import { FiAlertCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
/**
 * Shown when a data fetch fails (e.g. ProductsContext/CategoriesContext's
 * `error` state). Pairs naturally with each context's `retry()` action.
 * @param {{message?: string, onRetry?: Function}} props - `onRetry` is
 *   optional; the button only renders if provided.
 */
export function ErrorState({ message, onRetry }) {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
      <FiAlertCircle size={32} color="var(--color-error)" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message || t("common.errorGeneric")}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          color="error"
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Try again
        </Button>
      )}
    </Box>
  );
}
