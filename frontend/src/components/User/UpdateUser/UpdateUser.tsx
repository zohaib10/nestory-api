import { PersonTreeNode } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type UpdateUserFormProps = {
  user?: PersonTreeNode;
  updateUser: (u: PersonTreeNode) => void;
};

export const UpdateUserForm = ({ user, updateUser }: UpdateUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonTreeNode>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDay: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        birthDay: user.birthDay || "",
        gender: user.gender || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: PersonTreeNode) => {
    updateUser({ ...data, id: user?.id || "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="First Name"
        className="input input-bordered w-full"
        {...register("firstName", { required: "First name is required" })}
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm">
          {String(errors.firstName.message)}
        </p>
      )}

      <input
        type="text"
        placeholder="Last Name"
        className="input input-bordered w-full"
        {...register("lastName", { required: "Last name is required" })}
      />
      {errors.lastName && (
        <p className="text-red-500 text-sm">
          {String(errors.lastName.message)}
        </p>
      )}

      <select
        className="select select-bordered w-full"
        {...register("gender", { required: "Please select a gender" })}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="Other">Other</option>
      </select>
      {errors.gender && (
        <p className="text-red-500 text-sm">{String(errors.gender.message)}</p>
      )}

      <input
        type="date"
        className="input input-bordered w-full"
        {...register("birthDay", { required: "Birth date is required" })}
      />
      {errors.birthDay && (
        <p className="text-red-500 text-sm">
          {String(errors.birthDay.message)}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full">
        Update
      </button>
    </form>
  );
};
