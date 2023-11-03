import createRedisInstance from "@/lib/redis";
import axios from "axios";

const Home = ({
  data,
}: {
  data: {
    fact: string;
    length: number;
  };
}) => {
  console.log(data);

  const handleCacheInvalidation = async () => {
    await axios.get("http://localhost:3000/api/invalidateCatFact");
  };
  return (
    <div>
      <p>Home</p>

      <button onClick={handleCacheInvalidation}>Invalidate cache</button>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const redis = createRedisInstance();

  const cachedData = await redis.get("catFact");

  if (!cachedData) {
    const catData = await axios.get("http://localhost:3000/api/fetchCatFact");

    console.log({
      catData: catData.data,
      message: "This is API data.",
    });

    await redis.set("catFact", JSON.stringify(catData.data));

    redis.quit();
    return {
      props: {
        data: catData.data,
      },
    };
  }

  console.log({
    catData: JSON.parse(cachedData),
    message: "This is cached data.",
  });

  return {
    props: {
      data: JSON.parse(cachedData),
    },
  };
}
