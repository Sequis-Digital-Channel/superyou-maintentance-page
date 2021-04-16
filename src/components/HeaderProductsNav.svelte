<script>
  import { createEventDispatcher } from "svelte";
  import productNavItems from "../data/json/product-nav-items.json";

  export let productListShow = false;

  const dispatch = createEventDispatcher();
  const closeProductList = dispatch('close');
</script>

<div class="products__ddown bg-white" class:show={productListShow}>
  <div class="left">
    <h4 class="text-darkblue font-bold">
      Asuransi Jiwa & Kecelakaan Diri
    </h4>
    {#each productNavItems.life as navItem, i (navItem.icon)}
      <a rel={`${navItem.self ? 'prefetch' : 'external'}`} on:click={closeProductList} href={navItem.url}>
        <div class="product-item-nav">
          <div class="icon flex items-center justify-center">
            <img
              class={navItem.icon.includes('motor') ? 'max-w-3/5' :''}
              src={navItem.icon}
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
  <div class="right">
    <h4 class="text-darkblue font-bold">
      Asuransi Kesehatan & Penyakit Kritis
    </h4>
    {#each productNavItems.health as navItem (navItem.icon)}
      <a rel="prefetch" on:click={() => productListShow = false} href={navItem.url}>
        <div class="product-item-nav">
          <div class="icon">
            <img
              src={navItem.icon}
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

<style lang="postcss">
  .products__ddown {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    border-radius: 12px;
    top: 150%;
    width: 690px;
    height: 376px;
    box-shadow: 0 3px 20px 0 rgba(187, 204, 236, 0.45);
    grid-template-columns: 1fr 1fr;
    display: grid;
    &.show {
      opacity: 1;
      visibility: visible;
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
</style>