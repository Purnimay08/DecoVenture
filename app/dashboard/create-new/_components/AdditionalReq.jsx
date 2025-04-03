import { Textarea } from "@/components/ui/textarea"
import React from 'react'

function AdditionalReq({additionalRequirementInput}) {
  return (
    <div className="mt-5">
        <label className="text-ray-400 ">Add Additional Requirements(Optional)</label>
        <textarea className="mt-2" onChange={(e)=>additionalRequirementInput(e.target.value)}></textarea>
    </div>
  )
}

export default AdditionalReq