import React, { useRef } from 'react';
import { Dimensions, Animated, View, Image, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

interface AnimatedCarouselProps {
  data: Array<{
    id: number;
    photo: string,
    avatar_url: string;
  }>;
}

export default function AnimatedCarousel({ data }: AnimatedCarouselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={item => String(item.id)}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width
        ];

        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-width * 0.7, 0, width * 0.7]
        });

        return (
          <View style={styles.container}>
            <View style={styles.content}>

              <View style={styles.imageContainer}>
                <Animated.Image
                  source={{ uri: item.photo }}
                  style={[styles.image, { transform: [{ translateX }] }]}
                />
              </View>

              <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: {
      height: 0,
      width: 0
    },
    padding: 8,
    backgroundColor: '#48D361'
  },

  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 14,
  },

  image: {
    width: ITEM_WIDTH * 1.4,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#48D361',
    position: 'absolute',
    bottom: -30,
    right: 60
  }
});
