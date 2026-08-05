import type { FC, ReactNode } from "react";
import { signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";

import { useAuth } from "@/auth/use-auth";
import { auth } from "@/firebase/config";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Box>
      {user && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              {t("home.title")}
            </Typography>
            <Button color="inherit" onClick={() => signOut(auth)}>
              {t("common.signOut")}
            </Button>
          </Toolbar>
        </AppBar>
      )}

      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  );
};
