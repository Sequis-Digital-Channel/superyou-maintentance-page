<script>
  export let checked = false;
  export let value;
  export let id = `input-check-${Math.random()}`;
</script>

<style lang="postcss">
  .base-input-check {
    .check-wrap {
      width: 24px;
      height: 24px;

      &::before {
        content: "";
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        box-shadow: inset 0 0 6px 0 rgba(0, 0, 0, 0.3);
        border-radius: 50%;

        text-align: center;
        background-color: #fff;
        position: absolute;
        left: -1px;
      }

      &.checked {
        &::before {
          content: url("/icons/check-darkblue.svg");
        }
      }

      & > input {
        width: 24px;
        height: 24px;
      }
    }
  }
</style>

<div class="base-input-check relative flex items-center">
  <div class="check-wrap" class:checked>
    <input
      class="absolute opacity-0"
      {value}
      on:input
      type="checkbox"
      {id}
      bind:checked />
  </div>
  <label class="flex items-center ml-2" for={id}>
    <slot name="label"><span>Input Check</span></slot>
  </label>
</div>
