import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        "AC",
        "DEL",
        "%",
        "/",
        7,
        8,
        9,
        "*",
        4,
        5,
        6,
        "-",
        3,
        2,
        1,
        "+",
        0,
        ".",
        "+/-",
        "=",
      ],
      currentNumber: "",
      lastNumber: "",
      darkMode: false,
    };
  }

  calculator() {
    // cria um array
    const splitNumbers = this.state.currentNumber.split(" ");
    // pega o primeiro valor
    const fistNumber = parseFloat(splitNumbers[0]);
    // pega o ultimo valor
    const lastNumber = parseFloat(splitNumbers[2]);
    // pega o operador
    const operator = splitNumbers[1];

    // validação para não fazer o calculo se não tiver o segundo valor
    if (!lastNumber) {
      this.setState({ lastNumber: "" });
      this.setState({ currentNumber: "" });
      return;
    }

    // faz as contas
    switch (operator) {
      case "+":
        this.setState({
          currentNumber: (fistNumber + lastNumber).toString(),
        });
        return;
      case "-":
        this.setState({
          currentNumber: (fistNumber - lastNumber).toString(),
        });
        return;
      case "*":
        this.setState({
          currentNumber: (fistNumber * lastNumber).toString(),
        });
        return;
      case "/":
        this.setState({
          currentNumber: (fistNumber / lastNumber).toString(),
        });
        return;
      case "%":
        this.setState({
          currentNumber: ((fistNumber * lastNumber) / 100).toString(),
        });
        return;
    }
  }

  handleInput(buttonPressed) {
    // impede que o usuário digite uma operação antes de adicionar o número
    if (
      this.state.currentNumber === "" &&
      (buttonPressed === "+") |
        (buttonPressed === "-") |
        (buttonPressed === "*") |
        (buttonPressed === "/") |
        (buttonPressed === "%")
    ) {
      return;
    }

    // adiciona a operação no numero atual
    if (
      (buttonPressed === "+") |
      (buttonPressed === "-") |
      (buttonPressed === "*") |
      (buttonPressed === "/") |
      (buttonPressed === "%")
    ) {
      if (
        this.state.currentNumber.includes("+") |
        this.state.currentNumber.includes("-") |
        this.state.currentNumber.includes("*") |
        this.state.currentNumber.includes("/") |
        this.state.currentNumber.includes("%")
      ) {
        this.calculator();
      } else {
        this.setState({
          currentNumber: this.state.currentNumber + " " + buttonPressed + " ",
        });
      }
      return;
    }

    // realiza as operações
    switch (buttonPressed) {
      case "DEL":
        this.setState({
          currentNumber: this.state.currentNumber.substring(
            0,
            this.state.currentNumber.length - 1,
          ),
        });
        return;
      case "AC":
        this.setState({ lastNumber: "" });
        this.setState({ currentNumber: "" });
        return;
      case "=":
        this.setState({ lastNumber: this.state.currentNumber + " = " });

        this.calculator();
        return;
      case "+/-":
        this.setState({ currentNumber: this.state.currentNumber * -1 });
        return;
    }

    this.setState({ currentNumber: this.state.currentNumber + buttonPressed });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000" style="light" />
        <View style={styles.result}>
          <Text style={styles.historyText}>
            {this.state.lastNumber === "" ? " " : this.state.lastNumber}
          </Text>

          <Text style={styles.resultText}>
            {this.state.currentNumber === "" ? "0" : this.state.currentNumber}
          </Text>
        </View>

        <View style={styles.buttons}>
          {this.state.buttons.map((button) =>
            (button === "=") |
            (button === "+") |
            (button === "-") |
            (button === "/") |
            (button === "*") ? (
              <TouchableOpacity
                onPress={() => this.handleInput(button)}
                key={button}
                style={[styles.button, { backgroundColor: "#ffa200" }]}
              >
                <Text
                  style={[styles.textButton, { color: "white", fontSize: 30 }]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.handleInput(button)}
                key={button}
                style={[styles.button, { backgroundColor: "#ededed" }]}
              >
                <Text style={styles.textButton}>{button}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },

  result: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  resultText: {
    color: "#282F38",
    margin: 10,
    fontSize: 40,
  },

  historyText: {
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: "flex-end",
  },

  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    borderColor: "#e5e5e5",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  },
});
