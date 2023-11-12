import React from "react";
import { CircularProgress } from "@mui/material";
import customColors from "../customColors";

const Progress = (props) => {
  const { quizProgress, quizId } = props;
  return (
    <>
      <CircularProgress
        size={120}
        variant="determinate"
        value={100}
        sx={{
          color: customColors.greyLight,
          position: "absolute",
        }}
      />
      {quizProgress["userId"].map((progress) =>
        progress.id === quizId ? (
          <CircularProgress
            size={120}
            variant="determinate"
            value={progress.progress}
            sx={{
              color: customColors.greenMedium,
              position: "absolute",
              zIndex: 1,
            }}
          />
        ) : (
          <></>
        )
      )}{" "}
    </>
  );
};

export default Progress;
