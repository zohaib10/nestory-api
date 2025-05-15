export const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      <div className="flex justify-between w-full">
        <div className="flex-1">
          <a className="font-medium text-xl cursor-pointer">Nestory</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>
  );
};
