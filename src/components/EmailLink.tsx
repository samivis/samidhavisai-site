import { useEffect, useState } from "react";
import { emailParts } from "../content";

/**
 * Renders an email link WITHOUT putting the address in the static HTML/JS
 * as a scrapeable "name@domain.com" string. The address is assembled in the
 * browser after mount, so spam bots reading the page source find nothing.
 *
 * - Pass children to use custom link text (e.g. "Email me").
 * - Omit children to display the address itself (assembled at runtime).
 */
export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(emailParts.join("@"));
  }, []);

  const label = children ?? address;

  return (
    <a
      className={className}
      href={address ? `mailto:${address}` : undefined}
      onClick={(e) => {
        // Fallback: if JS assembled late, build it on click too.
        if (!address) {
          e.preventDefault();
          window.location.href = `mailto:${emailParts.join("@")}`;
        }
      }}
    >
      {label}
    </a>
  );
}
