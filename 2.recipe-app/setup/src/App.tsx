import "./App.css";
import CardRecepie from "./components/card-recepie/CardRecepie";

import Loading from "./components/loading/Loading";

import { fetchData } from "./types/type";
import { useQuery } from "@tanstack/react-query";

function App() {
  const {
    data: recipes,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recepie"],
    queryFn: fetchData,
  });

  if (isError) {
    return <i>{error.message}</i>;
  }

  if (isLoading) {
    return (
      <h3>
        <Loading />
      </h3>
    );
  }

  return (
    <>
      <header>
        <h1>Food Recipes</h1>
      </header>
      <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes?.map((recepie) => {
          return <CardRecepie key={recepie.id} {...recepie} />;
        })}
      </div>
    </main>
    </>
  );
}

export default App;
