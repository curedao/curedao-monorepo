/**
 * Decentralized FDA API
 * A platform for quantifying the effects of every drug, supplement, food, and other factor on your health.
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

export class ConnectInstructions {
    /**
    * Create a form with these fields and post the key and user submitted value to the provided connect url
    */
    'parameters'?: Array<any>;
    /**
    * URL to open to connect
    */
    'url': string;
    /**
    * True if should open auth window in popup
    */
    'usePopup'?: boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "parameters",
            "baseName": "parameters",
            "type": "Array<any>",
            "format": ""
        },
        {
            "name": "url",
            "baseName": "url",
            "type": "string",
            "format": ""
        },
        {
            "name": "usePopup",
            "baseName": "usePopup",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ConnectInstructions.attributeTypeMap;
    }

    public constructor() {
    }
}

