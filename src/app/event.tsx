import { Text, useWindowDimensions, View } from "react-native";
import { AdvancedImage } from "cloudinary-react-native";
import { cloudinary } from "../lib/cloundinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { artisticFilter } from "@cloudinary/url-gen/actions/effect";

export default function Event() {
  const { width } = useWindowDimensions();
  const roundedWidth = Math.round(width);

  return (
    <View>
      <Text className="text-white">event</Text>
      <AdvancedImage
        cldImg={cloudinary
          .image("mlrnr1wvoqp7cwsfpqyl")
          .resize(
            thumbnail()
              .height(roundedWidth * (4 / 3))
              .width(roundedWidth)
          )
          .effect(artisticFilter("zorro"))}
        className="w-full aspect-[3/4]"
      />
    </View>
  );
}
