import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Dimensions } from "react-native";
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { withFormik } from "formik";
import * as yup from "yup";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
const deviceWidth = Dimensions.get("window").width;

const AuthForm = (props) => {
  const [checked, setChecked] = useState("student");

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#378BE5",
      accent: "#f1c40f",
    },
  };
  return (
    <View style={styles.container}>
      <Text h2 style={styles.header}>
        LetMeAsk
      </Text>

      {props.authMode.authMode === "signup" && (
        <RadioGroup
          style={styles.radioInput}
          onSelect={(index, value) => props.setFieldValue("displayName", value)}
        >
          <RadioButton value={"Student"}>
            <Text>Student</Text>
          </RadioButton>
          <RadioButton value={"Expert"}>
            <Text>Expert</Text>
          </RadioButton>
        </RadioGroup>
      )}
      <TextInput
        label="Email"
        style={styles.submitInput}
        onChangeText={(text) => props.setFieldValue("email", text)}
        placeholder=""
        underlineColor="#378BE5"
        selectionColor="#378BE5"
        theme={theme}
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>
      <TextInput
        label="Password"
        style={styles.submitInput}
        secureTextEntry={true}
        onChangeText={(text) => props.setFieldValue("password", text)}
        placeholder=""
        underlineColor="#378BE5"
        selectionColor="#378BE5"
        theme={theme}
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      <Button
        onPress={() => props.handleSubmit()}
        buttonStyle={styles.loginButton}
        title={
          props.authMode.authMode === "signup" || undefined
            ? "Create Account"
            : "Login"
        }
      />
      <Button
        backgroundColor="transparent"
        color="black"
        buttonStyle={styles.switchButton}
        onPress={() => {
          props.switchAuthMode();
        }}
        title={
          props.authMode.authMode === "signup" || undefined
            ? "Already have an account? Login!"
            : "Don't have an account? Sign up!"
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 60,
    fontSize: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  validationText: {
    marginTop: 8,
    marginBottom: 16,
    color: "red",
    alignSelf: "center",
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: "#378BE5",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  loginButton: {
    width: 200,
    marginBottom: 16,
    backgroundColor: "#6f37be",
  },
  switchButton: {
    width: 200,
    backgroundColor: "#3f51b5",
  },
  submitInput: {
    height: 56,
    fontSize: 18,
    borderColor: "#378BE5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
    marginTop: 20,
    backgroundColor: "white",
    width: deviceWidth * 0.9,
  },
  radioInput: {
    width: 300,
    height: 50,
    marginBottom: 16,
    marginTop: -30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default withFormik({
  mapPropsToValues: () => ({ email: "", password: "", displayName: "" }),
  validationSchema: (props) =>
    yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(10).required(),
      displayName:
        props.authMode.authMode === "signup"
          ? yup.string().min(5).required()
          : null,
    }),
  handleSubmit: (values, { props }) => {
    props.authMode.authMode === "signup" || undefined
      ? props.signup(values)
      : props.login(values);
  },
})(AuthForm);
