<script>
  export let textAlign = "text-left";
  export let style = "";
  export let bgColor = "#00aaae";
  export let ariaLabel = "";
  export let disabled = false;
</script>

<style lang="postcss">
  .base-button {
    width: 100%;
    /* max-width: 314px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 18px;
    padding-right: 18px;
    height: 44px;
    border-radius: 12px;
    color: #fff;
    font-weight: bold;
    border: none;
    cursor: pointer;
    letter-spacing: 0.3px;

    &:disabled {
      background-color: #d8d8d8 !important;
      cursor: not-allowed;
      border: none !important;
      color: #fff !important;
    }

    @media (min-width: 640px) {
      height: 50px;
    }

    &.text-center {
      text-align: center;
      justify-content: center;
    }

    &:focus {
      outline: none;
    }
  }
</style>

<button
  class={`base-button ${textAlign}`}
  style={`background-color:${bgColor};${style}`}
  aria-label={ariaLabel}
  {disabled}
  on:click>
  <slot />

  <slot name="icon">
    <span class="text-bold text-lg">&rarr;</span>
  </slot>
</button>
