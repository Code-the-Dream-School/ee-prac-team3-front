import React from "react";
import { CircularProgress } from "@mui/material";
import customColors from "assets/customColors";

const Progress = ({ quizProgress, quizId }) => {
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
      {quizProgress.map((progress) =>
        progress.quizId === quizId ? (
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
      )}
    </>
  );
};

export default Progress;
