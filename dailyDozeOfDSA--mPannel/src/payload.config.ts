import path from "path";
// import fs from 'fs';

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";

import ContactUs from "./collections/Footer/ContactUs";
import ReportBug from "./collections/Footer/ReportBug";

import AboutUs from "./collections/Home/AboutUs";
import HomeSubtittle from "./collections/Home/HomeSubtittle";
import SiteOffering from "./collections/Home/SiteOffering";

import Companies from "./collections/Jobs/Companies";
import Jobs from "./collections/Jobs/Jobs";
import Tags from "./collections/Jobs/Tags";

import Media from "./collections/Media/Media";

import NoteCategories from "./collections/Notes/NoteCategories";
import Notes from "./collections/Notes/Notes";
import NoteTag from "./collections/Notes/NoteTags";

import ApnaCollegeDSASheet from "./collections/ProblemSheets/ApnaCollegeDSASheet";
import Blind75DSASheet from "./collections/ProblemSheets/Blind75DSASheet";
import LoveBabbar450DSASheet from "./collections/ProblemSheets/LoveBabbar450DSASheet";
import NeetCodeSheet from "./collections/ProblemSheets/NeetCodeSheet";
import NishantChaharSDESheet from "./collections/ProblemSheets/NishantChaharSDESheet";
import Platforms from "./collections/ProblemSheets/Platforms";
import Problems from "./collections/ProblemSheets/Problems";
import SheetDescription from "./collections/ProblemSheets/SheetDescription";
import Striver79Sheet from "./collections/ProblemSheets/Striver79Sheet";
import StriverA2ZSheetStep from "./collections/ProblemSheets/StriverA2ZSheetStep";
import StriverA2ZSheetSubStep from "./collections/ProblemSheets/StriverA2ZSheetSubStep";
import StriverSDESheet from "./collections/ProblemSheets/StriverSDESheet";

import Tests from "./collections/Tests";
import EngNotesCategoryOption from "./collections/Notes/EngNotesCategoriesOption";

const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  },
  bucket: process.env.S3_BUCKET_NAME,
});

export default buildConfig({
  admin: {
    user: Tests.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    ContactUs,
    ReportBug,
    AboutUs,
    HomeSubtittle,
    SiteOffering,
    ApnaCollegeDSASheet,
    Blind75DSASheet,
    Companies,
    Jobs,
    LoveBabbar450DSASheet,
    Media,
    NeetCodeSheet,
    NishantChaharSDESheet,
    EngNotesCategoryOption,
    NoteCategories,
    Notes,
    NoteTag,
    Platforms,
    Problems,
    SheetDescription,
    Striver79Sheet,
    StriverA2ZSheetStep,
    StriverA2ZSheetSubStep,
    StriverSDESheet,
    Tags,
    Tests,
  ],

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },

  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },

  // plugins: [payloadCloud()],
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: storageAdapter,
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],

  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});