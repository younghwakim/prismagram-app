import React, { useState } from "react";
import { ScrollView, RefreshControl, FlatList } from "react-native";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const FEED_QUERY = gql`{
  seeFeed {
    id
    location
    caption
    user {
      id
      avatar
      username
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      user {
        id
        username
      }
    }
    createdAt
  }
}`;

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
  const [ refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const refresh = async() => {
    try {
      setRefreshing(true);
      await refetch();
    } catch(e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        <Post data={data.seeFeed} />
      )}
    </ScrollView>
  );
};