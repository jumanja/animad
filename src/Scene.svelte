<script>
    // create a prop
    export let scene;
</script>

  <article>
    <h1>{scene.name}</h1>
    <small>
      Population: <b>{scene.population}</b>   
    </small><br/>
    <small>
      Number of countries: <b>{scene.no_of_countries}</b>
    </small><br/>
    <small>
      Continent's size: <b>{scene.area}</b>
    </small>
</article>

<style>
    article {
      margin: 0 0 1em 0;
    }
    h1 {
      font-size: 1.4em;
      margin: 0;
      display: block;
    }
  </style>