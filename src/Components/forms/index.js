"use client";
import React from 'react';

import { IdenttForm } from './identt';
import { AutoIdentForm } from './autoident';
import { PostIdentForm } from './postident';
import { AuthadaForm } from './authada';
import { FintecForm } from './fintec';
import { JumioForm } from './jumio';
import { ATrustForm } from './atrust';
import { WebIdForm } from './webid';
import { WebIdSignForm } from './webidsign';
import { IdAustriaForm } from './idaustria';
import { NeosForm } from './neos';
import { ItsMeForm } from './itsme';
import { HooyuForm } from './hooyu';

const DynamicServiceForm = (props) => {
  const { service } = props;
  // console.log('service :>> ', service, props?.allData, props?.clientID);
  const serviceData =
    props?.allData &&
    props?.clientID &&
    props?.allData.hasOwnProperty(props?.clientID) &&
    props?.allData?.[props?.clientID].hasOwnProperty(service)
      ? props?.allData[props?.clientID][service]
      : {};
  // props.serviceData = serviceData;
  switch (service) {
    case 'Identt':
      return <IdenttForm {...props} serviceData={serviceData} />;
    case 'AutoIdent':
      return <AutoIdentForm {...props} serviceData={serviceData} />;
    case 'PostIdent':
      return <PostIdentForm {...props} serviceData={serviceData} />;
    case 'Authada':
      return <AuthadaForm {...props} serviceData={serviceData} />;
    case 'Fintec':
      return <FintecForm {...props} serviceData={serviceData} />;
    case 'Jumio':
      return <JumioForm {...props} serviceData={serviceData} />;
    case 'ATrust':
      return <ATrustForm {...props} serviceData={serviceData} />;
    case 'WebId':
      return <WebIdForm {...props} serviceData={serviceData} />;
    case 'WebIdSign':
      return <WebIdSignForm {...props} serviceData={serviceData} />;
    case 'IdAustria':
      return <IdAustriaForm {...props} serviceData={serviceData} />;
    case 'Neos':
      return <NeosForm {...props} serviceData={serviceData} />;
    case 'ItsMe': 
      return <ItsMeForm {...props} serviceData={serviceData} />;
    case 'Hooyu':
      return <HooyuForm {...props} serviceData={serviceData} />;
  }
  return 'Service Not found';
};

export { DynamicServiceForm };
