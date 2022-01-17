import { Cookies, Notify, openURL } from 'quasar';

if (Cookies.has('gdpr') !== true)
{
  const policyUrl = 'https://www.iubenda.com/privacy-policy/91321931';

  Notify.create({
    message: 'Our third-party tools use cookies, which are necessary for its functioning' +
      ' and required to achieve the purposes illustrated in the cookie policy.',
    multiline: true,
    classes: 'doc-gdpr',
    timeout: 0,
    position: 'bottom-right',
    actions: [
      {
        label: 'Accept',
        color: 'yellow',
        handler()
        {
          Cookies.set('gdpr', true, { expires: 5 * 365 });
        }
      },
      {
        label: 'Learn more',
        color: 'light-grey',
        noDismiss: true,
        handler()
        {
          openURL(policyUrl);
        }
      }
    ]
  });
}
