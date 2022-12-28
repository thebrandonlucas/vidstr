<script lang="ts">
	import type { ActionData } from './$types';

	const MB_SIZE = 1_000_000;

	let videoFiles: FileList;
	export let form: ActionData;
</script>

<h1 class="text-3xl font-bold">Nostr video uploader</h1>

{#if !form}
	<form method="post" enctype="multipart/form-data">
		<button type="submit">Upload</button>
		<label for="video">Upload Video</label>
		<input type="file" name="video" accept="video/*" bind:files={videoFiles} />
	</form>
{:else if form.missing}
	<p class="error">Video missing from request</p>
{:else if form.size}
	<p>
		Sorry, but the file of size {Math.floor(form.size / MB_SIZE)} bytes is too large (hopefully, we'll
		have longer videos soon)
	</p>
{:else if form.error}
	<p class="error">{JSON.stringify(form.error)}</p>
{:else if form.url}
	<p>New video can be found here: <a href={form.url}>{JSON.stringify(form.url)}</a></p>
{/if}
