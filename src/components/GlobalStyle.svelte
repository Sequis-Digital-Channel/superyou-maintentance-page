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

  .loading {
    border-radius: 12px;
    background-color: rgb(239, 239, 239);
    background-image: linear-gradient(89deg, rgb(239, 239, 239), rgb(224, 224, 224));
    background-size: 99% 100%;
    background-repeat: no-repeat;
    animation: 1.3s linear 1ms infinite normal backwards running animation-loading;
  }
  @keyframes animation-loading {
  0%{
    background-position: -300px;
  }
  100%{
    background-position: 300px;
  }
}
</style>
