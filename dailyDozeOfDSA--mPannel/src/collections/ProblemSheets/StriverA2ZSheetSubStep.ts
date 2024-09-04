import { CollectionConfig } from 'payload/types';

const StriverA2ZSheetSubStep: CollectionConfig = {
  slug: 'strivera2zsubsteps',
  admin: {
    group: 'Problem Sheets',
  },
  fields: [
    {
      name: 'sub_step_no',
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

export default StriverA2ZSheetSubStep;
