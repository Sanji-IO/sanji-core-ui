const $inject = ['$cookies', '$timeout', 'session'];
class DownloadHelperService {
  constructor(...injects) {
    DownloadHelperService.$inject.forEach((item, index) => this[item] = injects[index]);
    this.iframe = null;
  }

  start(url) {
    console.log('===start iframe download helper====');
    console.log('token', this.session.get('token'));
    console.log('download link', url);
    this.generatedIframe(this.session.get('token'), url);
    this.$timeout(this.removeIframe.bind(this), 5000);
  }

  generatedIframe(token, url) {
    this.iframe = document.createElement('iframe');
    console.log('create token cookies', token);
    this.$cookies.put('token', token);
    console.log('created', this.$cookies.get('token'));

    this.iframe.src = url;
    this.iframe.style.display = 'none';
    document.body.appendChild(this.iframe);
  }

  removeIframe() {
    console.log('remove token cookies');
    this.$cookies.remove('token');
    console.log('removed', this.$cookies.get('token'));
    document.body.removeChild(this.iframe);
  }
}

DownloadHelperService.$inject = $inject;
export default DownloadHelperService;
