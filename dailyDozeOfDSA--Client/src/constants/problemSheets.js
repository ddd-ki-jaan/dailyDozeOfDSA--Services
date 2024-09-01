import ApnaCollegeDSASheet from "../pages/SingleSheetPages/ApnaCollegeDSASheet/ApnaCollegeDSASheet";
import Blind75DSASheet from "../pages/SingleSheetPages/Blind75DSASheet/Blind75DSASheet";
import LoveBabbar450DSASheet from "../pages/SingleSheetPages/LoverBabbar450DSASheet/LoveBabbar450DSASheet";
import NeetCode150DSASheet from "../pages/SingleSheetPages/NeetCode150DSASheet/NeetCode150DSASheet";
import NishantChahar151DSASheet from "../pages/SingleSheetPages/NishantChahar151DSASheet/NishantChahar151DSASheet";
import Striver79DSASheet from "../pages/SingleSheetPages/Striver79DSASheet/Striver79DSASheet";
import StriverA2ZDSASheet from "../pages/SingleSheetPages/StriverA2ZDSASheet/StriverA2ZDSASheet";
import StriverSDESheet from "../pages/SingleSheetPages/StriverSDESheet/StriverSDESheet";

const problemSheets = [
  {
    sheetName: "Striver's SDE Sheet",
    slug: "striverSDESheet",
    sheetEnum: "STRIVER_SDE_SHEET",
    componentName: StriverSDESheet,
  },
  {
    sheetName: "Striver's A2Z DSA Sheet",
    slug: "striverA2ZDSASheet",
    sheetEnum: "STRIVER_A2Z_DSA_SHEET",
    componentName: StriverA2ZDSASheet,
  },
  {
    sheetName: "Striver's 79 DSA Sheet",
    slug: "striver79DSASheet",
    sheetEnum: "STRIVER_79_DSA_SHEET",
    componentName: Striver79DSASheet,
  },
  {
    sheetName: "Love Babbar's 450 DSA Sheet",
    slug: "450DSASheet",
    sheetEnum: "LOVE_BABBAR_450_DSA_SHEET",
    componentName: LoveBabbar450DSASheet,
  },
  {
    sheetName: "Apna College DSA Sheet",
    slug: "apnaCollegeDSASheet",
    sheetEnum: "APNA_COLLEGE_DSA_SHEET",
    componentName: ApnaCollegeDSASheet,
  },
  {
    sheetName: "Blind 75 DSA Sheet",
    slug: "blind75DSASheet",
    sheetEnum: "BLIND_75_DSA_SHEET",
    componentName: Blind75DSASheet,
  },
  {
    sheetName: "NeetCode 150 DSA Sheet",
    slug: "neetCode150DSASheet",
    sheetEnum: "NEET_CODE_150_DSA_SHEET",
    componentName: NeetCode150DSASheet,
  },
  {
    sheetName: "Nishant Chahar's 151 DSA Sheet",
    slug: "nishantChahar151DSASheet",
    sheetEnum: "NISHANT_CHAHAR_151_DSA_SHEET",
    componentName: NishantChahar151DSASheet,
  },
];

export default problemSheets;
