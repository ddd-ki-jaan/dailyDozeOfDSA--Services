import { CollectionConfig } from 'payload/types';

const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'companyName',
    group: 'Jobs',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  timestamps: true,
};

export default Companies;