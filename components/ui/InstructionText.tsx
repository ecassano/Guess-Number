import { StyleSheet, Text } from "react-native";
import Colors from "../../utils/colors";

type Props = {
  children: string,
  style?: { [key: string]: string | number };
}

const InstructionText = ({ children, style }: Props) => {
  return (
    <Text style={[styles.instructionText, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'Lato_300Light',
    color: Colors.accent500,
    fontSize: 20
  },
})

export default InstructionText;