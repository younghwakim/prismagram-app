import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 10px;
  background-color: ${props => props.theme.grayColor};
  border: 1px solid ${props => props.theme.lightGrayColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  authCapitalize = "none",
  returnKeyType = "done",
  onChange,
  onEndEditing = () => null,
  autoCorrect = true
}) => {
  return (
    <Container>
      <TextInput
        onChangeText={onChange}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        placeholder={placeholder}
        authCapitalize={authCapitalize}
        onEndEditing={onEndEditing}
        autoCorrect={autoCorrect}
        value={value}
      />
    </Container>
  );
};

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  authCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onEndEditing: PropTypes.func,
  autoCorrect: PropTypes.bool
};

export default AuthInput;
