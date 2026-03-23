import React from "react";
import { resolvePublicAsset } from "~/utils";
import WindowTemplate from "../WindowTemplate";

interface PreviewProps {
  url?: string;
}

/** Match About resume embed: minimal PDF chrome, fit page width. */
const PDF_VIEW_FRAG = "toolbar=0&navpanes=0&scrollbar=0&view=FitH";

const Preview: React.FC<PreviewProps> = ({ url }) => {
  const src = resolvePublicAsset(url);

  const iframeSrc = src ? `${src}#${PDF_VIEW_FRAG}` : undefined;

  return (
    <WindowTemplate>
      <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col gap-3 bg-white">
        {!src && (
          <p className="py-8 text-center text-gray-600">No document loaded.</p>
        )}

        {src && (
          <iframe
            src={iframeSrc}
            title="PDF Preview"
            className="h-full min-h-[70vh] w-full flex-1 border-0"
          />
        )}
      </div>
    </WindowTemplate>
  );
};

export default Preview;
