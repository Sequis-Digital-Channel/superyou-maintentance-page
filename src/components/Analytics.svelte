<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { Analytics } from "../utils/_analytics";
  import { session_id, is_gtm_ready } from "../stores/auth/store";

  export let eventValue, eventGoal, pageType, pageTitle;
  const { session } = stores();
  let GTM_ID;

  function getDeviceType() {
    let deviceType = "desktop";
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        deviceType = "mobile";
    }
    return deviceType;
  }

  function constructDatLayer(s_id) {
    const currentUserEncryptedID = localStorage.getItem('e_u_id') ? localStorage.getItem('e_u_id') : '';
    return {
      'event': "super-you-gtm",
      'event_category': "page-view",
      'event_label': "Page View",
      'event_action': "visit-page",
      'event_value': eventValue,
      'event_step': "init", // input-name, gender ... choose product (load from state)
      'event_goal': eventGoal, // (load from state)

      'sy_session': s_id,
      'sy_sovia_session': "",
      'sy_user_session': currentUserEncryptedID,

      'pageType': pageType,
      'userID': currentUserEncryptedID,
      'sessionID': s_id,
      'pageTitle': pageTitle,
      'deviceType': getDeviceType(),
      'visitorType': localStorage.getItem('auth') !== 'null' ? 'loggedin' : 'nonloggedin'
    }
  }

  session.subscribe((value) => {
    GTM_ID = value.GTM_ID;
  })

  onMount(() => {
    const GTM = new Analytics(GTM_ID);
    GTM.initGTMEvent();
    is_gtm_ready.subscribe(isReady => {
      if (isReady) {
        session_id.subscribe((su_s_id) => {
          if(su_s_id) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(constructDatLayer(su_s_id.val));
          }
        })
      }
    })
  })
</script>