<script>
  export let icon;
  export let title;
  export let description;
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
      margin-right: 16px;
      @media (min-width: 640px) {
        align-self: center;
        margin-right: 0;
        margin-bottom: 12px;
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
    <img src={icon} width="50" height="50" />
  </div>
  <div class="benefit_item__right">
    <h4>{title.name}</h4>
    <p>{description}</p>
  </div>
</div>
