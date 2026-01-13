import { AuthButton } from "@/components/auth/AuthButton";
import "./LoginPage.css";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div>
        <h1 className="mt-20 font-anton text-7xl font-bold text-black mb-4 tracking-tight">
          CVs' Lab
        </h1>
      </div>
      <div className="scene">
        <div className="cv">
          <div className="text-center flex flex-col justify-center items-center h-full p-6">
            <p className="text-xl text-black font-anton">
              Create, manage, and export your professional CVs
            </p>
          </div>
        </div>
      </div>
      <AuthButton />
    </div>
  );
}
