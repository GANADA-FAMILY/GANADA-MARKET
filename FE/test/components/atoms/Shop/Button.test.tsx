// import React from 'react';
// import { matchers } from '@emotion/jest';
// import { cleanup } from '@testing-library/react';
// import * as TestRenderer from 'react-test-renderer';
// import Button from '../../../../src/components/atoms/Shop/Button';

// expect.extend(matchers);

// describe('Button', () => {
//   // explicitly declare type

//   let render:
//     | TestRenderer.ReactTestRendererJSON
//     | TestRenderer.ReactTestRendererJSON[];
//   let dom: TestRenderer.ReactTestRenderer;
//   let domRoot: TestRenderer.ReactTestInstance;

//   const method = () => {
//     return 'a';
//   };

//   beforeEach(() => {
//     render = TestRenderer.create(
//       <Button
//         flex="auto"
//         color="black"
//         bgColor="black"
//         outline="black"
//         size="2em"
//         type="button"
//         className="normal"
//         children="버튼"
//       />,
//     ).toJSON()!;
//     dom = TestRenderer.create(
//       <Button
//         flex="auto"
//         color="black"
//         bgColor="black"
//         outline="black"
//         size="2em"
//         type="button"
//         className="normal"
//         children="버튼"
//       />,
//     )!;
//     domRoot = dom.root!;
//   });

//   it('Button Component Snapshot', () => {
//     // Test first Render
//     expect(render).toMatchSnapshot();
//   });

//   it('Button Component Completely render props', () => {
//     expect(render).toMatchInlineSnapshot();

//   it('Button should have color', () => {
//     expect(render).toHaveStyleRule('color', 'black');
//   });

//   it('Button should have flex', () => {
//     expect(render).toHaveStyleRule('flex', 'auto');
//   });
//   it('Button should have prop 버튼', () => {
//     expect(domRoot.findByType(Button).props.children).toBe('버튼');
//   });
// });

// afterEach(cleanup);

// 만들어야 될 atom    svg use, span, a, ul li
