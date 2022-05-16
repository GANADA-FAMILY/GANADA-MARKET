import { ComponentStory } from '@storybook/react';
import { Link } from 'react-router-dom';
import { MenuItem } from 'components/atoms/My';
import Menu from './Menu';

export default {
  component: Menu,
  title: 'molecules/My/Menu',
};

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '',
  className: '',
  mode: '',
  title: '',
};

export const Shop = Template.bind({});

function ShoppingInfo() {
  return (
    <>
      <MenuItem onClick={() => null} className="menu_on">
        <Link to="/my/buying">구매 내역</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/my/selling">판매 내역</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/my/wish">관심 내역</Link>
      </MenuItem>
    </>
  );
}

Shop.args = {
  children: ShoppingInfo(),
  className: '',
  mode: '',
  title: '',
};
