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

          const newFileName = `${fileNameWithoutExtension}-${Date.now()}-${randomString}.${fileExtension}`;
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