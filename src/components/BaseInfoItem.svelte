<script>
  import Tooltip from "../components/BaseTooltip.svelte";
  export let icon;
  export let title = "";
  export let description;
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
      p {
        font-size: 14px;
        color: #708697;
      }
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
          width: 80px;
          height: 80px;
        }
      }
    }
  }
</style>

<div class="benefit_item">
  <div class="benefit_item__left">
    <img
      src={icon}
      width="50"
      height="50"
      alt="Icon Manfaat dan Ketentuan Produk" />
  </div>
  <div class="benefit_item__right">
    {#if title}
      <h4>
        {title.name}
        {#if title.hasOwnProperty('tooltip') && title.tooltip !== ''}
          <Tooltip indentifier={key}>{title.tooltip}</Tooltip>
        {/if}
      </h4>
    {/if}
    <p>
      {description}
      {#if tooltipDescription}
        <Tooltip indentifier={key}>
          {@html tooltipDescription}
        </Tooltip>
      {/if}
    </p>
  </div>
</div>
