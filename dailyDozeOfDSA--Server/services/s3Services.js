import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    HeadObjectCommand
} from '@aws-sdk/client-s3';
import fs from 'fs';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyID = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const client = new S3Client({
    region,
    credentials: {
        accessKeyId: accessKeyID,
        secretAccessKey: secretKey,
    },
});

export async function uploadFile(file, userId) {
    const fileStream = fs.createReadStream(file.path);

    const uniqueId = uuidv4();
    const key = `${userId}/${uniqueId}-${file.filename}`;

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: key,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
        const response = await client.send(command);
        // console.log('File uploaded successfully:', response);
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
}

export async function deleteFile(key) {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        // Attempt to retrieve the file's metadata
        const tempResponse = await client.send(new HeadObjectCommand(params));
        // console.log('File exists:', tempResponse);

        const deleteCommand = new DeleteObjectCommand(params);
        const response = await client.send(deleteCommand);

        // console.log('File deleted successfully:', response);
        return response;
    } catch (error) {
        if (error.name === 'NotFound') {
            console.error('File does not exist:', key);
        } else {
            console.error('Error deleting file:', error);
            throw new Error('Error deleting file');
        }
        return null;
    }
}