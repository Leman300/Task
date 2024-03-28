import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CircularProgress from "@mui/material/CircularProgress"
import SortSelector from "./SortSelector"
import ErrorSnackbar from "./ErrorSnackbar"

const API_KEY = `${import.meta.env.VITE_APIKEY}`
const API_URL = `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&key=${API_KEY}`

function TagTable() {
  const [tags, setTags] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [selectedField, setSelectedField] = useState<string>("count")
  const [selectedDirection, setSelectedDirection] = useState<"asc" | "desc">(
    "desc",
  )

  useEffect(() => {
    const delay = 1000

    const fetchData = () => {
      fetch(API_URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response error")
          }
          return response.json()
        })
        .then((data) => {
          const taggedItems = data.items.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
          }))
          setTags(taggedItems)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
          setError(error)
          setLoading(false)
        })
    }
    const timeoutId = setTimeout(() => {
      fetchData()
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [])

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSelectedField(field)
    setSelectedDirection(direction)
  }

  const sortedTags = [...tags].sort((a, b) => {
    if (selectedDirection === "asc") {
      return a[selectedField] - b[selectedField]
    }
    return b[selectedField] - a[selectedField]
  })

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "87.1vh",
          backgroundColor: "#DDD6FE",
        }}
      >
        <CircularProgress size={80} color="secondary" />
      </Box>
    )
  }

  if (error) {
    return <ErrorSnackbar />
  }

  return (
    <div className="bg-violet-200 w-full min-h-[87.1vh] pb-24">
      <div className="wrapper">
        <h1 className="flex justify-center items-center text-2xl md:text-4xl cinzel-font uppercase py-24 font-semibold text-violet-900 ">
          StackOverflow Tag Browser
        </h1>
        <Box sx={{ width: "100%" }}>
          <div className="mb-4">
            <SortSelector
              options={[
                { label: "Page Count", value: "count" },
                { label: "ID", value: "id" },
              ]}
              selectedField={selectedField}
              selectedDirection={selectedDirection}
              onChange={handleSortChange}
            />
          </div>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell className="hidden md:table-cell">ID</TableCell>
                    <TableCell className="md:w-4/5">Tag</TableCell>
                    <TableCell align="right" className="md:w-1/4">
                      Page Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedTags
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((tag) => (
                        <TableRow key={tag.id}>
                          <TableCell>{tag.id}</TableCell>
                          <TableCell>{tag.name.toUpperCase()}</TableCell>
                          <TableCell align="right">{tag.count}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tags.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </div>
  )
}

export default TagTable
