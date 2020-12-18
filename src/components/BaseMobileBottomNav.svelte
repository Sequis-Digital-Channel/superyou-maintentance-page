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
      <a href="/" class="flex flex-col items-center justify-center lazy-image">
        <img
          src={initImgSrc}
          data-src="/icons/bottom-nav/home.svg"
          alt="Home"
          width="22px"
          height="22px" />
        <span class="text-xs text-bluegray inline-block">Home</span>
      </a>
    </div>

    <div class="nav-item flex-grow p-2">
      <a href="/" class="flex flex-col items-center justify-center lazy-image">
        <img
          src={initImgSrc}
          data-src="/icons/bottom-nav/sovia-off.svg"
          alt="Home"
          width="22px"
          height="22px" />
        <span class="text-xs text-bluegray">Sovia</span>
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
          <img
            src="/icons/bottom-nav/basket_nav-off.svg"
            alt="Home"
            width="22px"
            height="22px" />
        {/if}
        <span class="text-xs text-bluegray">Keranjang</span>
        <span
          class="item-qty absolute text-white w-4 h-4 bg-red-600 rounded-full flex justify-center items-center font-bold">
          {$derivedTotalQuantity}
        </span>
      </button>
    </div>

    <div class="nav-item flex-grow p-2">
      <a href="/" class="flex flex-col items-center justify-center lazy-image">
        <img
          src={initImgSrc}
          data-src="/icons/bottom-nav/blog-off.svg"
          alt="Home"
          width="22px"
          height="22px" />
        <span class="text-xs text-bluegray">Blog</span>
      </a>
    </div>

    <div class="nav-item flex-grow p-2">
      <a href="/" class="flex flex-col items-center justify-center lazy-image">
        <img
          src={initImgSrc}
          data-src="/icons/bottom-nav/account-off.svg"
          alt="Home"
          width="22px"
          height="22px" />
        <span class="text-xs text-bluegray">Profil</span>
      </a>
    </div>
  </div>
</nav>
