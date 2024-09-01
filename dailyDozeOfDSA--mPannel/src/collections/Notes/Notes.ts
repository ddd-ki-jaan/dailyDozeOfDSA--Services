import { CollectionConfig } from "payload/types";
import Media from "../Media/Media";

const Notes: CollectionConfig = {
  slug: "notes",
  admin: {
    group: "Notes",
  },
  fields: [
    {
      name: "noteTitle",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      // required: true,
    },
    {
      name: "metaTitle",
      type: "text",
      required: true,
    },
    {
      name: "metaDescription",
      type: "text",
      required: true,
    },
    {
      name: "noteTags",
      type: "relationship",
      relationTo: "notetags",
      hasMany: true,
    },
    {
      name: "noteCategories",
      type: "relationship",
      relationTo: "engNotesCategoryOption",
      hasMany: true,
    },
    {
      name: "noteContent",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "uploadedBy",
      type: "text",
      defaultValue: "ADMIN",
      required: true,
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        try {
          data.noteTitle = data.noteTitle.trim().replace(/\s+/g, " ");

          const isValid = /^[a-zA-Z\s]+$/.test(data.noteTitle);
          if (!isValid) {
            throw new Error(
              "note title must only contain english alphabets and spaces"
            );
          }

          let noteContent = await req.payload.findByID({
            collection: "media",
            id: data.noteContent,
          });

          if (noteContent.mimeType !== "application/pdf") {
            throw new Error("file must be a pdf file");
          }

          data.slug = data.noteTitle.toLowerCase().split(" ").join("-");
          return data;
        } catch (error) {
          throw error;
        }
      },
    ],
  },
};

export default Notes;
