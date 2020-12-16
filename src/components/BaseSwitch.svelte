<script>
  export let checked = false;
</script>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-bottom: 2px;
    font-size: 14px;
    color: transparent;
    font-weight: bold;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #0d294a;
    color: #fff;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #0d294a;
  }

  input:checked + .slider:before {
    transform: translateX(23px);
  }
</style>

<label class="switch">
  <input type="checkbox" bind:checked />
  <span class="slider">✓</span>
</label>
