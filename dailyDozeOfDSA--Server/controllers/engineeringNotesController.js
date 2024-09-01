import Note from "../models/Notes/NoteModel.js";
import NoteCategory from "../models/Notes/NoteCategory.js";
import NoteTag from "../models/Notes/NoteTagModel.js";
import SavedNote from "../models/User/SavedNote.js";
import EngNotesCategoryOption from "../models/Notes/EngNotesCategoryOption.js";

export async function yelloGetEngineeringNotes(request, response) {
  try {
    let { categoryVal, offset, showSavedNotes } = request.query;
    if (!categoryVal || !offset) {
      return response.status(400).json({
        success: false,
        message: "category value and page offset must be provided",
      });
    }

    offset = parseInt(offset);
    if (offset === NaN) {
      return response.status(400).json({
        success: false,
        message: "page number must be of type number",
      });
    }

    /** search for notes category in EngNotesCategoryOption Collection in the db */
    const notesCategoryExists = await EngNotesCategoryOption.findOne({
      optionValue: categoryVal,
    });
    if (!notesCategoryExists) {
      /** notes category doesn't exist in the db, then return the response */
      return response.status(400).json({
        success: false,
        message: "notes category couldn't be recognized",
      });
    }

    showSavedNotes = showSavedNotes === "true";
    const sessionUser = request.user;

    if (showSavedNotes && !request.isAuthenticated()) {
      return response.status(401).json({
        success: false,
        message: "you are not authorized to make this request",
      });
    }

    const pageLimit = 3;

    let pipeline = [];
    if (notesCategoryExists.optionValue !== "ALL") {
      pipeline.push({
        $match: {
          noteCategories: notesCategoryExists._id.toString(),
        },
      });
    }

    if (showSavedNotes) {
      pipeline.push(
        {
          $lookup: {
            from: "savednotes",
            let: { noteId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$note", "$$noteId"],
                      },
                      {
                        $eq: ["$createdBy", sessionUser?._id],
                      },
                      {
                        $eq: ["$isSaved", true],
                      },
                    ],
                  },
                },
              },
            ],
            as: "savedNotes",
          },
        },
        {
          $match: {
            savedNotes: { $ne: [] },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $project: {
            savedNotes: 0,
          },
        }
      );
    }

    pipeline.push(
      {
        $facet: {
          metadata: [{ $count: "totalNotes" }],
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: offset * pageLimit,
            },
            {
              $limit: pageLimit,
            },
            {
              $lookup: {
                from: "media",
                let: { noteContentId: { $toObjectId: "$noteContent" } },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$noteContentId"] },
                    },
                  },
                ],
                as: "noteContent",
              },
            },
            {
              $project: {
                noteTitle: 1,
                slug: 1,
                metaTitle: 1,
                metaDescription: 1,
                noteUrl: { $arrayElemAt: ["$noteContent.url", 0] },
              },
            },
          ],
        },
      },
      {
        $unwind: "$metadata",
      },
      {
        $project: {
          totalNotes: "$metadata.totalNotes",
          data: 1,
        },
      }
    );

    const engNotesData = await Note.aggregate([pipeline]);

    let engNotesArr = engNotesData?.[0]?.data ?? [];

    if (request.isAuthenticated() && sessionUser?._id) {
      /** get all the docs in savednotes collection where user matches the sessionUser and
       *  note matches the notes in engNotesArr
       */

      const savedNotes = await SavedNote.aggregate([
        {
          $match: {
            createdBy: sessionUser._id,
            note: {
              $in: engNotesArr.map((currNote) => currNote._id),
            },
          },
        },
      ]);

      engNotesArr = engNotesArr.map((currNote) => {
        let correspondingSavedNote = savedNotes.find((currSavedNote) => {
          return currSavedNote.note.equals(currNote._id);
        });

        if (correspondingSavedNote) {
          currNote.isSaved = correspondingSavedNote.isSaved;
        } else currNote.isSaved = false;

        return currNote;
      });
    }

    return response.status(200).json({
      success: true,
      data: engNotesArr,
      totalNumOfPages: Math.ceil(
        (engNotesData?.[0]?.totalNotes ?? 0) / pageLimit
      ),
    });
  } catch (error) {
    console.log("*** yelloGetEngineeringNotes: ***", error);
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function getEngineeringNotes(request, response) {
  try {
    const { category } = request.query;
    const sessionUser = request.user;

    const query =
      category && category !== "All" ? { noteCategories: category } : {};

    const notes = await Note.find(query)
      .populate("noteTags")
      .populate("noteCategories")
      .populate("noteContent");

    let transformedNotes = notes;
    if (sessionUser && sessionUser._id) {
      const savedNotes = await SavedNote.find({
        createdBy: sessionUser._id,
        isSaved: true,
      });
      transformedNotes = notes.map((note) => {
        const isSaved = savedNotes.some(
          (savedNote) => savedNote.note.toString() === note._id.toString()
        );
        return {
          ...note.toObject(),
          isSaved,
        };
      });
    }
    response.status(200).json({ success: true, data: transformedNotes });
  } catch (error) {
    console.log("Error fetching engineering notes:", error);
    response.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

export async function getEngineeringNoteCategories(request, response) {
  try {
    const categories = await EngNotesCategoryOption.find({});
    return response.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.log("Error fetching engineering note categories:", error);
    return response.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function getEngineeringNoteTags(request, response) {
  try {
    const tags = await NoteTag.find({});
    response.status(200).json({ success: true, data: tags });
  } catch (error) {
    console.log("Error fetching engineering note tags:", error);
    response.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

export async function getEngineeringNoteById(req, res) {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId)
      .populate("noteTags")
      .populate("noteCategories")
      .populate("noteContent");
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.log("Error fetching engineering note by ID:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}
