import * as React from "react";
import { useState, useCallback } from "react";

import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Routes, Route, useParams } from "react-router-dom";

import Flashcards from "../Flashcards";
import EmptySides from "../Flashcards/EmptySides";
import ResultFlashcard from "../Flashcards/ResultFlashcard";
import Side from "../Flashcards/Side";
import Nav from "../Nav";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Protected } from "../auth/widgets";

import styles from "./styles.module.scss";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);
  const [flashcards, setFlashcards] = useState([]);

  const loadFlashcards = React.useCallback(
    async () => setFlashcards(await apiClient.getFlashcards()),
    [apiClient],
  );

  React.useEffect(() => {
    !loading && loadFlashcards();
  }, [loading, loadFlashcards]);
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home loading={loading} flashcards={flashcards} />}
          />
          <Route
            path="/practice"
            element={
              flashcards.length && (
                <Protected
                  component={Practice}
                  flashcards={flashcards}
                  apiClient={apiClient}
                />
              )
            }
          />
          <Route
            path="/new-card"
            element={<Protected component={CreateCard} apiClient={apiClient} />}
          />
          <Route
            path="/edit-card/:cardId"
            element={<Protected component={EditCard} />}
          />
          <Route
            path="/result"
            element={<Protected component={Result} flashcards={flashcards} />}
          />
        </Routes>
      </main>
    </>
  );
};

const Home = ({ flashcards, loading }) => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
      </header>
      {isAuthenticated && !loading ? (
        <div>
          <h2>Hello, {user.given_name}</h2>
          <Flashcards flashcards={flashcards} />
        </div>
      ) : null}
    </div>
  );
};

const Practice = ({ flashcards, apiClient }) => {
  const cardsToPractice = flashcards.filter((card) => card.is_learnt === false);
  const [cardNumber, setCardNumber] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const toggleSide = useCallback(() => {
    setShowFront(!showFront);
  }, [showFront]);
  const incrementCard = useCallback(() => {
    if (cardNumber === cardsToPractice.length - 1) {
      setCardNumber(0);
    } else {
      setCardNumber(cardNumber + 1);
    }
  }, [cardNumber]);
  const decrementCard = useCallback(() => {
    if (cardNumber === 0) {
      setCardNumber(cardsToPractice.length - 1);
    } else {
      setCardNumber(cardNumber - 1);
    }
  }, [cardNumber]);
  const showResult = () => {
    window.location.href = "/result";
  };
  const editIsLearnt = () => {
    apiClient.editIsLearnt(cardsToPractice[cardNumber]);
  };
  console.log(cardsToPractice);
  console.log(cardNumber);
  return (
    <>
      {showFront && (
        <Side
          text={cardsToPractice[cardNumber].front_of_card}
          toggleSide={toggleSide}
        />
      )}
      {!showFront && (
        <Side
          text={cardsToPractice[cardNumber].back_of_card}
          toggleSide={toggleSide}
        />
      )}
      <Stack direction="row" spacing={2} className={styles.stack}>
        {/* {cardNumber !== 0 && (
          <Button
            variant="contained"
            startIcon={<ArrowBackIosSharpIcon />}
            className={styles.slideButton}
            onClick={incrementCard}
          >
            Previous
          </Button>
        )} */}
        <Button
          variant="contained"
          startIcon={<ArrowBackIosSharpIcon />}
          className={styles.slideButton}
          onClick={incrementCard}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosSharpIcon />}
          className={styles.slideButton}
          onClick={decrementCard}
        >
          Next
        </Button>
        {/* {cardNumber !== cardsToPractice.length - 1 && (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosSharpIcon />}
            className={styles.slideButton}
            onClick={decrementCard}
          >
            Next
          </Button>
        )} */}
      </Stack>
      <Stack direction="row">
        {cardNumber === cardsToPractice.length - 1 && (
          <Button
            variant="contained"
            className={styles.stack}
            onClick={showResult}
          >
            Show Results
          </Button>
        )}
      </Stack>
      <Stack direction="row" spacing={2} className={styles.stack}>
        <Button
          variant="contained"
          className={styles.slideButton}
          id={styles.masteredBtn}
          onClick={() => {
            return editIsLearnt();
          }}
        >
          Mastered
        </Button>
        <Button
          variant="contained"
          className={styles.slideButton}
          id={styles.practiceMoreBtn}
          // onClick={practiceMore}
        >
          Practice more
        </Button>
      </Stack>
    </>
  );
};

const EditCard = () => {
  const { loading, apiClient } = useApi();
  const { cardId } = useParams();
  const [card, setCard] = useState({});

  const loadFlashcard = React.useCallback(
    async () => setCard(await apiClient.getCard(cardId)),
    [apiClient],
  );
  React.useEffect(() => {
    !loading && loadFlashcard();
  }, [loading, loadFlashcard]);
  if (!card.id) {
    // console.log("no card");
    return (
      <>
        <EmptySides />
      </>
    );
  }
  // console.log("card", card);
  return (
    <>
      <EmptySides
        cardId={card.id}
        front_of_card={card.front_of_card}
        back_of_card={card.back_of_card}
      />
    </>
  );
};

const CreateCard = ({ apiClient }) => {
  return (
    <>
      <EmptySides />
    </>
  );
};

const Result = ({ flashcards }) => {
  return (
    <div>
      <h2>Result page</h2>
      {flashcards.map((flashcard) => {
        return <ResultFlashcard flashcard={flashcard} />;
      })}
    </div>
  );
};
export default App;
