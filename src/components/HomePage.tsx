import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import styled from "styled-components";
import CardGrid from "./CardGrid";
import { labelTypes, platformTypes } from "../utils/constants";
import { Filters } from "../utils/types";
import { firebase } from "../utils/firebaseSetup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 175px;
  margin: 2vw;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StyledLegend = styled(FormLabel)`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledLabel = styled(FormControlLabel)`
  margin-bottom: -15px;
`;

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    platforms: [],
    categories: [],
  });

  const getPlatformClick = (platform: string) => {
    return () => {
      if (filters.platforms!.includes(platform)) {
        setFilters({
          ...filters,
          platforms: filters.platforms!.filter((p) => p !== platform),
        });
      } else {
        setFilters({
          ...filters,
          platforms: [...filters.platforms!, platform],
        });
      }
    };
  };

  const getLabelClick = (category: string) => {
    return () => {
      if (filters.categories!.includes(category)) {
        setFilters({
          ...filters,
          categories: filters.categories!.filter((c) => c !== category),
        });
      } else {
        setFilters({
          ...filters,
          categories: [...filters.categories!, category],
        });
      }
    };
  };

  return (
    <PageContainer>
      <TopContainer>
        <Button
          style={{ height: "30px" }}
          onClick={() => firebase.auth().signOut()}
        >
          Logout
        </Button>
      </TopContainer>
      <InnerContainer>
        <Container>
          <StyledFormControl>
            <StyledLegend>Categories</StyledLegend>
            <FormGroup>
              {labelTypes.map((label) => (
                <StyledLabel
                  control={<Checkbox name={label} />}
                  label={label}
                  key={label}
                  onChange={getLabelClick(label)}
                />
              ))}
            </FormGroup>
          </StyledFormControl>
          <StyledFormControl>
            <StyledLegend>Platform</StyledLegend>
            <FormGroup>
              {platformTypes.map((platform) => (
                <StyledLabel
                  control={<Checkbox name={platform} />}
                  label={platform}
                  key={platform}
                  onChange={getPlatformClick(platform)}
                />
              ))}
            </FormGroup>
          </StyledFormControl>
        </Container>
        <CardGrid filters={filters} />
      </InnerContainer>
    </PageContainer>
  );
}