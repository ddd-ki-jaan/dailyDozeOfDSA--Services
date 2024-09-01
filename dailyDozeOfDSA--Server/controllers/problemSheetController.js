import StriverSDESheet from "./../models/ProblemSheets/StriverSDESheet.js";
import StriverA2ZSheetStep from "./../models/ProblemSheets/StriverA2ZSheetStep.js";
import Striver79Sheet from "./../models/ProblemSheets/Striver79Sheet.js";
import LoveBabbar450DSASheet from "./../models/ProblemSheets/LoveBabbar450DSASheet.js";
import ApnaCollegeDSASheet from "./../models/ProblemSheets/ApnaCollegeDSASheet.js";
import Blind75Sheet from "./../models/ProblemSheets/Blind75Sheet.js";
import NeetCodeSheet from "./../models/ProblemSheets/NeetCodeSheet.js";
import NishatChaharSDESheet from "./../models/ProblemSheets/NishantChaharSDESheet.js";
import UserProblemStatus from "../models/User/UserProblemStatus.js";
import ProblemSheetNameEnum from "../enums/ProblemSheetNameEnum.js";
import Problem from "../models/ProblemSheets/Problem.js";
import StriverA2ZSheetSubStep from "../models/ProblemSheets/StriverA2ZSheetSubStep.js";
import SheetDescription from "../models/ProblemSheets/SheetDescription.js";
import { getSeperateProblemStatusCountOfASheet } from "../services/utilServices.js";

async function getStriverSDESheet(request, response) {
  try {
    const sessionUser = request.user;
    let striverSDESheet = await StriverSDESheet.find({})
      .populate({
        path: "problems",
        populate: [
          {
            path: "practice_platform_links",
          },
          {
            path: "solution_article_links",
          },
        ],
      })
      .sort({ day_no: 1 })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = striverSDESheet.flatMap((sheetDoc) =>
        sheetDoc.problems.map((problem) => problem._id)
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      striverSDESheet = striverSDESheet.map((sheetDoc) => {
        sheetDoc.problems = sheetDoc.problems.map((problem) => {
          const status = statusMap.get(problem._id.toString());
          problem.status = status?.problemStatus ?? "PENDING";
          problem.problemNote = status?.problemNote || null;
          return problem;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: striverSDESheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getStriverA2ZSheet(request, response) {
  try {
    const sessionUser = request.user;

    let striverA2ZSheet = await StriverA2ZSheetStep.find({})
      .populate({
        path: "sub_steps",
        populate: {
          path: "problems",
          populate: [
            {
              path: "practice_platform_links",
            },
            {
              path: "solution_article_links",
            },
          ],
        },
      })
      .sort({
        step_no: 1,
      })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = striverA2ZSheet.flatMap((sheetDoc) =>
        sheetDoc.sub_steps.flatMap((currSubStep) =>
          currSubStep.problems.map((problem) => problem._id)
        )
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      striverA2ZSheet = striverA2ZSheet.map((sheetDoc) => {
        sheetDoc.sub_steps = sheetDoc.sub_steps.map((currSubStep) => {
          currSubStep.problems = currSubStep.problems.map((problem) => {
            const status = statusMap.get(problem._id.toString());
            problem.status = status?.problemStatus ?? "PENDING";
            problem.problemNote = status?.problemNote || null;
            return problem;
          });

          return currSubStep;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: striverA2ZSheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getStriver79Sheet(request, response) {
  try {
    const sessionUser = request.user;

    let striver79Sheet = await Striver79Sheet.find({})
      .populate({
        path: "problems",
        populate: [
          {
            path: "practice_platform_links",
          },
          {
            path: "solution_article_links",
          },
        ],
      })
      .sort({ day_no: 1 })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = striver79Sheet.flatMap((sheetDoc) =>
        sheetDoc.problems.map((problem) => problem._id)
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      striver79Sheet = striver79Sheet.map((sheetDoc) => {
        sheetDoc.problems = sheetDoc.problems.map((problem) => {
          const status = statusMap.get(problem._id.toString());
          problem.status = status?.problemStatus ?? "PENDING";
          problem.problemNote = status?.problemNote || null;
          return problem;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: striver79Sheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getLoveBabbar450DSASheet(request, response) {
  try {
    const sessionUser = request.user;

    let loveBabbar450DSASheet = await LoveBabbar450DSASheet.find({})
      .populate({
        path: "problems",
        populate: [
          {
            path: "practice_platform_links",
          },
          {
            path: "solution_article_links",
          },
        ],
      })
      .sort({ topic_no: 1 })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = loveBabbar450DSASheet.flatMap((sheetDoc) =>
        sheetDoc.problems.map((problem) => problem._id)
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      loveBabbar450DSASheet = loveBabbar450DSASheet.map((sheetDoc) => {
        sheetDoc.problems = sheetDoc.problems.map((problem) => {
          const status = statusMap.get(problem._id.toString());
          problem.status = status?.problemStatus ?? "PENDING";
          problem.problemNote = status?.problemNote || null;
          return problem;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: loveBabbar450DSASheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getApnaCollegeDSASheet(request, response) {
  try {
    const sessionUser = request.user;

    let apnaCollegeDSASheet = await ApnaCollegeDSASheet.find({})
      .populate({
        path: "problems",
        populate: [
          {
            path: "practice_platform_links",
          },
          {
            path: "solution_article_links",
          },
        ],
      })
      .sort({ day_no: 1 })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = apnaCollegeDSASheet.flatMap((sheetDoc) =>
        sheetDoc.problems.map((problem) => problem._id)
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      apnaCollegeDSASheet = apnaCollegeDSASheet.map((sheetDoc) => {
        sheetDoc.problems = sheetDoc.problems.map((problem) => {
          const status = statusMap.get(problem._id.toString());
          problem.status = status?.problemStatus ?? "PENDING";
          problem.problemNote = status?.problemNote || null;
          return problem;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: apnaCollegeDSASheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getBlind75Sheet(request, response) {
  try {
    const sessionUser = request.user;

    let blind75Sheet = await Blind75Sheet.find({})
      .populate({
        path: "problems",
        populate: [
          {
            path: "practice_platform_links",
          },
          {
            path: "solution_article_links",
          },
        ],
      })
      .sort({ topic_no: 1 })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = blind75Sheet.flatMap((sheetDoc) =>
        sheetDoc.problems.map((problem) => problem._id)
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      blind75Sheet = blind75Sheet.map((sheetDoc) => {
        sheetDoc.problems = sheetDoc.problems.map((problem) => {
          const status = statusMap.get(problem._id.toString());
          problem.status = status?.problemStatus ?? "PENDING";
          problem.problemNote = status?.problemNote || null;
          return problem;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: blind75Sheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getNeetCodeSheet(request, response) {
  try {
    const sessionUser = request.user;

    let neetCodeSheet = await NeetCodeSheet.find({})
      .populate({
        path: "problems",
        populate: [
          {
            path: "practice_platform_links",
          },
          {
            path: "solution_article_links",
          },
        ],
      })
      .sort({ topic_no: 1 })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = neetCodeSheet.flatMap((sheetDoc) =>
        sheetDoc.problems.map((problem) => problem._id)
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      neetCodeSheet = neetCodeSheet.map((sheetDoc) => {
        sheetDoc.problems = sheetDoc.problems.map((problem) => {
          const status = statusMap.get(problem._id.toString());
          problem.status = status?.problemStatus ?? "PENDING";
          problem.problemNote = status?.problemNote || null;
          return problem;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: neetCodeSheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getNishantChaharSDESheet(request, response) {
  try {
    const sessionUser = request.user;

    let nishantChaharSDESheet = await NishatChaharSDESheet.find({})
      .populate({
        path: "problems",
        populate: [
          {
            path: "practice_platform_links",
          },
          {
            path: "solution_article_links",
          },
        ],
      })
      .sort({ topic_no: 1 })
      .lean();

    if (sessionUser && sessionUser._id) {
      const userId = sessionUser._id;

      const problemIds = nishantChaharSDESheet.flatMap((sheetDoc) =>
        sheetDoc.problems.map((problem) => problem._id)
      );

      const userProblemStatuses = await UserProblemStatus.find({
        user: userId,
        problem: { $in: problemIds },
      });

      const statusMap = new Map();
      userProblemStatuses.forEach((statusObj) => {
        statusMap.set(statusObj.problem.toString(), {
          problemStatus: statusObj.problemStatus,
          problemNote: statusObj.problemNote,
        });
      });

      nishantChaharSDESheet = nishantChaharSDESheet.map((sheetDoc) => {
        sheetDoc.problems = sheetDoc.problems.map((problem) => {
          const status = statusMap.get(problem._id.toString());
          problem.status = status?.problemStatus ?? "PENDING";
          problem.problemNote = status?.problemNote || null;
          return problem;
        });

        return sheetDoc;
      });
    }

    response.status(200).json({ success: true, data: nishantChaharSDESheet });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function getProblemSheetsProblemsStatusDetails(request, response) {
  try {
    const sheetName = request.query.sheetName;

    if (!sheetName) {
      return response.status(400).json({
        success: false,
        message: "sheet name must be provided",
      });
    }

    if (!ProblemSheetNameEnum.includes(sheetName)) {
      return response.status(400).json({
        success: false,
        message: "sheet name couldn't be recognized",
      });
    }

    const sessionUser = request.user;
    const statusMap = await getSeperateProblemStatusCountOfASheet(
      sheetName,
      sessionUser._id
    );
    return response.status(200).json({
      success: true,
      message: "status counts of the sheet got retreived successfully",
      chartData: statusMap,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getSheetDescription(request, response) {
  try {
    const { sheetName } = request.query;
    console.log(sheetName);
    if (!sheetName) {
      return response
        .status(400)
        .json({ success: false, message: "Sheet Name is required" });
    }

    const sheetDescription = await SheetDescription.findOne({
      sheetName: sheetName,
    });
    if (!sheetDescription) {
      return response
        .status(404)
        .json({ success: false, message: "Invalid Sheet" });
    }

    return response.status(200).json({
      success: true,
      data: sheetDescription,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

export {
  getStriverSDESheet,
  getStriverA2ZSheet,
  getStriver79Sheet,
  getLoveBabbar450DSASheet,
  getBlind75Sheet,
  getNeetCodeSheet,
  getApnaCollegeDSASheet,
  getNishantChaharSDESheet,
  getProblemSheetsProblemsStatusDetails,
  getSheetDescription,
};
