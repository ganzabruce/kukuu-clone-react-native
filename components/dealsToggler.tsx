import React, { Component } from "react";
import { Pressable, Text, View } from "react-native";
import Deals from "./deals";
import ThumbsUp from "./thumbsUp";

type DealsTooglerProps = { isShowingDeals: "deals" | "thumbs" };

class DealsToogler extends Component<DealsTooglerProps> {
  render() {
    const { isShowingDeals } = this.props;
    if (isShowingDeals === "deals") {
      return <Deals />;
    } else {
      return <ThumbsUp />;
    }
  }
}

type TogglerState = { isShowingDeals: "deals" | "thumbs" };

export default class Toggler extends Component<{}, TogglerState> {
  state: TogglerState = { isShowingDeals: "deals" };

  render() {
    const { isShowingDeals } = this.state;

    return (
      <View>
        {/* Tabs */}
        <View
          style={{
            width: "100%",
            gap: 10,
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          {/* Tab 1: Today's deals */}
          <Pressable
            style={{
              padding: 10,
              justifyContent: "center",
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: isShowingDeals === "deals" ? "black" : "#ddd",
              width: "45%",
            }}
            onPress={() => this.setState({ isShowingDeals: "deals" })}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: isShowingDeals === "deals" ? "black" : "#ddd",
              }}
            >
              Today's deals
            </Text>
          </Pressable>

          {/* Tab 2: Thumbs up Items */}
          <Pressable
            style={{
              padding: 10,
              justifyContent: "center",
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor:
                isShowingDeals === "thumbs" ? "black" : "#ddd",
              width: "45%",
            }}
            onPress={() => this.setState({ isShowingDeals: "thumbs" })}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: isShowingDeals === "thumbs" ? "black" : "#ddd",
              }}
            >
              Thumbs up Items
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <DealsToogler isShowingDeals={isShowingDeals} />
      </View>
    );
  }
}
