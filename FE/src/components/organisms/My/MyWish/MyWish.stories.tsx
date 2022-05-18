import { ComponentStory } from '@storybook/react';
import Wish from 'types/Entity/UserAPI/Wish';
import MyWish from './MyWish';

export default {
  component: MyWish,
  title: 'organisms/My/MyWish',
};

const Template: ComponentStory<typeof MyWish> = (args) => <MyWish {...args} />;

export const Default = Template.bind({});

const items: Wish[] = [
  {
    auctionId: 23,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: true,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: true,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: true,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
];

Default.args = {
  items: [],
};

export const Normal = Template.bind({});

Normal.args = {
  items: { items },
};
