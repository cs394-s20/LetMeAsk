import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";

import { withFormik } from "formik";
import * as yup from "yup";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

const AuthForm = (props) => {
  const [checked, setChecked] = useState("student");
  const [radio, setRadio] = useState('');
  const displayNameInput = (
    <View>
      <TextInput
        style={styles.formInput}
        onChangeText={(text) => props.setFieldValue("displayName", text)}
        placeholder="Student or Expert?"
      />
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text h2 style={styles.header}>
        LetMeAsk
      </Text>

      {/* {props.authMode.authMode === "signup" && (
        <View>
          <TextInput
            style={styles.formInput}
            onChangeText={(text) => props.setFieldValue("displayName", text)}
            placeholder="Student or Expert?"
          />
          <Text style={styles.validationText}>{props.errors.displayName}</Text>
        </View>
        // <View
        //   style={{
        //     flexDirection: "row",
        //     marginBottom: 40,
        //   }}
        // >
        //   <RadioButton.Group>
        //     <View style={{ flexDirection: "row", alignItems: "center" }}>
        //       <Text style={{ marginLeft: 10 }}>Student</Text>
        //       <RadioButton
        //         color="#378BE5"
        //         value="student"
        //         status={checked === "student" ? "checked" : "unchecked"}
        //         onPress={() => {
        //           setChecked("student");
        //         }}
        //       />
        //     </View>
        //     <View style={{ flexDirection: "row", alignItems: "center" }}>
        //       <Text style={{ marginLeft: 10 }}>Expert</Text>
        //       <RadioButton
        //         color="#e57359"
        //         value="expert"
        //         // status="checked"
        //         status={checked === "expert" ? "checked" : "unchecked"}
        //         onPress={() => {
        //           setChecked("expert");
        //         }}
        //       />
        //     </View>
        //   </RadioButton.Group>
        // </View>
      )} */}
      <TextInput
        style={styles.formInput}
        onChangeText={(text) => props.setFieldValue("email", text)}
        placeholder="Email"
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>
      <TextInput
        style={styles.formInput}
        secureTextEntry={true}
        onChangeText={(text) => props.setFieldValue("password", text)}
        placeholder="Password"
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      {props.authMode.authMode === "signup" && (
        <RadioGroup style={styles.radioInput} onSelect = {(index, value) => props.setFieldValue("displayName", value)}>
          <RadioButton value={'Student'} >
            <Text>Student</Text>
          </RadioButton>
          <RadioButton value={'Professor'}>
            <Text>Professor</Text>
          </RadioButton>
        </RadioGroup>)}
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
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
          console.log(props.authMode.authMode);
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
    borderColor: "#B5B4BC",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  radioInput: {
    width: 300,
    height: 50,
    marginBottom: 16,
    marginTop: -30,
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
