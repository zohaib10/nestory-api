"use client";

import { useForm } from "react-hook-form";

type TreeFormValues = {
  title: string;
};

export const NewTree = ({
  onSubmit,
  tree,
}: {
  onSubmit: (data: TreeFormValues) => void;
  tree?: { title: string };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TreeFormValues>({
    defaultValues: {
      title: tree?.title ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:p-6 w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Create a New Tree</h2>

      <div>
        <input
          type="text"
          {...register("title", { required: "Tree name is required" })}
          placeholder="e.g. Malik Family Tree"
          className="input input-bordered w-full"
        />
        {errors.title && (
          <p className="text-error text-sm mt-1 text-left">
            {errors.title.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Create Tree
      </button>
    </form>
  );
};
