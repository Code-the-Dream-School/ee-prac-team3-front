import { Chip } from "@mui/material";

const Labels = ({ labels }) => {
  return (
    <>
      {labels.map((label, index) => (
        <Chip size={"small"} key={index} label={label} />
      ))}
    </>
  );
};

export default Labels;
