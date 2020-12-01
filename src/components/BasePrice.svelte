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

<div class="base-price">
  <p>Rp 36,500</p>
  <span>/ bulan</span>
</div>
