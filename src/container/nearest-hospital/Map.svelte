<script>
  import { onMount } from "svelte";

  import HospitalItems from "../../data/json/nearest-hospital/hospital-list.json";
  import HospitalSearch from "./HospitalSearch.svelte";

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

<div class="w-full relative">
  <div id="map" class="map" bind:this={container}></div>
  <HospitalSearch data={HospitalItems.hospitals} />
</div>

<style lang="postcss">
  .map {
    position: relative;
    left: 0;
    width: 100%;
    height: 670px;
    @media only screen and (max-width: 600px) {
      height: 315px;
    }
  }
</style>