import React from "react";
import { useWindowSize } from "~/hooks";
import { MOBILE_BREAKPOINT, resolvePublicAsset } from "~/utils";
import WindowTemplate from "../WindowTemplate";

interface PreviewProps {
  url?: string;
}

const Preview: React.FC<PreviewProps> = ({ url }) => {
  const { winWidth } = useWindowSize();
  const isMobile = winWidth <= MOBILE_BREAKPOINT;
  const src = resolvePublicAsset(url);

  const iframeSrc =
    src && !isMobile ? `${src}#zoom=150&navpanes=0&view=FitH&quality=2` : src ?? undefined;

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
