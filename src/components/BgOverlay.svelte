<style lang="postcss">
  .bg-overlay {
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0.7;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    will-change: opacity;
    transform: translate3d(0px, 0px, 0px);
    transition: opacity 600ms ease 0ms;
  }
</style>

<div class="bg-overlay" on:click />
