import { IPropertyUsage } from "./property-usage-interface";
import { IPropertyType } from "./property-type-interface";

export interface IProperty{
    propertyId:number;
    propertyNumber:string;
    area:string;
    city:string;
    pincode:string;
    samagraId:string;
    isResidential:boolean;
    residentName:string;
    length:number;
    width:number;
    eastLandmark:string;
    westLandmark:string;
    northLandmark:string;
    southLandmark:string;
    sharedWallDescription:string;
    isWaterConnected:boolean;
    waterBillDescription:string;
    otherDescription:string;
    personId:number;
    propertyUsages:IPropertyUsage[];   
    propertyTypes:IPropertyType[];
}