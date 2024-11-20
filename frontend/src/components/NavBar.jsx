import React from "react";

function NavBar() {
  return (
    <div className=" w-full">
      <nav
        className="bg-gray-900 flex flex-row w-full"
        style={{ padding: "0.4%" }}
      >
        <div className="w-1/12" style={{ marginLeft: "3%" }}>
          <img
            className=" w-1/3"
            src="https://cdn-icons-png.flaticon.com/512/5291/5291952.png"
            alt="Vehicular Networks Inc"
          />
        </div>

        <div className=" flex flex-row justify-around space-x-4 items-center w-1/4">
          <div className=" bg-gray-900  text-sm  text-gray-300  hover:text-white font-medium">
            <a href="">Home</a>
          </div>
          <div className=" text-sm font-medium text-gray-300  hover:text-white">
            <a href="">Reward</a>
          </div>
          <div className=" text-sm font-medium text-gray-300  hover:text-white">
            <a href="">Account</a>
          </div>
          <div className=" border-b-2 text-sm font-medium text-gray-300  hover:text-white">
            <a href="/">Technical Support</a>
          </div>
        </div>

        <div
          className=" w-1/4 flex flex-row space-x-5 justify-end"
          style={{ marginLeft: "35%" }}
        >
          <button
            className=" text-white font-semibold rounded-md border-2 bg-gray-700 hover:bg-gray-600"
            style={{
              paddingTop: "0.5%",
              paddingBottom: "0.5%",
              paddingLeft: "6%",
              paddingRight: "6%",
            }}
          >
            Login
          </button>

          <button
            className=" text-white font-semibold rounded-md border-2 hover:bg-gray-800"
            style={{
              paddingTop: "0.5%",
              paddingBottom: "0.5%",
              paddingLeft: "6%",
              paddingRight: "6%",
            }}
          >
            Sign-up
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
