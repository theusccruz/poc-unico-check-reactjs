import { useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import * as acessoWebFrame from 'unico-webframe';

function App() {
  function getHostUrlBase(path) {
    return window.location.protocol + "//" + window.location.host + "/" + path;
  }

  const urlPathModels = getHostUrlBase("/assets/models");

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {

      const callback = {
        on: {
          success: function (obj) {
            console.log(obj.base64);
          },
          error: function (error) {
            console.error(error)
            //confira na aba "Configurações" sobre os tipos de erros
          },
          support: function (error) {
            console.log(error)
            //confira na aba "Configurações" sobre os tipos de erros
          }
        }
      };

      const layout = {
        silhouette: {
          primaryColor: "#0bbd26",
          secondaryColor: "#bd0b0b",
          neutralColor: "#fff",
        },
        buttonCapture: {
          backgroundColor: "#2980ff",
          iconColor: "#fff",
        },
        popupLoadingHtml: '<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Loading...</div>',
        boxMessage: {
          backgroundColor: "#2980ff",
          fontColor: "#fff"
        },
        boxDocument: {
          backgroundColor: "#2980ff",
          fontColor: "#fff"
        }
      }
      
      const configurations = {
        TYPE: 1,
      }

      /* câmera normal

       acessoWebFrame.initCamera(configurations, callback, layout);

      */


      // câmera inteligente

      configurations.TYPE = 2;
      acessoWebFrame.webFrameModel
        .loadModelsCameraInteligence(urlPathModels)
        .then(() => {
          acessoWebFrame.initCamera(configurations, callback, layout);
        })
        .catch((e) => {
          console.error(e);
        });
    });

  }, [urlPathModels])


  return (
    <div id="box-camera"></div>
  );
}

export default App;
