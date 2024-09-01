import axios from "axios";

export async function getEngineeringNotes(categoryVal, offset, showSavedNotes) {
  const encodedCategoryVal = encodeURIComponent(categoryVal);
  try {
    const response = await axios.get(
      `/api/v1/notes/getEngineeringNotes?categoryVal=${encodedCategoryVal}&offset=${offset}&showSavedNotes=${showSavedNotes}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getEngineeringNoteCategories() {
  try {
    const response = await axios.get(
      `/api/v1/notes/getEngineeringNoteCategories`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getEngineeringNoteTags() {
  try {
    const response = await axios.get(`/api/v1/notes/getEngineeringNoteTags`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getEngineeringNoteById(noteId) {
  try {
    const response = await axios.get(
      `/api/v1/notes/getEngineeringNoteById/${noteId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
