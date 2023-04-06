const LoadingSpinner = () => {
  return (
    <div>
      <svg
        className="mx-auto mt-60 w-20 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path
          fill="#fff"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        ></path>
      </svg>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className="absolute left-[50%] ml-[-30vw] w-[60vw]">
      <LoadingSpinner />
    </div>
  );
};
