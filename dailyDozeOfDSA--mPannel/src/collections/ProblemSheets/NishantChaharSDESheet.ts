import { CollectionConfig } from 'payload/types';

const NishantChaharSDESheet: CollectionConfig = {
  slug: 'nishantchaharsdesheets',
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

export default NishantChaharSDESheet;
