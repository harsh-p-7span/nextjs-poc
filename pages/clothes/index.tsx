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

export const getServerSideProps = async () => {
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
    return {
      props: {
        clothes: [],
      },
    };
  }
};
