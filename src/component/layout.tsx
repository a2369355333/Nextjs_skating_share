import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex justify-center items-center px-5 py-10">
      {children}
    </div>
  );
};

export default Layout;
