import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "@vega-scan/ui-components";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Blocks = lazy(() => import("./pages/Blocks"));
const Block = lazy(() => import("./pages/Block"));
const Parties = lazy(() => import("./pages/Parties"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Transaction = lazy(() => import("./pages/Transaction"));

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  min-height: 100%;
  flex: 1 0 auto;
`;

export default function App() {
  return (
    <AppContainer>
      <Header />
      <PageContainer>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blocks" element={<Blocks />} />
            <Route path="/block/:height" element={<Block />} />
            <Route path="/parties" element={<Parties />} />
            <Route path="/parties/:party" element={<Parties />} />
            <Route path="/txs" element={<Transactions />} />
            <Route path="/tx/:hash" element={<Transaction />} />
          </Routes>
        </Suspense>
      </PageContainer>
      <Footer />
    </AppContainer>
  );
}
