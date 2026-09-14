import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import HomePage from "./HomePage";
import { useGetAllBooksQuery } from "../../../Redux/features/admin/adminApi";

const Home = () => {
  const {
    data: bookResponse,
    isLoading,
    isError,
  } = useGetAllBooksQuery(undefined);
  return (
    <div>
      <HomePage booksData={bookResponse} 
        isLoading={isLoading} 
        isError={isError}  />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
