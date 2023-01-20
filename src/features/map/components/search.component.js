import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";


const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width:100%
`;

export const Search = () => {


    return (
        <SearchContainer>
            <Searchbar
                icon="map"
                placeholder="Search for a location"
            />
        </SearchContainer>
    );
};