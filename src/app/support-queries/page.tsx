import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import SupportQueriesList from "@/components/pages/ContactSupport/SupportQueriesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Quries",
};

const SupportPage = () => {
  return   <>
      <Breadcrumb pageName="Support Quries" />
        <SupportQueriesList />
    </>;
};

export default SupportPage;
