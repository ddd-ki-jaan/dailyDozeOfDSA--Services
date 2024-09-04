import { CollectionConfig } from "payload/types";

const SheetDescription: CollectionConfig = {
  slug: "sheetDescriptions",
  admin: {
    useAsTitle: "sheetName",
    group: "Problem Sheets",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "select",
      options: [
        {
          label: "Love Babbar",
          value: "LOVE_BABBAR",
        },
        {
          label: "Institute",
          value: "INSTITUTE",
        },
        {
          label: "Striver",
          value: "STRIVER",
        },
        {
          label: "Nishant Chahar",
          value: "NISHANT_CHAHAR",
        },
        {
          label: "Apna College",
          value: "APNA_COLLEGE"
        }
      ],
    },
    {
      name: "sheetName",
      type: "select",
      options: [
        {
          label: "Striver SDE Sheet",
          value: "STRIVER_SDE_SHEET",
        },
        {
          label: "Striver A2Z DSA Sheet",
          value: "STRIVER_A2Z_DSA_SHEET",
        },
        {
          label: "Striver 79 DSA Sheet",
          value: "STRIVER_79_DSA_SHEET",
        },
        {
          label: "Love Babbar 450 DSA Sheet",
          value: "LOVE_BABBAR_450_DSA_SHEET",
        },
        {
          label: "Apna College DSA Sheet",
          value: "APNA_COLLEGE_DSA_SHEET",
        },
        {
          label: "Blind 75 DSA Sheet",
          value: "BLIND_75_DSA_SHEET",
        },
        {
          label: "NeetCode 150 DSA Sheet",
          value: "NEET_CODE_150_DSA_SHEET",
        },
        {
          label: "Nishant Chahar 151 DSA Sheet",
          value: "NISHANT_CHAHAR_151_DSA_SHEET",
        },
      ],
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
  ],
  timestamps: true,
};

export default SheetDescription;