import React from "react";
import {
  TextField,
  Box,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import Image from 'next/image'

const Nav = () => {
  const router = useRouter();
  const HomeNav = () => (
    <Container maxWidth="lg">
      <Box display="flex" alignItems="center" p={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1}>
          <Link href="/" as={`/`} passHref={true}>
            <a>
              <Image
                src="https://carone.com.mx/wp-content/uploads/logo.png"               
                alt="Picture of the author"
                width="180"
                height="60"
              />
            </a>
          </Link>
        </Box>
        <Box p={1}>
          <Link href="/autos" passHref={true}>
            <Button>Autos</Button>
          </Link>
        </Box>
        <Box p={1}>
          <Link href="/favoritos" passHref={true}>
            <Button>Favoritos</Button>
          </Link>
        </Box>
        {/* <Box p={1}>
          <Link href="#" passHref={true}>
            <Button disabled>Accesorios</Button>
          </Link>
        </Box> */}
        <Box p={1}>
          <Link href="/trabajos" passHref={true}>
            <Button>Únete al equipo</Button>
          </Link>
        </Box>

        <Box p={1}>
          <Link href="#" passHref={true}>
            <Button variant="contained" color="primary">
              Contacto
            </Button>
          </Link>
        </Box>
        <Box p={1}>
          <Link href="/" passHref={true}>
            <InstagramIcon />
          </Link>
        </Box>
      </Box>
    </Container>
  );

  const PageNav = () => (
    <Container maxWidth="lg">
      <Grid container spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
        <Grid item xs={2}>
          <Link href="/" as={`/`} passHref={true}>
            <a>
              <Image
                src="https://carone.com.mx/wp-content/uploads/logo.png"
                style={{ width: 180 }}
                alt="aasd"
              />
            </a>
          </Link>
        </Grid>

        <Grid item xs={10}>
          <Box display="flex" alignItems="center">
            <Box p={1} mt={1}>
              <Link href="/autos" passHref={true}>
                <Button color="primary">Autos</Button>
              </Link>
            </Box>
            <Box p={1} mt={1}>
              <Link href="/autos" passHref={true}>
                <Button color="primary">Favoritos</Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

  return HomeNav();
};

export default Nav;
