<script>
  import { onMount } from "svelte";
  import IcTooltip from "../components/svg/IcTooltip.svelte";

  export let maxWidth = "300px";
  export let indentifier;

  let popperInstance = null;
  let button;
  let tooltip;

  let isTooltipShowing = false;
  let toggleTooltip;

  onMount(() => {
    button = document.querySelector(`.${indentifier}-btn`);
    tooltip = document.querySelector(`.${indentifier}`);

    function popperCreate() {
      popperInstance = Popper.createPopper(button, tooltip, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
    }

    function destroy() {
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    }

    toggleTooltip = function tooltipToggle() {
      if (isTooltipShowing) {
        tooltip.setAttribute("data-show", "false");
        destroy();
        isTooltipShowing = false;
      } else {
        tooltip.setAttribute("data-show", "true");
        popperCreate();
        isTooltipShowing = true;
      }
    };

    if ("IntersectionObserver" in window) {
      const tooltipObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.target);
            const tooltipBtn = entry.target;
            tooltipBtn.addEventListener("click", toggleTooltip);
            tooltipObserver.unobserve(button);
          }
        });
      });
      tooltipObserver.observe(button);
    }

    //directive
    // on:click={toggleTooltip}
    // use:focusout
    // on:focus_out={toggleTooltip}
  });
</script>

<style lang="postcss">
  .tooltip_wrapper {
    display: inline-block;
    margin-left: 6px;
    vertical-align: text-top;
  }
  #tooltip {
    background-color: #03a3a6;
    color: white;
    padding: 12px;
    font-size: 12px;
    font-weight: normal;
    border-radius: 8px;
    text-align: left;
    letter-spacing: 0.5px;
    &[data-show="false"] {
      display: none;
    }
    &[data-show="true"] {
      display: block;
    }
  }
  #tooltip-btn {
    &:focus {
      outline: none;
    }
  }

  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }

  #arrow::before {
    content: "";
    transform: rotate(45deg);
    background: #03a3a6;
  }

  :global(#tooltip[data-popper-placement^="top"] > #arrow) {
    bottom: -4px;
  }

  :global(#tooltip[data-popper-placement^="bottom"] > #arrow) {
    top: -4px;
  }

  :global(#tooltip[data-popper-placement^="left"] > #arrow) {
    right: -4px;
  }

  :global(#tooltip[data-popper-placement^="right"] > #arrow) {
    left: -4px;
  }
</style>

<div class="tooltip_wrapper">
  <button
    id="tooltip-btn"
    class={`${indentifier}-btn`}
    aria-describedby="tooltip">
    <IcTooltip />
  </button>
  <div
    id="tooltip"
    class={`${indentifier}`}
    role="tooltip"
    data-show="false"
    style={`max-width:${maxWidth}`}>
    {#if isTooltipShowing}
      <slot />
    {/if}
    <div id="arrow" data-popper-arrow />
  </div>
</div>
