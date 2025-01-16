const Drawer = ({
  isOpen,
  setIsDrawerOpen,
  children,
}: {
  isOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      id="drawer-example"
      className={`border border-gray-200 fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-2/5 dark:bg-gray-800 ${
        isOpen ? "" : "-translate-x-full"
      }`}
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <button
        type="button"
        data-drawer-hide="drawer-example"
        aria-controls="drawer-example"
        onClick={() => {
          setIsDrawerOpen(!isOpen);
        }}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      {children}
    </div>
  );
};

export default Drawer;
