<script>
  import SuperyouColorLogo from "./svg/SuperyouColorLogo.svelte";
  import IcLock from "./svg/IcLock.svelte";
</script>

<style lang="postcss">
  header {
    height: 64px;
    background: transparent;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    @media (min-width: 768px) {
      padding: 0 24px;
    }

    .header-wrapper {
      display: flex;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      align-items: center;

      #su-nav {
        width: 60%;
        max-width: 900px;
        margin-left: auto;
        ul {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          li {
            display: none;

            &:not(:first-child) {
              margin-left: 36px;
            }

            @media (min-width: 1024px) {
              display: inline-grid;
            }

            &.auth-and-menu {
              display: flex;
              align-items: center;
            }

            a {
              font-size: 14px;
              color: #fff;
              font-weight: 600;
              line-height: 1;
              padding: 10px;
              white-space: nowrap;
            }
            button {
              display: none;
              background-color: #0d294a;
              padding: 8px 14px;
              border-radius: 20px;
              font-size: 13px;
              color: #fff;

              & > span {
                display: inline-block;
                margin-left: 6px;
              }

              @media (min-width: 1024px) {
                display: flex;
              }
            }

            & > .menu-wrapper {
              position: relative;
              display: block;
              cursor: pointer;
              width: 26px;
              height: 26px;
              margin-left: 20px;

              &:hover {
                .menu {
                  animation-name: burger-menu;
                  animation-duration: 500ms;

                  &::before {
                    animation-name: burger-menu-before;
                    animation-duration: 500ms;
                    animation-delay: 100ms;
                  }

                  &::after {
                    animation-name: burger-menu-after;
                    animation-duration: 500ms;
                    animation-delay: 200ms;
                  }
                }
              }

              .menu {
                top: 2px;
                transition: all 0.2s;
                transition-timing-function: ease-out;
              }

              .menu,
              .menu::before,
              .menu::after {
                position: absolute;
                width: 26px;
                height: 2px;
                right: 0;
                background-color: #091b30;
              }
              .menu::before {
                content: "";
                top: 10px;
              }
              .menu::after {
                content: "";
                top: 20px;
                width: 21px;
              }
            }
          }
        }
      }
      /* end-su-nav */
    }
  }

  @keyframes burger-menu {
    0% {
      width: 2px;
      right: 0px;
    }
    100% {
      width: 26px;
      right: 0px;
    }
  }

  @keyframes burger-menu-before {
    0% {
      width: 2px;
      right: 0px;
    }
    100% {
      width: 26px;
      right: 0px;
    }
  }

  @keyframes burger-menu-after {
    0% {
      width: 2px;
      right: 0px;
    }
    100% {
      width: 26px - 5px;
      right: 0px;
    }
  }
</style>

<header>
  <div class="header-wrapper">
    <div id="su-logo" aria-label="superyou-logo">
      <SuperyouColorLogo />
    </div>
    <nav id="su-nav">
      <ul>
        <li><a href="/">Tentang Super You</a></li>
        <li><a href="/">Produk</a></li>
        <li><a href="/">FAQ</a></li>
        <li><a href="/">Blog</a></li>
        <li><a href="/">Hubungi Kami</a></li>
        <li class="auth-and-menu">
          <button aria-label="login">
            <IcLock />
            <span>MASUK</span>
          </button>
          <div
            class="menu-wrapper"
            tabindex="0"
            role="button"
            aria-label="mega-menu">
            <div class="menu" />
          </div>
        </li>
      </ul>
    </nav>
  </div>
</header>
