<script>
  import { cartShow, derivedTotalQuantity } from "../stores/cart/store";
  import { authStore } from "../stores/auth/store";
  import { actionShowAndCloseModalLogin } from "../stores/auth/actions";

  const initImgSrc =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
  const handleCartToggleShow = () => {
    cartShow.update((cartShow) => !cartShow);
  };
</script>

<style lang="postcss">
  nav {
    padding-bottom: env(safe-area-inset-bottom);
    height: 3.5rem;
    z-index: 14;
    border-top: 1px solid rgb(226, 232, 240);
    .nav-item {
      span {
        display: inline-block;
        margin-top: 1px;
      }

      .item-qty {
        right: 8px;
        top: -6px;
        font-size: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0;
        padding-left: 1px;
        flex-direction: column;
        line-height: 0;
      }
    }
  }
</style>

<nav class="fixed bottom-0 left-0 w-full bg-white sm:hidden">
  <div class="flex justify-between items-center">
    <div class="nav-item flex-grow p-2">
      <a href="/"  class="flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 17 16">
          <defs>
              <filter id="u4d4sfg8ra" width="104.3%" height="122.2%" x="-2.1%" y="-11.1%" filterUnits="objectBoundingBox">
                  <feOffset in="SourceAlpha" result="shadowOffsetOuter1"/>
                  <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"/>
                  <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.131064248 0"/>
                  <feMerge>
                      <feMergeNode in="shadowMatrixOuter1"/>
                      <feMergeNode in="SourceGraphic"/>
                  </feMerge>
              </filter>
          </defs>
          <g fill="none" stroke="#708697" stroke-width=".8" filter="url(#u4d4sfg8ra)" transform="translate(-29 -12)">
              <g>
                  <path d="M15.731 6.664L8.553.212c-.315-.283-.79-.283-1.106 0L.27 6.664c-.253.227-.336.577-.213.89.124.315.424.518.765.518h1.147v6.464c0 .256.21.464.47.464h3.935c.26 0 .47-.208.47-.464V10.61h2.313v3.925c0 .256.211.464.47.464h3.935c.26 0 .471-.208.471-.464V8.072h1.147c.341 0 .642-.203.765-.517s.04-.664-.213-.89zM14.482 1H11l4 3V1.428C15 1.19 14.768 1 14.482 1z" transform="translate(29.5 12)"/>
              </g>
          </g>
        </svg>
        <span class="text-xs text-bluegray inline-block">Home</span>
      </a>
    </div>

    <div class="nav-item flex-grow p-2">
      <button
        on:click={handleCartToggleShow}
        aria-label="toggle for showing cart"
        class="flex flex-col items-center justify-center mx-auto focus:outline-none relative">
        {#if $cartShow}
          <img
            src="/icons/bottom-nav/basket_nav-on.svg"
            alt="Home"
            width="22px"
            height="22px" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
            <g fill="#708697">
              <path d="M5.155 10.825h8.501c.21 0 .393-.146.451-.357l1.875-6.877c.04-.148.012-.308-.076-.43-.09-.124-.228-.196-.375-.196H4.074l-.335-1.58C3.69 1.16 3.5 1 3.28 1H.47C.209 1 0 1.22 0 1.491c0 .272.21.491.469.491h2.436l1.693 7.982c-.499.227-.848.747-.848 1.352 0 .812.63 1.473 1.406 1.473h8.5c.26 0 .469-.22.469-.49 0-.272-.21-.492-.469-.492h-8.5c-.258 0-.468-.22-.468-.491 0-.27.21-.49.467-.491zm9.755-6.878l-1.607 5.895h-7.77l-1.25-5.895H14.91zM5.053 14.053c0 .696.566 1.263 1.263 1.263.696 0 1.263-.567 1.263-1.263 0-.697-.567-1.264-1.263-1.264-.697 0-1.263.567-1.263 1.264zm1.263-.421c.232 0 .42.189.42.42 0 .233-.188.422-.42.422-.232 0-.421-.19-.421-.421 0-.232.189-.421.42-.421zM11.79 14.053c0 .696.566 1.263 1.263 1.263.696 0 1.263-.567 1.263-1.263 0-.697-.567-1.264-1.263-1.264-.697 0-1.264.567-1.264 1.264zm1.263-.421c.232 0 .42.189.42.42 0 .233-.188.422-.42.422-.232 0-.421-.19-.421-.421 0-.232.189-.421.42-.421z"/>
            </g>
          </svg>
        {/if}
        <span class="text-xs text-bluegray">Keranjang</span>
        <span
          class="item-qty absolute text-white w-4 h-4 bg-red-600 rounded-full flex justify-center items-center font-bold">
          {$derivedTotalQuantity}
        </span>
      </button>
    </div>

    <div class="nav-item flex-grow p-2">
      <a href="/" class="flex flex-col items-center justify-center">
        <img src="https://superyou.co.id/img/icons/navigation/blog-off.svg" class="ml-1" width="24px" height="24px" alt="go to Super You Blog">
        <span class="text-xs text-bluegray">Blog</span>
      </a>
    </div>

    <div class="nav-item flex-grow p-2">
      {#if authStore}
      <a href="/dashboard/profil" class="flex flex-col items-center justify-center">
        <img src="https://superyou.co.id/img/icons/navigation/account-off.svg" alt="user login" width="22px" height="22px">
        <span class="text-xs text-bluegray">Profil</span>
      </a>
      {:else}
      <div on:click={() => actionShowAndCloseModalLogin(true)} class="flex flex-col items-center justify-center">
        <img src="https://superyou.co.id/img/icons/navigation/account-off.svg" alt="user login" width="22px" height="22px">
        <span class="text-xs text-bluegray">Profil</span>
      </div>
      {/if}
    </div>
  </div>
</nav>
