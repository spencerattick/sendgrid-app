const sgMail = require('@sendgrid/mail');
const express = require('express');

const path = require('path');
const app = express();

const staticFields = ['INCIDENT_EMAIL_LIST', 'OWNER_EMAIL_LIST'];


app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/backend', function (req, res) {
  // const response = res.json();
  console.log('SUCCCCESSSSS!!!')
  console.log(res.req.body);
  res.sendStatus(200);

  const csvData = res.req.body.csvUpload;
  const templateId = res.req.body.templateIdValue;
  const apiKey = res.req.body.apiKeyValue;

  sendAll(apiKey, csvData, templateId)
    .catch((err) => {
      console.log('FULL ERROR RESPONSE: ', err);
      console.log('ERROR RESPONSE BODY: ', err.response.body.errors);
    })
    .then(() => {
      console.log('done!');
    });
});



async function sendToIncidentOrOwnerContact(row) {
  let emailList;
   if (row.INCIDENT_EMAIL_LIST) {
    // Use default email list field
    emailList = row.INCIDENT_EMAIL_LIST;
    // If default is empty, use backup email address field
  } else if (row.OWNER_EMAIL_LIST) {
    emailList = row.OWNER_EMAIL_LIST;
  } else {
    // await log('empty email list, skipping row.');
    return;
  }
  return emailList.split(',').map(email => email.trim());
}



function processDynamicContent(row) {
  const dynamicTemplateData = {};
  for (let columnName in row) {
    if (row.hasOwnProperty(columnName)) {
      if (!staticFields.includes(columnName)) {
        dynamicTemplateData[columnName] = row[columnName];

      }
    }
  }
  return dynamicTemplateData;
}


async function send(row, templateId) {
  const to = await sendToIncidentOrOwnerContact(row);
  //CAN ALSO USE friends@segment.com - BOTH GO TO SUCCESS ENG
  const from = 'support@segment.com';
  const msg = {
    templateId: templateId,
    dynamicTemplateData: await processDynamicContent(row),
    to,
    from,
  };
  await sgMail.send(msg);
  return msg;
}


async function sendAll(apiKey, csvData, templateId) {
  if (apiKey) {
    sgMail.setApiKey(apiKey);
  } else {
    console.log('deal with this case')
  }
  let mailsSent = 0;
  let totalRows = 1;

    totalRows = csvData.length;
    for (const row of csvData) {
      console.log('ENSURE TEMPLATEID HERE')
      await send(row, templateId);
      mailsSent++;
      if (mailsSent % 50 === 0) {
        console.log(`Sent ${mailsSent} / ${totalRows}.`);
      }
    }
}


app.listen(process.env.PORT || 8080);
