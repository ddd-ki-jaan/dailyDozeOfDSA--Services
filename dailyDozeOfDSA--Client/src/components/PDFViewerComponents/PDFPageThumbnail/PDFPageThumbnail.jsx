import React, { useContext, useEffect, useRef } from "react";
import { Thumbnail } from "react-pdf";
import { PDFViewerContext } from "../../../contexts/pdfViewerContext";
import { Virtuoso } from "react-virtuoso";

function PDFPageThumbnail({ navigateToClickedPageNumberHandler }) {
  const {
    totalNumOfPages,
    lastViewedThumbnailPageNum,
    setLastViewedThumbnailPageNumHandler,
  } = useContext(PDFViewerContext);

  const virtuosoRef = useRef(null);

  function handleScroll(event) {
    const element = event.target;
    const itemList = element.querySelector(
      '[data-testid="virtuoso-item-list"]'
    );
    const itemListChildren = itemList.children;
    const numOfChildren = itemListChildren.length;

    if (numOfChildren === 0) return;
    const requiredChild = itemListChildren.item(0);

    let yelloPageNum = requiredChild.getAttribute("data-index");
    if (!yelloPageNum || isNaN(parseInt(yelloPageNum))) return;

    yelloPageNum = parseInt(yelloPageNum);
    ++yelloPageNum;

    setLastViewedThumbnailPageNumHandler(yelloPageNum);
  }

  return (
    <Virtuoso
      onScroll={handleScroll}
      ref={virtuosoRef}
      totalCount={totalNumOfPages}
      initialTopMostItemIndex={
        lastViewedThumbnailPageNum ? lastViewedThumbnailPageNum - 1 : 0
      }
      itemContent={(index) => (
        <div key={index + 1} className="mb-4">
          <Thumbnail
            onItemClick={({ pageIndex }) =>
              navigateToClickedPageNumberHandler(pageIndex)
            }
            width="200"
            scale="1.2"
            key={index + 1}
            pageNumber={index + 1}
          />
          <span className="text-sm">
            {index + 1} / {totalNumOfPages}
          </span>
        </div>
      )}
    />
  );
}

export default PDFPageThumbnail;
