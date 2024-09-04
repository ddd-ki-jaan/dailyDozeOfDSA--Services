import { CollectionConfig } from "payload/types";

const Problems: CollectionConfig = {
  slug: "problems",
  admin: {
    useAsTitle: "problem_name",
    group: "Problem Sheets",
  },
  fields: [
    {
      name: "problem_name",
      type: "text",
      required: true,
      defaultValue: "NA",
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
      required: true,
    },
    {
      name: "practice_platform_links",
      type: "relationship",
      relationTo: "platforms",
      hasMany: true,
    },
    {
      name: "solution_article_links",
      type: "relationship",
      relationTo: "platforms",
      hasMany: true,
    },
    {
      name: "practice_solution_links",
      type: "relationship",
      relationTo: "platforms",
      hasMany: true,
    }
  ],
  timestamps: true,
};

export default Problems;
