import React from "react";
import { CircularProgress } from "@mui/material";
// import customColors from "./MyComponents/styles";
import customColors from "../customColors";

const Progress = (props) => {
  const { userProgress, quizId } = props;
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
      {userProgress["userId"].map((progress) =>
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
