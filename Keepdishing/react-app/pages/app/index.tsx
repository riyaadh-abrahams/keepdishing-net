import AppLayout from "../../layouts/AppLayout";
import { NextPageWithLayout } from "../_app";

const AppIndex: NextPageWithLayout = () => {
  return <div>Test</div>;
};
AppIndex.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default AppIndex;
