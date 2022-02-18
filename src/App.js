import {useState, useEffect} from "react";
import Papa from 'papaparse';
import './App.css';


function App() {
  const [apiKeyValue, setApiKeyValue] = useState(null);
  const [templateIdValue, setTemplateIdValue] = useState(null);
  const [csvUpload, setCsvUpload] = useState(null);
  const [sendGridEmailTemplate, setSendGridEmailTemplate] = useState(null);
  const [sendApiRequest, setSendApiRequest] = useState(false);


  function handleApiKeyValueChange(event) {
     setApiKeyValue(event.currentTarget.value);
   }

  function handleTemplateIdValueChange(event) {
    setTemplateIdValue(event.currentTarget.value);
  }

  function handleCsvUpload(event) {
    event.preventDefault();
    Papa.parse(event.target.files[0], {
      complete: UpdateData,
      header: true
    });
  }

  function UpdateData(result) {
    setCsvUpload(result.data);
  }

  function handlePreviewButtonClick(e) {
    e.preventDefault();
    setSendApiRequest(true);
  }

  function handleUploadButtonClick(e) {
    e.preventDefault();
    console.log(templateIdValue)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      csvUpload,
      templateIdValue,
      apiKeyValue
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    fetch("http://localhost:8080/backend", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  function RenderSampleMessage() {
    if(csvUpload && sendGridEmailTemplate) {
      return (
        <div>
          <div dangerouslySetInnerHTML = {{__html: sendGridEmailTemplate}}/>
        </div>
      )
    } else {
      return (
        <p></p>
      )
    }
  }

  function searchForVariables(templateText) {
    let alteredSendGridEmailTemplate = templateText;
    for (let key in csvUpload[0]) {
      if (alteredSendGridEmailTemplate.includes(`{{${key}}}`)) {
        alteredSendGridEmailTemplate = alteredSendGridEmailTemplate.replace(`{{${key}}}`, csvUpload[0][key]);
      }
    }
    setSendGridEmailTemplate(alteredSendGridEmailTemplate);
  }

  useEffect(() => {
    if (templateIdValue && apiKeyValue && csvUpload && sendGridEmailTemplate) {
      searchForVariables(sendGridEmailTemplate);
      RenderSampleMessage();
    }
  }, [sendGridEmailTemplate]);

  useEffect(() => {
    if (templateIdValue && apiKeyValue && csvUpload) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${apiKeyValue}`);
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://api.sendgrid.com/v3/templates/${templateIdValue}`, requestOptions)
        .then(setSendApiRequest(false))
        .then(response => response.text())
        .then(result => setSendGridEmailTemplate(JSON.parse(result).versions[0].html_content))
        .catch(error => console.log('error', error));
    }
  }, [sendApiRequest]);


// https://stackoverflow.com/questions/44769051/how-to-upload-and-read-csv-files-in-react-js
// https://daveceddia.com/useeffect-hook-examples/
 // d-c03eb4b085e14884ad743f966aee96d4

  return (
    <div className="App">
      <header className="App-header">
        <p>
          SENDGRID APP
        </p>
        <form action="">
          <input
            type="password"
            placeholder="SendGrid API Key"
            onChange={handleApiKeyValueChange}/>
          <input
            type="text"
            placeholder="Template ID"
            onChange={handleTemplateIdValueChange}
          />
          <input
           className="csv-input"
           type="file"
           name="file"
           placeholder={null}
           onChange={handleCsvUpload}
           accept=".csv"
         />
       <button onClick={handlePreviewButtonClick}> Preview Message</button>
       <button onClick={handleUploadButtonClick}> Upload Emails</button>

        </form>
        <RenderSampleMessage></RenderSampleMessage>
      </header>
    </div>
  );
}

export default App;
