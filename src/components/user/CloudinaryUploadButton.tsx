import uploadToCloudinary from "@/services/cloudinary/cloudinaryService";
import { log } from "@/utils/Log";

interface CloudinaryUploadButtonProps {
  formData: {
    fullName: string;
    contactEmail: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolioUrl: string;
    profileImageUrl: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      contactEmail: string;
      phone: string;
      linkedin: string;
      github: string;
      portfolioUrl: string;
      profileImageUrl: string;
    }>
  >;
}

export function CloudinaryUploadButton({
  formData,
  setFormData,
}: CloudinaryUploadButtonProps) {
  const hasImage = formData.profileImageUrl !== "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadToCloudinary(file);
    log(result.secure_url);
    setFormData((prev) => ({
      ...prev,
      profileImageUrl: result.secure_url,
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Profile Picture
      </label>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="profilePictureInput"
        />

        {!hasImage ? (
          <label
            htmlFor="profilePictureInput"
            className="block w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
          >
            <div className="text-gray-600">
              <svg
                className="mx-auto h-8 w-8 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-sm font-medium">Click to upload</p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </label>
        ) : (
          <div className="relative inline-block group">
            <img
              src={formData.profileImageUrl}
              alt="Profile"
              className="h-24 w-24 rounded-lg object-cover border border-gray-300"
            />
            <label
              htmlFor="profilePictureInput"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 13a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
