<script>
  import BgOverlay from "../../components/BgOverlay.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import { bodyScroll } from "../../stores/bodyscroll";
  import {
    cartStore,
    cartShow,
    paymentTermYearly,
    derivedTotalPrice,
    derivedCartProducts,
  } from "../../stores/cart/store";
  import CartItems from "./CartItems.svelte";
  import BaseSwitch from "../../components/BaseSwitch.svelte";
  import { moneyFormat, toBillion } from "../../utils/_moneyandtobillion";

  const handleCartToggleShow = () => {
    cartShow.update((cartShow) => !cartShow);
  };
  const handleCartClose = () => {
    cartShow.update(() => false);
  };

  $: if ($cartShow) {
    bodyScroll.update(() => false);
  } else {
    bodyScroll.update(() => true);
  }
</script>

<style lang="postcss">
  #cart {
    position: fixed;
    z-index: 10;
    height: 100%;
    width: 100%;

    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-100%);
    &.show {
      transform: translateX(0%);
    }

    @media (min-width: 640px) {
      width: 390px;
    }

    .cart-bg {
      background-image: linear-gradient(to bottom, #06d0d2, #03a3a6);
      scrollbar-width: thin;
      ::-webkit-scrollbar {
        width: 2px;
      }
    }

    .basket-container {
      width: 60px;
      right: -60px;
      top: calc(50% - 60px);

      .cart-item-qty {
        top: 4px;
        right: 3px;
      }
    }
  }
</style>

{#if $cartShow}
  <BgOverlay on:click={handleCartToggleShow} />
{/if}

<div id="cart" class:show={$cartShow}>
  {#if $cartStore.totalProducts}
    <div class="cart-bg h-full relative overflow-y-auto">
      <div class="px-3 md:px-4">
        <div class="cart-header w-full py-4 relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center"
            on:click={handleCartClose}>
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="display: block; fill: none; height: 16px; width: 16px; stroke: #fff; stroke-width: 4; overflow: visible;"><g
                fill="none">
                <path
                  d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932" />
              </g>
            </svg>
          </div>
          <span
            class="block text-white text-center font-semibold">Keranjang</span>
        </div>

        <div class="cart-body mt-2">
          <span class="block text-white font-bold"> Informasi Produk </span>
          <hr class="my-3" />
          <CartItems />
        </div>
      </div>
      <div
        class="payment-term my-4 px-3 md:px-4 flex justify-between items-center">
        <p class="text-white text-sm">Bayar tahunan agar lebih hemat</p>
        <div>
          <BaseSwitch bind:checked={$paymentTermYearly} />
        </div>
      </div>
      <div
        class="cart-bottom fixed h-16 bg-darkblue px-3 py-2 md:px-4 bottom-0 inset-x-0 flex justify-between items-center">
        <div class="flex flex-col">
          <span class="text-white text-xxs">Total Pembayaran / Bulan</span>
          <p class="text-lg text-white font-bold">
            {moneyFormat($derivedTotalPrice)}
          </p>
        </div>
        <button
          class="bg-teal rounded-lg py-2 px-4 font-bold text-white text-sm flex justify-between items-center"
          style="width:9rem;"
          aria-label="buy action">
          LANJUT BELI
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="12"
            height="12"
            viewBox="0 0 12 12"><defs>
              <path
                id="a"
                d="M3.69 6.997l3.563 3.296a.948.948 0 0 1 0 1.414c-.422.39-1.107.39-1.53 0l-5.406-5a.948.948 0 0 1 0-1.414l5.407-5a1.145 1.145 0 0 1 1.53 0 .948.948 0 0 1 0 1.414l-3.559 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23z" />
            </defs>
            <use
              fill="#fff"
              fill-rule="nonzero"
              transform="rotate(-180 6 6)"
              xlink:href="#a" /></svg>
        </button>
      </div>
    </div>
  {:else}
    <div class="bg-white h-full relative">
      <div class="cart-empty flex flex-col items-center justify-center h-full">
        <img
          src="/icons/cart/empty-cart.svg"
          alt="Keranjang Belanja Asuransi" />
        <p
          class="text-darkblue font-bold text-xl md:text-2xl text-center mt-2 mb-4">
          Oops..
          <br />Keranjang kamu kosong
        </p>
        <span class="text-darkblue text-center font-bold mb-8">
          Untuk saat ini kamu belum memiliki
          <br />
          proteksi apapun
        </span>

        <BaseButton
          style={'font-size: 14px;height: 44px;'}
          ariaLabel="Cari Proteksi">
          CARI PROTEKSI
        </BaseButton>
      </div>
    </div>
  {/if}
  <div
    class="basket-container absolute h-auto top-0 bg-transparent flex items-center">
    <div
      class="basket relative bg-white p-1 rounded-r-md cursor-pointer"
      on:click={handleCartToggleShow}>
      <img
        src="/icons/cart/basket-cart.svg"
        alt="Keranjang Belanja Super You"
        width="50"
        height="50" />
      <span
        class="cart-item-qty absolute rounded-full w-5 h-5 bg-red-600 flex items-center justify-center text-white font-bold text-sm text-center shadow-md">0</span>
    </div>
  </div>
</div>
