import React from 'react'

const Button = (props: { children: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => {
  return (
    <button className="px-5 py-2 bg-primary text-white text-lg flex items-center justify-center gap-4 rounded">{props.children}</button>
  )
}

export default Button
