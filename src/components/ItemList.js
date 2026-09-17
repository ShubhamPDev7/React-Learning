const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span className="font-semibold">{item?.card?.info?.name}</span>
              <span className="font-semibold">
                {" "}
                - ₹ {item?.card?.info?.price / 100}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {item?.card?.info?.description}
            </p>
          </div>
          <div className="w-3/12 p-4 relative flex justify-center items-center">
            <div className="absolute bottom-1">
              <button className="px-3 py-1 bg-white text-green-600 font-bold text-xs rounded border border-gray-300 shadow">
                Add +
              </button>
            </div>
            <img
              className="w-28 h-24 object-cover rounded-md"
              src={item?.card?.info?.imageId}
              alt={item?.card?.info?.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
