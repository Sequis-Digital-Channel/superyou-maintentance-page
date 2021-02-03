<script context="module">
  import productNavItems from "../data/json/product-nav-items.json";
</script>

<script>
  import { onMount } from "svelte";
  import AsideNavigation from "../container/AsideNavigation.svelte";
  import BgOverlay from "../components/BgOverlay.svelte";
  import SuperyouColorLogo from "./svg/SuperyouColorLogo.svelte";
  import IcLock from "./svg/IcLock.svelte";

  export let segment;
  export let APP_URL;
  let currentSegment = segment;
  let navScrolled = false;
  let productListShow = false;
  let aside = false;

  let isProductIconFetch = false;
  let initImgSrc =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
  const fetchAllProductIcon = () => {
    isProductIconFetch = true;
  };

  $: if (segment !== currentSegment) {
    navScrolled = false;
  }

  onMount(() => {
    const aboveTheFold = document.getElementById("above-the-fold");
    const aboveTheFoldObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
    z-index: 2;

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
                  transition: transform 0.3s ease-in-out;
                  &.show {
                    transform: rotate(180deg);
                  }
                }
              }
              .products__ddown {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                transition: transform 0.25s, opacity 0.25s,
                  visibility 0.6s ease-in-out;
                transform: translateY(5%);
                border-radius: 12px;
                top: 150%;
                width: 690px;
                height: 380px;
                box-shadow: 0 3px 20px 0 rgba(187, 204, 236, 0.45);
                grid-template-columns: 1fr 1fr;
                display: grid;
                &.show {
                  opacity: 1;
                  visibility: visible;
                  transform: translateY(0%);
                  z-index: 10;
                }

                .left,
                .right {
                  & > a {
                    display: block;

                    &:hover {
                      background-color: #03a3a6;
                      .meta {
                        .meta-name,
                        .meta-desc {
                          color: #fff;
                        }
                      }
                    }
                  }
                  & > h4 {
                    padding: 16px 0 16px 24px;
                  }

                  .product-item-nav {
                    display: flex;
                    padding: 10px 10px 10px 12px;

                    .icon {
                      width: 50px;
                      margin-right: 10px;
                    }
                    .meta {
                      .meta-name {
                        font-size: 14px;
                        font-weight: 600;
                        color: var(--primary-text-color);
                        margin-bottom: 4px;
                      }
                      .meta-desc {
                        font-size: 12px;
                        color: var(--secondary-text-color);
                      }
                    }
                  }
                }

                .left {
                  border-right: 1px solid #c4cbd9;

                  & > a {
                    &:last-child {
                      border-bottom-left-radius: 12px;
                    }
                  }
                }

                .right {
                  & > a {
                    &:last-child {
                      border-bottom-right-radius: 12px;
                    }
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

<header class:nav-scrolled={navScrolled} on:mouseenter={fetchAllProductIcon}>
  <div class="header-wrapper">
    <div id="su-logo" aria-label="superyou-logo">
      <a href="/">
        <SuperyouColorLogo color={navScrolled ? '#03a3a6' : '#FFF'} />
      </a>
    </div>
    <nav id="su-nav">
      <ul>
        <li><a href={`${APP_URL}/tentang-kami`}>Tentang Super You</a></li>
        <li class="products">
          <button
            on:click={() => {
              productListShow = !productListShow;
            }}
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
          <div class="products__ddown bg-white" class:show={productListShow}>
            <div class="left">
              <h4 class="text-darkblue font-bold">
                Asuransi Jiwa & Kecelakaan Diri
              </h4>
              {#each productNavItems.life as navItem, i (navItem.icon)}
                <a href={`${APP_URL}${navItem.url}`} target="_blank">
                  <div class="product-item-nav">
                    {#if i !== 2}
                      <div class="icon">
                        <img
                          src={isProductIconFetch ? navItem.icon : initImgSrc}
                          alt={navItem.name}
                          width="50"
                          height="50" />
                      </div>
                    {:else}
                      <div
                        class="icon"
                        style="display:flex;align-items: flex-start;justify-content:center;padding-top: 12px;">
                        <img
                          src={isProductIconFetch ? navItem.icon : initImgSrc}
                          alt={navItem.name}
                          width="32"
                          height="32" />
                      </div>
                    {/if}
                    <div class="meta">
                      <p class="meta-name">{navItem.name}</p>
                      <p class="meta-desc">
                        {navItem.desc}
                        <br />
                        {navItem.info}
                      </p>
                    </div>
                  </div>
                </a>
              {/each}
            </div>
            <div class="right">
              <h4 class="text-darkblue font-bold">
                Asuransi Kesehatan & Penyakit Kritis
              </h4>
              {#each productNavItems.health as navItem (navItem.icon)}
                <a href={`${navItem.self ? "" : APP_URL}${navItem.url}`}>
                  <div class="product-item-nav">
                    <div class="icon">
                      <img
                        src={isProductIconFetch ? navItem.icon : initImgSrc}
                        alt={navItem.name}
                        width="50"
                        height="50" />
                    </div>
                    <div class="meta">
                      <p class="meta-name">{navItem.name}</p>
                      <p class="meta-desc">
                        {navItem.desc}
                        <br />
                        {navItem.info}
                      </p>
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          </div>
          {#if productListShow}
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
            on:click={() => (aside = !aside)}
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
  {#if aside}
    <AsideNavigation bind:aside {APP_URL} />
  {/if}
</header>
