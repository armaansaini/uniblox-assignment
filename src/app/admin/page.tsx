import { getAdminStoreData } from "./action";
import { StoreDataType } from "@/types/storeData";
import StoreDataForm from "./components/StoreDataForm";

export default async function StoreAdminPage() {
  const storeData: StoreDataType = await getAdminStoreData();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col rounded border shadow-md p-4 w-[600px]">
        <div className="self-center text-xl underline">Edit Store Details</div>

        <div className="my-5">
          <div>
            Current Orders to unlock discount:{" "}
            {storeData.orders_to_unlock_discount}
          </div>
          <div>Discount Percentage: {storeData.discount_percentage}</div>
        </div>

        <StoreDataForm />
      </div>
    </div>
  );
}
