import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { Link } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  console.log("resId in component:", resId);
  console.log("resInfo:", resInfo);

  const [showIndex, setShowIndex] = useState(0);

  const dummy = "Dummy Data";

  if (!resInfo) {
    return <Shimmer />;
  }

  // Locate the REGULAR cards group
  const regularCards = resInfo?.data?.cards?.find(
    (c) => c?.groupedCard?.cardGroupMap?.REGULAR,
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  console.log("regularCards:", regularCards);

  // Restaurant details (name, cuisines, costForTwo)
  const restaurantInfo = regularCards?.find(
    (c) => c?.card?.card?.info?.id === resId,
  )?.card?.card?.info;

  // Get the first item cards list directly (e.g. Recommended)
  const itemCards =
    regularCards?.find(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    )?.card?.card?.itemCards || [];

  const categories = regularCards.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );

  // console.log(categories);

  const { name, cuisines, costForTwo } = restaurantInfo || {};

  return (
    <div>
      {/* Restaurant Header */}

      <div className="text-center">
        <h1 className="font-bold my-6 text-2xl">{name}</h1>
        <p className="font-semibold text-lg">
          {cuisines?.join(", ")} • {costForTwo}
        </p>
        {/* categories accordions */}
        {categories?.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title || index}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() =>
              setShowIndex((prevIndex) => (prevIndex === index ? null : index))
            }
            dummy={dummy}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
