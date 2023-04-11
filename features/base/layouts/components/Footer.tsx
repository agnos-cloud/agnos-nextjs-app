import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Box, Typography, Link } from "@mui/material";

const RootBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginRight: "auto",
  marginLeft: theme.spacing(3),
  marginBottom: theme.spacing(0),

  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: "auto",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Footer() {
  const content = {
    copy: "© 2023 Agnos All rights reserved.",
    link1: "First Link",
    link2: "Second Link",
    link3: "Third Link",
    link4: "Fourth Link",
  };

  return (
    <Container maxWidth="lg" sx={{ position: "static", bottom: 0 }}>
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
