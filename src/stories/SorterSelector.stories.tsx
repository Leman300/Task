import { StoryFn } from "@storybook/react"
import SortSelector from "../components/SortSelector"
import { SortSelectorProps } from "../components/SortSelector"

export default {
  title: "SortSelector",
  component: SortSelector,
  argTypes: {
    onChange: { action: "changed" },
  },
  parameters: {
    componentSubtitle: "A component for selecting sorting options.",
    docs: {
      description: {
        component:
          "The `SortSelector` component allows users to select sorting options, such as the field to sort by and the direction (ascending or descending).",
      },
    },
  },
}

const Template: StoryFn<SortSelectorProps> = (args: SortSelectorProps) => (
  <SortSelector {...args} />
)

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: "Page Count", value: "count" },
    { label: "ID", value: "id" },
  ],
  selectedField: "count",
  selectedDirection: "desc",
}

export const Ascending = Template.bind({})
Ascending.args = {
  ...Default.args,
  selectedDirection: "asc",
}

export const CustomSelection = Template.bind({})
CustomSelection.args = {
  ...Default.args,
  selectedField: "id",
  selectedDirection: "asc",
}
