<script>
	//import { onMount } from "svelte";

	import Slider from "./Slider.svelte";
	import keyboard from "./keyboard";
	import format from "./format";
	import { fade, fly } from "svelte/transition";
	import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";
	import { elasticOut } from 'svelte/easing';

	/*
	const colors = [
		'rgb(255, 62, 0)',
		'rgb(64, 179, 255)',
		'rgb(103, 103, 120)'
	];

	const color = tweened(colors[0], {
		duration: 800,
		interpolate: interpolateLab
	});
*/
	let scenes;
	let viewBox_duration = 900;

	const area = tweened([0, 0, 50, 50], { easing: cubicInOut, duration: viewBox_duration }  );
	const urlParams = new URLSearchParams(window.location.search);
	const animationName = urlParams.get("animad");

	let selected = false;
	let width = 240;
	let height = 135;
	let viewBox_width = 960;
	let viewBox_height = 540;
	const colors = ["#94c356", "#46a4cc", "#a63e4b", "#bad2fd"];
	let new_x = 0;
	let new_y = 0;
	let cuentas = [0, 0, 0];

	function opatrans(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = cubicInOut(t);
				const o = +getComputedStyle(node).opacity;

				return `
					transform: opacity(${t * o}) scale(${eased}) rotate(${eased * 1080}deg);`
			}
		};
	}

	/*	
    onMount(async () => {
		if(urlParams.has('animad')){
			scenes = 
		} else {
			await fetch(`http://localhost:8081/${urlParams.get('animad')}`)
			.then(r => r.json())
			.then(data => {
				scenes = data;
			});
		}
	})
*/
	function setViewBox(a, b, c, d, dur) {
		//area.set([a,b,c,d])
		//console.log('setViewBox:', a, b, c, d, dur);
		selected = true;
		new_x = a;
		new_y = b;
		viewBox_duration = dur;
	}

	function select(e) {
		selected = !selected;
		new_x = e.path[0].x.animVal.value;
		new_y = e.path[0].y.animVal.value;
	}

	function sel() {
		//area.set([new_x, new_y, viewBox_width, viewBox_height]);
	}

	$: selected
		? area.set([new_x, new_y, width, height], {duration: viewBox_duration})
		: area.set([0, 0, viewBox_width, viewBox_height], {duration: 800});

	let duration;
	let muted = false;
	let currentTime = 0;
	let paused = true;
	let volume = 0.5;
	let audio = {};

	const shortcut = {
		ArrowUp: () => (volume += 0.05),
		ArrowDown: () => (volume -= 0.05),
		ArrowLeft: (e) => (currentTime -= 5),
		ArrowRight: (e) => (currentTime += 5),
		Space: () => (paused = !paused),
		KeyP: () => (paused = true),
		KeyM: () => (muted = !muted),
	};

	async function getScenes() {
		let response = await fetch(`scenes/${urlParams.get("animad")}.json`);
		let scenes = await response.json();
		audio = scenes[0];
		return scenes;
	}
	const promise = getScenes();
</script>

{#if duration}
	<Slider
		max={duration}
		min={0}
		step={duration / 200}
		current={currentTime}
		on:change={(e) => (currentTime = e.detail.value)}
	/>
	<span>{'[' + format(currentTime, 1) + '] ' + format(currentTime)} / {format(duration) }</span>
{/if}

<main>
	<!--
	{#each colors as c}
	<button
		style="background-color: {c}; color: white; border: none;"
		on:click="{e => color.set(c)}"
	>{c}</button>
	{/each}

	<h1 style="color: {$color}">{$color}</h1>
		
	-->

	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={viewBox_width}
		height={viewBox_height}
		viewBox={$area}
	>

		{#await promise}
			<text>
				<tspan>loading...</tspan>
			</text>
		{:then scenes}
			{#each scenes as scene}
				<!-- Just for the first scene, set name, cover and author -->
				{#if scene.id == 1}
					{(audio = scene && "")}
				{/if}

				<!-- Set viewBox, changing the 'camera' -->
				{#if currentTime > scene.viewBox.time && currentTime < scene.viewBox.time + 0.05}
					{setViewBox(
						scene.viewBox.a,
						scene.viewBox.b,
						scene.viewBox.c,
						scene.viewBox.d,
						viewBox_duration
					)}
				{/if}

				<!-- Background color x={scene.fondo.x} y={scene.fondo.y} -->
				<rect
					{width}
					{height}
					fill={scene.back.fillColor}
					transform={scene.back.transform}
				/>

				<!-- Process Images if the scene has images -->
				{#if scene.images}
					{#each scene.images as image}
						<!-- out:fly="{{ x: -200, duration: 4000 }}" in:fade -->
						{#if currentTime > image.start && currentTime < image.end}
							{#if image.effect == "infade_outfly"}
								<image
									in:fade
									out:fly={{
										x: image.animParam1,
										duration: image.animParam2,
									}}
									href={image.value}
									x={image.x}
									y={image.y}
									{width}
									{height}
									transform={image.transform}
								/>
							{/if}
							{#if image.effect == "infly_outfade"}
								<image
									out:fade
									in:fly={{
										x: image.animParam1,
										duration: image.animParam2,
									}}
									href={image.value}
									x={image.x}
									y={image.y}
									{width}
									{height}
									transform={image.transform}
								/>
							{/if}
							{#if image.effect == "infly_outfly"}
								<image
									in:fly={{
										x: image.animParam1,
										duration: image.animParam2,
									}}
									out:fly={{
										x: image.animParam3,
										duration: image.animParam4,
									}}
									href={image.value}
									x={image.x}
									y={image.y}
									{width}
									{height}
									transform={image.transform}
								/>
							{/if}
							{#if image.effect == "yinfly_youtfly"}
								<image
									in:fly={{
										y: image.animParam1,
										duration: image.animParam2,
									}}
									out:fly={{
										y: image.animParam3,
										duration: image.animParam4,
									}}
									href={image.value}
									x={image.x}
									y={image.y}
									{width}
									{height}
									transform={image.transform}
								/>
							{/if}
							{#if image.effect == "yinopa_youtopa"}
								<image
									in:opatrans={{
										duration: image.animParam2,
									}}
									out:opatrans={{
										duration: image.animParam4,
									}}
									href={image.value}
									x={image.x}
									y={image.y}
									{width}
									{height}
									transform={image.transform}
								/>
							{/if}
							{#if !image.effect}
								<image
									href={image.value}
									x={image.x}
									y={image.y}
									{width}
									{height}
									transform={image.transform}
								/>
							{/if}

							{#if image.viewBoxStart && currentTime < image.viewBoxStart.time }
								{setViewBox(
									image.viewBoxStart.a, 
									image.viewBoxStart.b, 
									image.viewBoxStart.c, 
									image.viewBoxStart.d,
									image.viewBoxStart.duration
									)
								}
							{/if}

							{#if image.viewBoxEnd && currentTime > image.viewBoxEnd.time }
								{setViewBox(
									image.viewBoxEnd.a, 
									image.viewBoxEnd.b, 
									image.viewBoxEnd.c, 
									image.viewBoxEnd.d,
									image.viewBoxEnd.duration
									)
								}
							{/if}

						{/if}
					{/each}
				{/if}

				<!-- Process Texts if the scene has tets -->
				{#if scene.texts}
					{#each scene.texts as text}
						<!-- out:fly="{{ x: -200, duration: 4000 }}" in:fade -->
						{#if currentTime > text.start && currentTime < text.end}
							<!-- out:fade y={scene00.subtitulo.y} -->
							{#if text.effect == "infly_outfly"}
								<text
									in:fly={{
										x: text.animParam1,
										duration: text.animParam2,
									}}
									out:fly={{
										x: text.animParam3,
										duration: text.animParam4,
									}}
									x={text.x}
									class={text.class}
								>
									<tspan
										class={text.class}
										transform={scene.back.transform}
										dy={text.dy}>{text.value}</tspan
									>
								</text>
							{/if}
							{#if !text.effect}
								<text
									transition:fade
									x={text.x}
									class={text.class}
								>
									<tspan
										class={text.class}
										transform={scene.back.transform}
										dy={text.dy}>{text.value}</tspan
									>
								</text>
							{/if}
						{/if}
					{/each}
				{/if}
			{/each}
		{:catch error}
			<text class="error">
				<tspan>{error.message}</tspan>
			</text>
		{/await}

		<!-- Areas and grid dividers -->
		{#each Array(4) as row, row}
			{#each Array(4) as col, col}
				<rect
					on:click={select}
					{width}
					{height}
					x={col * width}
					y={row * height}
					fill={colors[(col + row) % colors.length]}
					stroke="#000"
					stroke-width="2"
					fill-opacity="0"
				/>
			{/each}
		{/each}
	</svg>

	<!-- svelte-ignore a11y-media-has-caption -->
	<audio
		src={audio.src}
		bind:duration
		bind:currentTime
		bind:muted
		bind:paused
		bind:volume
	/>
	<div use:keyboard={{ shortcut }} class="player-container" tabindex={0}>
		<div class="audio-info">
			<img src={audio.coverURL} alt="{audio.name} Portada del álbum" />
			<div>
				<h4>
					{audio.name}
				</h4>
				<p>
					{audio.author}
				</p>
			</div>
		</div>
		<div class="buttons">
			<button type="button" on:click={(e) => (currentTime = 0)}>
				Prev
			</button>
			<button type="button" on:click={(e) => (paused = !paused)}>
				{paused ? "Play" : "Pause"}
			</button>
			<button type="button" on:click={(e) => (currentTime += 5)}>
				Next
			</button>
		</div>
		<div class="volume">
			<Slider
				max={1}
				min={0}
				step={0.01}
				current={volume}
				on:change={(e) => (volume = e.detail.value)}
			/>
		</div>
	</div>
</main>

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	* {
		box-sizing: border-box;
	}
	.player-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 75px;
		padding: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #111;
		background-color: #fff;
	}

	img {
		width: 50px;
		margin-right: 8px;
	}

	.audio-info {
		display: flex;
		justify-content: space-between;
	}

	h4,
	p {
		margin: 0;
		color: #444;
		font-weight: normal;
	}

	p {
		color: #aaa;
		margin-top: 5px;
		font-size: 14px;
	}

	.volume {
		width: 100px;
	}

	audio {
		visibility: hidden;
		opacity: 0;
	}
	.subtitulo {
		font-family: Arial;
		font-weight: bold;
		font-size: 10px;
		fill: #2a51ff;
		stroke: #2a51ff;
		stroke-width: 0.2;
	}
	.legend {
		font-family: sans-serif;
		fill: #ffffff;
		fill-opacity: 0.5;
		font-size: 10px;
	}
	.error {
		fill: red;
	}
</style>
