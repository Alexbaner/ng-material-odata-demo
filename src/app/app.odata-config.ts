import { ODataConfiguration, ODataServiceFactory, ODataService } from "angular2-odata";

export const NorthwindConfigFactory = () => {
    let odta = new ODataConfiguration();
    odta.baseUrl = 'http://services.odata.org/V4/Northwind/Northwind.svc';
    return odta;
};
