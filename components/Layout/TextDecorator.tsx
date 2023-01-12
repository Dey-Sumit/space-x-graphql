const TextInBWLine = ({ text }: { text: string }) => {
  return (
    <h2 className="w-full text-center border-b-[2px] border-orange-300 mt-3 mx-0 leading-[4px]">
      <span className="px-2 text-orange-300 bg-gray-800 text-md">{text}</span>
    </h2>
  );
};

export { TextInBWLine };
