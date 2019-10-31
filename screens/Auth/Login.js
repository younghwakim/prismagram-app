import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: emailInput.value }
  });
  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(value === "") {
      return Alert.alert("이메일을 입력하세요.");
    } else if(!value.includes("@") || !value.includes(".")) {
      return Alert.alert("이메일 형식을 확인하세요.");
    } else if(!emailRegex.test(value)){
      return Alert.alert("이메일 형식을 확인하세요.");
    }
    try{
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if(requestSecret) {
        Alert.alert("이메일로 인증번호가 전송되었습니다.");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("등록되지 않은 계정입니다.");
        navigation.navigate("Signup", { email: value });
      }
    } catch(e) {
      console.log(e);
      Alert.alert("로그인 실패");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text="Log In" onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
