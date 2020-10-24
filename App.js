import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNum, setUserNum] = useState();
  const [roundNumber, setRoundNumber] = useState(0);

  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoaded(true)}
        onError={e => console.log(e)}
      />
    );
  }

  const newGameHandler = () => {
    setRoundNumber(0);
    setUserNum(null);
  };

  const startGameHandler = selectedNum => {
    setUserNum(selectedNum);
    setRoundNumber(0);
  };

  const gameOverhandler = numOfRounds => {
    setRoundNumber(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNum && roundNumber <= 0) {
    content = <GameScreen userChoice={userNum} onGameOver={gameOverhandler} />;
  } else if (roundNumber > 0) {
    content = (
      <GameOverScreen
        userNumber={userNum}
        roundsNumber={roundNumber}
        onRestart={newGameHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
