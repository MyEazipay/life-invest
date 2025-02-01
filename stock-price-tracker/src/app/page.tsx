
import SearchAndChartWrapper from "@/components/search-and-chart-wrapper";
import { promises as fs } from 'fs';

 const Home = async () => {

  const file = await fs.readFile(process.cwd() + '/public/data/stock-list.json', 'utf8');
  const stockList = JSON.parse(file);


  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-[1440px]">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-5xl">Stock Price Tracker</h1>
      <SearchAndChartWrapper stockList={stockList} />     
    </div>
  );
}


export default Home;