import ProblemSheetNameEnum from "../enums/ProblemSheetNameEnum.js";
import Problem from "../models/ProblemSheets/Problem.js";
import UserProblemStatus from "../models/User/UserProblemStatus.js";

export function extractS3Key(url) {
  try {
    if (typeof url !== "string" || !url.trim()) {
      throw new Error("Invalid input: URL must be a non-empty string.");
    }

    const s3Regex = /^https:\/\/(.+)\.s3\.(.+)\.amazonaws\.com\/(.+)$/;
    const match = url.match(s3Regex);
    if (match) {
      const key = match[3];
      console.log("Extracted key:", key);
      return key;
    } else {
      throw new Error(
        "The provided URL does not match the expected S3 format."
      );
    }
  } catch (error) {
    console.error("Error extracting S3 key:", error);
    return null;
  }
}

export async function getTotalNumOfProblemsInASheet(sheetName) {
  try {
    const problemsCount = await Problem.countDocuments({ sheetName });
    return problemsCount;
  } catch (error) {
    throw error;
  }
}

export async function getSeperateProblemStatusCountOfASheet(sheetName, user) {
  try {
    if (!ProblemSheetNameEnum.includes(sheetName)) {
      throw new Error("sheet name couldn't be recognized");
    }

    const totalNumOfProblems = await getTotalNumOfProblemsInASheet(sheetName);

    const statusCount = await UserProblemStatus.aggregate([
      { $match: { sheetName, user } },
      { $group: { _id: "$problemStatus", count: { $sum: 1 } } },
    ]);

    const statusMap = {
      DONE: 0,
      PENDING: 0,
      REVISIT: 0,
    };

    statusCount.forEach(function (statusInfo) {
      statusMap[statusInfo._id] = statusInfo.count;
    });

    statusMap.PENDING +=
      totalNumOfProblems - statusMap.DONE - statusMap.REVISIT;

    return statusMap;
  } catch (error) {
    throw error;
  }
}
