import { CollectionConfig } from "payload/types";

// const addSerialNumber = async ({ data, req, operation }) => {
//   if (operation === 'create') {
//     const { collections: { SiteOffering } } = req.payload;
//     const count = await SiteOffering.Model.countDocuments();
//     data.serial_no = count + 1;
//   }
//   return data;
// };

const SiteOffering: CollectionConfig = {
  slug: "siteOffering",
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
      type: "textarea",
      required: true,
    },
  ],
  timestamps: true,
  // hooks: {
  //   beforeChange: [addSerialNumber],
  // },
};

export default SiteOffering;