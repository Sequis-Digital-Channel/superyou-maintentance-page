<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import { loadLeadgen } from "../utils/_loadleadgen"

  const { session } = stores();
  
  let leadgen_client_key;
  let app_env;
  session.subscribe(store => {
    leadgen_client_key = store.LEADGEN_CLIENT_KEY; 
    app_env = store.APP_ENV
  })
  
  onMount(() => {
    const leadgenContainer = document.querySelector('.leadgen-container');
    const leadgenObserver = new IntersectionObserver((entries) => {
      const el = entries[0];
      if (el.isIntersecting) {
        loadLeadgen(leadgen_client_key, app_env);
        leadgenObserver.unobserve(leadgenContainer);
      }
    }, {
      rootMargin: "-100px 0px 0px 0px",
    });
    
    leadgenObserver.observe(leadgenContainer);
  })
</script>

<section class="leadgen-container pt-16">
  <div id="super-lead">
  </div>
</section>

<style>
  .leadgen-container {
    min-height: 498px;
  }
</style>