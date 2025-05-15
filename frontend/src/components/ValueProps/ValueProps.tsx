import Image from "next/image";

type ValuePropsType = {
  image: string;
  title: string;
  prop: string;
  height: number;
  width: number;
};

export const ValueProps = ({
  image,
  title,
  prop,
  height,
  width,
}: ValuePropsType) => (
  <div className="flex flex-col justify-center items-center border-1 text-center rounded-lg border-gray-200 h-70 m-2 p-10">
    <Image src={image} alt={title} width={width} height={height} />
    <p>{title}</p>
    <p>{prop}</p>
  </div>
);
