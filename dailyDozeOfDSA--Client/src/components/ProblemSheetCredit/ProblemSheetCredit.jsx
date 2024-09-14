function ProblemSheetCredit({ sheetDescription }) {
  return (
    <div className="relative w-full min-h-[100px] mb-4 border border-black rounded-tr-[14px] rounded-bl-[14px]">
      <div className="p-4 max-h-full overflow-scroll rounded-[14px]">
        {sheetDescription.description}
      </div>
      <div className="absolute bg-white -top-3 left-6 px-4 text-lg font-semibold">
        {sheetDescription.title}
      </div>
    </div>
  );
}

export default ProblemSheetCredit;
