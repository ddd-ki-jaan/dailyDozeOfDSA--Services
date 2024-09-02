import { CollectionConfig } from 'payload/types';

const StriverA2ZSheetStep: CollectionConfig = {
  slug: 'strivera2zsheets',
  admin: {
    group: 'Problem Sheets',
  },
  fields: [
    {
      name: 'step_no',
      type: 'number',
    },
    {
      name: 'topic_name',
      type: 'text',
    },
    {
      name: 'sub_steps',
      type: 'relationship',
      relationTo: 'strivera2zsubsteps',
      hasMany: true,
    },
  ],
  timestamps: true,  
};

export default StriverA2ZSheetStep;
