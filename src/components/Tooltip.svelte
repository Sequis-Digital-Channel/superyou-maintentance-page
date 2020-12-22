<script>
  import { onMount } from "svelte";
  import IcTooltip from "../components/svg/IcTooltip.svelte";
  export let className = "";

  onMount(() => {
    if (process.browser && window.outerWidth <= 639) {
      setTimeout(() => {
        console.log("window loaded");
        let el = document.querySelector(`.t-wrapper.${className}`);
        let elXposition = el.getBoundingClientRect();

        let divide = window.outerWidth / elXposition.x;
        let tooltipBody = document.querySelector(
          `.tooltip-holder.${className}`
        );
        if (divide >= 1.6 && divide <= 2.4) {
          tooltipBody.classList.add("center");
        } else if (divide >= 3) {
          tooltipBody.classList.add("left");
        }
      }, 800);
    }
  });
</script>

<style lang="postcss">
  .t-wrapper {
    position: relative;
    display: inline-block;
    margin-left: 6px;
    cursor: pointer;
    .arrow-up {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      left: 15%;
      margin-left: 0;
      border-style: solid;
      bottom: -10px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #03a3a6;
      border-top: 6px solid transparent;
      transition: opacity 0.3s ease 0s;
    }
    .tooltip-holder {
      visibility: hidden;
      opacity: 0;
      width: 300px;
      background-color: #03a3a6;
      text-align: left;
      padding: 10px;
      border-radius: 6px;
      font-size: 12px;
      position: absolute;
      z-index: 1;
      top: 160%;
      right: -100%;
      margin-left: -60px;
      transition: opacity 0.3s ease 0s;

      @media (max-width: 639px) {
        margin-left: 0;
        width: 280px;

        &.left {
          transform: translateX(50%);
        }
        &.center {
          transform: translateX(50%);
          right: 50%;
        }
      }
    }

    &:hover {
      .tooltip-holder,
      .arrow-up {
        visibility: visible;
        opacity: 1;
      }
    }
  }
</style>

<div class={`t-wrapper ${className}`}>
  <IcTooltip />
  <span class="arrow-up" />
  <span class={`tooltip-holder ${className}`}>
    <slot />
  </span>
</div>
