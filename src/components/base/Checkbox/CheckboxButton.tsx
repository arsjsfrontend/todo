import { Tooltip } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

type PropsType = {
  isComplete?: boolean
  isMultiple?: boolean
  onComplete: (onComplete: boolean) => void
}

export function CheckboxButton({
  isComplete,
  isMultiple,
  onComplete,
}: PropsType) {
  const handleClick = () => {
    onComplete(!isComplete)
  }

  return (
    <div>
      <Tooltip title={isMultiple ? "Done selected" : "Done"}>
        <Checkbox {...label} checked={isComplete} onClick={handleClick} />
      </Tooltip>
    </div>
  )
}
