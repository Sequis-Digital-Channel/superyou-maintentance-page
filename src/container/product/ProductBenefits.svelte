<script>
  import InfoItem from "../../components/BaseInfoItem.svelte";
  import Tooltip from "../../components/Tooltip.svelte";

  export let benefitGroups = [];
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
  <h1 class="product_benefits__title">Manfaat Asuransi Penyakit Kritis Super Well Protection</h1>

  {#each benefitGroups as bene_section, i (bene_section.id)}
    {#if bene_section.name !== ''}
      <h2 class="benefit_group__title">
        {bene_section.name}
        {#if bene_section.tooltip_text}
          <Tooltip className={`benetitle-${i}`} type="title">
            <div class="text-xs text-white font-medium">
              {bene_section.tooltip_text}
            </div>
          </Tooltip>
        {/if}
      </h2>
    {/if}

    <div class="benefit_wrapper">
      {#each bene_section.benefits as { icon_svg, name, benefit, id, tooltip_text }, i (id)}
        <InfoItem icon={icon_svg} title={name} description={benefit} tooltipTitle={tooltip_text} key={`bene-tooltip-${i}`} />
      {/each}
    </div>
  {/each}
</div>
