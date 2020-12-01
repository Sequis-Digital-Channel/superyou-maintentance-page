<style lang="postcss">
  .circle-sosmed {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00aaae;
    cursor: pointer;
  }
</style>

<div class="circle-sosmed lazy-image">
  <slot name="icon">
    <img
      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      data-src="/icons/socialmedia/facebook.svg"
      alt="social media"
      width="8"
      height="17" />
  </slot>
</div>
