import * as React from "react";
import { useState } from "react";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import styles from "./styles.module.scss";

const EmptySides = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  return (
    <>
      <form>
        <Stack spacing={2} direction="row" className={styles.stack}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="outlined" startIcon={<SaveAltIcon />}>
            Save
          </Button>
          <Button variant="outlined" startIcon={<AddToPhotosIcon />}>
            Save and add more
          </Button>
        </Stack>
        <Stack spacing={2} direction="column" className={styles.stack2}>
          <input
            className={styles.side}
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          ></input>
          <input
            className={styles.side}
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          ></input>
        </Stack>
      </form>
    </>
  );
};
export default EmptySides;
