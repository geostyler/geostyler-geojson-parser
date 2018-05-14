import { FeatureCollection, GeometryObject } from 'geojson';
import { DataParser, Data, DataSchema } from 'geostyler-data';

/**
 * 
 */
class GeoJsonDataParser implements DataParser {

  sourceProjection: string;
  targetProjection: string;
  constructor(sourceProj?: string, targetProj?: string) {
    if (sourceProj && targetProj) {
      this.sourceProjection = sourceProj;
      this.targetProjection = targetProj;
    }
  }

  /**
   * 
   * @param inputData 
   */
  readData(inputData: any): Promise<Data> {

    const featureCollection = inputData;
    const schema = this.parseSchema(featureCollection);
    
    const data = {schema: schema, exampleFeatures: featureCollection};

    const promise = new Promise<Data>((resolve, reject) => {
      // If we have a valid data object we can bind it to the promise resolver
      resolve(data);
    });

    return promise;
  }

  /**
   * 
   * @param geojson {FeatureCollection<GeometryObject>} 
   */
  parseSchema(geojson: FeatureCollection<GeometryObject>): DataSchema {

    const dataProperties = {};
    const numValues = {};
    const features = geojson.features;

    if (!features || !Array.isArray(features)) {
      throw new Error('Given GeoJSON FeatureCollection does not have a "features" array - EXIT!');
    }

    features.forEach(feature => {
      const props = feature.properties;
      if (props) {
        for (let key of Object.keys(props)) {
          let propVal = props[key];

          const propType = typeof(propVal);
          
          if (propType === 'number') {
            if (!numValues[key]) {
              numValues[key] = [];
            }
            numValues[key].push(propVal);
          }

          if (!dataProperties[key]) {
            dataProperties[key] = {
              type: Array.isArray(propVal) ? 'array' : typeof(propVal)
            };
          }

        }

      }

    });
        
    for (let propKey of Object.keys(numValues)) {
      const nums = numValues[propKey];
      const sortedNums: number[] = nums.sort((n1: number, n2: number) => n1 - n2);

      dataProperties[propKey].minimum = sortedNums[0];
      dataProperties[propKey].maximum = sortedNums[sortedNums.length - 1];
    }

    const dataSchema = {
      type: 'object',
      properties: dataProperties
    };

    return dataSchema;
  }

}

export default GeoJsonDataParser;
