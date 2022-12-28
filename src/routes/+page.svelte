<script lang="ts">
	let videoFiles: FileList;
	let loading = false;
	let uploaded = false;
	let error: Error;

	// async function submit(e: Event) {
	// 	loading = true;
	// 	if (!videoFiles) {
	// 		alert('You must select a video!');
	// 		loading = false;
	// 		return;
	// 	}
	// 	loading = false;
	// }

	function handleFileChange(e: Event) {
		const { files } = e.target as HTMLInputElement;
		if (files) {
			videoFiles = files;
		}
	}
</script>

<h1 class="text-3xl font-bold ">Nostr video uploader</h1>

<form method="post" enctype="multipart/form-data">
	<button type="submit">Upload</button>
	<label for="video">Upload Video</label>
	<input
		type="file"
		name="video"
		accept="video/*"
		bind:files={videoFiles}
		on:change={handleFileChange}
	/>
</form>
