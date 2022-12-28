<script lang="ts">
	import type { ActionData } from './$types';

	let videoFiles: FileList;
	let loading = false;
	let file: string;
	export let form: ActionData;

	function handleFileChange() {
		const reader = new FileReader();
		console.log({ videoFiles });
		reader.readAsDataURL(videoFiles[0]);
		reader.onload = (e) => {
			const base64Url = e.target?.result as string;
			console.log({ base64Url });
			if (base64Url) {
				uploadFunction(base64Url);
			}
		};
	}

	async function uploadFunction(base64: string) {
		const videoData = base64.split(',');
		const data = {
			videoBase64: videoData[1]
		};
		await fetch(`/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});
	}

	$: console.log({ form });
</script>

<h1 class="text-3xl font-bold">Nostr video uploader</h1>

{#if !form}
	<form method="post" enctype="multipart/form-data">
		<button type="submit">Upload</button>
		<label for="video">Upload Video</label>
		<input type="file" name="video" accept="video/*" bind:files={videoFiles} />
	</form>
{:else if form.url}
	<p>New video can be found here: <a href={form.url}>{JSON.stringify(form.url)}</a></p>
{:else if form.missing}
	<p class="error">Video missing from request</p>
{:else if form.error}
	<p class="error">{JSON.stringify(form.error)}</p>
{/if}
