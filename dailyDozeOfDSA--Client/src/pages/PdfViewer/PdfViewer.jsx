import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  const optionsToKeep = [
    "sidebar-thumbnails",
    "sidebar-document-outline",
    "sidebar-bookmarks",
    "pager",
    "zoom-out",
    "zoom-in",
    "zoom-mode",
    "search",
  ];

  useEffect(() => {
    const container = containerRef.current; // This `useRef` instance will render the PDF.

    let PSPDFKit, instance;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

      const publicUrl = `${window.location.protocol}//${window.location.host}`
      console.log("*** publicUrl: ***", publicUrl);
      instance = await PSPDFKit.load({
        licenseKey: import.meta.env.VITE_PSPDFKIT_LICENSE_KEY,
        styleSheets: ["/custom-pspdf-kit-style.css"],
        container,
        // document: "/sample.pdf",
        document: "https://www.juniper.net/assets/de/de/local/pdf/books/de-tin-chapter20.pdf",
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
        renderPageCallback: function (ctx, pageIndex, pageSize) {
          const pageWidth = pageSize.width;
          const pageHeight = pageSize.height;
          ctx.font = "18px Montserrat";
          ctx.fillStyle = "black";
          ctx.fillText("dailydozeofdsa.com", 20, 40);
          ctx.fillText("dailydozeofdsa.com", pageWidth / 2, pageHeight - 40);
        },
      });

      let toolbarItems = instance.toolbarItems;
      instance.setToolbarItems(
        toolbarItems.filter((item) => optionsToKeep.includes(item.type))
      );
      instance.setInlineTextSelectionToolbarItems(
        ({ defaultItems, hasDesktopLayout }, selection) => {
          return [];
        }
      );
      instance.setViewState((state) => state.set("allowPrinting", false));
      // instance.setViewState((state) => state.set("currentPageIndex", 3));

      const sampleBookmarks = [
        new PSPDFKit.Bookmark({
          name: "bookmark - 1",
          action: new PSPDFKit.Actions.GoToAction({ pageIndex: 1 }),
        }),
        new PSPDFKit.Bookmark({
          name: "bookmark - 2",
          action: new PSPDFKit.Actions.GoToAction({ pageIndex: 3 }),
        }),
      ];

      instance.create(sampleBookmarks);

      instance.addEventListener("bookmarks.create", async (bookmark) => {
        console.log("Bookmark created", bookmark.toJS());
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return <div ref={containerRef} className="w-full h-lvh" />;
}
