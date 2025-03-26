import { SignUpForm } from "./signup-form";

function SignUpPage() {
  return (
    <div className="mx-4 h-full flex-1 pt-12 md:mx-6 lg:px-13 lg:pt-20">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 pb-12 lg:pb-32">
        <div className="mb-6 flex flex-col space-y-2 text-center md:mb-8 xl:mb-10">
          <h1 className="text-[2rem] font-semibold tracking-tight">
            Create an account on <span className="text-primary">Chronica</span>
          </h1>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
