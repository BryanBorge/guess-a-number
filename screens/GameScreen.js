import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/defaultStyles";
import TitleText from "../components/TitleText";
import defaultStyles from "../constants/defaultStyles";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.max(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum == exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = props => {
  const [guess, setGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [rounds, setRounds] = useState(0);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (guess === props.userChoice) {
      props.onGameOver(rounds);
    }
  }, [guess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && guess < props.userChoice) ||
      (direction === "greater" && guess > props.userChoice)
    ) {
      Alert.alert("Dont lie", "You know that this is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.curent = guess;
    } else {
      currentLow.current = guess;
    }

    const nextNum = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      guess
    );
    setGuess(nextNum);
    setRounds(curRounds => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponents Guess</Text>
      <NumberContainer>{guess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title='GREATER'
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 10, alignItems: "center" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    maxWidth: "80%",
    marginTop: 20,
  },
});
export default GameScreen;
