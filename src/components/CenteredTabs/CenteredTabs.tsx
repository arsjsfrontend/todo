import * as React from "react"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

type PropsType = {
  setIsSearch: (value: boolean) => void
}

export default function CenteredTabs({ setIsSearch }: PropsType) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "#e8f7fa" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Add todo" onClick={() => setIsSearch(false)} />
        <Tab label="Search" onClick={() => setIsSearch(true)} />
      </Tabs>
    </Box>
  )
}
