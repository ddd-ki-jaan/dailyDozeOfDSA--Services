import { CollectionConfig } from "payload/types";

const HomeSubtittle: CollectionConfig = {
  slug: "homeSubtittle",
  admin: {
    group: "Home Page",
  },
  fields: [
    {
      name: "subTitle",
      label: "Sub Title",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
  timestamps: true,
};

export default HomeSubtittle;