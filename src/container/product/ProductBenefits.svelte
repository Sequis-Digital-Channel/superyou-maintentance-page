<script context="module">
  import benefits from "../../data/json/benefits-group.json";
</script>

<script>
  import InfoItem from "../../components/BaseInfoItem.svelte";
  // import Tooltip from "../../components/BaseTooltip.svelte";
</script>

<style lang="postcss">
  .product_benefits {
    max-width: 1280px;
    margin: 0 auto;
    padding: 36px 0;

    &__title {
      text-align: center;
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 40px;
      color: #0d294a;

      @media (min-width: 768px) {
        font-size: 28px;
      }
    }

    .benefit_group__title {
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 32px;
      color: #0d294a;

      @media (min-width: 768px) {
        font-size: 24px;
      }
    }

    .benefit_wrapper {
      margin-bottom: 60px;
      &:last-child {
        margin-bottom: 0;
      }
      @media (min-width: 640px) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 3rem 10%;

        &:last-child {
          margin-bottom: 40px;
        }
      }
    }
  }
</style>

<div class="product_benefits">
  <h1 class="product_benefits__title">Manfaat apa yang akan kamu dapatkan?</h1>

  {#each benefits.benefits_group as bene_section, i (`${i}${bene_section.title.name}`)}
    {#if bene_section.title.name !== ''}
      <h2 class="benefit_group__title">
        {bene_section.title.name}
        <!-- {#if bene_section.title.tooltip !== ''}
          <Tooltip indentifier={`head-tooltip-${i}`}>
            {bene_section.title.tooltip}
          </Tooltip>
        {/if} -->
      </h2>
    {/if}

    <div class="benefit_wrapper">
      {#each bene_section.benefits as { icon, title, description }, i (`${description}${i}`)}
        <InfoItem {icon} {title} {description} key={`bene-tooltip-${i}`} />
      {/each}
    </div>
  {/each}
</div>
