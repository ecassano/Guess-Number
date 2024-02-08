import { StyleSheet, Image, View, ScrollView, Text, useWindowDimensions } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
//@ts-ignore
import Title from "../components/ui/Title";
import Colors from "../utils/colors";

type Props = {
  roundsNumber: number;
  userNumber: number;
  onRestartGame: () => void;
}

const GameOverScreen = ({ roundsNumber, userNumber, onRestartGame }: Props) => {
  const { width, height } = useWindowDimensions();

  let imgSize = 300;

  if (width < 380) {
    imgSize = 150;
  }

  if (height < 400) {
    imgSize = 80;
  }

  const imgStyle = {
    width: imgSize,
    height: imgSize,
    borderRadius: imgSize / 2
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER</Title>
        <View style={[styles.imageContainer, imgStyle]}>
          <Image source={require('../assets/images/kogosMitico.jpeg')} style={styles.image} />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlightText}>{roundsNumber}</Text> rounds
          to guess the number <Text style={styles.highlightText}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onRestartGame}>Restart</PrimaryButton>
      </View>
    </ScrollView>
  )
}

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlightText: {
    fontFamily: 'Lato_700Bold',
    color: Colors.primary500
  }
})

export default GameOverScreen;