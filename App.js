import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://th.bing.com/th/id/OIP.qi_jXG1KvOomyGD3LAEr2AAAAA?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    totalRatingsString,
    slaString,
    costForTwo,
  } = resData?.data;
  return (
    <div className="res-card">
      <img className="res-logo" src={cloudinaryImageId} alt="res-logo" />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{totalRatingsString}</h4>
      <h4>{slaString}</h4>
      <h4>₹{costForTwo / 100}</h4>
    </div>
  );
};

const resList = [
  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100001",
      name: "Punjabi Delight",
      uuid: "a1b2c3d4-1111-4444-8888-123456789001",
      city: "1",
      area: "Kharadi",
      totalRatingsString: "394+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
      cuisines: ["North Indian", "Punjabi", "Biryani"],
      tags: ["Great Offers"],
      costForTwo: 55000,
      costForTwoString: "₹550 FOR TWO",
      deliveryTime: 33,
      minDeliveryTime: 33,
      maxDeliveryTime: 36,
      slaString: "33 MINS",
      lastMileTravel: 0.8,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100002",
      name: "Spicy Kolhapuri",
      uuid: "a1b2c3d4-1111-4444-8888-123456789002",
      city: "1",
      area: "Wakad",
      totalRatingsString: "665+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Punjabi", "Biryani", "Beverages"],
      tags: ["Bestseller"],
      costForTwo: 60000,
      costForTwoString: "₹600 FOR TWO",
      deliveryTime: 45,
      minDeliveryTime: 45,
      maxDeliveryTime: 48,
      slaString: "45 MINS",
      lastMileTravel: 0.9,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100003",
      name: "Punjabi Express",
      uuid: "a1b2c3d4-1111-4444-8888-123456789003",
      city: "1",
      area: "Wakad",
      totalRatingsString: "335+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Maharashtrian", "Biryani", "Punjabi"],
      tags: ["Bestseller", "Highly Reordered"],
      costForTwo: 20000,
      costForTwoString: "₹200 FOR TWO",
      deliveryTime: 32,
      minDeliveryTime: 32,
      maxDeliveryTime: 36,
      slaString: "32 MINS",
      lastMileTravel: 3.3,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100004",
      name: "Shree Kolhapuri",
      uuid: "a1b2c3d4-1111-4444-8888-123456789004",
      city: "1",
      area: "Wakad",
      totalRatingsString: "274+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Momos", "Punjabi", "Continental", "Bakery"],
      tags: ["Great Offers", "Trending"],
      costForTwo: 30000,
      costForTwoString: "₹300 FOR TWO",
      deliveryTime: 25,
      minDeliveryTime: 25,
      maxDeliveryTime: 30,
      slaString: "25 MINS",
      lastMileTravel: 4.8,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100005",
      name: "Street Bar & Kitchen",
      uuid: "a1b2c3d4-1111-4444-8888-123456789005",
      city: "1",
      area: "Baner",
      totalRatingsString: "795+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Sandwich", "Thai", "Street Food"],
      tags: [],
      costForTwo: 50000,
      costForTwoString: "₹500 FOR TWO",
      deliveryTime: 46,
      minDeliveryTime: 46,
      maxDeliveryTime: 52,
      slaString: "46 MINS",
      lastMileTravel: 0.8,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100006",
      name: "Swad Bites",
      uuid: "a1b2c3d4-1111-4444-8888-123456789006",
      city: "1",
      area: "Aundh",
      totalRatingsString: "90+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Continental", "Healthy Food", "Rolls", "Punjabi", "Momos"],
      tags: [],
      costForTwo: 35000,
      costForTwoString: "₹350 FOR TWO",
      deliveryTime: 50,
      minDeliveryTime: 50,
      maxDeliveryTime: 50,
      slaString: "50 MINS",
      lastMileTravel: 5.7,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100007",
      name: "Street Grill",
      uuid: "a1b2c3d4-1111-4444-8888-123456789007",
      city: "1",
      area: "Kharadi",
      totalRatingsString: "1K+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Italian", "Pizza", "Fast Food"],
      tags: ["Bestseller"],
      costForTwo: 40000,
      costForTwoString: "₹400 FOR TWO",
      deliveryTime: 30,
      minDeliveryTime: 30,
      maxDeliveryTime: 31,
      slaString: "30 MINS",
      lastMileTravel: 5.1,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100008",
      name: "Street Kitchen",
      uuid: "a1b2c3d4-1111-4444-8888-123456789008",
      city: "1",
      area: "Magarpatta",
      totalRatingsString: "2K+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Italian", "Rolls", "Chinese"],
      tags: ["Highly Reordered"],
      costForTwo: 55000,
      costForTwoString: "₹550 FOR TWO",
      deliveryTime: 37,
      minDeliveryTime: 37,
      maxDeliveryTime: 39,
      slaString: "37 MINS",
      lastMileTravel: 7.1,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100009",
      name: "Desi Treats",
      uuid: "a1b2c3d4-1111-4444-8888-123456789009",
      city: "1",
      area: "Kharadi",
      totalRatingsString: "174+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Beverages", "Fast Food", "Chinese", "Street Food"],
      tags: [],
      costForTwo: 15000,
      costForTwoString: "₹150 FOR TWO",
      deliveryTime: 51,
      minDeliveryTime: 51,
      maxDeliveryTime: 53,
      slaString: "51 MINS",
      lastMileTravel: 6.7,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100010",
      name: "Urban Kitchen",
      uuid: "a1b2c3d4-1111-4444-8888-123456789010",
      city: "1",
      area: "Wakad",
      totalRatingsString: "727+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Continental", "Healthy Food", "Punjabi", "Mughlai"],
      tags: ["Great Offers"],
      costForTwo: 50000,
      costForTwoString: "₹500 FOR TWO",
      deliveryTime: 55,
      minDeliveryTime: 55,
      maxDeliveryTime: 55,
      slaString: "55 MINS",
      lastMileTravel: 3.4,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100011",
      name: "Biryani House",
      uuid: "a1b2c3d4-1111-4444-8888-123456789011",
      city: "1",
      area: "Viman Nagar",
      totalRatingsString: "512+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Biryani", "North Indian", "Mughlai"],
      tags: ["Bestseller"],
      costForTwo: 45000,
      costForTwoString: "₹450 FOR TWO",
      deliveryTime: 38,
      minDeliveryTime: 38,
      maxDeliveryTime: 42,
      slaString: "38 MINS",
      lastMileTravel: 2.4,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100012",
      name: "Mumbai Tadka",
      uuid: "a1b2c3d4-1111-4444-8888-123456789012",
      city: "1",
      area: "Hadapsar",
      totalRatingsString: "438+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
      cuisines: ["North Indian", "Maharashtrian", "Thalis"],
      tags: ["Great Offers"],
      costForTwo: 30000,
      costForTwoString: "₹300 FOR TWO",
      deliveryTime: 29,
      minDeliveryTime: 29,
      maxDeliveryTime: 34,
      slaString: "29 MINS",
      lastMileTravel: 1.9,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100013",
      name: "The Chinese Wok",
      uuid: "a1b2c3d4-1111-4444-8888-123456789013",
      city: "1",
      area: "Kothrud",
      totalRatingsString: "821+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Chinese", "Asian", "Thai"],
      tags: ["Highly Reordered"],
      costForTwo: 40000,
      costForTwoString: "₹400 FOR TWO",
      deliveryTime: 35,
      minDeliveryTime: 35,
      maxDeliveryTime: 39,
      slaString: "35 MINS",
      lastMileTravel: 3.7,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100014",
      name: "South Spice",
      uuid: "a1b2c3d4-1111-4444-8888-123456789014",
      city: "1",
      area: "Shivajinagar",
      totalRatingsString: "356+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80",
      cuisines: ["South Indian", "Dosa", "Idli", "Beverages"],
      tags: ["Bestseller", "Great Offers"],
      costForTwo: 25000,
      costForTwoString: "₹250 FOR TWO",
      deliveryTime: 27,
      minDeliveryTime: 27,
      maxDeliveryTime: 30,
      slaString: "27 MINS",
      lastMileTravel: 2.1,
    },
  },

  {
    type: "restaurant",
    data: {
      type: "F",
      id: "100015",
      name: "Cafe Mocha",
      uuid: "a1b2c3d4-1111-4444-8888-123456789015",
      city: "1",
      area: "Baner",
      totalRatingsString: "1.2K+ ratings",
      cloudinaryImageId:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
      cuisines: ["Cafe", "Desserts", "Beverages", "Italian"],
      tags: ["Trending"],
      costForTwo: 50000,
      costForTwoString: "₹500 FOR TWO",
      deliveryTime: 42,
      minDeliveryTime: 42,
      maxDeliveryTime: 45,
      slaString: "42 MINS",
      lastMileTravel: 4.2,
    },
  },
];

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((restaurant, index) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
