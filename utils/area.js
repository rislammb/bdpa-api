const getAreaInfo = (data, area) =>
  `${data[area + 'Place']?.name ? `${data[area + 'Place'].name}, ` : ''}${
    data[area + 'Upazila']?.name ? `${data[area + 'Upazila'].name}, ` : ''
  }${data[area + 'District']?.name ? data[area + 'District'].name : ''}`;

const getBnAreaInfo = (data, area) =>
  `${data[area + 'Place']?.bn_name ? `${data[area + 'Place'].bn_name}, ` : ''}${
    data[area + 'Upazila']?.bn_name ? `${data[area + 'Upazila'].bn_name}, ` : ''
  }${data[area + 'District']?.bn_name ? data[area + 'District'].bn_name : ''}`;

module.exports = { getAreaInfo, getBnAreaInfo };
