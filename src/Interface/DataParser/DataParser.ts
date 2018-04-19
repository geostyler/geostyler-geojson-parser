import Data from '../../Model/Data/Data';

/**
 *
 */
interface DataParser {
  sourceProjection: string;
  targetProjection: string;
  readData(inputData: any): Data;
}

export default DataParser;
