import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="p-8 flex flex-col text-center">
          <h1 className="text-4xl font-bold">
            A melhor pizza da cidade entregue na sua porta.
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Massa artesanal, ingredientes frescos e entrega rápida.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;