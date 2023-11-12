import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Chip,
} from "@mui/material";
import Progress from "./Progress";
import Labels from "./Labels";
import reactJsLogo from "../logoImages/react-logo.png";
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
    title: "React Mid-Level",
    category: "react",
    level: "mid-level",
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
    title: "JS Mid-Level",
    category: "javaScript",
    level: "mid-level",
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
const quizProgress = {
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
              CHOOSE A QUIZ
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {quizCards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <CardContent sx={{ display: "flex" }}>
                    <Box direction="row" flexWrap="wrap" gap="5px">
                      <Labels labels={card.labels}></Labels>
                      <Chip size={"small"} label={card.level} />
                      <Chip size={"small"} label={card.category} />{" "}
                      <Box marginTop="80px">
                        <CardActions>
                          <Button variant="outlined" size="small">
                            Start Quiz
                          </Button>
                        </CardActions>
                      </Box>
                    </Box>
                    <Box marginLeft="50px">
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
                          quizProgress={quizProgress}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
