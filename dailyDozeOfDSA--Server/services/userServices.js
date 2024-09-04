import fs from 'fs';
import path from 'path';
import User from '../models/User/User.js';
import { uploadFile, deleteFile } from './s3Services.js';
import { extractS3Key } from './utilServices.js';

let updateLock = {};

export async function updateUserDetails(userId, updatedUserName, file) {
  if (updateLock[userId]) {
    throw new Error("Another update is in progress. Please try again later.");
  }

  updateLock[userId] = true;

  try {
    const user = await User.findById(userId);

    if (!updatedUserName || updatedUserName.trim().length === 0) {
      throw new Error("Name must be at least 1 character long.");
    }

    if (updatedUserName.length > 26) {
      throw new Error("Name cannot exceed 26 characters.");
    }

    if (file) {
      const maxFileSize = 2 * 1024 * 1024;
      if (!file.mimetype.startsWith('image')) {
        throw new Error('The uploaded file must be an image.');
      }

      if (file.size > maxFileSize) {
        throw new Error('File size cannot exceed 2MB.');
      }

      const existingProfilePicUrl = user.profilePicUrl;
      if (existingProfilePicUrl) {
        const s3Key = extractS3Key(existingProfilePicUrl);
        if (s3Key) {
          const deletedFile = await deleteFile(s3Key);
          console.log('Previous profile picture deleted from S3:', deletedFile);
        } else {
          console.log('No valid S3 key found for existing profile picture, skipping deletion.');
        }
      }

      try {
        const response = await uploadFile(file, user.userId);
        user.profilePicUrl = response;
        console.log('New profile picture uploaded to S3:', response);

        const localFilePath = path.resolve(file.path);
        fs.unlink(localFilePath, (err) => {
          if (err) {
            console.error('Error deleting local file:', err);
          } else {
            console.log('Local file deleted successfully.');
          }
        });
      } catch (err) {
        console.error('Error uploading new profile picture to S3:', err);
        throw new Error(err.message);
      }
    }

    user.name = updatedUserName;
    await user.save();
    console.log('User details updated successfully:', user);
    return user;
  } catch (err) {
    console.error('Error updating user details:', err.message);
    throw new Error(err.message);
  } finally {
    delete updateLock[userId]; 
  }
}