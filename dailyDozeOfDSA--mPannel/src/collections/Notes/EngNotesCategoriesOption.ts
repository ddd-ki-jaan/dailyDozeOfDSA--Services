import { CollectionConfig } from 'payload/types';

const EngNotesCategoryOption: CollectionConfig = {
  slug: 'engNotesCategoryOption',
  admin: {
    useAsTitle: 'optionValue',
    group: 'Notes',
  },
  fields: [
    {
        name: "optionLabel",
        type: "text",
        unique: true
    },
    {
        name: "optionValue",
        type: "text",
        unique: true
    }
  ],
  timestamps: true,  
};

export default EngNotesCategoryOption;