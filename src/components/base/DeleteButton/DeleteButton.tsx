import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import DeleteIcon from "@mui/icons-material/Delete"
import { Tooltip } from "@mui/material"

type PropsType = {
  isMultiple?: boolean
  onDelete: () => void
}

export function DeleteButton({ isMultiple, onDelete }: PropsType) {
  const handleClick = () => {
    onDelete()
  }

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title={isMultiple ? "Delete selected" : "Delete"}>
        <IconButton aria-label="delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
