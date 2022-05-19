import { ComponentStory } from '@storybook/react';
import AddressFormBox from './AddressFormBox';

export default {
  component: AddressFormBox,
  title: 'organisms/My/MyAddress/AddressFormBox',
};

const Template: ComponentStory<typeof AddressFormBox> = (args) => (
  <AddressFormBox {...args} />
);

export const CreateForm = Template.bind({});

CreateForm.args = {
  initialForm: {
    addressName: '',
    addressPhone: '',
    postalCode: '',
    address: '',
    addressDetail: '',
    activate: false,
  },
};

export const UpdateForm = Template.bind({});

UpdateForm.args = {
  initialForm: {
    addressName: '123',
    addressPhone: '123',
    postalCode: '123',
    address: '321',
    addressDetail: '123',
    activate: false,
  },
};
