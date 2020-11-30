<script>
  export let data = [];
</script>

<style lang="postcss">
  .product-notcovered {
    max-width: 1280px;
    margin: 0 auto;
    padding: 50px 0;
    &__wrapper {
      @media (min-width: 768px) {
        display: inline-grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 2%;
      }

      @media (min-width: 1024px) {
        grid-column-gap: 10%;
      }

      .notcovered-item {
        display: flex;
        flex-wrap: nowrap;
        margin: 0 auto 30px auto;
        max-width: 94%;
        @media (min-width: 768px) {
          max-width: 100%;
          align-items: flex-start;
        }
        @media (min-width: 1024px) {
          margin-left: 0;
          margin-right: 0;
        }
        &__icon {
          margin-right: 16px;
          flex: 1 0 42px;
          max-width: 42px;

          @media (min-width: 768px) {
            margin-right: 14px;
            flex: 1 0 50px;
            max-width: 50px;
            & > img {
              width: 50px;
              height: 50px;
            }
          }
          @media (min-width: 1024px) {
            flex: 1 0 70px;
            max-width: 70px;
            & > img {
              width: 70px;
              height: 70px;
            }
          }
        }
        &__desc {
          font-size: 14px;
          color: #708697;
        }
      }
    }
  }
</style>

<div class="product-notcovered">
  <h2 class="text-xl lg:text-2xl text-center font-bold mb-6 lg:mb-10">
    Apa saja yang tidak di-cover oleh Super Care?
  </h2>

  <div class="product-notcovered__wrapper">
    {#each data as { icon, description } (icon)}
      <div class="notcovered-item">
        <div class="notcovered-item__icon">
          <img
            src={icon}
            width="42"
            height="42"
            alt="super care product not covered" />
        </div>
        <p class="notcovered-item__desc">{description}</p>
      </div>
    {/each}
  </div>
</div>
