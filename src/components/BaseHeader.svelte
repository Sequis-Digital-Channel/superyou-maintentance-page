<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import { authStore, showModalLogin } from "../stores/auth/store";
  import { actionShowAndCloseModalLogin, actionLogout } from "../stores/auth/actions";
  import { bodyScroll } from "../stores/bodyscroll";
  import { portal } from "../utils/_portal";

  import BgOverlay from "../components/BgOverlay.svelte";
  import IcLock from "./svg/IcLock.svelte";

  const { preloading, session } = stores();

  // get env url
  let APP_URL, SUPER_API_URL;

  let navScrolled = false;
  let productListShow = false;
  let aside = false;
  let isShowingAuth = false;

  let aboveTheFold = null;
  let aboveTheFoldObserver = null;

  let headerProductsNav;
  let asideNav;
  let authModal;

  session.subscribe((value) => {
    APP_URL = value.APP_URL;
    SUPER_API_URL = value.SUPER_API_URL;
  })

  showModalLogin.subscribe(value => {
    isShowingAuth = value;
    if(value && !authModal) {
      loadAuthModal();
    }
  })

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

  function loadAuthModal() {
    import("../container/common/AuthModal.svelte")
    .then((module) => {
      authModal = module.default;
    })
    .catch((err) => {
      console.error((err && err.stack) || err);
    })
  }

  $: if (aside || isShowingAuth) {
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
        /* width: 70%; */
        max-width: 900px;
        margin-left: auto;
        ul {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          li {
            display: none;

            &:not(:first-child) {
              @media (min-width: 768px) {
                margin-left: 20px;
              }
              @media (min-width: 1280px) {
                margin-left: 36px;
              }
            }

            &:last-child {
              margin-left: 12px;
              @media (min-width: 768px) {
                margin-left: 6px;
              }
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
              
              .profile {
                .p_ddown-wrapper {
                  opacity: 0;
                  visibility: hidden;
                  transition: all 0.3s ease;
                  min-width: 130px;
                  top: 19px;
                  right: 30px;

                  &:hover {
                    opacity: 1;
                    visibility: visible;
                    top: 22px;
                  }
                }

                .pic:hover ~ .p_ddown-wrapper, .p-name:hover + .p_ddown-wrapper {
                  opacity: 1;
                  visibility: visible;
                  top: 22px;
                }
              }
              
            }

            &.su-menu {
              display: flex;
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
      <a rel="external" href="/">
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
          {#if $authStore}
          <div class="header-auth flex">
            <div class="profile flex items-center relative">
              <div class="pic flex-none rounded-full overflow-hidden hidden md:block">
                <img
                  src="https://secure.gravatar.com/avatar/5e540715c5edf010a5d1c64bef76fb35?s=80&r=g&d=identicon"
                  alt="userpicture"
                  width="25px"
                  height="25px">
              </div>
              <span class="p-name flex-auto whitespace-no-wrap font-bold text-darkblue text-sm pl-3 hidden md:inline-block">
                Hi, { $authStore.user_profile.first_name }!
              </span>
              <div class="p_ddown-wrapper absolute pt-3 hidden md:block">
                <div class="p_ddown rounded-xl bg-white shadow-md">
                  <a href={`${APP_URL}/dashboard/profil`} class="p-3 pb-2 flex items-center">
                    <div class="mr-3">
                      <img src="https://superyou.co.id/img/icons/user-inactive.svg" alt="goto profile" width="20px" height="20px">
                    </div>
                    <span class="text-bluegray text-base">Cek Akun</span>
                  </a>
                  <div on:click={actionLogout} class="p-3 pt-2 flex items-center cursor-pointer">
                    <div class="mr-3">
                      <img src="https://superyou.co.id/img/icons/logout-inactive.svg" alt="Logout" width="20px" height="20px">
                    </div>
                    <span class="text-bluegray text-base">Logout</span>
                  </div>
                </div>
              </div>
              <span
                class="flex-none ml-3"
                style="margin-top: -2px;">
                <a rel="external" href={`${APP_URL}/dashboard/profil`}>
                  <img src="https://superyou.co.id/img/icons/ico-no-message.svg" alt="user notification" width="30px" height="30px;">
                </a>
              </span>
            </div>
          </div>
          {:else}
          <button on:click={() => actionShowAndCloseModalLogin(true)} aria-label="login">
            <IcLock />
            <span>MASUK</span>
          </button>
          {/if}
        </li>
        <li class="su-menu">
          <div
            on:click={handleClickMenu}
            class="menu-wrapper md:ml-6"
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
      on:closeasidenav={() => {
        console.log('closed');
        aside = false;
      }}
      {APP_URL}
    />
    <!-- <AsideNavigation bind:aside {APP_URL} /> -->
  {/if}
</header>

{#if authModal && isShowingAuth}
  <div use:portal={"#portal"} id="portal">
    <BgOverlay on:click={() => actionShowAndCloseModalLogin(false)} />
    <svelte:component
      this={authModal}
      {APP_URL}
    />
  </div>
{/if}
