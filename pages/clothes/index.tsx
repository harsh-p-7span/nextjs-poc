import { GetServerSideProps } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const clothes = [
      {
        id: 1,
        name: "One",
        price: 1234,
      },
      {
        id: 2,
        name: "Two",
        price: 1234,
      },
    ];
    return {
      props: {
        clothes,
      },
    };
  } catch (err) {
    console.error("Redis error:", err);
    return {
      props: {
        clothes: [],
      },
    };
  }
};

const Clothes = ({
  clothes,
}: {
  clothes: Array<{
    id: number;
    name: string;
    price: number;
  }>;
}) => {
  return (
    <div>
      <p>Clothes</p>

      <div className="flex flex-col">
        {clothes.map((cloth) => {
          return (
            <div key={cloth.id} className="flex gap-4">
              <p>{cloth.name}</p>
              <p>{cloth.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Clothes;
