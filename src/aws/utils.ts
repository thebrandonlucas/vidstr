import { VIDEO_BUCKET } from '$env/static/private';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './config';

export function uploadToS3(filename: string, data: Buffer) {
	const params = {
		Bucket: VIDEO_BUCKET,
		Key: filename,
		Body: data
	};
	s3Client.send(new PutObjectCommand(params));
}

export async function getFromS3(videoId: string) {
	const params = {
		Bucket: VIDEO_BUCKET,
		Key: videoId
	};
	// Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
	const data = await s3Client.send(new GetObjectCommand(params));
	// Convert the ReadableStream to a string.
	return data.Body?.transformToString('base64');
}
