import { CollectionConfig } from 'payload/types';

const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    group: 'Jobs',
  },
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'applyLink',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
    },
  ],
  timestamps: true, 
};

export default Jobs;