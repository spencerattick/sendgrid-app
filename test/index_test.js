const assert = require('assert');
const sendEmail = require('../server.js');

describe('sendEmail', () => {
  const templateId = 'd-testTemplateId'

  describe('.send', () => {
    it('sends INCIDENT_EMAIL_LIST if that field is present on the row', () => {
      const row = { INCIDENT_EMAIL_LIST: 'test@gmail.com', OWNER_EMAIL_LIST: '' };
        return sendEmail.send(row, templateId, true)
                .then(res => assert.equal(row['INCIDENT_EMAIL_LIST'], res.to[0]));
    })

    it('doesn’t send OWNER_EMAIL_LIST if both email columns are filled on the row', () => {
      const row = { INCIDENT_EMAIL_LIST: 'test@gmail.com', OWNER_EMAIL_LIST: 'test1@gmail.com' };
        return sendEmail.send(row, templateId, true)
                .then(res => assert.notEqual(row['OWNER_EMAIL_LIST'], res.to[0]));
    })

    it('sends OWNER_EMAIL_LIST if INCIDENT_EMAIL_LIST is missing on the row', () => {
      const row = { INCIDENT_EMAIL_LIST: '', OWNER_EMAIL_LIST: 'test1@gmail.com' };
        return sendEmail.send(row, templateId, true)
                .then(res => assert.equal(row['OWNER_EMAIL_LIST'], res.to[0]));
    })

    it('sends multiple INCIDENT_EMAIL_LIST emails in a row if they exist', () => {
      const row = { INCIDENT_EMAIL_LIST: 'test@gmail.com, test2@gmail.com', OWNER_EMAIL_LIST: 'test1@gmail.com' };
        return sendEmail.send(row, templateId, true)
                .then(res => assert.equal(row['INCIDENT_EMAIL_LIST'], res.to.join(', ')));

    })

    it('sends multiple OWNER_EMAIL_LIST emails in a row if they exist and INCIDENT_EMAIL_LIST is empty', () => {
      const row = { INCIDENT_EMAIL_LIST: '', OWNER_EMAIL_LIST: 'test1@gmail.com, test@gmail.com, test2@gmail.com' };
        return sendEmail.send(row, templateId, true)
                .then(res => assert.equal(row['OWNER_EMAIL_LIST'], res.to.join(', ')));

    })

    it('sends email from friends@segment.com or support@segment.com', () => {
      const row = { INCIDENT_EMAIL_LIST: '', OWNER_EMAIL_LIST: 'test1@gmail.com, test@gmail.com, test2@gmail.com' };
      function allowedSender(from) {
        if (from === 'friends@segment.com' || from === 'support@segment.com') {
          return true;
        } else {
          return false;
        }
      }
        return sendEmail.send(row, templateId, true)
                .then(res => assert.ok(allowedSender(res.from)));

    })

    it('populates a dynamicTemplateData object with values set for additional dynamic content per CSV row', () => {
      const row = { INCIDENT_EMAIL_LIST: '', OWNER_EMAIL_LIST: 'test1@gmail.com, test@gmail.com, test2@gmail.com', WORKSPACE_SLUG: 'test-workspace', SOURCE_SLUG: 'test-source' };
      const expected = {WORKSPACE_SLUG: 'test-workspace', SOURCE_SLUG: 'test-source'};
        return sendEmail.send(row, templateId, true)
          .then(res => assert.equal(JSON.stringify(res.dynamicTemplateData), JSON.stringify(expected)));
    })

  });

});
