<script>
    import { onMount } from "svelte";
    import Scene from "./Scene.svelte";

    // define the data holding variable
    let scenes;

    onMount(async () => {
    await fetch(`http://localhost:8081/`)
      .then(r => r.json())
      .then(data => {
        scenes = data;
      });
  })

</script>

{#if scenes}
  {#each scenes as scene }
        <Scene {scene} />
  {/each}
{:else}
  <p class="loading">loading...</p>
{/if}

<style>
    .loading {
      opacity: 0;
      animation: 0.4s 0.8s forwards fade-in;
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    li {
      list-style-type: georgian;
    }
  </style>