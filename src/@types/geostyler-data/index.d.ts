
// Type definitions for GeoStyler Data Models
// Project: https://github.com/terrestris/geostyler
// Definitions by: Christian Mayer <https://github.com/chrismayer>
// Definitions: 
// TypeScript Version: 2.8

import { FeatureCollection, GeometryObject } from 'geojson';

/**
 * Type represents a single property of an object according to JSON schema.
 * Like:
 *
 *   {
 *     "type": "Number",
 *     "minimum": 0
 *   }
 *
 *
 * @class SchemaProperty
 */
export type SchemaProperty = {

  /**
   * The data type of the described property / attribute
   * @type {string}
   */
  type: string;

  /**
   * The minimum value of the described property / attribute.
   * Only applies for type='number'
   * @type {number}
   */
  minimum?: number;

  /**
   * The data type of the described property / attribute#
   * Only applies for type='number'
   * @type {number}
   */
  maximum?: number;
};

/**
 * Type represents the schema of imported geo-data, to have information about available
 * properties and data ranges.
 * Comparable to a DescribeFeatureType response for an OGC WFS.
 * This is modelled as JSON schema:
 *
 *  {
 *    "title": "Person",
 *    "type": "object",
 *    "properties": {
 *      "firstName": {
 *        "type": "string"
 *      },
 *      "lastName": {
 *        "type": "string"
 *      },
 *      "age": {
 *        "description": "Age in years",
 *        "type": "integer",
 *        "minimum": 0
 *      }
 *   }
 * }
 *
 * @type DataSchema
 */
export type DataSchema = {

  /**
   * Optional title for the described entity
   *
   * @type {string}
   */
  title?: string;

  /**
   * Optional type definition for the described entity
   *
   * @type {string}
   */
  type: string;

  /**
   * Properties object describing the attributes of the described entity
   *
   * @type {[name: string]: SchemaProperty; }}
   */
  properties: { [name: string]: SchemaProperty };
};

/**
 * Internal data object for imported geo data.
 * Aggregates a data schema and some example data (FeatureCollection).
 */
export interface Data {

  /**
   * Schema of imported geo-data describing the properties / attributes
   *
   * @type {DataSchema}
   */
  schema: DataSchema;

  /**
   * Example features of imported geo-data
   */
  exampleFeatures: FeatureCollection<GeometryObject>;
}

/**
 * Interface, which has to be implemented by all GeoStyler parser classes.
 */
export interface DataParser {
  /**
   * Optional projection of the input data,
   * e.g. 'EPSG:4326'
   *
   * @type {string}
   */
  sourceProjection?: string;

  /**
   * Optional projection of the output data,
   * e.g. 'EPSG:3857'
   *
   * @type {string}
   */
  targetProjection?: string;

  /**
   * Parses the inputData and transforms it to the GeoStyler data model
   *
   * @param inputData
   */
  readData(inputData: any): Data;
}



