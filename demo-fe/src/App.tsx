import './App.css';
import { PageWrapper } from './core/components/shared/wrappers/PageWrapper';
import { MainContent } from './core/components/shared/wrappers/MainContent';
import { useLangauageInitialization } from './core/hooks/useLanguageInitialization';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './core/components/pages/landingPage/LandingPage';
import { VehicleDetailsPage } from './core/components/pages/vehicle/VehicleDetailsPage';
import { useKeycloak } from '@react-keycloak/web';
import { ErrorPage } from './core/components/pages/errorPage/ErrorPage';
import { useLoadUser } from './core/hooks/useLoadUser';
import { NotFoundPage } from './core/components/pages/not-found-page/NotFoundPage';
import { SelectVehicleVendor } from './core/components/pages/selectExternalVendor/SelectVehicleVendor';
import { SelectSmartTariffVendor } from './core/components/pages/selectExternalVendor/SelectSmartTariffVendor';
import { SmartTariffsPage } from './core/components/pages/smartTarrif/SmartTariffsPage';
import { SmartTariffDetailsPage } from './core/components/pages/smartTarrif/SmartTariffDetailsPage';
import { VehiclesPage } from './core/components/pages/vehicle/VehiclesPage';
import { SuccessVehicles } from './core/components/pages/successPage/SuccessVehicles';
import { SuccessTariffs } from './core/components/pages/successPage/SuccessTariffs';
import { SelectTariffsPage } from './core/components/pages/linkTariffs/SelectTariffsPage';
import { SelectVehiclesPage } from './core/components/pages/linkVehicles/SelectVehiclesPage';

function App() {
  useLangauageInitialization();
  const { keycloak } = useKeycloak();
  useLoadUser();

  if (!keycloak.authenticated) {
    return;
  }

  return (
    <PageWrapper>
      <MainContent>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="vehicles">
            <Route index element={<VehiclesPage />} />
            <Route path="callback" element={<SelectVehiclesPage />} />
            <Route path="connect" element={<SelectVehicleVendor />} />
            <Route path="success" element={<SuccessVehicles />} />
            <Route path=":vehicleId" element={<VehicleDetailsPage />} />
          </Route>
          <Route path="smart-tariffs">
            <Route index element={<SmartTariffsPage />} />
            <Route path="callback" element={<SelectTariffsPage />} />
            <Route path="connect" element={<SelectSmartTariffVendor />} />
            <Route path="success" element={<SuccessTariffs />} />
            <Route path=":smartTariffId" element={<SmartTariffDetailsPage />} />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </MainContent>
    </PageWrapper>
  );
}

export default App;
