"use client";

import Snowfall from "react-snowfall";

const Snow = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Snowfall
        snowflakeCount={120}
        radius={[1.5, 5]}
        color="rgba(173, 216, 230, 0.5)"
      />
    </div>
  );
};

export default Snow;
