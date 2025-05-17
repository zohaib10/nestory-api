"use client";

import { useForm } from "react-hook-form";

type PersonFormValues = {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birth_day?: string;
};

export const AddPerson = ({
  onSubmit,
  person,
}: {
  onSubmit: (data: PersonFormValues) => void;
  person?: PersonFormValues;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonFormValues>({
    defaultValues: {
      birth_day: person?.birth_day,
      firstName: person?.firstName,
      gender: person?.gender,
      lastName: person?.lastName,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card bg-base-100 shadow-md md:p-6 w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Add a Person</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text text-base font-medium">First Name</span>
          </label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder="e.g., Ismail"
            className="input input-bordered w-full"
          />
          {errors.firstName && (
            <p className="text-error text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text text-base font-medium">Last Name</span>
          </label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="e.g., Awan"
            className="input input-bordered w-full"
          />
          {errors.lastName && (
            <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="label">
          <span className="label-text text-base font-medium">Gender</span>
        </label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className="select select-bordered w-full"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-error text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text text-base font-medium">
            birth_day (optional)
          </span>
        </label>
        <input
          type="date"
          {...register("birth_day")}
          className="input input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Continue
      </button>
    </form>
  );
};
