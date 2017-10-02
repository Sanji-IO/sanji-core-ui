export default class TagListController {
  constructor($mdDialog, rest) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.rest = rest;
    this.tags = null;
    this.selectedDevice = null;
    this.selectedTags = [];
    this.table = {};
    this.code = {
      timestamp: new Date().toISOString(),
      value: ''
    };
  }

  $onInit() {
    this.types = this.devices
      .map(device => device.equipmentType)
      .filter((type, idx, self) => self.indexOf(type) === idx);
    this.setTableConfig(this.devices);
    this.updateEquipmentTagListStatus(this.devices, this.data);
    this.setSelectedDevice(this.devices[0]);
    this.changeTableContent(this.devices[0]);
  }

  updateEquipmentTagListStatus(equipments, selectedTags) {
    equipments.forEach(equip => {
      // reset status
      equip.equipmentTags.forEach(tag => {
        tag.logOnChange = false;
        tag.isSelected = false;
        tag.logDescription = false;
        tag.logUnit = false;
        tag.logDataType = false;
      });

      // update status
      selectedTags.forEach(item => {
        if (item.equipmentName === equip.equipmentName) {
          const tempTag = equip.equipmentTags.find(tag => tag.name === item.name);
          tempTag.logOnChange = item.logOnChange;
          tempTag.logDescription = item.logDescription;
          tempTag.logUnit = item.logUnit;
          tempTag.logDataType = item.logDataType;
          tempTag.isSelected = true;
        }
      });
    });
  }

  setTableConfig(devices) {
    devices.forEach(device => {
      this.table[device.equipmentName] = {};
      this.table[device.equipmentName].selectedAllLogOnChange = false;
      this.table[device.equipmentName].selectedAllDescription = false;
      this.table[device.equipmentName].selectedAllUnit = false;
      this.table[device.equipmentName].selectedAllDataType = false;
      this.table[device.equipmentName].promise = null;
      this.table[device.equipmentName].selected = [];
      this.table[device.equipmentName].query = {
        order: 'name',
        limit: 10,
        page: 1
      };
    });
  }

  setSelectedTag(device) {
    this.table[device.equipmentName].selected = device.equipmentTags.filter(item => item.isSelected === true);
  }

  setSelectedDevice(device) {
    this.selectedDevice = device;
  }

  setResult() {
    const results = [];
    this.devices.forEach(device => {
      this.table[device.equipmentName].selected.forEach(item => {
        results.push({
          name: item.name,
          equipmentName: device.equipmentName,
          equipmentType: device.equipmentType,
          unit: item.unit || '',
          dataType: item.dataType,
          description: item.description,
          logOnChange: item.logOnChange,
          logDescription: item.logDescription,
          logUnit: item.logUnit,
          logDataType: item.logDataType
        });
      });
    });
    return results;
  }

  changeTableContent(device) {
    this.setSelectedTag(device);
    this.selectedTags = this.setResult();
    this.tags = device.equipmentTags;
  }

  changeSelectedItem() {
    this.selectedTags = this.setResult();
  }

  changeSelectedDevice(type) {
    if (type === 'All') {
      return;
    }
    const devices = this.devices.filter(device => device.equipmentType === type);
    this.setTableConfig(devices);
    this.updateEquipmentTagListStatus(devices, this.data);
    this.setSelectedDevice(devices[0]);
    this.changeTableContent(devices[0]);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  toggleAllLogOnChange(device, status) {
    device.equipmentTags.forEach(tag => (tag.logOnChange = status));
  }

  toggleAllLogDescription(device, status) {
    device.equipmentTags.forEach(tag => (tag.logDescription = status));
    if (status) {
      this.code.description = '';
    } else {
      delete this.code.description;
    }
  }

  toggleAllLogUnit(device, status) {
    device.equipmentTags.forEach(tag => (tag.logUnit = status));
    if (status) {
      this.code.unit = '';
    } else {
      delete this.code.unit;
    }
  }

  toggleAllLogDataType(device, status) {
    device.equipmentTags.forEach(tag => (tag.logDataType = status));
    if (status) {
      this.code.dataType = '';
    } else {
      delete this.code.dataType;
    }
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  save() {
    this.$mdDialog.hide(this.setResult());
  }
}
