import Image from "next/image";

export const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-md px-8 sticky top-0 z-50">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center">
          <a
            className="flex items-center font-medium text-xl cursor-pointer"
            href="#"
          >
            <Image src="/logo.png" alt="Nestory logo" width={48} height={48} />
            <p className="text-3xl">Nestory</p>
          </a>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>
  );
};
