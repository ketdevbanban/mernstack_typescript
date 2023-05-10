import React, { useState } from "react";

interface Province {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  provinceId: number;
}

const provinces: Province[] = [
  { id: 1, name: "Province A" },
  { id: 2, name: "Province B" },
];

const districts: District[] = [
  { id: 1, name: "District A1", provinceId: 1 },
  { id: 2, name: "District A2", provinceId: 1 },
  { id: 3, name: "District B1", provinceId: 2 },
  { id: 4, name: "District B2", provinceId: 2 },
];

const ProvinceDistrictForm = () => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number>();
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>();
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = parseInt(e.target.value);
    setSelectedProvinceId(provinceId);
    setSelectedDistrictId(undefined);
  };
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = parseInt(e.target.value);
    setSelectedDistrictId(districtId);
  };
  const filteredDistricts = selectedProvinceId
    ? districts.filter((d) => d.provinceId === selectedProvinceId)
    : [];
  return (
    <form>
      <div>
        <label htmlFor="province">Province:</label>
        <select name="province" id="province" onChange={handleProvinceChange}>
          <option value="">-- Select Province --</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="district">District:</label>
        <select
          name="district"
          id="district"
          value={selectedDistrictId}
          onChange={handleDistrictChange}
        >
          <option value="">-- Select District --</option>
          {filteredDistricts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ProvinceDistrictForm;
