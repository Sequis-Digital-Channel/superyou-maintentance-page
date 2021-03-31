export function loadLeadgen(key, appenv) {
  const leadgenScript = document.createElement("script");
  const docHead = document.getElementsByTagName("head")[0];
  const leadgensource = appenv === 'production' ? "https://superyou.co.id/js/leadgen/superyouleadgen.js" : 'https://staging.superyou.co.id/js/leadgen/staging.superyouleadgen.js'
  leadgenScript.src = leadgensource;
  leadgenScript.setAttribute('data-client-key', key)
  leadgenScript.setAttribute('dom-target', "super-lead");
  docHead.appendChild(leadgenScript);
}
