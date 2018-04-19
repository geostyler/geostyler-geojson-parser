import { FeatureCollection, GeometryObject } from 'geojson';
import DataSchema from '../../Type/DataSchema';

/**
 * Internal data object for imported geo data.
 * Aggregates a data schema and some example data (FeatureCollection).
 */
interface Data {

  schema: DataSchema;

  exampleFeatures: FeatureCollection<GeometryObject>;

  readData(inputData: any): any;
}

export default Data;
