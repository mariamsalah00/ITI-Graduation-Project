import { Container, Typography, Button, Box } from "@mui/material";
import { FiAlertTriangle } from "react-icons/fi";
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

/**
 * Wired as `errorElement` on the router (see routes/index.jsx). Catches
 * anything an individual route throws during render — including bugs, not
 * just handled `error` states from a context — so a crash three components
 * deep degrades to this screen instead of a blank page or a raw stack trace.
 */
export function RouteError() {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : error?.message || "An unexpected error occurred.";

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
      <FiAlertTriangle size={32} color="var(--color-error)" />
      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
        Something went wrong
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {message}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
        <Button variant="outlined" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </Box>
    </Container>
  );
}
