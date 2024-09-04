import { CollectionConfig } from 'payload/types';

const Blind75DSASheet: CollectionConfig = {
  slug: 'blind75dsasheets',
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

export default Blind75DSASheet;
