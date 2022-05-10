import { ComponentStory } from '@storybook/react';
import ImageInput from './ImageInput';

export default {
  component: ImageInput,
  title: 'atoms/my/ImageInput',
};

const Template: ComponentStory<typeof ImageInput> = (args) => (
  <ImageInput {...args} />
);

export const Default = Template.bind({});

Default.args = {
  onChange: () => {},
};
