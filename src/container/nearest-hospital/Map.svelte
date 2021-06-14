<script>
  import { onMount } from "svelte";

  import HospitalList from "./HospitalList.svelte";

  let container;
  let map;
  let service;
  let infowindow;
  let zoom = 15;
  let center = { lat: 51.5127494, lng: 7.4829757 };

  onMount(async () => {
    const options = {
      zoom,
      center,
      mapTypeControl: false,
      styles: [
      ],
    };
    
    map = new google.maps.Map(container, options);
  });
</script>

<div class="w-full relative inline">
  <div id="map" class="map" bind:this={container}></div>
  <HospitalList />
</div>

<style lang="postcss">
  .map {
    position: relative;
    left: 0;
    width: 100%;
    height: 670px;
  }
</style>