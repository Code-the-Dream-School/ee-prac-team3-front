import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Labels from "./Labels";
import { Chip } from "@mui/material";
import Progress from "./Progress";
import reactJsLogo from "../logoImages/reactjs.svg";
import jsLogo from "../logoImages/js.svg";
import dataStructureLogo from "../logoImages/data-structure.png";

const quizCards = [
  {
    id: "react-basic",
    title: "React Basics",
    category: "react",
    level: "basic",
    labels: ["frontend"],
    image: reactJsLogo,
  },
  {
    id: "react-middle",
    title: "React Middle",
    category: "react",
    level: "middle",
    labels: ["frontend"],
    image: reactJsLogo,
  },
  {
    id: "js-basic",
    title: "JS Basics",
    category: "javaScript",
    level: "basic",
    labels: ["frontend", "backend"],
    image: jsLogo,
  },
  {
    id: "js-functions",
    title: "JS Functions",
    category: "javaScript",
    level: "basic",
    labels: ["frontend", "backend"],
    image: jsLogo,
  },
  {
    id: "js-middle",
    title: "JS Middle",
    category: "javaScript",
    level: "middle",
    labels: ["frontend", "backend"],
    image: jsLogo,
  },
  {
    id: "data-structures",
    title: "Data structures",
    category: "data structures",
    level: "middle",
    labels: ["frontend", "backend"],
    image: dataStructureLogo,
  },
];
const userProgress = {
  ["userId"]: [
    {
      id: "react-basic",
      attemptsNumber: "",
      progress: 50,
    },
    {
      id: "react-middle",
      attemptsNumber: "",
      progress: 10,
    },
    {
      id: "js-basic",
      attemptsNumber: "",
      progress: 80,
    },
    {
      id: "js-functions",
      attemptsNumber: "",
      progress: 100,
    },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function MainPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            pt: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              CHOOSE THE QUIZ
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {quizCards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    // height: "100%",
                    display: "flex",
                    // flexDirection: "column",
                  }}
                >
                  {/* <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  /> */}
                  <CardContent sx={{ flexGrow: 1, display: "flex" }}>
                    <Box direction="row" flexWrap="wrap" gap="5px">
                      <Labels labels={card.labels}></Labels>
                      <Chip size={"small"} label={card.level} />
                      <Chip size={"small"} label={card.category} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        marginTop="25px"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CardMedia
                          width="100%"
                          component="div"
                          sx={{
                            width: "63px",
                            height: "62px",
                          }}
                          image={card.image}
                        />
                        <Progress
                          userProgress={userProgress}
                          quizId={card.id}
                        ></Progress>
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          component="h2"
                          marginTop="30px"
                        >
                          {card.title}
                        </Typography>
                      </Box>
                    </Box>
                    {/* <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography> */}
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
