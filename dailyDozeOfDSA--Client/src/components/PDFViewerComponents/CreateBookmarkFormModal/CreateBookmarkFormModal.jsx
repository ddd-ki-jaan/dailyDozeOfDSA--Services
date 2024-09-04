import {
  Modal,
  Label,
  TextInput,
  Textarea,
  Button,
  Flowbite,
} from "flowbite-react";
import { useContext } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { PDFViewerContext } from "../../../contexts/pdfViewerContext";

function CreateBookmarkFormModal() {
  const {
    showCreateBookmarkModal,
    createBookmarkFormData,
    createBookmarkFormFieldErrors,
    setCreateBookmarkFormDataHandler,
    toggleShowCreateBookmarkModal,
  } = useContext(PDFViewerContext);

  async function createBookmarkHandler() {
    try {
      const hasErrors = Object.values(createBookmarkFormFieldErrors).some(
        (value) => value
      );

      if (hasErrors) return;
    } catch (error) {
      handleApiError(error, navigate, setUserLoggedInStatusToFalse);
    }
  }

  const customTheme = {
    textInput: {
      field: {
        input: {
          colors: {
            bllack:
              "border-gray-300 bg-gray-50 text-gray-900 focus:border-black focus:ring-black",
          },
        },
      },
    },
    textarea: {
      colors: {
        bllack:
          "border-gray-300 bg-gray-50 text-gray-900 focus:border-black focus:ring-black",
      },
    },
    button: {
      color: {
        bllack:
          "border border-transparent bg-black text-white enabled:hover:border enabled:hover:border-black enabled:hover:bg-white enabled:hover:text-black",
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal
        size="md"
        show={showCreateBookmarkModal}
        onClose={toggleShowCreateBookmarkModal}
        dismissible
      >
        <Modal.Header>Create A Bookmark...</Modal.Header>
        <Modal.Body>
          <div className="space-y-5">
            <div>
              <div className="mb-1 block">
                <Label htmlFor="pageNum" value="Page number" />
              </div>
              <TextInput
                id="pageNum"
                name="pageNum"
                placeholder="type page number"
                onChange={(event) =>
                  setCreateBookmarkFormDataHandler(
                    "pageNum",
                    event.target.value
                  )
                }
                value={createBookmarkFormData.pageNum}
                color="bllack"
                required
              />
              {createBookmarkFormFieldErrors.pageNum && (
                <div className="text-sm text-red-600">
                  {createBookmarkFormFieldErrors.pageNum}
                </div>
              )}
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="bookmarkTitle" value="Bookmark title" />
              </div>
              <TextInput
                id="bookmarkTitle"
                name="bookmarkTitle"
                placeholder="write title for the bookmark"
                onChange={(event) =>
                  setCreateBookmarkFormDataHandler(
                    "bookmarkTitle",
                    event.target.value
                  )
                }
                value={createBookmarkFormData.bookmarkTitle}
                color="bllack"
                required
              />
              {createBookmarkFormFieldErrors.bookmarkTitle && (
                <div className="text-sm text-red-600">
                  {createBookmarkFormFieldErrors.bookmarkTitle}
                </div>
              )}
            </div>
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="bookmarkDescription"
                  value="Bookmark description"
                />
              </div>
              <Textarea
                id="bookmarkDescription"
                name="bookmarkDescription"
                placeholder="write title description for the bookmark"
                onChange={(event) =>
                  setCreateBookmarkFormDataHandler(
                    "bookmarkDescription",
                    event.target.value
                  )
                }
                value={createBookmarkFormData.bookmarkDescription}
                rows={4}
                color="bllack"
                required
              />
              {createBookmarkFormFieldErrors.bookmarkDescription && (
                <div className="text-sm text-red-600">
                  {createBookmarkFormFieldErrors.bookmarkDescription}
                </div>
              )}
            </div>
            <div className="flex float-right gap-x-4">
              <Button color="bllack" onClick={toggleShowCreateBookmarkModal}>
                Cancel
              </Button>
              <Button
                color="bllack"
                processingSpinner={
                  <BiLoaderAlt className="animate-spin text-lg" />
                }
                onClick={{}}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}

export default CreateBookmarkFormModal;
