import { CollectionConfig } from "payload/types";

const ContactUs: CollectionConfig = {
  slug: "contactUs",
  admin: {
    group: "Footer",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
    {
      name: "query",
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
          label: "Spam",
          value: "SPAM",
        },
        {
          label: "Resolved",
          value: "RESOLVED",
        },
        {
          label: "Follow Up",
          value: "FOLLOW_UP",
        },
        {
          label: "Escalated",
          value: "ESCALATED",
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

export default ContactUs;