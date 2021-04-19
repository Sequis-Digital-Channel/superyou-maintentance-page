<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import { bodyScroll } from "../stores/bodyscroll";
  
  import BgOverlay from "../components/BgOverlay.svelte";
  import IcLock from "./svg/IcLock.svelte";

  export let APP_URL;

  const { preloading } = stores();
  let navScrolled = false;
  let productListShow = false;
  let aside = false;

  let aboveTheFold = null;
  let aboveTheFoldObserver = null;

  let headerProductsNav;
  let asideNav;

  function observeAboveTheFold() {
    aboveTheFold = document.querySelector(".above-the-fold-wrapper");
    aboveTheFoldObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.rootBounds === null) {
            observeAboveTheFold();
            return
          }
          if (!entry.isIntersecting) {
            navScrolled = true;
          } else {
            navScrolled = false;
          }
        });
      },
      {
        rootMargin: "-100px 0px 0px 0px",
      }
    );

    aboveTheFoldObserver.observe(aboveTheFold);
  }

  function loadHeaderProductsNav() {
    import("./HeaderProductsNav.svelte")
    .then((module) => {
      headerProductsNav = module.default;
    })
    .catch((err) => {
      console.error((err && err.stack) || err);
    })
  }

  function handleClickListProductNav(e) {
    e.preventDefault();
    if (!headerProductsNav) {
      loadHeaderProductsNav();
    }
    productListShow = !productListShow;
  }

  function loadAsideNav() {
    import("../container/AsideNavigation.svelte")
    .then((module) => {
      asideNav = module.default;
    })
    .catch((err) => {
      console.error((err && err.stack) || err);
    })
  }

  function handleClickMenu(e) {
    e.preventDefault();
    if (!asideNav) {
      loadAsideNav();
    }
    aside = !aside;
  }

  $: if (aside) {
    bodyScroll.update(() => false);
  } else {
    bodyScroll.update(() => true);
  }

  onMount(() => {
    preloading.subscribe((onload) => {
      if (process.browser && history.state.id === 1) {
        observeAboveTheFold();
        return;
      }
      if (onload) {
        aboveTheFoldObserver.unobserve(aboveTheFold);
      } else {
        observeAboveTheFold();
      }
    });
  });
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

    &.nav-scrolled {
      --text: #0d294a;
      --background: #fff;
      box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
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
            &.products {
              @media (min-width: 1024px) {
                display: flex;
              }
              position: relative;
              justify-content: center;

              button[aria-label="products"] {
                display: flex;
                align-items: center;
                outline: none;
                & > span {
                  display: inline-block;
                  margin-right: 6px;
                }

                svg {
                  transition: transform 0.2s ease-in-out;
                  &.show {
                    transform: rotate(180deg);
                  }
                }
              }
            }

            @media (min-width: 1024px) {
              display: inline-grid;
            }

            &.auth-and-menu {
              display: flex;
              align-items: center;
            }

            & > a,
            button[aria-label="products"] {
              font-size: 14px;
              color: var(--text);
              font-weight: 600;
              line-height: 1;
              padding: 10px;
              white-space: nowrap;
            }
            button[aria-label="login"] {
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

<header class:nav-scrolled={navScrolled}>
  <div class="header-wrapper">
    <div id="su-logo" aria-label="superyou-logo">
      <a href="/">
        <img
          src={navScrolled ? `/icons/superyou-logo-color.svg` : `/icons/superyou-logo.svg`}
          alt="Super You Logo"
          width="170px"
          height="45px"
          loading="lazy"
          decoding="async">
      </a>
    </div>
    <nav id="su-nav">
      <ul>
        <li><a href={`${APP_URL}/tentang-kami`}>Tentang Super You</a></li>
        <li class="products">
          <button
            on:click={handleClickListProductNav}
            aria-expanded={productListShow}
            aria-label="products">
            <span>Produk</span>
            <svg
              class:show={productListShow}
              width="12px"
              height="7px"
              viewBox="0 0 12 7"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>Path 3 Copy</title>
              <desc>Created with Sketch.</desc>
              <defs />
              <g
                id="Mobile_Landing"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round">
                <g
                  id="101_Mobile-Landing"
                  transform="translate(-344.000000, -4810.000000)"
                  fill-rule="nonzero"
                  stroke={navScrolled ? '#0d294a' : '#FFF'}
                  stroke-width="2">
                  <g id="Footer" transform="translate(0.000000, 4766.000000)">
                    <polyline
                      id="Path-3-Copy"
                      points="345 45 349.86184 50 355 45" />
                  </g>
                </g>
              </g>
            </svg>
          </button>
          {#if headerProductsNav && productListShow}
            <svelte:component
              this={headerProductsNav}
              productListShow={productListShow}
              on:closeproductnav={() => (productListShow = false)}
            />
            <BgOverlay on:click={() => (productListShow = false)} />
          {/if}
        </li>
        <li><a href={`${APP_URL}/faq`}>FAQ</a></li>
        <li><a href={`${APP_URL}/blog`}>Blog</a></li>
        <li><a href={`${APP_URL}/hubungi-kami`}>Hubungi Kami</a></li>
        <li class="auth-and-menu">
          <button on:click={() => {
            window.location.href = `${APP_URL}/?#modal-login`;
          }} aria-label="login">
            <IcLock />
            <span>MASUK</span>
          </button>
          <div
            on:click={handleClickMenu}
            class="menu-wrapper"
            tabindex="0"
            role="button"
            aria-label="aside">
            <div class="menu" />
          </div>
        </li>
      </ul>
    </nav>
  </div>
  {#if asideNav && aside}
    <svelte:component
      this={asideNav}
      {aside}
      on:closeasidenav={() => {
        console.log('closed');
        aside = false;
      }}
      {APP_URL}
    />
    <!-- <AsideNavigation bind:aside {APP_URL} /> -->
  {/if}
</header>
