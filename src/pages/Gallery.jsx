import React, { useState } from "react";
import { galleryService } from "../services";
import moment from "moment";
function GalleryList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching((e) => !e);
      const res = await galleryService.getList({
        page,
      });
      setFetching((e) => !e);
      if (res.status) {
        setList((e) => {
          let newList = [...e, ...res.data.results];
          newList = newList.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );
          return newList;
        });
        setTotalPage(res.data.totalPages);
      }
    };

    fetch();
  }, [page]);

  return (
    <div className="py-6 w-11/12 lg:w-8/12 mx-auto">
      <h4 className="text-3xl font-medium text-secondary mb-4">Gallery</h4>
      <div className="my-5 grid md:grid-cols-3 gap-4">
        {list.map((curr) => (
          <div
            key={curr.id}
            className="group cursor-pointer aspect-square relative rounded-md overflow-hidden"
          >
            <img
              className="w-full h-full  object-cover rounded"
              src={curr.url}
            />

            <div className="pointer-events-none  cursor-pointer absolute top-0 left-0 right-0 bottom-0 text-white bg-gradient-to-t from-gray-800 to-transparent flex justify-end p-4 flex-col invisible group-hover:visible   ">
              <p className="font-medium ">{curr.about}</p>
              <p className="text-sm">{moment(curr.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>
      {fetching && (
        <div className="grid place-content-center min-h-[40vh]">
          <div className="">
            <div className="circle loader"></div>
          </div>
          <p className="text-center">Loading...</p>
        </div>
      )}

      {page < totalpage && (
        <p
          onClick={() => setPage((e) => e + 1)}
          className="ml-auto block text-secondary text-right cursor-pointer"
        >
          Load more
        </p>
      )}
    </div>
  );
}

export default GalleryList;
