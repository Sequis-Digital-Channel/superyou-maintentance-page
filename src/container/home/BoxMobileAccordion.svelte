<script>
  import { onMount } from "svelte";

  export let icon;
  export let title;
  export let content;

  let isContentOpen = false;

  function toggleAccordion() {
    if (window.outerWidth >= 768) {
      isContentOpen = true;
    }
    isContentOpen = !isContentOpen;
  }
  
  onMount(() => {

  })
</script>


<div class="int-box bg-white rounded-2xl mb-5">
  <div class="int-top px-4 py-3 flex items-center md:flex-col" on:click={toggleAccordion}>
    <img src={icon} alt="Superyou" width="32px" height="32px">
    <h3 class="text-darkblue font-bold ml-2 text-base xl:text-lg md:mt-4">{title}</h3>
    <!-- class:open={accordionState[i].isOpen} -->
    <svg
      class="ml-auto md:hidden transform-gpu"
      class:open={isContentOpen}
      style="margin-right: 2px;"
      width="12px"
      height="7px"
      viewBox="0 0 12 7"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Path 3 Copy</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g
        id="Mobile_Landing"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round">
        <g
          id="101_Mobile-Landing"
          transform="translate(-344.000000, -4810.000000)"
          fill-rule="nonzero"
          stroke="#091b30"
          stroke-width="2">
          <g id="Footer" transform="translate(0.000000, 4766.000000)">
            <polyline
              id="Path-3-Copy"
              points="345 45 349.86184 50 355 45" />
          </g>
        </g>
      </g>
    </svg>
  </div>
  
  <div class="int-btm" class:open={isContentOpen}>
    <div class="int-btm-wrapper px-4 pb-5 pt-1 md:pt-0">
      <p class="text-bluegray md:text-center">{@html content}</p>
    </div>
  </div>
  
  
</div>

<style lang="postcss">
  .int-box {
    box-shadow: 0 5px 20px 5px rgba(187, 204, 236, 0.3);
    @media (min-width: 768px) {
      max-width: 300px;

      .int-top {
        img {
          width: 60px;
          height: 60px;
        }
      }
    }

    .int-top {
      svg {
        transition: 0.45s cubic-bezier(0.25, 0.8, 0.5, 1);
        &.open {
          transform: rotate(180deg);
        }
      }
    }

    .int-btm {
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
        @media(max-width: 767px) {
          max-height: 0;
          &.open {
            max-height: 200px;
          }
        }
      }
  }
</style>