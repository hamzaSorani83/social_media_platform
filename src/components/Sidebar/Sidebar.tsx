/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";
import { Nav } from '../'


const styles = {
  sidebar: tw`xl:w-1/4 w-24 min-w-[60px] relative flex justify-center items-center z-40 h-screen`
}

const Sidebar: React.FC = () => {
  return (
    <header css={[styles.sidebar]} className="Sidebar">
      <Nav />
    </header>
  );
};

export default Sidebar;