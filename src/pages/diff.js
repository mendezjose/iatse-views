import React from "react"
import ppr from "../ppr.json"
import pr from "../pr.json"

export default () => {
  const myPPR = ppr.data.allContentfulPagePressRelease.nodes.map(item => {
    console.log(item)
    return item.compose__page[0]?.slug
  })

  return <></>
}
