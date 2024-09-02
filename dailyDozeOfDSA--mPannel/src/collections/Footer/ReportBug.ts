import { CollectionConfig } from "payload/types";

const ReportBug: CollectionConfig = {
  slug: "reportBug",
  admin: {
    group: "Footer",
  },
  fields: [
    {
      name: "email",
      type: "text",
      required: true,
    },
    {
      name: "bugDescription",
      type: "text",
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Pending",
          value: "PENDING",
        },
        {
          label: "Resolved",
          value: "RESOLVED",
        },
        {
          label: "Revisit",
          value: "REVISIT",
        },
        {
          label: "Spam",
          value: "SPAM",
        },
      ],
      defaultValue: "PENDING",
    },
    {
      name: "remarks",
      type: "text",
    },
  ],
  timestamps: true,
};

export default ReportBug;