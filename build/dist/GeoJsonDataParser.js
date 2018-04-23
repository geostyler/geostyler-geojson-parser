import { isArray } from 'util';
/**
 *
 */
var GeoJsonDataParser = /** @class */ (function () {
    function GeoJsonDataParser(sourceProj, targetProj) {
        if (sourceProj && targetProj) {
            this.sourceProjection = sourceProj;
            this.targetProjection = targetProj;
        }
    }
    /**
     *
     * @param inputData
     */
    GeoJsonDataParser.prototype.readData = function (inputData) {
        var featureCollection = inputData;
        var schema = this.parseSchema(featureCollection);
        var data = { schema: schema, exampleFeatures: featureCollection };
        return data;
    };
    /**
     *
     * @param geojson {FeatureCollection<GeometryObject>}
     */
    GeoJsonDataParser.prototype.parseSchema = function (geojson) {
        var dataProperties = {};
        var numValues = {};
        var features = geojson.features;
        if (!features || !isArray(features)) {
            throw new Error('Given GeoJSON FeatureCollection does not have a "features" array - EXIT!');
        }
        features.forEach(function (feature) {
            var props = feature.properties;
            if (props) {
                for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var propVal = props[key];
                    var propType = typeof (propVal);
                    if (propType === 'number') {
                        if (!numValues[key]) {
                            numValues[key] = [];
                        }
                        numValues[key].push(propVal);
                    }
                    if (!dataProperties[key]) {
                        dataProperties[key] = {
                            type: isArray(propVal) ? 'array' : typeof (propVal)
                        };
                    }
                }
            }
        });
        for (var _i = 0, _a = Object.keys(numValues); _i < _a.length; _i++) {
            var propKey = _a[_i];
            var nums = numValues[propKey];
            var sortedNums = nums.sort(function (n1, n2) { return n1 - n2; });
            dataProperties[propKey].minimum = sortedNums[0];
            dataProperties[propKey].maximum = sortedNums[sortedNums.length - 1];
        }
        var dataSchema = {
            type: 'object',
            properties: dataProperties
        };
        return dataSchema;
    };
    return GeoJsonDataParser;
}());
export default GeoJsonDataParser;
//# sourceMappingURL=GeoJsonDataParser.js.map