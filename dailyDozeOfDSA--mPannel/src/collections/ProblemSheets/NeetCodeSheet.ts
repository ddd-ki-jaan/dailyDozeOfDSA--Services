import { CollectionConfig } from 'payload/types';

const NeetCodeSheet: CollectionConfig = {
  slug: 'neetcodesheets',
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

export default NeetCodeSheet;
