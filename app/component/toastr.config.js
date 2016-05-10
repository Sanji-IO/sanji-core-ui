export default toastr => {
  'ngInject';
  toastr.options.timeOut = 6000;
  toastr.options.positionClass = 'toast-bottom-right';
  toastr.options.progressBar = true;
};
