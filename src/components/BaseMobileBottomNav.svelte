<script>
  import { cartShow, derivedTotalQuantity } from "../stores/cart/store";

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
      <a href="/" class="flex flex-col items-center justify-center">
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
        <span class="text-xs text-bluegray">Blog</span>
      </a>
    </div>

    <div class="nav-item flex-grow p-2">
      <a href="/" class="flex flex-col items-center justify-center">
        <svg id="Layer_1" width="22" height="22" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><defs><style>.cls-1{fill:#708697;}</style></defs><title>account-off</title><path class="cls-1" d="M7.9,7.71a3.72,3.72,0,0,0,2.72-1.13,3.74,3.74,0,0,0,1.13-2.73,3.72,3.72,0,0,0-1.13-2.72A3.72,3.72,0,0,0,7.9,0,3.74,3.74,0,0,0,5.17,1.13,3.75,3.75,0,0,0,4.05,3.85,3.77,3.77,0,0,0,5.17,6.58,3.74,3.74,0,0,0,7.9,7.71ZM5.84,1.79A2.79,2.79,0,0,1,7.9.94,2.79,2.79,0,0,1,10,1.79a2.78,2.78,0,0,1,.86,2.06A2.79,2.79,0,0,1,10,5.92a2.79,2.79,0,0,1-2.06.85,2.79,2.79,0,0,1-2.06-.85A2.79,2.79,0,0,1,5,3.85,2.78,2.78,0,0,1,5.84,1.79Z"/><path class="cls-1" d="M14.64,12.3a8,8,0,0,0-.13-1,7.1,7.1,0,0,0-.25-1,4.7,4.7,0,0,0-.41-.95,3.56,3.56,0,0,0-.63-.82,2.81,2.81,0,0,0-.91-.57,3.09,3.09,0,0,0-1.15-.21,1.2,1.2,0,0,0-.63.26l-.65.43A4.37,4.37,0,0,1,9,8.79,3.4,3.4,0,0,1,7,8.79a4.37,4.37,0,0,1-.85-.37L5.47,8a1.2,1.2,0,0,0-.63-.26,3.09,3.09,0,0,0-1.15.21,2.81,2.81,0,0,0-.91.57,3.56,3.56,0,0,0-.63.82,4.7,4.7,0,0,0-.41.95,7.1,7.1,0,0,0-.25,1,8,8,0,0,0-.13,1c0,.31,0,.63,0,.95a2.67,2.67,0,0,0,.78,2,2.87,2.87,0,0,0,2,.74h7.7a2.87,2.87,0,0,0,2-.74,2.67,2.67,0,0,0,.78-2C14.67,12.93,14.66,12.61,14.64,12.3Zm-1.4,2.28a1.94,1.94,0,0,1-1.39.48H4.15a1.94,1.94,0,0,1-1.39-.48,1.76,1.76,0,0,1-.5-1.33c0-.3,0-.6,0-.88a8.15,8.15,0,0,1,.12-.91,7,7,0,0,1,.22-.9A4,4,0,0,1,3,9.79a2.64,2.64,0,0,1,.46-.61A1.9,1.9,0,0,1,4,8.81a2,2,0,0,1,.74-.14A1.14,1.14,0,0,1,5,8.78l.66.43a5.06,5.06,0,0,0,1.06.47,4.25,4.25,0,0,0,2.64,0,5.06,5.06,0,0,0,1.06-.47L11,8.78a1.14,1.14,0,0,1,.19-.11,2,2,0,0,1,.74.14,1.9,1.9,0,0,1,.6.37,2.64,2.64,0,0,1,.46.61,4,4,0,0,1,.34.77,7.41,7.41,0,0,1,.22.9,8.15,8.15,0,0,1,.12.91h0c0,.28,0,.58,0,.88A1.76,1.76,0,0,1,13.24,14.58Z"/></svg>
        <span class="text-xs text-bluegray">Profil</span>
      </a>
    </div>
  </div>
</nav>
