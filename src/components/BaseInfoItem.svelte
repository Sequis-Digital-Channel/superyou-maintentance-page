<script>
  import Tooltip from "../components/Tooltip.svelte";
  export let icon;
  export let title = "";
  export let description;
  export let tooltipTitle = "";
  export let tooltipDescription = null;
  export let key = "";
</script>

<style lang="postcss">
  .benefit_item {
    display: flex;
    margin-bottom: 30px;

    @media (min-width: 640px) {
      flex-direction: column;
      align-item: center;
      align-self: flex-start;
      margin-bottom: 0;
    }

    &__right {
      h4 {
        font-size: 16px;
        color: #0d294a;
        font-weight: bold;
        margin-bottom: 8px;
      }
      /* p {
        font-size: 14px;
        color: #708697;
      } */
      @media (min-width: 640px) {
        & > h4 {
          font-size: 20px;
          margin-bottom: 16px;
        }
        & > h4,
        & > p {
          text-align: center;
        }
      }
    }

    &__left {
      flex: 1 0 50px;
      max-width: 50px;
      margin-right: 16px;
      @media (min-width: 640px) {
        align-self: center;
        margin-right: 0;
        margin-bottom: 12px;
        max-width: 100%;
        & > img {
          width: 80px !important;
          height: 80px !important;
        }
      }
    }

    .tooltip-body {
      color: #fff;
      font-size: 12px;
      font-weight: normal;
    }
  }
</style>

<div class="benefit_item">
  <div class="benefit_item__left lazy-image">
    <img
      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      data-src={icon}
      width="50"
      height="50"
      alt="Icon Manfaat dan Ketentuan Produk"
      style="height:50px;"
      />
  </div>
  <div class="benefit_item__right">
    {#if title}
      <h4>
        {title}
        {#if tooltipTitle !== ''}
          <Tooltip className={key} type="title">
            <p class="tooltip-body">{tooltipTitle}</p>
          </Tooltip>
        {/if}
      </h4>
    {/if}
    <p class="text-sm text-bluegray">
      {@html description}
      <!--
      {#if tooltipDescription}
        <Tooltip className={key} type="body">
          <div class="tooltip-body">
            {@html tooltipDescription}
          </div>
        </Tooltip>
      {/if}
      -->
    </p>
  </div>
</div>
