<script>
  export let textAlign = "text-left";
  export let style = "";
  export let bgColor = "#00aaae";
  export let ariaLabel = "";
</script>

<style lang="postcss">
  .base-button {
    width: 100%;
    max-width: 314px;
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
  on:click>
  <slot />

  <slot name="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="12"
      height="12"
      viewBox="0 0 12 12">
      <defs>
        <path
          id="a"
          d="M3.69 6.997l3.563 3.296a.948.948 0 0 1 0 1.414c-.422.39-1.107.39-1.53 0l-5.406-5a.948.948 0 0 1 0-1.414l5.407-5a1.145 1.145 0 0 1 1.53 0 .948.948 0 0 1 0 1.414l-3.559 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23z" />
      </defs>
      <use
        fill={`${bgColor === 'transparent' ? '#0d294a' : '#FFF'}`}
        fill-rule="nonzero"
        transform="rotate(-180 6 6)"
        xlink:href="#a" />
    </svg>
  </slot>
</button>
