<style lang="postcss">
  .bg-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0.6;
    position: fixed;
    inset: 0px 0px 0px;
    z-index: 9;
    will-change: opacity;
    transform: translate3d(0px, 0px, 0px);
    transition: opacity 600ms ease 0ms;
  }
</style>

<div class="bg-overlay" on:click />
