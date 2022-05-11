import { ComponentStory } from '@storybook/react';
import LinkButton from './LinkButton';

export default {
  component: LinkButton,
  title: 'atoms/My/LinkButton',
};

const Template: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: '',
  href: '',
};

// export const ActiveOff = Template.bind({});

// ActiveOff.args = {
//   item: {
//     addressId: 1,
//     addressName: '홍길동',
//     addressPhone: '010-3333-3333',
//     postalCode: '434343',
//     address: '경북 영주시 풍기읍 대동로 23',
//     addressDetail: '삼성빌',
//     activate: false,
//   },
// };
