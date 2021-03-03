<script>
  import { moneyFormat } from "../utils/_moneyandtobillion";
  export let amount;
</script>

<div class="base-price">
  <p>{moneyFormat(amount)}</p>
  <span>/ bulan</span>
</div>

<style lang="postcss">
  .base-price {
    display: flex;
    flex-wrap: nowrap;
    line-height: 1;
    max-height: 25px;

    & > p {
      font-size: 26px;
      font-weight: bold;
      color: var(--primary-text-color);
      @media (min-width: 640px) {
        font-size: 26px;
      }
    }

    & > span {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-left: 2px;
      display: flex;
      align-items: flex-end;
    }
  }
</style>
