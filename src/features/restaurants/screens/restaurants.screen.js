import React, { useContext } from "react";
import { FlatList, Pressable } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Search } from "../components/search.component";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList)`
    contentContainerStyle: {
        padding: 16
    }
`;

const LoadingContainer = styled.View`
    position: absolute;
    top: 50%;
    left: 50%
`;

const Loading = styled(ActivityIndicator)`
    marginLeft: -25px;
`;

export const RestaurantsScreen = ({ navigation }) => {
    const { isLoading, error, restaurants } = useContext(RestaurantsContext);
    return (
        <SafeArea>
            {isLoading && (
                <LoadingContainer>
                    <Loading
                        size={50}
                        animating={true}
                        color={MD2Colors.blue300} />
                </LoadingContainer>
            )}
            <SearchContainer>
                <Search />
            </SearchContainer>
            <RestaurantList
                data={restaurants}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigation.navigate("RestaurantDetail", {restaurant: item})}>
                        <Spacer position="bottom" size="large">
                            <RestaurantInfoCard restaurant={item} />
                        </Spacer>
                    </Pressable>
                )}
                keyExtractor={(item) => { item.name }}
                contentContainerStyle={{ padding: 16 }}>
            </RestaurantList>
        </SafeArea>
    );
};