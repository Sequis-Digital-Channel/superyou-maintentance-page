export function loadFlickity() {
  const flickityScript = document.createElement("script");
  const flickityStyle = document.createElement("link");
  const docHead = document.getElementsByTagName("head")[0];
  flickityStyle.rel = "stylesheet";
  flickityStyle.href =
    "https://unpkg.com/flickity@2/dist/flickity.min.css";
  flickityScript.src =
    "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";
  docHead.appendChild(flickityStyle);
  docHead.appendChild(flickityScript);
}
