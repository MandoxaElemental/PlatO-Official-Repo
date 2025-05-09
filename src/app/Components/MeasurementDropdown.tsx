import React, { useState, useEffect, useRef } from 'react';

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

const categorizedMeasurements: Record<string, string[]> = {
  Imperial: ['tsp', 'tbsp', 'c', 'pt', 'qt', 'gal', 'oz', 'lbs'],
  Metric: ['ml', 'dl', 'l', 'mg', 'g', 'kg'],
  Size: ['sm', 'md', 'lg'],
  Miscellaneous: ['pinch', 'dash', 'piece', 'whole', 'half', 'slice', 'clove', 'stick', 'can', 'bottle', 'pkg'],
};

const MeasurementDropdown: React.FC<Props> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filtered = Object.entries(categorizedMeasurements).reduce(
    (acc, [category, units]) => {
      const filteredUnits = units.filter((u) =>
        u.toLowerCase().includes(filter.toLowerCase())
      );
      if (filteredUnits.length > 0) acc[category] = filteredUnits;
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div ref={dropdownRef} className="relative inline-block w-[140px]">
      <button
        type="button"
        className="w-full bg-white border border-gray-300 text-sm px-3 py-2 rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || 'Measurement'}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto p-2 space-y-2">
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full mb-2 border border-gray-300 px-2 py-1 text-sm rounded"
          />
          {Object.entries(filtered).map(([category, units]) => (
            <div key={category}>
              <p className="text-xs font-semibold text-gray-500">{category}</p>
              {units.map((unit) => (
                <div
                  key={unit}
                  className="cursor-pointer px-2 py-1 text-sm hover:bg-blue-100 rounded"
                  onClick={() => {
                    onSelect(unit);
                    setIsOpen(false);
                    setFilter('');
                  }}
                >
                  {unit}
                </div>
              ))}
            </div>
          ))}
          {Object.keys(filtered).length === 0 && (
            <p className="text-sm text-gray-500 text-center">No results</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MeasurementDropdown;
