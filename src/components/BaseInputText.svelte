<script>
  export let name = "inputtext";
  export let label = "";
  export let readonly = false;
  export let error = {
    status: false,
    msg: "",
  };

  export let value = "";
  let focused = false;

  function onBlured() {
    focused = false;
  }

  function onFocus() {
    if (!readonly) {
      focused = true;
    }
  }
</script>

<div class="base-input-text" class:focused class:error={error.status}>
  <label for={name}>{label}</label>
  <input
    type="text"
    class="input-text"
    id={name}
    {name}
    bind:value
    on:focus={onFocus}
    on:blur={onBlured}
    readonly
  >
  <div class="msg" class:error={error.status}>
    {#if error.status}<span>{error.msg}</span>{/if}
  </div>
</div>

<style lang="postcss">
  .base-input-text {
    position: relative;
    height: 64px;

    & > label {
      display: block;
      font-size: 14px;
      color: #708697;
    }

    &::before,
    &::after {
      content: "";
      bottom: 0px;
      left: 0;
      position: absolute;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      width: 100%;
      height: 1px;
    }

    &::before {
      background-color: rgba(0, 0, 0, 0.3);
    }
    &::after {
      height: 2px;
      background-color: rgb(0, 170, 174);
      transform: scaleX(0);
    }

    &.focused {
      &::after {
        transform: scaleX(1);
        z-index: 2;
      }
    }

    &.error {
      & > label {
        color: #e54b4b;
      }
      &::after {
        transform: scaleX(1);
        z-index: 2;
        background-color: #e54b4b;
      }
    }

    .input-text {
      display: flex;
      width: 100%;
      min-height: 40px;
      padding: 8px 0;
    }

    .msg {
      position: absolute;

      span {
        font-size: 11px;
        color: #0d294a;
      }
      &.error {
        span {
          color: #e54b4b;
        }
      }
    }
  }
</style>