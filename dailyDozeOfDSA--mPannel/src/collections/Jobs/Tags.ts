import { CollectionConfig } from 'payload/types';

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tagName',
    group: 'Jobs',
  },
  fields: [
    {
      name: 'tagName',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
  timestamps: true,  
};

export default Tags;