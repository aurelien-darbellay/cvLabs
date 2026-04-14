// useTestDialogFromQuery.js
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Opens a dialog when the URL has ?test=true, then removes the param.
 */
export default function useTestDialogFromQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("test") === "true") {
      setOpen(true);
      // remove the trigger so it doesn't reopen on refresh/back
      const next = new URLSearchParams(searchParams);
      next.delete("test");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const closeDialog = () => setOpen(false);

  return { open, closeDialog };
}
