import { CollectionConfig } from 'payload/types';

const Platforms: CollectionConfig = {
  slug: 'platforms',
  admin: {
    useAsTitle: 'platform_name',
    group: 'Problem Sheets',
  },
  fields: [
    {
      name: 'platform_name',
      type: 'text',
      required: true,
      defaultValue: 'NA',
    },
    {
      name: 'platform_link',
      type: 'text',
      required: true,
      defaultValue: 'NA',
    },
  ],
  timestamps: true,
};

export default Platforms;
