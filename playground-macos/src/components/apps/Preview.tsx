import React from "react";
import WindowTemplate from "../WindowTemplate";

interface PreviewProps {
  url?: string;
}

const Preview: React.FC<PreviewProps> = ({ url }) => {
  return (
    <WindowTemplate>
      <div className="h-full w-full bg-white">
        <iframe
          src={`${url}#zoom=150&navpanes=0&view=FitH&quality=2`}
          title="PDF Preview"
          className="h-full w-full"
          style={{ border: 'none' }}
        />
      </div>
    </WindowTemplate>
  );
};

export default Preview; 