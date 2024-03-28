import TagTable from "../components/TagTable"

export default {
  title: "TagTable",
  component: TagTable,
  parameters: {
    componentSubtitle: "A whole table of fetched data from StackExchange API.",
  },
}

export const Basic = () => <TagTable />
