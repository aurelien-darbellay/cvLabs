import { AuthButton } from "@/components/auth/AuthButton";
import "./LoginPage.css";
export default function LoginPage() {
  return (
    <div className="login-page min-h-screen flex flex-col items-center justify-center ">
      <div>
        <svg
          className="mt-10 mb-4"
          width="480"
          height="96"
          viewBox="0 0 480 96"
          role="img"
          aria-label="CVsLab"
        >
          <defs>
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.35" />
            </filter>
          </defs>
          <text
            x="50%"
            y="70%"
            textAnchor="middle"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="10"
            paintOrder="stroke fill"
            fontFamily="Anton, sans-serif"
            fontSize="72"
            letterSpacing="7"
            filter="url(#logoShadow)"
          >
            CVsLab
          </text>
        </svg>
      </div>
      <div className="scene">
        <div className="cv">
          <div className="cv-avatar" aria-hidden="true" />
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
