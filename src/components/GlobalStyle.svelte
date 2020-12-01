<style global lang="postcss">
  @import "../global.pcss";
  :focus {
    outline: none;
  }
  .lazy-image {
    img {
      opacity: 0;
      &.lazyloaded {
        transition: opacity 1s ease-out;
        opacity: 1;
        filter: none;
      }
    }
  }
</style>
