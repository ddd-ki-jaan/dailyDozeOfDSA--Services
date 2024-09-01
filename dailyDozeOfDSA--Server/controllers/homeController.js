import AboutUs from "../models/Home/AboutUs.js"
import HomeSubtittle from "../models/Home/HomeSubtittle.js"
import SiteOffering from "../models/Home/SiteOffering.js"

export async function getAboutus(request, response) {
    try {
        const aboutus = await AboutUs.find({});
        response.status(200).json({ success: true, data: aboutus });
    } catch (error) {
        console.log("***getAboutus: ***", error);
        response.status(500).json({ success: false, message: "something went wrong" });
    }
}

export async function getHomeSubtittle(request, response) {
    try {
        const homeSubtittle = await HomeSubtittle.find({})
            .populate('image')
            .exec();
        response.status(200).json({ success: true, data: homeSubtittle });
    } catch (error) {
        console.log("***getHomeSubtittle: ***", error);
        response.status(500).json({ success: false, message: "something went wrong" });
    }
}

export async function getSiteOffering(request, response) {
    try {
        const siteOffering = await SiteOffering.find({});
        response.status(200).json({ success: true, data: siteOffering });
    } catch (error) {
        console.log("***getSiteOffering: ***", error);
        response.status(500).json({ success: false, message: "something went wrong" });
    }
}