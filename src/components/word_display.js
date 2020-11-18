import React, { useState, useEffect } from 'react';
import { MorphReplace } from 'react-svg-morph';

const paths = {
  z: <path id="z" d="M193.151,135.555H0.765v49.536H147.646Zm52.992,294.914V380.357H64.126L240.383,187.971V135.555H217.919L0.189,378.053v52.416H246.143Z" />,
  y: <path id="y" d="M273.952,432.773V134.4H212.9V300.292c0,50.112-12.672,80.065-66.24,83.521v50.112c35.712-4.608,55.3-18.432,66.24-35.712v38.592c0,34.56-10.368,61.633-66.24,64.513V548.55C254.368,545.094,273.952,488.069,273.952,432.773Zm-146.881,2.88v-51.84c-54.144-2.88-63.36-31.1-63.36-80.641V134.4H3.231V297.988c0,84.1,19.584,137.665,115.776,137.665h8.064Zm0,112.9V501.318c-56.448-2.3-63.936-24.769-66.24-53.569H-0.226C-0.226,504.2,26.271,545.67,127.071,548.55Z" />,
  x: <path id="x" d="M313.264,430.469L189.423,277.828l115.2-142.273H235.5L156.591,242.692,78.83,134.4H7.982L238.959,430.469h74.305Zm-172.8-95.041-31.1-38.592L-0.082,430.469H74.8Z" />,
  w: <path id="w" d="M452.535,135.555H386.3l-50.113,201.6,27.648,92.737ZM344.822,430.469L253.238,135.555H192.757L133.429,337.732l21.312,90.433,67.968-228.674,70.273,230.978h51.84Zm-209.665,0L66.612,135.555H-0.2L86.2,430.469h48.961Z" />,
  v: <path id="v" d="M314.415,134.4h-69.7l-79.489,216L192.3,424.133ZM173.87,430.469L66.158,134.4H-0.083L119.15,430.469h54.72Z" />,
  u: <path id="u" d="M270.8,430.469l-0.576-294.914H208.591V298.564c0,50.688-12.1,80.641-66.816,83.521v50.688c48.96-5.76,72.576-26.5,82.368-44.928l12.672,42.624H270.8ZM122.19,433.925v-51.84c-53.568-3.456-62.208-30.529-62.208-80.641V135.555H-0.5V296.836c0,83.521,19.008,137.089,116.352,137.089h6.336Z" />,
  t: <path id="t" d="M180.432,185.091V134.4h-57.6v50.688h57.6Zm0,247.682V383.237c-63.937,2.88-75.457-9.792-75.457-37.441,0-95.04-1.728-284.545-1.728-284.545H42.191V134.4L-0.433,148.227l0.576,36.864H42.191V345.8C42.191,415.493,83.087,438.533,180.432,432.773Z" />,
  s: <path id="s" d="M264.041,242.116c0-62.209-31.1-105.985-117.5-109.441v48.96c43.2,3.456,57.6,25.92,59.9,60.481h57.6ZM271.53,345.8c0-108.864-202.178-72-205.058-125.568-0.576-19.585,13.248-38.017,60.481-39.745V132.675C40.552,134.4,3.688,173,5.416,223.108c2.3,105.408,210.241,62.208,205.633,126.144-0.576,16.7-16.128,35.137-64.512,36.865v48.96C236.393,433.349,271.53,387.845,271.53,345.8ZM126.953,435.077V384.965c-47.233-3.456-66.817-27.072-66.817-63.937H-0.344C-0.92,392.453,38.248,430.469,126.953,435.077Z" />,
  r: <path id="r" d="M151.733,187.4v-54.72c-64.512-2.88-95.04,23.04-104.833,43.776l-14.4-40.9H-0.332V430.469H61.3V266.884C61.3,214.468,75.7,181.635,151.733,187.4Z" />,
  q: <path id="q" d="M285.543,544.518V135.555H252.135L238.887,177.6c-9.216-17.28-35.137-39.168-86.977-44.352v48.96c61.057,3.456,73.153,43.777,73.153,101.377,0,55.3-10.368,97.345-73.153,100.8v49.536c40.9-5.76,62.785-21.888,72.577-38.592V544.518h61.056ZM132.326,435.653v-51.84c-57.6-4.608-70.272-44.929-70.272-100.225,0-55.872,12.672-97.345,70.273-100.8V131.523h-5.76C29.221,130.947-.155,202.947-0.155,283.588c0,81.217,27.648,152.065,125.569,152.065h6.912Z" />,
  p: <path id="p" d="M285.2,283.588c0-80.641-28.8-153.217-125.569-152.065h-6.912v50.688c57.6,4.032,70.848,44.353,70.848,101.377,0,55.3-13.248,95.617-70.848,100.225v51.84h8.064C258.13,435.653,285.2,364.229,285.2,283.588ZM133.713,433.925V384.389c-62.785-3.456-73.729-45.5-73.729-100.8,0-58.176,13.248-97.921,73.729-101.377v-48.96C81.872,138.435,56.528,160.323,46.16,177.6L33.488,135.555H0.08V544.518H60.56V395.333C70.928,410.885,93.392,428.165,133.713,433.925Z" />,
  o: <path id="o" d="M292.472,283.012c0-75.457-30.528-146.3-137.088-150.337v50.112c62.208,4.608,74.3,48.385,74.3,100.225,0,54.144-13.824,96.193-74.3,100.8v50.112C263.1,429.893,292.472,360.2,292.472,283.012Zm-156.1,150.913V383.813c-59.9-4.608-73.728-47.809-73.728-100.8,0-52.416,13.824-95.617,73.728-100.225V132.675C28.663,136.707-.138,207.555-0.138,283.012-0.138,359.045,28.087,430.469,136.375,433.925Z" />,
  n: <path id="n" d="M270.831,430.469V271.492c0-83.521-19.008-139.969-115.776-139.969h-8.64v51.264c54.72,2.88,63.36,33.985,63.36,83.521V430.469h61.056Zm-144-247.682V133.251c-47.232,5.76-70.848,26.5-79.488,43.776l-13.824-40.9H0.11V430.469H61.742V266.308C61.742,216.2,73.838,186.243,126.83,182.787Z" />,
  m: <path id="m" d="M407.379,430.469V257.092c0-69.121-16.7-125.569-97.345-125.569H303.7v52.992c35.136,4.608,41.472,32.257,41.472,69.121V430.469h62.209ZM284.114,183.363V133.827c-38.592,5.76-58.176,25.92-65.664,43.2-12.672-28.8-37.441-45.5-81.217-45.5H130.9v52.992c35.136,4.608,41.472,32.257,41.472,69.121V430.469h62.209V253.636C234.578,213.892,243.794,186.243,284.114,183.363Zm-172.8,0V133.827c-37.44,5.76-57.024,23.616-64.513,39.744L32.976,135.555H-0.432V430.469H61.2V253.636C61.2,213.892,70.993,186.243,111.313,183.363Z" />,
  l: <path id="l" d="M60.981,430.469V23.234H-0.652V430.469H60.981Z" />,
  k: <path id="k" d="M270.215,430.469L108.358,274.948,258.7,134.4H172.87L80.71,231.172v86.976L186.118,430.469h84.1Zm-208.513,0V23.234H0.069V430.469H61.7Z" />,
  j: <path id="j" d="M135.822,64.707c0-29.952-17.856-36.864-44.353-36.864S46.541,34.754,46.541,64.707c0,29.376,18.432,37.441,44.928,37.441S135.822,94.083,135.822,64.707ZM122.574,456.965l-1.152-321.41H60.941V458.117c0,28.8-12.1,43.777-61.056,35.136v51.265C88.589,557.19,122.574,527.814,122.574,456.965Z" />,
  i: <path id="i" d="M89.518,64.707c0-29.952-17.28-37.44-43.776-37.44-27.648,0-45.5,7.488-45.5,37.44,0,29.376,17.856,36.864,45.5,36.864C72.238,101.571,89.518,94.083,89.518,64.707ZM75.694,430.469V135.555H14.638V430.469H75.694Z" />,
  h: <path id="h" d="M269.545,430.469v-160.7c0-84.673-19.584-139.393-115.776-139.393h-6.336v51.84c52.992,3.456,61.056,29.952,61.056,81.793V430.469h61.056Zm-141.7-248.258V131.523c-38.017,5.184-58.177,21.888-67.969,39.744V23.234H-0.6V430.469H59.88L61.032,264C61.032,211.011,73.128,184.515,127.849,182.211Z" />,
  g: <path id="g" d="M284.711,135.555h-131.9v50.688c48.96,2.88,59.328,25.344,59.328,54.721,0,33.408-11.52,57.024-59.328,59.9v46.08c100.225-2.88,123.265-44.352,123.265-103.68,0-33.985-14.4-57.025-32.833-66.241l40.9-12.1Zm9.216,328.322c0-62.208-75.457-72-138.241-80.064-65.089-8.64-89.281-10.944-89.281-24.768,0-6.337,1.728-13.249,24.768-16.129,0,0,23.617,2.88,42.625,4.032v-46.08c-50.113-2.88-60.481-27.072-60.481-59.9,0-30.529,12.1-52.417,60.481-54.721V136.131C33.573,141.315,10.533,186.243,10.533,242.692c0,27.072,10.944,57.6,44.352,74.3-29.952,7.488-50.112,21.312-50.112,46.657,0,52.416,80.641,55.872,148.033,67.392,44.352,7.488,77.184,12.672,77.184,36.288,0,17.28-12.1,37.441-77.76,38.017v48.96C263.975,553.734,293.927,507.078,293.927,463.877ZM132.646,554.31V504.774c-56.449-2.88-65.089-23.041-67.969-54.145H0.165C0.165,513.414,28.389,550.854,132.646,554.31Z" />,
  f: <path id="f" d="M180.43,185.667V135.555H119.949v50.112H180.43Zm0-114.624V20.93C83.085,15.17,42.189,38.21,42.189,107.907v28.224L0.141,148.8l-0.576,36.864H42.189v244.8h58.176V108.483C100.365,80.835,115.917,67.587,180.43,71.043Z" />,
  e: <path id="e" d="M279.272,307.2c7.488-92.16-22.464-173.953-128.449-175.681v47.808c48.96,4.032,65.664,39.745,65.088,77.761,0.576,0,0,.576,0,0.576,0.576,0.576,0,.576,0,0.576H64.422c2.88-40.32,17.28-74.881,66.817-78.337V132.675C26.982,138.435-.09,207.555-0.09,282.436c0,75.457,26.5,144,131.329,150.337V384.965c-43.2-4.608-63.937-32.257-67.393-77.761H279.272Zm1.152,32.832H215.911c-5.76,23.041-20.16,44.353-65.088,46.081v47.232C241.832,432.773,275.24,389.573,280.424,340.036Z" />,
  d: <path id="d" d="M286.544,430.469V23.234H226.063V170.691c-10.368-16.128-31.68-33.408-71.424-38.016v49.536c61.056,4.032,72,46.081,72,100.225,0,56.448-13.248,96.193-72,99.649v50.688c50.112-5.76,75.456-27.648,84.672-44.928l13.824,42.048Zm-151.489,3.456V383.237c-59.9-4.032-72-44.353-72-100.8s12.1-96.769,72-100.225v-51.84h-9.216C27.918,130.371.27,201.8,0.27,282.436s28.8,151.489,126.145,151.489h8.64Z" />,
  c: <path id="c" d="M278.271,253.636c0-70.849-39.745-117.5-123.265-120.961v50.688c40.9,4.032,56.448,28.224,60.48,70.273h62.785Zm0,61.632H215.486c-4.032,39.744-19.584,63.361-60.48,66.241v53.568C239.1,432.2,278.271,386.117,278.271,315.268ZM135.422,435.077V382.085C78.973,378.053,62.845,336,62.845,283.012c0-54.144,16.7-96.769,72.577-100.225V132.675C30.013,136.707.061,207.555,0.061,283.588,0.061,359.045,28.285,429.893,135.422,435.077Z" />,
  b: <path id="b" d="M284.912,282.436c0-80.641-27.072-152.065-124.417-152.065h-8.64v52.416c58.176,3.456,71.424,43.777,71.424,99.649,0,57.6-13.248,96.769-71.424,101.377v50.112h7.488C256.112,433.925,284.912,363.077,284.912,282.436ZM132.271,432.773v-48.96c-59.329-4.608-72.577-43.2-72.577-101.377,0-55.872,10.944-96.769,72.577-100.225V131.523c-40.321,5.76-61.633,23.04-72,39.168V23.234H-0.21V430.469H33.2L45.87,387.845C56.238,405.125,81.582,427.013,132.271,432.773Z" />,
  a: <path id="a" d="M128.934,179.907v-48.96C33.317,133.827,9.125,180.483,9.125,239.812l59.9-.576C69.03,204.675,82.278,182.787,128.934,179.907ZM275.815,430.469V262.852c0-77.185-16.7-129.025-128.449-131.9v48.96c51.84,2.88,66.24,25.92,67.969,66.241L122.6,257.092C36.2,266.884-.091,289.348-0.091,344.068c0,62.209,51.84,89.857,115.2,89.281h3.456V386.117c-35.712-2.88-55.3-17.28-55.3-42.625,0-23.616,17.28-33.984,68.545-39.744l83.521-9.216v9.216c0,48.384-28.225,78.337-77.185,82.369V432.2c44.928-5.184,65.664-25.92,77.185-46.08l12.672,44.352h47.808Z" />
};


const WordDisplay = function({word}) {
  word = word || "";

  const letter = ([...word].map((c) => {
    return (
      <MorphReplace duration={1000} rotation="none">
        <svg fill="black" key={c} viewBox="0 0 420 576">
          {paths[c]}
        </svg>
      </MorphReplace>
    );
  }));

  return (
    <div className="word">
      {letter}
    </div>
  )
}

export default WordDisplay;