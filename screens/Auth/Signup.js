import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import * as Facebook from 'expo-facebook';
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.lightGrayColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const userNameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: userNameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value
    }
  });
  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = userNameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(email)){
      return Alert.alert("이메일 형식을 확인하세요.");
    }
    if(fName === "") {
      return Alert.alert("성을 입력하세요.");
    }
    if(lName === "") {
      return Alert.alert("이름을 입력하세요.");
    }
    if(username === "") {
      return Alert.alert("사용자명을 입력하세요.");
    }
    try{
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if(createAccount) {
        Alert.alert("계정이 생성되었습니다.");
        navigation.navigate("Login", { email });
        return;
      }
    } catch(e) {
      console.log(e);
      Alert.alert("계정 생성 실패", "이미 등록된 계정입니다.");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async() => {
    try {
      setLoading(true);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "555826795164164",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
        const { email, first_name, last_name } = await response.json();
        emailInput.setValue(email);
        fNameInput.setValue(first_name);
        lNameInput.setValue(last_name);
        setLoading(false);
        const [username] = email.split("@");
        userNameInput.setValue(username);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <AuthInput
            {...fNameInput}
            placeholder="Firts name"
            autoCapitalize="words"
          />
          <AuthInput
            {...lNameInput}
            placeholder="Last name"
            autoCapitalize="words"
          />
          <AuthInput
            {...emailInput}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthInput
            {...userNameInput}
            placeholder="Username"
            returnKeyType="send"
            autoCorrect={false}
          />
          <AuthButton loading={loading} text="Sign Up" onPress={handleSignup} />
          <FBContainer>
            <AuthButton
              bgColor={"#2D4DA7"}
              loading={false}
              onPress={fbLogin}
              text="Facebook으로 로그인"
            />
          </FBContainer>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
