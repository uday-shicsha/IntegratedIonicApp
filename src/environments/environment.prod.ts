export const environment = {
  production: true,
  baseUrl: 'https://blue.shicsha.com/',
  sendCoordinates: function () { return this.baseUrl + 'Course/GetDistance' },
  generateQR:function(){return this.baseUrl + 'Course/GetDistance'},
  sendQRcode:function(){return this.baseUrl + 'Course/GetAttendance'}
};
