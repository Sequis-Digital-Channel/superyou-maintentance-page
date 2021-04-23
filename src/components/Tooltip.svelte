<script>
  import IcTooltip from "./svg/IcTooltip.svelte";
  export let className = "";
  export let type = "body";
</script>

<style lang="postcss">
  .t-wrapper {
    position: relative;
    display: inline-block;
    margin-left: 6px;
    cursor: pointer;
    &.body {
      margin-bottom: -3px;
    }
    &.title {
      margin-bottom: -1px;
    }
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

      @media (min-width: 640px) {
        margin-left: 2px;
      }
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
      z-index: 4;
      top: 10px;
      right: -72px;
      margin-left: -60px;
      transition: opacity 0.3s ease 0s;

      @media (max-width: 639px) {
        top: 23px;
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

<div class={`t-wrapper ${type} ${className}`}>
  <IcTooltip />
  <span class="arrow-up" />
  <span class={`tooltip-holder ${className}`}>
    <slot />
  </span>
</div>
