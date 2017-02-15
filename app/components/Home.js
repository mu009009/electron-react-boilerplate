// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import temp from 'temp';

export default class Home extends Component {

  constructor(props) {
    super(props);
		this.state = {
			dirPath: null,
      FirstTime: 0,
		}
	}

  render() {
    var tempdir = this.state.dirPath;
    var Judge = this.state.FirstTime;
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
    console.log(tempdir);
    return (
      <div>
        <div className={styles.container}>
          <h4>{tempdir}</h4>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
