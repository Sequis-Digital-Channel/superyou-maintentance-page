<script>
</script>

<style lang="postcss">
  header {
    --text: #fff;
    --text-inverse: #0d294a;
    --background: transparent;

    height: 64px;
    background: var(--background);
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: background 250ms ease-in;
    z-index: 8;

    @media (min-width: 768px) {
      padding: 0 24px;
    }

    .header-wrapper {
      display: flex;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      align-items: center;
    }
  }
</style>

<header>
  <div class="header-wrapper">
    <div id="su-logo" aria-label="superyou-logo">
      <a rel="external" href="/">
        <img
          src={`/img/superyou-logo-color.svg`}
          alt="Super You Logo"
          width="170px"
          height="45px"
          loading="lazy"
          decoding="async">
      </a>
    </div>
  </div>
</header>