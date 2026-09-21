import { restaurantMenuMock } from "./Mockrestaurantmenu";
import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const json = restaurantMenuMock[resId];
      console.log("resId:", resId);
      console.log("Available keys:", Object.keys(restaurantMenuMock));
      console.log("Selected data:", json);
      setResInfo(json);
      console.log(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
