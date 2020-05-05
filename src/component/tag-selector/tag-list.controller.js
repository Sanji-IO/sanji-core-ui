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
    this.tagId = 0; // To prevent display error as users change devices, each tag need a unique id.
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
        tag.Id = this.tagId = this.tagId + 1;
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
          if (tempTag) {
            tempTag.logOnChange = item.logOnChange;
            tempTag.logDescription = item.logDescription;
            tempTag.logUnit = item.logUnit;
            tempTag.logDataType = item.logDataType;
            tempTag.isSelected = true;
          }
        }
      });
      this.setSelectedTag(equip);
    });
  }

  setTableConfig(devices) {
    devices.forEach(device => {
      this.table[device.equipmentName] = {};
      this.table[device.equipmentName].selectedAllTag = false;
      this.table[device.equipmentName].selectedAllLogOnChange = false;
      this.table[device.equipmentName].selectedAllLogDescription = false;
      this.table[device.equipmentName].selectedAllLogUnit = false;
      this.table[device.equipmentName].selectedAllLogDataType = false;
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
    let selectedTagsArray = device.equipmentTags.filter(item => item.isSelected === true);

    this.table[device.equipmentName].selected = selectedTagsArray;
    if (selectedTagsArray.length > 0) {
      this.table[device.equipmentName].selectedAllLogDescription = selectedTagsArray[0].logDescription;
      this.table[device.equipmentName].selectedAllLogUnit = selectedTagsArray[0].logUnit;
      this.table[device.equipmentName].selectedAllLogDataType = selectedTagsArray[0].logDataType;
    }
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

  toggleAllTag(device, status) {
    this.table[device.equipmentName].selectedAllTag = !status;
    device.equipmentTags.forEach(tag => (tag.isSelected = !status));
    if (this.table[device.equipmentName].selectedAllTag) {
      const result = device.equipmentTags.map(item => {
        return {
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
        };
      });
      this.selectedTags = [...this.selectedTags, ...result];
    } else {
      this.selectedTags = this.selectedTags.filter(item => item.equipmentName !== device.equipmentName);
    }
    this.updateEquipmentTagListStatus(this.devices, this.selectedTags);
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
    const selectedDevice = this.table[this.selectedDevice.equipmentName];
    const result = this.setResult();
    result.forEach(item => {
      item.logDescription = selectedDevice.selectedAllLogDescription;
      item.logUnit = selectedDevice.selectedAllLogUnit;
      item.logDataType = selectedDevice.selectedAllLogDataType;
    });
    this.$mdDialog.hide(result);
  }
}
