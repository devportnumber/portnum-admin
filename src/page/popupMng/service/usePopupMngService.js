import React, { useState, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";

// 팝업관리 서비스 로직
export const usePopupMngService = () => {
  const { fetchData, loading, data: storeList, error } = useAxios()

  useEffect(() => {
    fetchData("GET", `/list`, null, null)
    console.log("storeList", storeList)
  }, []);

  return {
    storeList,
  };
};
