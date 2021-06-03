<script>
	import { onMount } from "svelte";

	import Slider from './Slider.svelte';
	import keyboard from './keyboard';
	import format from './format';
	import { fade, fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import {cubicInOut} from 'svelte/easing';

	import Scene from "./Scene.svelte";
	import Scenes from "./Scenes.svelte";

	let scenes;
	let scene;
	let image;
	
	const area = tweened([0,0,50,50],{easing:cubicInOut, duration:800})
	
	let selected = false
	let width = 240;
	let height = 135;
	let viewBox_width=960;
	let viewBox_height=540;
	const colors = ["#94c356", "#46a4cc", "#a63e4b","#bad2fd"];
	let new_x=0
	let new_y=0
	let cuentas=[0, 0, 0]
	
    onMount(async () => {
    await fetch(`http://localhost:8081/`)
		.then(r => r.json())
		.then(data => {
			scenes = data;
		});
	})

	function selectArea(index){
		const e = document.getElementById('area_' + index);

		selected = !selected
		new_x = e.path[0].x.animVal.value
		new_y = e.path[0].y.animVal.value
	}

	function setViewBox(a, b, c, d){
			//area.set([a,b,c,d])
			selected = true;
			new_x = a;
			new_y = b;
	}

	function select(e){
			selected = !selected
			new_x = e.path[0].x.animVal.value
			new_y = e.path[0].y.animVal.value
	}
	
	function sel() {
		area.set([new_x,new_y,viewBox_width,viewBox_height])
	}
	$: selected ? area.set([new_x,new_y,width,height]) : area.set([0,0,viewBox_width,viewBox_height])

	let duration;
	let muted = false;
	let currentTime = 0;
	let paused = true;
	let volume = 0.5;
	const audio = {
		name: 'La enseñanza por medio de Parábolas',
		author: 'xamdox.website',
		coverURL: 'xamdox_cover.png',
		src: 'audio/MR-004-033-034.mp3'
	};

	const scene00 = {
		viewBox: {
			'a': 0,
			'b': 0,
			'c': 240,
			'd': 135,
			'time': 0.5
		},
		portada: {
			'value': 'MR/portada_Leon.png',
			'x': 0,
			'y': 0,
			'start': -1,
			'end': 10
		},
		subtitulo: {
			'line0': '',
			'line1': 'La Enseñanza',
			'line2': 'por medio de',
			'line3': 'Parábolas',
			'x': 130,
			'y': 20,
			'class': 'subtitulo',
			'class_line1': 'title-1',
			'class_line2': 'title-2',
			'class_line3': 'title-3',
			'start': 0.3,
			'end': 6

		},
		fondo: {
			'fill': '#000'
		}
	}

	const scene01 = {
		viewBox: {
			'a': 240,
			'b': 0,
			'c': 240,
			'd': 135,
			'time': 10
		},
		imagen0: {
			'value': 'MR/jesus_apostoles.png',
			'x': 0,
			'y': 0,
			'start': 12,
			'end': 24,
			'transform': 'translate(200) scale(0.8, 0.8)'
		},
		imagen1: {
			'value': 'MR/apostoles.png',
			'x': 50,
			'y': 0,
			'start': 15,
			'end': 24,
			'transform': 'translate(235, 5) scale(1,1)'
		},
		legenda: {
			'text': 'xamdox.website',
			'start': 14,
			'end': 16,
			'class': 'legend',
			'x': 20,
			'y': 120,
		},
		fondo: {
			'fill': '#000',
			'transform': 'translate(240)'
		}
	}

	const scene02 = {
		viewBox: {
			'a': 480,
			'b': 0,
			'c': 240,
			'd': 135,
			'time': 26
		},
		imagen: {
			'value': 'MR/arbolmostazas.png',
			'x': 0,
			'y': 0,
			'start': 20,
			'end': 46,
			'transform': 'translate(200)'
		},
		fondo: {
			'fill': '#000',
			'transform': 'translate(480)'
		}
	}

	const shortcut = {
		'ArrowUp': () => volume += 0.05,
		'ArrowDown': () => volume -= 0.05,
		'ArrowLeft': e => currentTime -= 5,
		'ArrowRight': e => currentTime += 5,
		'Space': () => paused = !paused,
		'KeyP': () => paused = true,
		'KeyM': () => muted = !muted,
	};

</script>

{#if duration}
	<Slider max={duration} min={0} step={duration / 200} current={currentTime}  on:change={e => currentTime = e.detail.value} />
	<span>{format(currentTime)} / {format(duration)}</span>
	<!--
		{currentTime} 
	-->
{/if}

<main>	
	<svg xmlns="http://www.w3.org/2000/svg" width={viewBox_width} height={viewBox_height} viewBox={$area}>

		<!-- Scene00 
		{#if currentTime > scene00.portada.start && currentTime < scene00.portada.end }
			<image out:fly="{{ x: -200, duration: 4000 }}" in:fade href={scene00.portada.value} x={scene00.portada.x} y={scene00.portada.y} width={width} height={height} />
		{/if}
		{#if currentTime > scene00.subtitulo.start && currentTime < scene00.subtitulo.end }
			<text out:fade y={scene00.subtitulo.y} class={scene00.subtitulo.class}>
				<tspan x={scene00.subtitulo.x} class={scene00.subtitulo.class_line0} >{scene00.subtitulo.line0}</tspan>
				<tspan x={scene00.subtitulo.x} class={scene00.subtitulo.class_line1} dy="20">{scene00.subtitulo.line1}</tspan>
				<tspan x={scene00.subtitulo.x} class={scene00.subtitulo.class_line2} dy="10">{scene00.subtitulo.line2}</tspan>
				<tspan x={scene00.subtitulo.x} class={scene00.subtitulo.class_line3} dy="10">{scene00.subtitulo.line3}</tspan>
			</text>
		{/if}
-->
		<!-- Scene01 
		{#if currentTime > scene01.imagen0.start && currentTime < scene01.imagen0.end }
			<image transform={scene01.imagen0.transform} out:fly="{{ x: -10, duration: 2500 }}" in:fly="{{ x: 100, duration: 2500 }}" href={scene01.imagen0.value} x={scene01.imagen0.x} y={scene01.imagen0.y} width={width} height={height} />
		{/if}
		{#if currentTime > scene01.imagen1.start && currentTime < scene01.imagen1.end }
			<image transform={scene01.imagen1.transform} out:fly="{{ x: 100, duration: 3500 }}" in:fly="{{ x: -10, duration: 3500 }}" href={scene01.imagen1.value} x={scene01.imagen1.x} y={scene01.imagen1.y} width={width} height={height} />
		{/if}
		{#if currentTime > scene01.legenda.start && currentTime < scene01.legenda.end }
			<text transition:fade y={scene01.legenda.y} class={scene01.legenda.class} transform={scene01.fondo.transform} >
				<tspan x={scene01.legenda.x} class={scene01.legenda.class} >{scene01.legenda.text}</tspan>
			</text>			
		{/if}

-->
		<!-- Scene02 
		{#if currentTime > scene02.imagen.start && currentTime < scene02.imagen.end }
			<image transform={scene02.fondo.transform} out:fly="{{ x: -10, duration: 2500 }}" in:fly="{{ x: 100, duration: 2500 }}" href={scene02.imagen.value} x={scene02.imagen.x} y={scene02.imagen.y} width={width} height={height} />
		{/if}
-->

		{#if scenes}
			{#each scenes as scene }
				<!-- Just for the first scene, set name, cover and author -->
				{#if scene.id == 1}
					{audio = scene && ''}
				{/if}

				<!-- Set viewBox, changing the 'camera' -->
				{#if currentTime > scene.viewBox.time && currentTime < scene.viewBox.time + 0.05}
					{setViewBox(scene.viewBox.a, scene.viewBox.b, scene.viewBox.c, scene.viewBox.d)}
				{/if}

				<!-- Background color x={scene.fondo.x} y={scene.fondo.y} -->
				<rect width={width} height={height} fill={scene.back.fillColor} transform={scene.back.transform} ></rect>

				<!-- Process Images if the scene has images -->
				{#if scene.images}
					{#each scene.images as image }
						<!-- out:fly="{{ x: -200, duration: 4000 }}" in:fade -->
						{#if currentTime > image.start && currentTime < image.end }
							{#if image.effect == 'infade_outfly' }
								<image in:fade out:fly="{{ x: image.animParam1, duration: image.animParam2}}" href={image.value} x={image.x} y={image.y} width={width} height={height} transform={image.transform}/>
							{/if}	
							{#if image.effect == 'infly_outfade' }
								<image out:fade in:fly="{{ x: image.animParam1, duration: image.animParam2}}" href={image.value} x={image.x} y={image.y} width={width} height={height} transform={image.transform}/>
							{/if}	
							{#if image.effect == 'infly_outfly' }
								<image in:fly="{{ x: image.animParam1, duration: image.animParam2}}" out:fly="{{ x: image.animParam3, duration: image.animParam4}}" href={image.value} x={image.x} y={image.y} width={width} height={height} transform={image.transform}/>
							{/if}	
						{/if}	

					{/each}	
				{/if}

				<!-- Process Texts if the scene has tets -->
				{#if scene.texts}
					{#each scene.texts as text }
						<!-- out:fly="{{ x: -200, duration: 4000 }}" in:fade -->
						{#if currentTime > text.start && currentTime < text.end }
							<!-- out:fade y={scene00.subtitulo.y} -->
							{#if text.effect == 'infly_outfly' }
								<text in:fly="{{ x: text.animParam1, duration: text.animParam2}}" out:fly="{{ x: text.animParam3, duration: text.animParam4}}" x={text.x} class={text.class}>
									<tspan class={text.class} transform={scene.back.transform} dy={text.dy}>{text.value}</tspan>
								</text>
							{/if}	
							{#if !text.effect }
								<text transition:fade x={text.x} class={text.class}>
									<tspan class={text.class} transform={scene.back.transform} dy={text.dy}>{text.value}</tspan>
								</text>
							{/if}	
						{/if}
					{/each}
				{/if}

			{/each}
		{:else}
			<text>
				<tspan>loading...</tspan>
			</text>
		{/if}
			
		<!-- Areas and grid dividers -->
		{#each Array(4) as row, row}
			{#each Array(4) as col, col}
				<rect on:click={select} width={width} height={height} x={col*width} y={row*height} fill={colors[(col+row) % colors.length]} stroke="#000" stroke-width="2" fill-opacity="0"></rect>
				
			{/each}
		{/each}
	</svg>

	<!-- svelte-ignore a11y-media-has-caption -->
	<audio
	src={audio.src}
		bind:duration={duration}		 
		bind:currentTime={currentTime}
		bind:muted={muted}
		bind:paused={paused}
		bind:volume={volume}
	/>
<div use:keyboard={{shortcut}} class="player-container" tabindex={0}>
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
		<button type="button" on:click={e => currentTime = 0}>
			Prev
		</button>
		<button type="button" on:click={e => paused = !paused}>
			{paused ? 'Play' : 'Pause'}
		</button>
		<button type="button" on:click={e => currentTime += 5}>
			Next
		</button>
	</div>
	<div class="volume">
		<Slider max={1} min={0} step={0.01} current={volume} on:change={e => volume = e.detail.value}  />
	</div>
</div>
</main>

<style>
	:global(body) {
		display:flex;
		flex-direction: column;
		align-items:center;
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
	
	h4, p {
		margin: 0;
		color: #444;
		font-weight: normal;
	}
	
	p {
		color: #aaa; margin-top: 5px;
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
</style>