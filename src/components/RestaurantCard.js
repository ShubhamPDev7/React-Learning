const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, sla, costForTwo } =
    resData?.info;

  return (
    <div className="m-3 p-3 w-60 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-md transition">
      <img
        className="w-full h-36 object-cover rounded-md"
        alt="res-logo"
        src={cloudinaryImageId}
      />
      <h3 className="font-bold text-base mt-2 truncate">{name}</h3>
      <h4 className="text-xs text-gray-500 truncate">{cuisines.join(", ")}</h4>
      <div className="flex items-center justify-between mt-2 text-xs font-semibold text-gray-700">
        <span>⭐ {avgRating}</span>
        <span>{sla?.deliveryTime} mins</span>
        <span>{costForTwo}</span>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-5 left-5 z-10 bg-black/75 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
