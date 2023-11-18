import * as React from "react";
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
import Progress from "../components/Progress";
import Labels from "../components/Labels";
import reactJsLogo from "../assets/images/react-logo-svgrepo-com.svg";
import jsLogo from "../assets/images/js.svg";
import dataStructureLogo from "../assets/images/hierarchical-structure-svgrepo-com.svg";

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
const quizProgress = [
  {
    quizId: "react-basic",
    attemptsCount: 1,
    bestScore: 80,
    lastScore: 50,
    progress: 50,
  },
  {
    quizId: "react-middle",
    attemptsCount: 4,
    bestScore: 50,
    lastScore: 50,
    progress: 10,
  },
  {
    quizId: "js-basic",
    attemptsCount: 3,
    bestScore: 90,
    lastScore: 30,
    progress: 80,
  },
  {
    quizId: "js-functions",
    attemptsCount: 1,
    bestScore: 20,
    lastScore: 20,
    progress: 100,
  },
];

export default function Main() {
  function getProgressForQuiz(quizId) {
    const progressObj = quizProgress.find((p) => p.quizId === quizId);
    return progressObj ? progressObj.progress : 0;
  }
  return (
    <>
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
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* this is the grid layout of all the cards */}
          <Grid container spacing={4}>
            {quizCards.map((card) => (
              // this is the whole individual card
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  {/* this is the content of the left side inside each card */}
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <CardContent sx={{ display: "flex" }}>
                      <Box direction="row" flexWrap="wrap" gap="5px">
                        <Labels labels={card.labels}></Labels>
                        <Chip size={"small"} label={card.level} />
                        <Chip size={"small"} label={card.category} />{" "}
                        <Box>
                          <Typography>Not Passed</Typography>
                        </Box>
                      </Box>

                      {/* this is the content of the right side inside each card */}

                      <Box marginLeft="50px">
                        <Box
                          marginTop="25px"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            // position: "relative",
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
                          <Progress progress={getProgressForQuiz(card.id)} />
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
                    </CardContent>{" "}
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
