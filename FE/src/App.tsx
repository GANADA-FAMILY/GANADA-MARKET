import React from "react";
import { css } from "@emotion/react";

const titleStyle = css({
  boxSizing: "border-box",
  width: 300,
  height: 200,
  fontSize: "30em",
});

function App() {
  return (
    <div className="App">
      <main css={titleStyle}>hi</main>
      <div css={subtitleStyle}>hello</div>
    </div>
  );
}

const subtitleStyle = css`
  box-sizing: border-box;
  width: 100px;
  height: 60px;
`;

export default App;
