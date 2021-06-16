import { is_gtm_ready } from "../stores/auth/store";
export class Analytics {
  constructor(GTM_ID) {
    this.GTM_ID = GTM_ID;
    this.isGTMLoaded = false;
  }

  loadGTM() {
    if (!this.isGTMLoaded) {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.onload= function() {
        is_gtm_ready.update(() => true);
      }
      j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer',`${this.GTM_ID}`)
      this.isGTMLoaded = true;
      this.destroyListener();
    }
  }

  destroyListener() {
    window.removeEventListener('touchstart', () => {
      this.loadGTM();
    });
    window.removeEventListener('mousemove', () => {
      this.loadGTM();
    });
  }

  initGTMEvent() {
    window.addEventListener('touchstart', () => {
      this.loadGTM()
    });
    window.addEventListener('mousemove', () => {
      this.loadGTM()
    });
  }
}

function getDeviceType() {
  let deviceType = "desktop";
  if(typeof window !== 'undefined') {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        deviceType = "mobile";
    }
  }
  return deviceType;
}