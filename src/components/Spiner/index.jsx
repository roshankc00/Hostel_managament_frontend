import React from "react";

const Spin = () => {
  return (
    <div
      id="loading-basic-example"
      className="h-[80vh] w-full flex justify-center items-center"
    >
      <div
        data-te-loading-management-init
        data-te-parent-selector="#loading-basic-example"
        className="flex items-center flex-col gap-3"
      >
        <div
          data-te-loading-icon-ref
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <h1 data-te-loading-text-ref className="text-center font-bold text-xl">
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default Spin;
