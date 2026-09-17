import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { restaurantListMock } from "../utils/Mockrestaurantlist";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withPromotedLabel } from "./RestaurantCard";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const json = restaurantListMock;
      const restaurantCard = json?.data?.data?.cards?.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      setListOfRestaurants(restaurants);
      setAllRestaurants(restaurants);
    } catch (error) {
      console.error("Error loading restaurant list:", error);
    }
  };

  if (!onlineStatus) {
    return (
      <h1 className="p-6 text-center text-red-500 font-semibold">
        Looks like you're offline! Please check your internet connection.
      </h1>
    );
  }

  const { setUserName, loggedInUser } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-gray-500"
          placeholder="Search restaurant..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          onClick={() => {
            const filteredRestaurant = allRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase()),
            );
            setListOfRestaurants(filteredRestaurant);
          }}
        >
          Search
        </button>

        <button
          className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-sm rounded hover:bg-gray-200"
          onClick={() => {
            const filteredList = allRestaurants.filter(
              (res) => res.info.avgRating >= 4.5,
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated
        </button>

        <button
          className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-sm rounded hover:bg-gray-200"
          onClick={() => {
            setSearchText("");
            setListOfRestaurants(allRestaurants);
          }}
        >
          Reset
        </button>
        <div>
          <label className="mr-3">username : </label>
          <input
            type="text"
            placeholder="Enter username"
            className="border border-b px-2"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Restaurant List Cards */}
      <div className="flex flex-wrap">
        {listOfRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="no-underline text-inherit"
          >
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
