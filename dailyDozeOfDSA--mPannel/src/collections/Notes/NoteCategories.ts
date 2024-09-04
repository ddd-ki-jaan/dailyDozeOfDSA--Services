import { CollectionConfig } from 'payload/types';

const NoteCategories: CollectionConfig = {
  slug: 'notecategories',
  admin: {
    useAsTitle: 'categoryName',
    group: 'Notes',
  },
  fields: [
    {
      name: 'categoryName',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
  timestamps: true,  
};

export default NoteCategories;