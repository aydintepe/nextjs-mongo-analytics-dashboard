import classNames from "classnames";
import styles from './index.module.scss';
import { CatalogItemsTableAU } from '@/components/CatalogItemsGridAU/CatalogItemsTable';
import { CatalogItemsTableJP } from '@/components/CatalogItemsGridJP/CatalogItemsTable';
import { CatalogItemsTableUK } from '@/components/CatalogItemsGridUK/CatalogItemsTable';
import { CatalogItemsTableUS } from '@/components/CatalogItemsGridUS/CatalogItemsTable';
import { useState } from "react";

export default function CatalogItems() {
  const [market, setMarket] = useState("au");
  return <div className="h-full w-full">

    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="me-2" onClick={() => setMarket("au")}>
        <div aria-current="page" className={`inline-block p-4 cursor-pointer ${market == "au" ? "text-blue-600" : ""} bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Australia</div>
      </li>
      <li className="me-2" onClick={() => setMarket("jp")}>
        <div aria-current="page" className={`inline-block p-4 cursor-pointer ${market == "jp" ? "text-blue-600" : ""} bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>Japan</div>
      </li>
      <li className="me-2" onClick={() => setMarket("uk")}>
        <div aria-current="page" className={`inline-block p-4 cursor-pointer ${market == "uk" ? "text-blue-600" : ""} bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>United Kingdom</div>
      </li>
      <li className="me-2" onClick={() => setMarket("us")}>
        <div aria-current="page" className={`inline-block p-4 cursor-pointer ${market == "us" ? "text-blue-600" : ""} bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>United States</div>
      </li>
    </ul>


    {
      market == "au" && <CatalogItemsTableAU className="w-full h-full" />
    }
    {
      market == "jp" && <CatalogItemsTableJP className="w-full h-full" />
    }
    {
      market == "uk" && <CatalogItemsTableUK className="w-full h-full" />
    }
    {
      market == "us" && <CatalogItemsTableUS className="w-full h-full" />
    }




  </div>;
}
