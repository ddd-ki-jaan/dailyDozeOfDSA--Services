import Job from "../models/Jobs/JobModel.js";
import Company from "../models/Jobs/CompanyModel.js";
import Tag from "../models/Jobs/TagModel.js";

export async function getTotalNumOfJobs(request, response) {
  try {
    const totalNumOfJobs = await Job.find({}).count();
    response.status(200).json({ totalNumOfJobs: totalNumOfJobs });
  } catch (error) {
    console.log("***totalNumOfJobs: ***", error);
    response.status(500).json({ message: "something went wrong" });
  }
}

export async function getJobs(request, response) {
  try {
    let limit = request.query.limit || 10;
    let offset = request.query.offset || 0;
    let keyword = (request.query.keyword || "").toLowerCase();

    limit = parseInt(limit);
    if (limit === NaN) limit = 10;
    offset = parseInt(offset);
    if (offset === NaN) offset = 0;

    const searchRegex = new RegExp(keyword, "i");

    let result = await Job.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "tags",
          let: {
            tagIds: {
              $map: {
                input: "$tags",
                as: "tagId",
                in: { $toObjectId: "$$tagId" }
              }
            }
          },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$tagIds"] },
              },
            },
          ],
          as: "tagsArr",
        },
      },
      {
        $lookup: {
          from: "companies",
          let: { companyId: { $toObjectId: "$company" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$companyId"] },
              },
            },
          ],
          as: "companyArr",
        },
      },
      {
        $match: {
          $or: [
            { jobTitle: searchRegex },
            { "tagsArr.tagName": searchRegex },
            { "companyArr.companyName": searchRegex },
          ],
        },
      },
      {
        $facet: {
          jobCount: [{ $count: "totalNumOfJobs" }],
          jobs: [
            { $skip: limit * offset },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                jobTitle: 1,
                applyLink: 1,
                tags: "$tagsArr",
                company: { $arrayElemAt: ["$companyArr", 0] },
              },
            },
          ],
        },
      },
    ]);

    const jobs = result?.[0]?.jobs ?? [];
    const totalNumOfJobs = result?.[0]?.jobCount?.[0]?.totalNumOfJobs ?? 0;

    const responseData = {
      total_no_of_pages: Math.ceil(totalNumOfJobs / limit),
      page_data: jobs,
    };

    return response.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error!!!" });
  }
}

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find();
    const counts = await Job.countDocuments();
    if (counts === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({ counts, data: jobs });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find();
    const counts = await Company.countDocuments();
    if (counts === 0) {
      return res.status(404).json({ message: "No companies found" });
    }

    res.status(200).json({ counts, data: companies });
  } catch (error) {
    console.error("Error fetching all companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllTags(req, res) {
  try {
    const tags = await Tag.find();
    const counts = await Tag.countDocuments();
    if (counts === 0) {
      return res.status(404).json({ message: "No tags found" });
    }

    res.status(200).json({ counts, data: tags });
  } catch (error) {
    console.error("Error fetching all tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

import Job from "../models/Jobs/JobModel.js";
import Company from "../models/Jobs/CompanyModel.js";
import Tag from "../models/Jobs/TagModel.js";

export async function getTotalNumOfJobs(request, response) {
  try {
    const totalNumOfJobs = await Job.find({}).count();
    response.status(200).json({ totalNumOfJobs: totalNumOfJobs });
  } catch (error) {
    console.log("***totalNumOfJobs: ***", error);
    response.status(500).json({ message: "something went wrong" });
  }
}

export async function getJobs(request, response) {
  try {
    let limit = request.query.limit || 10;
    let offset = request.query.offset || 0;
    let keyword = (request.query.keyword || "").toLowerCase();

    limit = parseInt(limit);
    if (limit === NaN) limit = 10;
    offset = parseInt(offset);
    if (offset === NaN) offset = 0;

    const searchRegex = new RegExp(keyword, "i");

    let result = await Job.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tagsArr",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "companyArr",
        },
      },
      {
        $lookup: {
          from: "media",
          localField: "companyArr.companyLogo",
          foreignField: "_id",
          as: "companyLogoArr",
        },
      },
      {
        $match: {
          $or: [
            { jobTitle: searchRegex },
            { "tagsArr.tagName": searchRegex },
            { "companyArr.companyName": searchRegex },
          ],
        },
      },
      {
        $facet: {
          jobCount: [{ $count: "totalNumOfJobs" }],
          jobs: [
            { $skip: limit * offset },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                jobTitle: 1,
                applyLink: 1,
                tags: "$tagsArr",
                // company: { $arrayElemAt: ["$companyArr", 0] },
                company: {
                  companyName: { $arrayElemAt: ["$companyArr.companyName", 0] },
                  companyLogo: { $arrayElemAt: ["$companyLogoArr.url", 0] },
                },
              },
            },
          ],
        },
      },
    ]);

    const jobs = result?.[0]?.jobs ?? [];
    const totalNumOfJobs = result?.[0]?.jobCount?.[0]?.totalNumOfJobs ?? 0;

    const responseData = {
      total_no_of_pages: Math.ceil(totalNumOfJobs / limit),
      page_data: jobs,
    };

    return response.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error!!!" });
  }
}

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find();
    const counts = await Job.countDocuments();
    if (counts === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({ counts, data: jobs });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find();
    const counts = await Company.countDocuments();
    if (counts === 0) {
      return res.status(404).json({ message: "No companies found" });
    }

    res.status(200).json({ counts, data: companies });
  } catch (error) {
    console.error("Error fetching all companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllTags(req, res) {
  try {
    const tags = await Tag.find();
    const counts = await Tag.countDocuments();
    if (counts === 0) {
      return res.status(404).json({ message: "No tags found" });
    }

    res.status(200).json({ counts, data: tags });
  } catch (error) {
    console.error("Error fetching all tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
