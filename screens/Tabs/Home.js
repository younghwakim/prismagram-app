import React, { useState } from "react";
import { ScrollView, RefreshControl, FlatList } from "react-native";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../../fragments";

const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default () => {
  const [ refreshing, setRefreshing ] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  console.log(loading);
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
        <FlatList
          data={data.seeFeed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return <Post item={item} />;
          }}
        />
      )}
    </ScrollView>
  );
};