import React from "react";
import { Image, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Platform } from "@unimodules/core";

const ViewContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const Container = styled.View`
    margin-bottom: 40px;
    width: 100%;
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

const SwiperContainer = styled.View``;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text`
  margin: 3px 0px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const Post = (seeFeed) => {
  return (
    <ViewContainer key={seeFeed.id}>
      <FlatList keyExtractor={(item) => item.id} data={seeFeed.data} renderItem={({ item: { id, user, location, files = [], likeCount, caption, comments = [] } }) => (
        <Container>

          <Header>
            <Touchable>
              <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: user.avatar }} />
            </Touchable>
            <Touchable>
              <HeaderUserContainer>
                <Bold>{user.username}</Bold>
                <Location>{location}</Location>
              </HeaderUserContainer>
            </Touchable>
          </Header>

          <SwiperContainer>
            <Swiper showsPagination={false} loop={false} style={{ width: constants.width, height: constants.height / 2.5 }} dotStyle={{ width: 4, height: 4 }} activeDotStyle={{ width: 4, height: 4 }} >
              {files.map(file => (
                <Image key={file.id} source={{ uri: file.url }} style={{ width: constants.width,  height: constants.height / 2.5 }} />
              ))}
            </Swiper>
          </SwiperContainer>
          <InfoContainer>
            <IconsContainer>
              <Touchable>
                <IconContainer>
                  <Ionicons size={28} name={ Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty" } />
                </IconContainer>
              </Touchable>

              <Touchable>
                <IconContainer>
                  <Ionicons size={28} name={ Platform.OS === "ios" ? "ios-text" : "md-text" } />
                </IconContainer>
              </Touchable>
            </IconsContainer>

            <Touchable>
              <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
            </Touchable>
            
            <Caption>
              <Bold>{user.username}</Bold> {caption}
            </Caption>
            
            <Touchable>
              <CommentCount>See all {comments.length} comments</CommentCount>
            </Touchable>
          </InfoContainer>
        </Container>
      )} />
    </ViewContainer>
  );
};

Post.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
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
  })
).isRequired;

export default Post;