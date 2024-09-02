import { CollectionConfig } from 'payload/types';

const LoveBabbar450DSASheet: CollectionConfig = {
  slug: 'lovebabbar450dsasheets',
  admin: {
    group: 'Problem Sheets',
  },
  fields: [
    {
      name: 'topic_no',
      type: 'number',
    },
    {
      name: 'topic_name',
      type: 'text',
    },
    {
      name: 'problems',
      type: 'relationship',
      relationTo: 'problems',
      hasMany: true,
    },
  ],
  timestamps: true,  
};

export default LoveBabbar450DSASheet;
