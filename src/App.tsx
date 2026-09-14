// import RandomBtn from "./features/gacha/components/RandomBtn";
import GachaPage from "./features/gacha/Gacha";

import { Provider } from "react-redux";
import store from "./store/store";
import Layout from "./components/layouts/Layout";
import GachaManagerPage from "./features/gacha/GachaManager";

export default function App() {
  return (<>
    <Provider store={store}>
      <Layout>
        <GachaPage />
        <GachaManagerPage />
      </Layout>
    </Provider >
  </>)

}