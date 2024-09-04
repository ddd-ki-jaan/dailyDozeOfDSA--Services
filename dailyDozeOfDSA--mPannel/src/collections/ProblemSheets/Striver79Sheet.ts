import { CollectionConfig } from 'payload/types';

const Striver79Sheet: CollectionConfig = {
  slug: 'striver79sheets',
  admin: {
    group: 'Problem Sheets',
  },
  fields: [
    {
      name: 'day_no',
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

export default Striver79Sheet;
