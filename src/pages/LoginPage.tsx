import { AuthButton } from "@/components/auth/AuthButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
          CVs' Lab
        </h1>
        <p className="text-xl text-slate-300 mb-12">
          Create, manage, and export your professional CVs
        </p>
        <AuthButton />
      </div>
    </div>
  );
}
