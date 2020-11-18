<script>
  export let textAlign = "text-left";
  export let style = "";
</script>

<style lang="postcss">
  .base-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border-radius: 12px;
    background-color: #00aaae;
    color: #fff;
    font-weight: bold;
    border: none;
    cursor: pointer;
    letter-spacing: 0.3px;

    &.text-center {
      text-align: center;
      justify-content: center;
    }

    &:focus {
      outline: none;
    }
  }
</style>

<button class={`base-button ${textAlign}`} style={`${style}`} on:click>
  <slot />
</button>
