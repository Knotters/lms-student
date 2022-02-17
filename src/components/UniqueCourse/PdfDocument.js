import React, { useContext } from "react";
import { MediaContext } from "../../context/MediaContext";
import { FaFilePdf } from "react-icons/fa";

const PdfDocument = () => {
  const { mediaUrl } = useContext(MediaContext);

  return (
    <div className="lesson-pdf-document">
      <div className="pdf-wrapper">
        <p style={{ fontWeight: "500" }}>
          View or Download this document from the link below
        </p>
        <a href={mediaUrl} target="blank" download>
          <FaFilePdf /> PDF
        </a>
      </div>
    </div>
  );
};

export default PdfDocument;
