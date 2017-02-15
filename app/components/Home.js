// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import temp from 'temp';
import Signals from 'signals-api';
import fs from 'fs';
import path from 'path';

export default class Home extends Component {

  constructor(props) {
    super(props);
		this.state = {
			dirPath: null,
      FirstTime: 0,
      tempCSV: null,
		}
	}

  render() {
    var tempdir = this.state.dirPath;
    var Judge = this.state.FirstTime;
    var tempCSV = this.state.tempCSV;
    var self = this;
    temp.track();
    if(Judge == 0) {
      temp.mkdir('signals', (err, dirPath) => {
        console.log('Just check the dirPath');
        console.log(dirPath);
        tempdir = dirPath;
        self.setState({dirPath:tempdir});
        self.setState({FirstTime:1});
      })
    }
    if((tempdir!=null)&&(Judge == 1)) {
       var csvRote = path.join(tempdir,'temCSVfile.csv')
       var temCSV = fs.createWriteStream(csvRote);
       var csvWriter = require('csv-write-stream');
       var defalut = {
          separator: '\t',
          newline: '\n',
          headers: 'JustTest',
          sendHeaders: true,
        }
      var writer = csvWriter(defalut);
      writer.pipe(temCSV);
      writer.end();

      console.log(csvRote);
      self.setState({tempCSV:csvRote});
      self.setState({FirstTime:2});
    }
    if((tempdir!=null)&&(Judge == 2)){
      var kAPPCredential =  {"key":"57e53f733d8010438afa21a3","token":"Q60evfiT4ztHGUHilxftJGctVrzrR1EwBJzlQRnoVsiG6s37mKvBDzSWsZJZWTqxroXUOyelwDmaxED6BqthPWGaooykJgnz94WwuHAXmLGN86A4IGe1tUuH1OxjQsmO","domain":"beta"};
      var api = new Signals(kAPPCredential,'beta');

      var signalsjob = api.job();
          signalsjob.config({
              "file_encoding": "utf-8",
              "params": null,
              // "run_language_detection":true
              "meta": {
                  "name": 'test',
                  "source": "csv"
              }
          });
      signalsjob.uploadData(fs.createReadStream(tempCSV),function (response, error){
        self.setState({FirstTime:3});
      })
    }
    return (
      <div>
        <div className={styles.container}>
          <h4>{tempdir}</h4>
          <h4>{tempCSV}</h4>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
