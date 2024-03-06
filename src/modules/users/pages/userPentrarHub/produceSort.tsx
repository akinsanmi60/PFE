import PopularDropdown from './popularDropdown';
import StateDropdown from './stateDropdown';

function ProduceSort({
  setPopluar,
  setState,
}: {
  setPopluar: (_value: string) => void;
  setState: (_value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[24px] font-[500]">
        <p className="text-[14px] leading-[20px] font-[400] font-primary text-[#666666] text-left">
          Sort by:
        </p>
        <PopularDropdown setPopluar={setPopluar} />
        <StateDropdown setState={setState} />
      </div>
    </div>
  );
}

export default ProduceSort;
