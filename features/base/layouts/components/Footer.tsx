import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Container, Box, Typography, Link } from "@mui/material";

const RootBox = styled(Box)(({ theme }) => ({
  width: "100%",
  justifyContent: "center",
  padding: theme.spacing(0),
}));

const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginRight: "auto",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  marginRight: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(5),
  },
  [theme.breakpoints.down("lg")]: {
    marginLeft: theme.spacing(6),
  },
}));

export default function Footer() {
  const theme = useTheme();
  const content = {
    copy: "© 2023 Agnos All rights reserved.",
    link1: "First Link",
    link2: "Second Link",
    link3: "Third Link",
    link4: "Fourth Link",
  };

  return (
    <Container maxWidth="lg" sx={{ position: "sticky", bottom: 0, backgroundColor: theme.palette.background.default }}>
      <RootBox py={6} display="flex" flexWrap="wrap" alignItems="center">
        <FooterBox component="nav">
          <StyledLink href="#" variant="body1" color="textPrimary">
            {content["link1"]}
          </StyledLink>
          <StyledLink href="#" variant="body1" color="textPrimary">
            {content["link2"]}
          </StyledLink>
          <StyledLink href="#" variant="body1" color="textPrimary">
            {content["link3"]}
          </StyledLink>
          <StyledLink href="#" variant="body1" color="textPrimary">
            {content["link4"]}
          </StyledLink>
        </FooterBox>
        <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>
          {content["copy"]}
        </Typography>
      </RootBox>
    </Container>
  );
}
