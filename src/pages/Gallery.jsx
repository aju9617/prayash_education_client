import React from "react";
import p1 from "../media/img/p-1.jpeg";
import p2 from "../media/img/p-2.jpeg";
import p3 from "../media/img/p-3.jpeg";
import p4 from "../media/img/p-4.jpeg";
import p5 from "../media/img/p-5.jpeg";
import p6 from "../media/img/p-6.jpeg";
import p7 from "../media/img/p-7.jpeg";
import p8 from "../media/img/p-8.jpeg";
import p9 from "../media/img/p-9.jpeg";
import p10 from "../media/img/p-10.jpeg";
function Gallery() {
  return (
    <div className="md:w-11/12 xl:w-9/12 p-4 md:p-8   mx-auto">
      <h4 className="text-3xl font-medium text-secondary mb-4">Gallery</h4>
      <div className="p-10 grid place-content-center">No picture</div>
      {/* <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-2 ">
          <img className="w-full rounded-md" src={p1} />
          <img className="w-full rounded-md" src={p2} />
          <img className="w-full rounded-md" src={p3} />
        </div>
        <div className="flex flex-col gap-2">
          <img className="w-full rounded-md" src={p4} />
          <img className="w-full rounded-md" src={p5} />
          <img className="w-full rounded-md" src={p6} />
        </div>

        <div className="flex flex-col gap-2">
          <img className="w-full rounded-md" src={p7} />
          <img className="w-full rounded-md" src={p8} />
          <img className="w-full rounded-md" src={p9} />
          <img className="w-full rounded-md" src={p10} />
        </div>
      </div> */}
    </div>
  );
}

export default Gallery;
