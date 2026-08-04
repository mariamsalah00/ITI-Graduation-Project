import { Box, Container, Grid, Typography, Stack, IconButton } from "@mui/material";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const COLUMNS = [
  {
    title: "footer.shop",
    links: [
      { label: "footer.allProducts", to: "/shop" },
      { label: "footer.skinQuiz", to: "/skin-quiz" },
      { label: "footer.bestSellers", to: "/shop" },
      { label: "footer.newArrivals", to: "/shop" },
    ],
  },
  {
    title: "footer.help",
    links: [
      { label: "footer.contact", to: "/contact" },
      { label: "footer.shipping", to: "/contact" },
      { label: "footer.returns", to: "/contact" },
      { label: "footer.faq", to: "/contact" },
    ],
  },
  {
    title: "footer.company",
    links: [
      { label: "footer.about", to: "/about" },
      { label: "footer.home", to: "/" },
      { label: "footer.profile", to: "/profile" },
    ],
  },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "var(--color-ink)",
        color: "var(--color-text-inverse)",
        borderTop: "1px solid rgba(244,239,231,0.08)",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={5}>
          {/* Logo */}
          <Grid item xs={12} md={3}>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.2em",
                mb: 2,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GLOWCARE
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: "inherit" }}
              >
                <FiInstagram />
              </IconButton>

              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: "inherit" }}
              >
                <FiFacebook />
              </IconButton>

              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: "inherit" }}
              >
                <FiTwitter />
              </IconButton>
            </Stack>
          </Grid>

          {/* Footer Links */}
          {COLUMNS.map((col) => (
            <Grid item xs={6} md={3} key={col.title}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  mb: 2,
                  opacity: 0.7,
                }}
              >
                {t(col.title)}
              </Typography>

              <Stack spacing={1}>
                {col.links.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    to={link.to}
                    sx={{
                      fontSize: "0.85rem",
                      color: "inherit",
                      opacity: 0.85,
                      textDecoration: "none",
                      transition: "0.3s",
                      display: "block",

                      "&:hover": {
                        opacity: 1,
                        color: "primary.main",
                      },
                    }}
                  >
                    {t(link.label)}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(244,239,231,0.15)",
            mt: 6,
            pt: 3,
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", opacity: 0.6 }}>
            © {new Date().getFullYear()} GLOWCARE. {t("footer.rights")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}