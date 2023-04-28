import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { returnMarkerStyle } from "./helpers";

const ClusteredMarker = ({
  geometry,
  properties,
  onPress,
  clusterColor,
  clusterTextColor,
  clusterFontFamily,
  tracksViewChanges,
}) => {
  const points = properties.point_count;
  const { width, height, fontSize, size } = returnMarkerStyle(points);

  return (
    <Marker
      key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      style={{ zIndex: points + 1 }}
      onPress={onPress}
      tracksViewChanges={tracksViewChanges}
    >
      <View style={[styles.container, { width, height }]}>
        <View
          style={[
            styles.cluster,
            {
              backgroundColor: clusterColor,
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: clusterTextColor,
                fontSize,
                fontFamily: clusterFontFamily,
              },
            ]}
          >
            {points}
          </Text>
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cluster: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontWeight: "bold",
  },
});

export default memo(ClusteredMarker);
