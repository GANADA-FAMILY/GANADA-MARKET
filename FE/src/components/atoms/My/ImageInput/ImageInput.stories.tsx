import { ComponentStory } from '@storybook/react';
import ImageInput from './ImageInput';

export default {
  component: ImageInput,
  title: 'atoms/My/ImageInput',
};

const Template: ComponentStory<typeof ImageInput> = (args) => (
  <ImageInput {...args} />
);

export const Default = Template.bind({});

Default.args = {
  onChange: () => {
    return null;
  },
};
