import { Text, useWindowDimensions } from "react-native";
import { Tables } from "@/types/database.types";
import { AdvancedImage } from "cloudinary-react-native";

import { cloudinary } from "@/lib/cloundinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { artisticFilter } from "@cloudinary/url-gen/actions/effect";

export default function AssetItem({ asset }: { asset: Tables<"assets"> }) {
  const { width } = useWindowDimensions();
  return (
    <AdvancedImage
      cldImg={cloudinary
        .image(asset.asset_id!)
        .resize(
          thumbnail()
            .height(Math.round((width*4/3)/2))
            .width(Math.round(width/2))
        )
        .effect(artisticFilter("primavera"))}
      className="w-full max-w-[50%] aspect-[3/4] flex-1 rounded-lg"
    />
  );
}
