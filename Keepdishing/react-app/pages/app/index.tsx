import AppLayout from "../../layouts/AppLayout";
import api from "../../store/api/api";
import { wrapper } from "../../store/store";
import { NextPageWithLayout } from "../_app";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  store.dispatch(api.endpoints.getApiAuthGetCurrentUser.initiate());
  await Promise.all(api.util.getRunningOperationPromises());

  return {
    props: {},
  };
});

const AppIndex: NextPageWithLayout = () => {
  return <div>Test</div>;
};

AppIndex.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default AppIndex;
