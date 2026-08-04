import { Box, Container, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import about from "/assets/aboutimg.jfif";

export default function About() {
  const { t } = useTranslation();

  const VALUES = [
    {
      title: t("about.values.cleanTitle"),
      body: t("about.values.cleanBody"),
    },
    {
      title: t("about.values.testedTitle"),
      body: t("about.values.testedBody"),
    },
    {
      title: t("about.values.sustainableTitle"),
      body: t("about.values.sustainableBody"),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${about})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          py: { xs: 15, md: 25 },
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, color: "var(--color-ink)" }}
          >
            {t("about.title")}
          </Typography>

          <Typography color="text.secondary">
            {t("about.description")}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {VALUES.map((value) => (
            <Grid item xs={12} md={4} key={value.title}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {value.title}
              </Typography>

              <Typography color="text.secondary">
                {value.body}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}