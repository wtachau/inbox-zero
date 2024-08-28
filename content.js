const images = [
  "images/047-sailing.svg",
  "images/002-sunset.svg",
  "images/004-swimming-pool.svg",
  "images/008-beach.svg",
  "images/010-flamingo.svg",
  "images/012-tanning.svg",
  "images/015-flamingo-1.svg",
  "images/018-seagull.svg",
  "images/026-flowers.svg",
  "images/027-flippers.svg",
  "images/030-sun.svg",
  "images/032-life-guard.svg",
  "images/034-snorkel.svg",
  "images/037-pineapple.svg",
  "images/038-crab.svg",
  "images/044-wave.svg",
];

const randomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

const zeroImageId = "zero-image";
const SELECTOR =
  "//td[text()='No new mail!']/parent::tr/parent::tbody/parent::table";

/* Create and style components */
var zeroImage = document.createElement("img");
zeroImage.id = zeroImageId;
zeroImage.src = chrome.runtime.getURL(randomImage());
zeroImage.style.textAlign = "center";
zeroImage.style.border = "50px solid white";
zeroImage.style.borderRadius = "175px";
zeroImage.style.width = "250px";

const containerDiv = document.createElement("div");
containerDiv.style.width = "100%";
containerDiv.style.textAlign = "center";
containerDiv.style.marginTop = "10%";
containerDiv.appendChild(zeroImage);

/* Search for the panel that says "No new mail!", remove
 * it, and place the new image component next to it.
 */
const removePanel = () => {
  const panel = document.evaluate(
    SELECTOR,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (panel && panel.style.display != "none") {
    /* Because inserting the element triggers the "DOMNodeInserted"
     * event, call this asynchronously so we don't get stuck in infinite
     * recursion
     */
    setTimeout(() => {
      if (!document.getElementById(zeroImageId)) {
        panel.insertAdjacentElement("afterend", containerDiv);
      }
    }, 0);

    panel.style.display = "none";
  }
};

new MutationObserver(removePanel).observe(document, {
  childList: true,
  subtree: true,
});
