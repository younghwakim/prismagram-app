import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`

`;

const AuthInput = ({ placeholder, value, keyboardType = "default", authCapitalize }) => {
  return (
    <Container>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        authCapitalize={authCapitalize}
        value={value}
      />
    </Container>
  );
};

AuthInput.propTypes = {
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address"
  ]),
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  authCapitalize: PropTypes.oneOf([])
};

export default AuthInput;