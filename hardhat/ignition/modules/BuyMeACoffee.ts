import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BuyMeACoffeeModule = buildModule("BuyMeACoffeeModule", (m) => {
 
  const buyMeACoffee = m.contract("BuyMeACoffee");

  return { buyMeACoffee };
});

export default BuyMeACoffeeModule;


// 0x14E8132771CD0e66440f824a3429ba6e353F4122