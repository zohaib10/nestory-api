import { RelationshipFormData } from "@/types";
import { useForm } from "react-hook-form";

export const AddRelationshipForm = ({
  onSubmit,
}: {
  onSubmit: (data: RelationshipFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RelationshipFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "Male",
      relationshipType: "parent",
      birthDay: "",
    },
  });

  const handleFormSubmit = (data: RelationshipFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="First Name"
          {...register("firstName", { required: "First name is required" })}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text">Last Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Last Name"
          {...register("lastName", { required: "Last name is required" })}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text">Gender</span>
        </label>
        <select
          className="select select-bordered w-full"
          {...register("gender", { required: "Please select a gender" })}
        >
          <option disabled value="">
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text">Relationship Type</span>
        </label>
        <select
          className="select select-bordered w-full"
          {...register("relationshipType", {
            required: "Please select a relationship type",
          })}
        >
          <option disabled value="">
            Relationship Type
          </option>
          <option value="parent">Parent</option>
          <option value="child">Child</option>
          <option value="spouse">Spouse</option>
        </select>
        {errors.relationshipType && (
          <p className="text-red-500 text-sm">
            {errors.relationshipType.message}
          </p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text">
            Birth Date <span className="text-gray-400 text-sm">(optional)</span>
          </span>
        </label>
        <input
          type="date"
          className="input input-bordered w-full"
          {...register("birthDay")}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Add Relationship
      </button>
    </form>
  );
};
