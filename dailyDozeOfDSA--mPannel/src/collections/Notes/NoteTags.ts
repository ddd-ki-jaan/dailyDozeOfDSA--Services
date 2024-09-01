import { CollectionConfig } from "payload/types";

const NoteTag: CollectionConfig = {
  slug: "notetags",
  admin: {
    useAsTitle: "tagName",
    group: "Notes",
  },
  fields: [
    {
      name: "tagName",
      type: "text",
      required: true,
      unique: true,
    },
  ],
  timestamps: true,
};

export default NoteTag;