import { PUBLIC_BASE_URL } from '$env/static/public';
import { fail, type Actions } from '@sveltejs/kit';
import uniqid from 'uniqid';
import { writeFileSync } from 'fs';

const MAX_FILE_SIZE_BYTES = 20_000_000; // 20 MB

export const actions: Actions = {
	default: async (event) => {
		try {
			const data = await event.request.formData();
			const video = data.get('video') as File;
			if (!video) {
				return fail(400, { missing: true });
			}
			const { name, type, size } = video;
			if (size > MAX_FILE_SIZE_BYTES) {
				return fail(413, { size });
			}
			const extension = type.split('/')[1];
			const base64 = Buffer.from(await video.arrayBuffer()).toString('base64');
			console.log({ name, type, size, video });
			// TODO change price on file size

			const newName = `${uniqid()}.${extension}`;
			writeFileSync(`static/v/${newName}`, base64, 'base64');
			const url = `${PUBLIC_BASE_URL}/v/${newName}`;
			return {
				url
			};
		} catch (e) {
			return fail(500, { error: String(e) });
		}
	}
};
