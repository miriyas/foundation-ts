import { ComponentStory, ComponentMeta } from '@storybook/react'

import '../styles/index.scss'
import { Button } from 'components'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const ButtonTemplate = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ButtonTemplate.args = {
  primary: true,
  size: 'large',
  children: 'Button',
}
