import { Link } from "react-router-dom";

interface AssetCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  assetType:
    | "education"
    | "experience"
    | "profession"
    | "techskills"
    | "softskills"
    | "summaries";
  color: "blue" | "green" | "purple" | "pink" | "orange" | "indigo";
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    hover: "hover:bg-blue-100",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    hover: "hover:bg-green-100",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
    hover: "hover:bg-purple-100",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-600",
    hover: "hover:bg-pink-100",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    hover: "hover:bg-orange-100",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    hover: "hover:bg-indigo-100",
  },
};

export function AssetCard({
  icon,
  title,
  count,
  assetType,
  color,
}: AssetCardProps) {
  const colors = colorMap[color];

  return (
    <Link
      to={`/manage-assets-${assetType}`}
      className={`${colors.bg} ${colors.border} ${colors.hover} border-2 rounded-lg p-6 cursor-pointer transition block`}
    >
      <div className="flex items-center gap-4">
        <div className={`${colors.text} text-4xl`}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          <p className={`${colors.text} font-bold text-2xl`}>{count}</p>
          <p className="text-gray-500 text-sm">items</p>
        </div>
        <div className={`${colors.text} text-2xl`}>→</div>
      </div>
    </Link>
  );
}
