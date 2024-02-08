import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, FlatList, useWindowDimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
//@ts-ignore
import Title from "../components/ui/Title";
import GuessLogItem from "../components/game/GuessLogItem";

type Props = {
  userNumber: number;
  onGameOver: (numberOfRounds: number) => void;
}

const generateRandomBetween = (min: number, max: number, exclude: number): number => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }: Props) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [])

  const nextGuessHandler = (direction: "+" | "-") => {
    if ((direction === '-' && currentGuess < userNumber) || (direction === '+' && currentGuess > userNumber)) {
      Alert.alert(
        "Don't lie!",
        "The devil is the father of lie...",
        [{ text: 'Sorry!', style: 'cancel' }]
      )
      return;
    }

    if (direction === "-") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content =
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
        <View style={styles.buttonsConatiner}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "+")}>
              <AntDesign name="plus" size={16} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "-")}>
              <AntDesign name="minus" size={16} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>

  if (width > 500) {
    content =
      <>
        <View style={styles.buttonsContainerLandscape}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "+")}>
              <AntDesign name="plus" size={16} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "-")}>
              <AntDesign name="minus" size={16} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(guess) => <GuessLogItem roundNumber={guessRoundsListLength - guess.index} guess={guess.item} />}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsConatiner: {
    flexDirection: 'row'
  },
  buttonsContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 12
  }
})

export default GameScreen;