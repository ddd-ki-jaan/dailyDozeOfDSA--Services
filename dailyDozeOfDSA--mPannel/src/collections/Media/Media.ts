import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Media",
  },
  upload: true,
  labels: {
    singular: "Media",
    plural: "Media",
  },
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name:  "collection_source",
      type: "select",
      options: [
        {
          label: "Engineering Notes",
          value: "ENGIEERING_NOTES",
        },
        {
          label: "Jobs",
          value: "JOBS",
        },
        {
          label: "Companies",
          value: "COMPANIES",
        },
        {
          label: "Static Data",
          value: "STATIC_DATA",
        }
      ],
      required: true,
      defaultValue: "STATIC_DATA",
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        try {
          const fileExtension = data.filename.split(".").pop();
          const fileNameWithoutExtension = data.filename.replace(
            `.${fileExtension}`,
            ""
          );

          const randomString = Array.from({length: 25}, (_, index) => index).reduce((acc, _) => acc + "x", "").replace(/x/g, () => ~~(Math.random() * 10) + "");

          let key = data.collection_source
          key = key.toLowerCase();
          const newFileName = `${key}/${fileNameWithoutExtension}-${Date.now()}-${randomString}.${fileExtension}`;
          data.filename = newFileName;

          data.url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${data.filename}`;
          console.log("*** aws s3 file data ***", data);
        
          return data;
        } catch (error) {
          throw error;
        }
      },
    ],
  },
};

export default Media;