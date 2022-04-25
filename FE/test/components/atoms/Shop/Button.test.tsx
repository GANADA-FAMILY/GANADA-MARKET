import React from 'react';
import Button from '../../../../src/components/atoms/Shop/Button';
import { cleanup } from '@testing-library/react';
import * as TestRenderer from 'react-test-renderer';
import { matchers } from '@emotion/jest';

expect.extend(matchers);

describe('Button', () => {
  // explicitly declare type

  let render:
    | TestRenderer.ReactTestRendererJSON
    | TestRenderer.ReactTestRendererJSON[];
  let dom: TestRenderer.ReactTestRenderer;
  let domRoot: TestRenderer.ReactTestInstance;

  const method = () => {
    return 'a';
  };

  beforeEach(() => {
    render = TestRenderer.create(
      <Button
        flex="auto"
        color="black"
        transparent
        bgColor="black"
        outline="black"
        size="2em"
        type="button"
        className="normal"
        onClick={method}
        after
        children="버튼"
      />,
    ).toJSON()!;
    dom = TestRenderer.create(
      <Button
        flex="auto"
        color="black"
        transparent
        bgColor="black"
        outline="black"
        size="2em"
        type="button"
        className="normal"
        onClick={method}
        after
        children="버튼"
      />,
    )!;
    domRoot = dom.root!;
  });

  it('Button Component Snapshot', () => {
    // Test first Render
    expect(render).toMatchSnapshot();
  });

  it('Button Component Completely render props', () => {
    expect(render).toMatchInlineSnapshot(`
.emotion-0 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  border: 0.7px solid black;
  color: black;
}

.emotion-0.small {
  padding: 7px 7px;
  font-size: 1rem;
}

.emotion-0.normal {
  padding: 10px 10px;
  font-size: 1.2rem;
}

.emotion-0.big {
  padding: 14px 14px;
  font-size: 1.4rem;
}

.emotion-0::after {
  content: "";
  display: none;
  background-color: #dfe0e5;
  width: 0.1rem;
  height: 1.6rem;
}

<button
  className="2em normal emotion-0"
  color="black"
  onClick={[Function]}
  size="2em"
  type="button"
>
  버튼
</button>
`);
  });

  it('Button should have color', () => {
    expect(render).toHaveStyleRule('color', 'black');
  });

  it('Button should have flex', () => {
    expect(render).toHaveStyleRule('flex', 'auto');
  });
  it('Button should have prop 버튼', () => {
    expect(domRoot.findByType(Button).props.children).toBe('버튼');
  });
});

afterEach(cleanup);

// 만들어야 될 atom    svg use, span, a, ul li
