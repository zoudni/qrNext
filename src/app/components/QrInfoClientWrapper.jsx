"use client"; // This makes it a Client Component

import { useState } from "react";
import QrInfo from "./QrInfoTable"; // Import Server Component

export default function QrInfoClientWrapper({ event_id }) {
  const [qrLink, setQRLink] = useState(""); // State now exists in a Client Component

  return (
    <div>
      <QrInfo event_id={event_id} setQRLink={setQRLink} /> {/* Now valid */}
      {qrLink && <p>Generated Link: {qrLink}</p>} {/* Display link */}
    </div>
  );
}
