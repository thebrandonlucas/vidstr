import { SECRET_KEY, KEY_ID, REGION } from '$env/static/private';
import { S3Client, type S3ClientConfig } from '@aws-sdk/client-s3';

const config: S3ClientConfig = {
	credentials: {
		accessKeyId: KEY_ID || 'aws-access-key-id',
		secretAccessKey: SECRET_KEY || 'aws-secret-access-key'
	},
	region: REGION
};

export const s3Client = new S3Client(config);
