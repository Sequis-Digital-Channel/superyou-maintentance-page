<style global lang="postcss">
  @import "../global.pcss";
  :root {
    --primary-color: #00aaae;
    --primary-text-color: #0d294a;
    --secondary-text-color: #708697;
  }
  :focus {
    outline: none;
  }

  .no-scroll {
    overflow: hidden;
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
