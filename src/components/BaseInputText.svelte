<script>
  import { createEventDispatcher } from "svelte";

  export let name = "inputtext",
  icon = null,
  label = "",
  readonly = false,
  type = "text",
  value = "",
  error = {
    status: false,
    msg: "",
  };

  let prevType = type;
  let focused = false;
  let ref = null;

  const dispatch = createEventDispatcher();
  
  function dispatchIconOnClick() {
    dispatch("iconclick", {
      inputType: type,
      icon
    });
  }

  function typeAction(node) {
    node.type = type;
  }

  function onBlured() {
    focused = false;
  }

  function onFocus() {
    if (!readonly) {
      focused = true;
    }
  }

  $: if(type !== prevType) {
    console.log(type, 'input txt');
    ref.type = type;
    prevType = type;
  }
</script>

<div class="base-input-text relative" class:focused class:error={error.status}>
  <label for={name}>{label}</label>
  <input
    bind:this={ref}
    use:typeAction
    class="input-text"
    id={name}
    {name}
    bind:value
    on:focus={onFocus}
    on:blur={onBlured}
    {readonly}
  >
  <div class="msg" class:error={error.status}>
    {#if error.status}<span>{error.msg}</span>{/if}
  </div>

  {#if icon}
    <div class="absolute right-0 top-0 pt-8 pr-3">
      <div on:click={dispatchIconOnClick} class="flex items-center">
        <img src={icon} alt="Input Icon">
      </div>
    </div>
  {/if}
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