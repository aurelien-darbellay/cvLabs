import { supabase } from "@/lib/supabaseClient";
import { log } from "@/utils/Log";

async function uploadToCloudinary(file: File) {
  const {
    data: { session },
    error: sessErr,
  } = await supabase.auth.getSession();
  log("session?", !!session, sessErr);
  log("token?", session?.access_token?.slice(0, 20));

  // 1) Ask your Edge Function for a signature
  const { data, error } = await supabase.functions.invoke("sign-cloudinary", {
    body: { folder: "cvs", resourceType: "image" },
  });

  if (error) throw error;
  const { cloudName, apiKey, timestamp, signature, folder } = data;

  // 2) Upload directly to Cloudinary
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  form.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );

  if (!uploadRes.ok)
    throw new Error(`Upload failed: ${await uploadRes.text()}`);
  return uploadRes.json(); // includes secure_url, public_id, etc.
}

export default uploadToCloudinary;
