import React from "react";
import { Chip } from "@mui/material";

const Labels = (props) => {
  const { labels } = props;
  return (
    <>
      {labels.map((label, index) => (
        <Chip size={"small"} key={index} label={label} />
      ))}
    </>
  );
};

export default Labels;
