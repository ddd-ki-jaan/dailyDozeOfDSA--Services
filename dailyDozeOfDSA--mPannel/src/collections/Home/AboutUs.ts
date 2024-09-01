import { CollectionConfig } from "payload/types";

const AboutUs: CollectionConfig = {
  slug: "aboutUs",
  admin: {
    group: "Home Page",
  },
  fields: [
    {
      name: "serialNo",
      label: "Serial No",
      type: "number",
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "content",
      type: "text",
      required: true,
    },
  ],
  timestamps: true,
};

export default AboutUs;