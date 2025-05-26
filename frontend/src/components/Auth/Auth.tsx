import Image from "next/image";

type AuthProps = {
  tab: "signin" | "signup";
};

export const Auth = ({ tab }: AuthProps) => {
  return (
    <>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary w-full">
          {tab === "signup" ? "Sign up" : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-center mt-2">
        <a href="#" className="link">
          Forgot password?
        </a>
      </p>

      <div className="divider">or</div>

      <button className="btn btn-outline w-full flex items-center justify-center gap-2">
        <Image src="/google.png" alt="Google logo" width={24} height={24} />
        Continue with Google
      </button>
    </>
  );
};
