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
import { HvacsPage } from './core/components/pages/hvac/HvacsPage';
import { SuccessHvacs } from './core/components/pages/successPage/SuccessHvacs';
import { SelectHvacsPage } from './core/components/pages/linkHvacs/SelectHvacsPage';
import { SelectHvacVendor } from './core/components/pages/selectExternalVendor/SelectHvacVendor';
import { HomePowerPage } from './core/components/pages/homePower/HomePowerPage';
import { SuccessHomePower } from './core/components/pages/successPage/SuccessHomePower';
import { SelectHomePowerPage } from './core/components/pages/linkHomePower/SelectHomePowerPage';
import { SelectHomePowerVendor } from './core/components/pages/selectExternalVendor/SelectHomePowerVendor';
import { BatteryStorageDetailsPage } from './core/components/pages/homePower/BatteryStorageDetailsPage';
import { SolarInverterDetailsPage } from './core/components/pages/homePower/SolarInverterDetailsPage';
import { HvacDetailsPage } from './core/components/pages/hvac/details/HvacDetailsPage';
import { MetersDetailsPage } from './core/components/pages/homePower/MetersDetailsPage';
import { ChargingHardwarePage } from './core/components/pages/chargingHardware/ChargingHardwarePage';
import { SelectChargingHardwareVendor } from './core/components/pages/selectExternalVendor/SelectChargingHardwareVendor';
import { SelectChargingHardwarePage } from './core/components/pages/linkChargingHardware/SelectChargingHardwarePage';
import { SuccessChargingHardware } from './core/components/pages/successPage/SuccessChargingHardware';
import { ChargingHardwareDetailsPage } from './core/components/pages/chargingHardware/ChargingHardwareDetailsPage';

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
          <Route path="hvacs">
            <Route index element={<HvacsPage />} />
            <Route path="callback" element={<SelectHvacsPage />} />
            <Route path="connect" element={<SelectHvacVendor />} />
            <Route path="success" element={<SuccessHvacs />} />
            <Route path=":hvacId" element={<HvacDetailsPage />} />
          </Route>
          <Route path="home-power">
            <Route index element={<HomePowerPage />} />
            <Route path="callback" element={<SelectHomePowerPage />} />
            <Route path="connect" element={<SelectHomePowerVendor />} />
            <Route path="success" element={<SuccessHomePower />} />
            <Route
              path="battery/:homePowerId"
              element={<BatteryStorageDetailsPage />}
            />

            <Route
              path="pv-inverter/:homePowerId"
              element={<SolarInverterDetailsPage />}
            />
            <Route path="meter/:homePowerId" element={<MetersDetailsPage />} />
          </Route>
          <Route path="charging-hardware">
            <Route index element={<ChargingHardwarePage />} />
            <Route path="callback" element={<SelectChargingHardwarePage />} />
            <Route path="connect" element={<SelectChargingHardwareVendor />} />
            <Route path="success" element={<SuccessChargingHardware />} />
            <Route
              path=":hardwareId"
              element={<ChargingHardwareDetailsPage />}
            />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </MainContent>
    </PageWrapper>
  );
}

export default App;
