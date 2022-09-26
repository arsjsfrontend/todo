import { Button, TextField } from "@mui/material"
import { styled } from "@mui/system"
import SearchIcon from "@mui/icons-material/Search"

export const AddInput = styled(TextField)({
  ".MuiInputBase-root": {
    height: 35,
    background: "#fff",
  },
  ".MuiFormLabel-root": {
    top: -9,
  },
  ".Mui-focused": {
    top: 0,
  },
})

export const AddTodoButton = styled(Button)({
  textTransform: "none",
  height: 35,
  marginLeft: 10,
})

export const SearchIconLoupe = styled(SearchIcon)({
  cursor: "pointer",
})
