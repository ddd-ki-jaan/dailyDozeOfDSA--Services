import { CollectionConfig } from 'payload/types'

const Tests: CollectionConfig = {
  slug: 'tests',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Users',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Tests
