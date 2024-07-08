import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DateButtons = ({
  title,
  filterItems,
  handleFilterChange,
  selectedFilterItems,
}) => {
  useEffect(() => {
    if (selectedFilterItems.length === 0) {
      handleFilterChange(filterItems[0]); // "전체" 버튼을 활성화
    }
  }, [selectedFilterItems, filterItems, handleFilterChange]);
  const handleTabClick = (index) => {
    handleFilterChange(filterItems[index]);
  };
  return (
    <FilterWrap>
      {title && <FilterTit>{title}</FilterTit>}
      <FilterBox>
        {filterItems?.map((item, index) => (
          <button
            type="button"
            key={index}
            // array, !array 둘다 고려하는 코드
            className={`item ${
              Array.isArray(selectedFilterItems) &&
              selectedFilterItems.some(
                (selectedItem) => selectedItem.id === item.id
              )
                ? "active"
                : selectedFilterItems === item.id
                ? "active"
                : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {item.label}
          </button>
        ))}
      </FilterBox>
    </FilterWrap>
  );
};

export default DateButtons;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const FilterTit = styled.h4`
  font-size: 14px;
  color: #000;
  width: 100px;
`;

const FilterBox = styled.div`
  /* width: fit-content; */
  /* width: 300px; */
  width: 100%;
  height: 40px;
  display: flex;
  gap: 8px;
  /* background: transparent; */
  background: #fff;
  /* border: 1px solid #79747e; */
  /* border-radius: 20px; */
  overflow: hidden;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    color: #00000099;
    /* border-right: 1px solid #79747e; */
  }

  .item:last-child {
    /* border-right: none; */
  }

  .item.active {
    background-color: #e0e0e0;
    color: #000;
  }
`;
