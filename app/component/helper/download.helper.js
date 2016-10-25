const $inject = ['$cookies', '$timeout', 'session'];
class DownloadHelperService {
  constructor(...injects) {
    DownloadHelperService.$inject.forEach((item, index) => this[item] = injects[index]);
    this.iframe = null;
  }

  start(url) {
    this.generatedIframe(this.session.get('token'), url);
    this.$timeout(this.removeIframe.bind(this), 5000);
  }

  generatedIframe(token, url) {
    this.iframe = document.createElement('iframe');
    this.$cookies.put('Authorization', token);

    this.iframe.src = url;
    document.body.appendChild(this.iframe);
  }

  removeIframe() {
    this.$cookies.remove('Authorization');
    document.body.removeChild(this.iframe);
  }
}

DownloadHelperService.$inject = $inject;
export default DownloadHelperService;
