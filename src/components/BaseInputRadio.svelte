<script>
  import { onMount } from "svelte";
  export let items = [];
  export let name = "base-input-radio";
  export let direction = "row";
  export let selectedItemValue = "";

  onMount(() => {
    items.forEach((item) => {
      if (item.selected) {
        selectedItemValue = item.val;
      }
    });
  });
</script>

<style lang="postcss">
  .radio-input-title {
    font-size: 14px;
    color: #708697;
  }
  #base-radio-input {
    display: flex;
    align-items: center;
    height: 40px;

    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 400px;
  }

  .radio-input-wrapper {
    &:not(:last-child) {
      margin-right: 34px;
    }
  }

  .radio {
    display: inline-block;
    position: relative;
    font-size: 16px;
    line-height: 24px;

    &__input {
      position: absolute;
      top: 4px;
      left: 0;
      width: 36px;
      height: 20px;
      opacity: 0;
      z-index: 0;
    }

    &__label {
      display: block;
      padding: 0 0 0 32px;
      cursor: pointer;
      color: #0d294a;

      &:before {
        content: "";
        position: absolute;
        top: 2px;
        left: 0;
        width: 22px;
        height: 22px;
        background-color: transparent;
        border: 2px solid rgba(0, 0, 0, 0.25);
        border-radius: 14px;
        z-index: 1;
        transition: border-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:after {
        content: "";
        position: absolute;
        top: 7px;
        left: 5px;
        width: 12px;
        height: 12px;
        background-color: #00b4c5;
        border-radius: 50%;
        z-index: 2;
        transform: scale(0, 0);
        transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    &__input:checked + &__label {
      &:before {
        border-color: #00b4c5;
      }

      &:after {
        transform: scale(1, 1);
      }
    }
  }
</style>

<div class="radio-input-wrapper">
  <span class="radio-input-title">Metode klaim</span>
  <div id="base-radio-input" :style={{ flexDirection: direction }}>
    {#each items as option, i (option.val)}
      <div class="radio-input-wrapper">
        <div class="radio">
          <input
            type="radio"
            {name}
            id={`${name}-${i}`}
            class="radio__input"
            value={option.val}
            bind:group={selectedItemValue}
            checked={option.selected} />
          <label
            for={`${name}-${i}`}
            class="radio__label">{option.label}</label>
        </div>
      </div>
    {/each}
  </div>
</div>
