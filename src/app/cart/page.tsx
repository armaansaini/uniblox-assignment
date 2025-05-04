import { getUserCart } from "./action";

export default async function Cart() {
  const cart = await getUserCart();
  console.log(cart);
  return <></>;
}
