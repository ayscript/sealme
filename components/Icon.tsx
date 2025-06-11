import React from 'react'

const Send = () => {
  return (
    <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.91158 12H7.45579H4L2.02268 4.13539C2.0111 4.0893 2.00193 4.04246 2.00046 3.99497C1.97811 3.27397 2.77209 2.77366 3.46029 3.10388L22 12L3.46029 20.8961C2.77983 21.2226 1.99597 20.7372 2.00002 20.0293C2.00038 19.9658 2.01455 19.9032 2.03296 19.8425L3.5 15"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  )
}

const Logo = () => {
  return (
    <svg
    id="_x32_"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100px"
    height="100px"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <style type="text/css" />
    <g>
      <path
        fill="currentColor"
        d="M497.612,134.031c0,0-30.453,30.438-96.391,30.438c-49.922,0-107.156,5.016-145.234,55.906 c-38.078-50.891-95.313-55.906-145.219-55.906c-65.953,0-96.391-30.438-96.391-30.438s-39.625,83.703,12.688,170.281 c41.078,67.953,121.75,83.688,175.016,68.156c26.359-7.688,47.672-27.375,53.906-33.563c6.234,6.188,27.563,25.875,53.922,33.563 c53.266,15.531,133.938-0.203,175.032-68.156C537.253,217.734,497.612,134.031,497.612,134.031z M142.221,292.063 c-30.313-6.75-48.5-30.688-45.594-46.234c2.328-12.375,48.844-15.234,69.031-7.609c20.219,7.625,36.391,18.125,36.563,30.016 C202.393,280.109,172.549,298.813,142.221,292.063z M369.752,292.063c-30.313,6.75-60.156-11.953-60-23.828 c0.172-11.891,16.375-22.391,36.563-30.016s66.703-4.766,69.047,7.609C418.268,261.375,400.081,285.313,369.752,292.063z"
      />
    </g>
  </svg>
  )
}

const Plus = () => {
    return (
        <svg
    fill="currentColor"
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    baseProfile="tiny"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 10h-4v-4c0-1.104-.896-2-2-2s-2 .896-2 2l.071 4h-4.071c-1.104 0-2 .896-2 2s.896 2 2 2l4.071-.071-.071 4.071c0 1.104.896 2 2 2s2-.896 2-2v-4.071l4 .071c1.104 0 2-.896 2-2s-.896-2-2-2z" />
  </svg>
    )
}

const Trash = () => (
  <svg
    fill="red"
    width={24}
    height={24}
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      className="clr-i-solid clr-i-solid-path-1"
      d="M6,9V31a2.93,2.93,0,0,0,2.86,3H27.09A2.93,2.93,0,0,0,30,31V9Zm9,20H13V14h2Zm8,0H21V14h2Z"
    />
    <path
      className="clr-i-solid clr-i-solid-path-2"
      d="M30.73,5H23V4A2,2,0,0,0,21,2h-6.2A2,2,0,0,0,13,4V5H5A1,1,0,1,0,5,7H30.73a1,1,0,0,0,0-2Z"
    />
    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
  </svg>
);

export {Send, Logo, Plus, Trash}
