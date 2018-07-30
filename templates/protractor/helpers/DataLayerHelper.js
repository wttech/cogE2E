import _ from 'lodash';

const fetchDataLayer = () => window.dataLayer;
const filterByEventName = eventName => obj => obj.event === eventName;

export default class DataLayerHelper {
  static async filterEventTypes(eventTypeName) {
    const dataLayerDefinition = await DataLayerHelper.getDataLayerDefinition();
    return _.filter(dataLayerDefinition, filterByEventName(eventTypeName));
  }

  static async getFirstEventType(eventTypeName) {
    const event = await DataLayerHelper.filterEventTypes(eventTypeName);
    return _.head(event) || {};
  }

  static async getDataLayerDefinition() {
    return browser.executeScript(fetchDataLayer);
  }
}
