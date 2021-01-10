<script>
  import { fly } from "svelte/transition";
</script>

<style lang="postcss">
  .popup-addtocart {
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -98%);
    width: 80%;
    max-width: 25rem;

    .circle-basket-img {
      width: 80px;
      height: 80px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: rgba(0, 170, 174, 0.4);
      border-radius: 50%;
    }
  }
</style>

<div
  in:fly={{ y: -20, duration: 400 }}
  out:fly={{ y: -20, duration: 400 }}
  class="popup-addtocart bg-white fixed rounded-lg">
  <div class="body flex flex-col items-center justify-center px-4 py-6 md:px-8">
    <div class="circle-basket-img flex items-center justify-center mb-4">
      <img
        src="/icons/cart/basket-cart.svg"
        alt="Keranjang Belanja Super You"
        width="50"
        height="50" />
    </div>
    <h4 class="text-xl md:text-3xl font-bold text-darkblue mb-2">Berhasil</h4>
    <p class="text-sm text-darkblue text-center">
      Produk sudah berhasil masuk ke keranjang
    </p>
  </div>
</div>
