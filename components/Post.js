import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
    flex: 1;
`;
const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
    margin-left: 10px;
`;
const Bold = styled.Text`
    font-weight: 500;
`;

const Location = styled.Text`
    font-size: 12px;
`;

const Post = ({ user, location }) => {
    return (
      <Container>
        <Header>
          <Touchable>
              <Image style={{width: 40, height: 40, borderRadius: 20}} source={{uri: user.avatar}} />
          </Touchable>
          <Touchable>
            <HeaderUserContainer>
                <Bold>{user.username}</Bold>
                <Location>{location}</Location>
            </HeaderUserContainer>
          </Touchable>
        </Header>
      </Container>
    );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  };

export default Post;