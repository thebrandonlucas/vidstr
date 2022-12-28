import type { Actions } from '@sveltejs/kit';
import { uploadToS3 } from '../aws/utils';
import uniqid from 'uniqid';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const video = data.get('video') as File;
		const { name, size, type } = video;
		const buf = await video.arrayBuffer();
		// Todo, charge per GB
		// from video/ext (i.e. video/mp4), grab ext
		const extension = type.split('/')[1];
		console.log({ name, size, video, type, extension });

		uploadToS3(`${uniqid()}.${extension}`, Buffer.from(buf));
	}
};
