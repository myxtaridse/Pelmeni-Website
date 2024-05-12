import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props: {}) => (
  <ContentLoader
    className="pizza-block"
    speed={2.5}
    width={280}
    height={400}
    viewBox="0 0 280 400"
    backgroundColor="#ecebeb"
    foregroundColor="#e2d5d5"
    {...props}
  >
    <rect x="0" y="8" rx="10" ry="10" width="270" height="170" />
    <rect x="24" y="188" rx="10" ry="10" width="220" height="25" />
    <rect x="23" y="325" rx="10" ry="10" width="70" height="25" />
    <rect x="113" y="316" rx="20" ry="20" width="150" height="40" />
    <rect x="0" y="222" rx="10" ry="10" width="270" height="81" />
  </ContentLoader>
);

export default Skeleton;
