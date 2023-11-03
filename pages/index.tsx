import axios from "axios";
import { useEffect, useState } from "react";

const Home = ({
  data,
}: {
  data: {
    catData: {
      fact: string;
      length: number;
    };
    message: string;
  };
}) => {
  const [catData, setCatData] = useState<{
    catData: {
      fact: string;
      length: number;
    };
    message: string;
  }>();
  const [isApiLoading, setIsApiLoading] = useState(false);

  const handleFetchCatData = async () => {
    setIsApiLoading(true);

    const catData = await axios.get("http://localhost:3000/api/fetchCatFact");
    console.log(catData.data, "handleFetchCatData");
    setCatData(catData.data);

    setIsApiLoading(false);
  };

  const handleCacheInvalidation = async () => {
    setIsApiLoading(true);

    await axios.get("http://localhost:3000/api/invalidateCatFact");
    console.log("CACHE Invalidated");

    setIsApiLoading(false);
  };

  const handleUpdateData = async () => {
    setIsApiLoading(true);

    await axios.get("http://localhost:3000/api/updateCatFact");
    console.log("Data updated");

    setIsApiLoading(false);
  };

  useEffect(() => {
    console.log("I AM IN USE EFFECT", data);

    setCatData(data);
  }, [data]);

  return (
    <div>
      <p>Home</p>

      <div className="flex gap-8 items-center">
        <button onClick={handleCacheInvalidation}>Invalidate cache</button>
        <button onClick={handleUpdateData}>Update</button>
        <button onClick={handleFetchCatData}>Refetch</button>
      </div>

      {isApiLoading ? <p>Loading...</p> : null}

      {catData ? (
        <div className="mt-4 p-8 border border-red-400">
          <p>Cat Fact</p>

          <p>{catData.catData.fact}</p>

          <p>{catData.message}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const data = await axios.get("http://localhost:3000/api/fetchCatFact");
  return {
    props: {
      data: data.data,
    },
  };
};
